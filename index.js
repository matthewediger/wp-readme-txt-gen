#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Load configuration from config.json
async function loadConfig() {
    const configPath = path.resolve(process.cwd(), 'config.json');
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
    const versionRegex = new RegExp(`(${versionPattern})\\s*:\\s*\\d+\\.\\d+\\.\\d+`, 'm');
    for (const file of styleFiles) {
        try {
            const content = await readFileContent(file);
            const updatedContent = content.replace(versionRegex, `$1: ${version}`);
            await fs.promises.writeFile(file, updatedContent, 'utf8');
            console.log(`${file} updated with version ${version}`);
        } catch (error) {
            console.error(`Error updating ${file}:`, error);
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

        const version = (readmeContent.match(new RegExp(config.versionPattern, 'm')) || [])[1] || '1.0';

        const readmeFormatted = markdownToWordPressFormat(readmeContent);
        const changelogFormatted = markdownToWordPressFormat(removeFirstH1(changelogContent));
        const fullContent = `${readmeFormatted}\n\n== Changelog ==\n${changelogFormatted}`;

        await fs.promises.writeFile(config.readmeTxtPath, fullContent, 'utf8');
        console.log(`Generated ${config.readmeTxtPath}`);

        await updateStyleFiles(version, config.styleFiles, config.versionReplacementPattern);
    } catch (error) {
        console.error('Error in generating README.txt or updating style files:', error);
    }
}

// Execute when run from the command line
if (require.main === module) {
    generateReadme();
}

// Export functions for reuse
module.exports = { generateReadme, updateStyleFiles, markdownToWordPressFormat };
