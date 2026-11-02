# JS / HTML Obfuscator

A single-file, 100% client-side obfuscator for JavaScript and HTML. Everything runs
in the browser — your code is never uploaded anywhere. Built on the Babel parser so
transforms operate on a real AST and won't silently corrupt valid code.

## What it does

- **Rename local variables** — vars, params and functions inside scopes get short hex names.
- **Rename top-level names** *(optional, risky)* — also renames globals. Breaks anything
  called from HTML (`onclick="foo()"`) or imported by other files.
- **Encode strings** — every string literal is XOR'd with a random key, base64-encoded,
  and moved into a shuffled lookup table reached through a decoder function.
- **Encode numbers** — integer literals become XOR expressions, e.g. `255` → `(838 ^ 549)`.
- **Inject junk / dead code** — adds unreachable branches (guarded by an always-false,
  non-foldable predicate) and unused functions to pad and confuse the output.
- **Minify / compact** — strips comments and whitespace.
- **Wrap in a self-executing function** *(optional)* — hides the top-level scope.
- **Self-defending** *(optional)* — traps debuggers (`debugger` on an interval) and
  self-destructs (stack overflow) if the code is ever beautified/reformatted.
  Apply it **last** and never reformat the output afterward, or it will break itself.

All transforms are **CSP-safe** (no `eval` / `new Function`), so the output runs inside
Manifest V3 Chrome/Edge extensions without triggering the extension CSP.

### Presets & in-app help

- **Presets** — one click sets a sensible combination:
  - **Light** — rename locals + minify. Fast, lowest risk.
  - **Recommended** — rename locals + encode strings + encode numbers + minify (the default). Strong, very low breakage risk.
  - **Maximum** — Recommended + junk/dead code + self-defending. Hardest to read, larger output; don't reformat it afterward. (Leaves the break-prone *rename globals* and *IIFE* off.)
- **ⓘ on every option** — opens a detailed explanation of what it does.
- **Confirmation pop-up** — switching on any option that's off by default shows a dialog explaining it (and its caveats) before it's enabled.
- **HTML mode** — obfuscates JS inside inline `<script>` tags; leaves markup and
  external (`src=`) scripts untouched.

## Important: what obfuscation is *not*

Obfuscation makes code **tedious** to read, not impossible. Any code that runs in a
browser can be beautified, stepped through in DevTools, and reverse-engineered.

**Do not put secrets in client-side code** — API keys, passwords, and tokens must live
on a server, not in JS you ship to users, obfuscated or not.

## Host it on GitHub Pages

1. Create a repository and add `index.html` to it.
2. Push to GitHub.
3. In the repo: **Settings → Pages → Source → Deploy from a branch**, pick your branch
   and the root folder, then **Save**.
4. It goes live at `https://<your-username>.github.io/<repo-name>/`.

## Use it locally

Just open `index.html` in any modern browser — no build step, no server needed.
