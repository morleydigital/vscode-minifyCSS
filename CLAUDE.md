# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a VS Code extension that minifies CSS files using [cssnano](https://cssnano.github.io/cssnano/) (via PostCSS). The entire extension logic lives in a single file: `extension.js`.

## Commands

```bash
# Install dependencies
npm install

# Package as .vsix for distribution
npm install -g @vscode/vsce   # if not already installed
vsce package
```

There is no build step, test suite, or linter configured.

## Architecture

The extension is structured around two entry points registered in `activate()`:

1. **Manual command** (`minifycss.minify`) — reads the active editor's CSS document and minifies it.
2. **Save listener** (`onDidSaveTextDocument`) — runs minification automatically based on the `minifyOnSave` config setting (`No` / `Existing` / `All`).

Both call the shared `minify(document, showStatus)` function, which:
- Skips `.min.css` files and empty documents
- Reads configuration from `vscode.workspace.getConfiguration('minifycss')`
- Runs `postcss([cssnano({ preset: 'default' })])` on the document text
- Writes output to `<filename>.min.css` (and optionally `<filename>.min.css.map`)

### Extension settings (defined in `package.json` `contributes.configuration`)

| Setting | Type | Default | Description |
|---|---|---|---|
| `minifyOnSave` | enum | `"No"` | `"No"` / `"Existing"` / `"All"` |
| `generateSourceMap` | boolean | `false` | Writes a `.map` file and appends `sourceMappingURL` comment |
| `successNotificationStatusBar` | boolean | `false` | Status bar message on success |
| `successNotificationInformationMessage` | boolean | `false` | Info popup on success |

## Roadmap (from README)

1. Add option to select cssnano preset (currently hardcoded to `'default'`)
2. Bundle with webpack to support vscode.dev (currently uses CommonJS `require`)
