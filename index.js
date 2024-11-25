#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Load configuration from readmeConfig.json
async function loadConfig() {
    const configPath = path.resolve(process.cwd(), 'readmeConfig.json');
    const config = JSON.parse(await fs.promises.readFile(configPath, 'utf8'));
    return config;
}

// Functions (reusable and modular)
async function readFileContent(filePath) {
    return fs.promises.readFile(filePath, 'utf8');
}

function markdownToWordPressFormat(content) {
    return content
        .replace(/^### (.*$)/gim, '= $1 =')
        .replace(/^\* (.*$)/gim, '* $1')
        .replace(/\[([^\[]+)\]\(([^\)]+)\)/gim, '$1 ($2)');
}

function removeFirstH1(content) {
    return content.replace(/^# .*\n/, '');
}

async function updateStyleFiles(version, styleFiles, versionPattern) {
    const versionRegex = new RegExp(`(${versionPattern})\\s*:\\s(\\s*)\\d+\\.\\d+\\.\\d+`, 'm');
    for (const file of styleFiles) {
        try {
            const content = await readFileContent(file);
            console.log(`Original content of ${file}:\n${content}`);
            const updatedContent = content.replace(versionRegex, `$1: $2${version}`);
            console.log(`Updated content of ${file}:\n${updatedContent}`);
            await fs.promises.writeFile(file, updatedContent, 'utf8');
            console.log(`${file} updated with version ${version}`);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error(`File not found: ${file}`);
            } else {
                console.error(`Error updating ${file}:`, error);
            }
        }
    }
}

async function updatePhpFiles(version, phpFiles) {
    const versionRegexDocblock = new RegExp(`(Version:)\\s(\\s*)\\d+\\.\\d+\\.\\d+`, 'm');
    const versionRegexDefine = new RegExp(`(define\\(\\s*'\\w+_VERSION',\\s*')\\d+\\.\\d+\\.\\d+(' \\);)`, 'm');
    for (const file of phpFiles) {
        try {
            const content = await readFileContent(file);
            console.log(`Original content of ${file}:\n${content}`);
            let updatedContent = content.replace(versionRegexDocblock, `$1 $2${version}`);
            updatedContent = updatedContent.replace(versionRegexDefine, `$1${version}$2`);
            console.log(`Updated content of ${file}:\n${updatedContent}`);
            await fs.promises.writeFile(file, updatedContent, 'utf8');
            console.log(`${file} updated with version ${version}`);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error(`File not found: ${file}`);
            } else {
                console.error(`Error updating ${file}:`, error);
            }
        }
    }
}

async function generateReadme() {
    try {
        const config = await loadConfig();

        const [readmeContent, changelogContent] = await Promise.all([
            readFileContent(config.readmeMdPath),
            readFileContent(config.changelogMdPath),
        ]);

        const stableTagRegex = new RegExp(`${config.stableTagPattern}\\s*:\\s*(\\d+\\.\\d+\\.\\d+)`, 'm');
        const stableTagMatch = readmeContent.match(stableTagRegex);
        const version = stableTagMatch ? stableTagMatch[1] : '0.1.0';
        console.log(`Extracted Stable tag version: ${version}`);

        const readmeFormatted = markdownToWordPressFormat(readmeContent);
        const changelogFormatted = markdownToWordPressFormat(removeFirstH1(changelogContent));
        const fullContent = `${readmeFormatted}\n\n== Changelog ==\n${changelogFormatted}`;

        await fs.promises.writeFile(config.readmeTxtPath, fullContent, 'utf8');
        console.log(`Generated ${config.readmeTxtPath}`);

        await updateStyleFiles(version, config.styleFiles, config.versionReplacementPattern);
        await updatePhpFiles(version, config.phpFiles);
    } catch (error) {
        console.error('Error in generating README.txt or updating style files:', error);
    }
}

// Execute when run from the command line
if (require.main === module) {
    (async () => {
        await generateReadme();
    })();
}
