# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2026-02-24

### Fixed

- Link renderer updated for marked v5+ API (single token object instead of positional params) — fixes `undefined ([object Object])` output
- Bare URL autolinks no longer duplicate as `url (url)`
- Stable tag regex now tolerates `**bold**` wrapping in README.md header fields

### Added

- Code block support (4-space indented output)
- Ordered list support (numbered bullets instead of always `*`)
- Inline `<code>` rendering via custom `codespan` renderer
- `<em>` and `<strong>` inline renderers (strong strips to plain text for WordPress readme.txt compatibility)
- Pass-through for raw HTML blocks and horizontal rules

## [1.5.0] - 2025-06-27

### Added

- Added --version and -v command line flags to display package version.

## [1.4.1] - 2025-06-27

### Fixed

- Added regex to change markdown headings 1 & 2.

## [1.4.0] - 2024-11-25

### Changed

- Changed regex in `updateStyleFiles` to account for spaces.

## [1.3.0] - 2024-11-24

### Changed

- Changed tag number to match npm version number.

## [1.2.0] - 2024-11-25

### Changed

- Changed `index.js` to update styles and php files in separate functions.
- Renamed `sample-readmeConfig.json`.

## [1.1.1] - 2024-10-16

### Changed

- Changed regex to include themes and plugins.

## [1.1.0] - 2024-10-15

### Changed

- Changed `/bin/` command name.

## [1.0.0] - 2024-10-15

### Added

- Initial release of the project.
- `index.js` file to handle the main logic.
- `CHANGELOG.md` to document changes.
- `README.md` to provide an overview and instructions.