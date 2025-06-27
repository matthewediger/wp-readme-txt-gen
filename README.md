# wp-readme-txt-gen

`wp-readme-txt-gen` is an npm module that converts your `README.md` and `CHANGELOG.md` files into a WordPress-style `readme.txt` file, perfect for WordPress plugins and themes.

## How It Works

This tool helps you maintain your documentation in standard Markdown format while automatically generating the WordPress-required `readme.txt` format. Here's the workflow:

1. **Write your documentation** in `README.md` using standard Markdown
2. **Track your changes** in `CHANGELOG.md` using standard changelog format
3. **Control your version** by including a "Stable tag" field in your README.md
4. **Run the tool** to automatically format and combine everything into `readme.txt`

The tool converts Markdown formatting to WordPress readme format:
- `# Heading` becomes `=== Heading ===`
- `## Heading` becomes `== Heading ==`
- `### Heading` becomes `= Heading =`
- `[link text](url)` becomes `link text (url)`
- Lists and other formatting are preserved

## WordPress readme.txt Structure

Your `README.md` should follow the standard WordPress readme.txt structure, but written in Markdown. Here's how to format it:

### Markdown Input (README.md):
```markdown
# Plugin Name

**Contributors:** username1, username2  
**Donate link:** https://example.com/  
**Tags:** tag1, tag2  
**Requires at least:** 4.7  
**Tested up to:** 5.4  
**Stable tag:** 4.3  
**Requires PHP:** 7.0  
**License:** GPLv2 or later  
**License URI:** https://www.gnu.org/licenses/gpl-2.0.html  

Here is a short description of the plugin. This should be no more than 150 characters. No markup here.

## Description

This is the long description. No limit, and you can use Markdown.

## Frequently Asked Questions

### A question that someone might have

An answer to that question.

### What about foo bar?

Answer to foo bar dilemma.

## Screenshots

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif)
2. This is the second screen shot

## Installation

1. Upload the plugin files to `/wp-content/plugins/plugin-name`
2. Activate the plugin through the 'Plugins' screen in WordPress
```

### WordPress Output (readme.txt):
```
=== Plugin Name ===
Contributors: username1, username2
Donate link: https://example.com/
Tags: tag1, tag2
Requires at least: 4.7
Tested up to: 5.4
Stable tag: 4.3
Requires PHP: 7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Here is a short description of the plugin. This should be no more than 150 characters. No markup here.

== Description ==

This is the long description. No limit, and you can use Markdown.

== Frequently Asked Questions ==

= A question that someone might have =

An answer to that question.

= What about foo bar? =

Answer to foo bar dilemma.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif)
2. This is the second screen shot

== Installation ==

1. Upload the plugin files to `/wp-content/plugins/plugin-name`
2. Activate the plugin through the 'Plugins' screen in WordPress

== Changelog ==
[Your CHANGELOG.md content will be automatically appended here]
```

**Key Points:**
- Use `**Field:** value` format for the header metadata
- The `**Stable tag:**` field is crucial for version management
- Your `CHANGELOG.md` will be automatically appended as the "Changelog" section
- Write everything else in standard Markdown format

## Installation

Install globally to use as a command-line tool:

```sh
npm install -g wp-readme-txt-gen
```

Or install locally in your project:

```sh
npm install wp-readme-txt-gen
```

## Usage

### Basic Usage

1. **Set up your files** in your WordPress plugin/theme directory:
   - `README.md` - Your main documentation
   - `CHANGELOG.md` - Your version history
   - `readmeConfig.json` - Configuration file (see below)

2. **Run the tool**:
   ```sh
   wp-readme-txt-gen
   ```

3. **Result**: A `readme.txt` file is generated combining your README and changelog in WordPress format.

### Configuration

Create a `readmeConfig.json` file in your project root:

```json
{
  "readmeMdPath": "README.md",
  "changelogMdPath": "CHANGELOG.md", 
  "readmeTxtPath": "readme.txt",
  "styleFiles": ["style.css", "style.scss"],
  "phpFiles": ["plugin.php"],
  "versionPattern": "Version",
  "versionReplacementPattern": "Version",
  "stableTagPattern": "Stable tag"
}
```

**Note:** If you don't have style files or PHP files in your project, you can exclude them from the configuration:

```json
{
  "readmeMdPath": "README.md",
  "changelogMdPath": "CHANGELOG.md", 
  "readmeTxtPath": "readme.txt",
  "styleFiles": [],
  "phpFiles": [],
  "versionPattern": "Version",
  "versionReplacementPattern": "Version",
  "stableTagPattern": "Stable tag"
}
```

### Version Management

Include a "Stable tag" field in your README.md to control versioning:

```markdown
**Stable tag:** 1.2.3
```

The tool will:
- Extract this version number
- Update version numbers in your CSS/SCSS files
- Update version numbers in your PHP files
- Use it in the generated readme.txt

### Command Line Options

- `wp-readme-txt-gen` - Generate readme.txt
- `wp-readme-txt-gen --version` or `-v` - Show version number

## Example

Starting with this structure:
```
my-plugin/
├── README.md
├── CHANGELOG.md
├── readmeConfig.json
├── style.css
└── plugin.php
```

After running `wp-readme-txt-gen`, you'll have:
```
my-plugin/
├── README.md
├── CHANGELOG.md
├── readmeConfig.json
├── style.css
├── plugin.php
└── readme.txt  ← Generated WordPress readme
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the ISC License.