# minifyCSS

Minify CSS files in VS Code using [cssnano](https://cssnano.github.io/cssnano/) (via [PostCSS](https://postcss.org/)) — the same minifier used under the hood by webpack, Vite, and Parcel.

Minify the active file with a command, or enable automatic minification on save. Output is written to a `.min.css` file alongside the source, with optional source map generation.

## Features

- **One-command minification** of the active CSS file.
- **Minify on save** — automatically, for all files or only those that already have a `.min.css`.
- **Selectable cssnano preset** — `default`, `advanced`, or `lite`.
- **Source maps** — optionally emit a `.min.css.map` and a `sourceMappingURL` comment.
- Built on actively maintained, modern tooling (cssnano + PostCSS).

## Usage

- **Command palette** → `Minify Current CSS File` — minifies the currently open CSS file immediately.
- **On save** — set `minifycss.minifyOnSave` to minify automatically whenever a CSS file is saved.

Output is written to `<filename>.min.css` in the same directory. `.min.css` files are never re-processed.

## Settings

| Setting | Default | Description |
|---|---|---|
| `minifycss.minifyOnSave` | `"No"` | `"No"` — disabled; `"Existing"` — only if a `.min.css` already exists; `"All"` — always |
| `minifycss.preset` | `"default"` | cssnano preset: `"default"`, `"advanced"`, or `"lite"` (see below) |
| `minifycss.generateSourceMap` | `false` | Write a `.min.css.map` file and append a `sourceMappingURL` comment |
| `minifycss.successNotificationStatusBar` | `false` | Show a status bar message on success |
| `minifycss.successNotificationInformationMessage` | `false` | Show an info popup on success |

### cssnano presets

- **default** — safe optimisations suitable for most projects.
- **advanced** — more aggressive optimisations; may alter some CSS behaviour (e.g. colour conversion, selector merging).
- **lite** — minimal optimisations. Note: `cssnano-preset-lite` v5 is not officially compatible with cssnano v8 — use with caution.

## Source & issues

Source code, contributing guidelines, and issue tracker are on [GitHub](https://github.com/morleydigital/vscode-minifyCSS/).
