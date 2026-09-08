<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Delivery default

Unless the user explicitly asks for local-only work, completed changes must be:

1. kept in the local working copy;
2. committed and pushed to the GitHub remote; and
3. deployed to the production VPS and verified.

This three-copy workflow (local, GitHub, VPS) is the default definition of done
for this project. Preserve unrelated working-tree changes and never include
secrets in Git or deployment uploads.
