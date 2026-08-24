import { deflateSync } from "zlib"
import { readFileSync, writeFileSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const mark = JSON.parse(readFileSync(join(root, "data/brand-mark.json"), "utf8"))
const INK = [7, 9, 7, 255]

function hexToRgba(hex) {
  const n = hex.replace("#", "")
  return [
    parseInt(n.slice(0, 2), 16),
    parseInt(n.slice(2, 4), 16),
    parseInt(n.slice(4, 6), 16),
    255,
  ]
}

function raster(scale) {
  const size = mark.size * scale
  const rgba = Buffer.alloc(size * size * 4)
  for (let y = 0; y < mark.size; y += 1) {
    const row = mark.rows[y]
    for (let x = 0; x < mark.size; x += 1) {
      const color = mark.palette[row[x]]
      const px = color ? hexToRgba(color) : INK
      for (let dy = 0; dy < scale; dy += 1) {
        for (let dx = 0; dx < scale; dx += 1) {
          const i = ((y * scale + dy) * size + (x * scale + dx)) * 4
          rgba[i] = px[0]
          rgba[i + 1] = px[1]
          rgba[i + 2] = px[2]
          rgba[i + 3] = px[3]
        }
      }
    }
  }
  return { size, rgba }
}

function crc32(buf) {
  let c = ~0
  for (let i = 0; i < buf.length; i += 1) {
    c ^= buf[i]
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  }
  return ~c >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type)
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
  return Buffer.concat([len, typeBuf, data, crc])
}

function png({ size, rgba }) {
  const raw = Buffer.alloc((size * 4 + 1) * size)
  for (let y = 0; y < size; y += 1) {
    const start = y * (size * 4 + 1)
    raw[start] = 0
    rgba.copy(raw, start + 1, y * size * 4, (y + 1) * size * 4)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ])
}

function ico(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  const entries = []
  const blobs = []
  let offset = 6 + images.length * 16
  for (const image of images) {
    const entry = Buffer.alloc(16)
    entry[0] = image.size === 256 ? 0 : image.size
    entry[1] = image.size === 256 ? 0 : image.size
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(image.buf.length, 8)
    entry.writeUInt32LE(offset, 12)
    entries.push(entry)
    blobs.push(image.buf)
    offset += image.buf.length
  }
  return Buffer.concat([header, ...entries, ...blobs])
}

function downsample(rgba, from, to) {
  const out = Buffer.alloc(to * to * 4)
  const f = from / to
  for (let y = 0; y < to; y += 1) {
    for (let x = 0; x < to; x += 1) {
      let r = 0
      let g = 0
      let b = 0
      let a = 0
      let n = 0
      const y0 = Math.floor(y * f)
      const x0 = Math.floor(x * f)
      const y1 = Math.max(y0 + 1, Math.floor((y + 1) * f))
      const x1 = Math.max(x0 + 1, Math.floor((x + 1) * f))
      for (let sy = y0; sy < y1; sy += 1) {
        for (let sx = x0; sx < x1; sx += 1) {
          const i = (sy * from + sx) * 4
          r += rgba[i]
          g += rgba[i + 1]
          b += rgba[i + 2]
          a += rgba[i + 3]
          n += 1
        }
      }
      const o = (y * to + x) * 4
      out[o] = Math.round(r / n)
      out[o + 1] = Math.round(g / n)
      out[o + 2] = Math.round(b / n)
      out[o + 3] = Math.round(a / n)
    }
  }
  return out
}

const png16 = png(mark.size === 16 ? raster(1) : { size: 16, rgba: downsample(raster(1).rgba, mark.size, 16) })
const png32 = png(mark.size === 16 ? raster(2) : raster(1))
writeFileSync(join(root, "app/favicon.ico"), ico([{ size: 16, buf: png16 }, { size: 32, buf: png32 }]))
writeFileSync(join(root, "public/icon-preview.png"), png(raster(mark.size === 16 ? 8 : 4)))
console.log("wrote app/favicon.ico and public/icon-preview.png")
