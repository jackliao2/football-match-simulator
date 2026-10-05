# Dependency security review — 5 October 2026

Next.js and its matching ESLint configuration were upgraded from 16.3.1 to
16.3.8. Compatible lockfile fixes also update sharp to 0.35.5, js-yaml to 4.3.2,
and brace-expansion to 1.1.21 / 5.0.12 on their respective dependency branches.
React and the application APIs are unchanged.

The npm mirror configured on the local machine does not implement the audit
endpoint. Security checks explicitly use the official npm registry without
changing the machine's registry configuration.

## Audit result

- Before: 9 affected package entries, including one critical Next.js entry.
- After: production audit (`npm run security:check`) reports zero vulnerabilities.
- Full audit: 5 high entries remain in the development-only dependency chain
  `eslint-config-next -> @next/eslint-plugin-next -> fast-glob -> micromatch -> braces`.
  These are five package entries for one underlying advisory, not five separate
  flaws in the public application.

The braces advisory currently lists no patched release. The suggested forced
fix downgrades eslint-config-next to 14.2.35, which is not appropriate for this
Next.js 16 application. The development-tool warning is retained explicitly;
no audit suppression or incompatible framework downgrade is applied. Linting
uses repository-controlled paths, and the standalone runtime must be checked
to confirm that this development chain is not included in the running server.

Sources:

- [Next.js ImageResponse advisory](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j)
- [Next.js 16.3.8 release](https://github.com/vercel/next.js/releases/tag/v16.3.8)
- [braces advisory and patched-version status](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)

## Release gate

The VPS release installs dependencies and runs the production audit before
stopping the serving process for the build. A registry outage or failing audit
at that stage stops the release while the previous standalone server remains
running. Existing production environment files are not changed.

Run the full audit separately when reviewing development tooling:

```sh
npm audit --registry=https://registry.npmjs.org
```

The production gate is a dependency advisory check, not a comprehensive
application-security assessment. Recheck the unresolved development chain
when an upstream patched package or compatible lint-plugin update is available.
