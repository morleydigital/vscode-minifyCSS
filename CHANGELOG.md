# Changelog

All notable changes to the **minifyCSS** extension are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2]

### Fixed
- The published VSIX (and the VS Code **Details** tab) now uses the dedicated Marketplace README. Packaging is routed through `npm run package` / the release workflow so the `--readme-path README.vsce.md` flag is always applied.

## [1.1.1]

### Added
- Dedicated README for the VS Code Marketplace listing.

## [1.1.0]

### Added
- Option to select the cssnano preset (`default`, `advanced`, or `lite`) via the `minifycss.preset` setting.

## [1.0.0]

### Added
- Initial release.
- Minify the active CSS file via the **Minify Current CSS File** command.
- Automatic minification on save (`minifycss.minifyOnSave`: `No` / `Existing` / `All`).
- Optional source map generation (`minifycss.generateSourceMap`).
- Optional success notifications in the status bar and as information messages.
