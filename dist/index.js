#!/usr/bin/env node
import chalk from 'chalk';
import ora from 'ora';
import { resolve as resolvePath } from 'path';
import { exec } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { emptyDirSync } from 'fs-extra';
// PassKit
import passkit from 'passkit-generator';
const PKPass = passkit.PKPass;
// Utilities
import log from './utils/log.js';
import fetchImage from './utils/fetchImage.js';
// Command-line arguments
const [configFilePath, openAfterCompletion] = process.argv.splice(2);
// Display program title
console.log(chalk.cyan('============================'));
console.log(chalk.cyan('=  Personal Wallet Passes  ='));
console.log(chalk.cyan('============================'));
console.log('');
// Check for missing arguments
if (!configFilePath) {
    console.error(log.error('No configuration file was given as an argument'));
    console.error(chalk.red('Usage: node . <template-file-path.json>'));
    process.exit(1);
}
// Load requested config file
let passConfig;
try {
    passConfig = JSON.parse(readFileSync(configFilePath, 'utf8'));
}
catch (error) {
    console.error(error);
    console.error('');
    console.error(log.error(`Could not load config file: "${configFilePath}"`));
    console.error(chalk.red('Make sure that the file contains a valid JSON object'));
    process.exit(1);
}
// Display status indicator
const spinner = await ora('Creating pass (this may take a few seconds)...').start();
// Clear pass model of old assets
emptyDirSync('./src/template.pass');
// Verify coupon data source is present
if (passConfig.source.length && passConfig.out.length) {
    const imageFiles = ['icon', 'logo', 'strip', 'thumbnail', 'background'];
    // Prepare requested images
    for (const image of imageFiles) {
        if (passConfig.assets[image])
            await fetchImage(resolvePath(passConfig.source, `assets/${image}.png`), `${image}@3x.png`);
    }
}
else {
    console.error(log.error('You must provide a source path: eg. "./fakepath/pass_data/" and out path: eg. "./fakepath/pass.pkpass"'));
    process.exit(1);
}
// Load certificates
const wwdr = readFileSync(resolvePath(passConfig.source, 'certs/wwdc/AppleWWDRCAG4.pem'));
const signerCert = readFileSync(resolvePath(passConfig.source, 'certs/signer/signerCert.pem'));
const signerKey = readFileSync(resolvePath(passConfig.source, 'certs/signer/signerKey.pem'));
const signerKeyPassphrase = readFileSync(resolvePath(passConfig.source, 'certs/signer/passphrase.txt'), 'utf8');
// Create pass base
const pass = await PKPass.from({
    model: './src/template.pass',
    certificates: {
        wwdr,
        signerCert,
        signerKey,
        signerKeyPassphrase
    }
});
// Add provided data to pass
pass.addBuffer('pass.json', Buffer.from(JSON.stringify(passConfig.model)));
// Save response
writeFileSync(passConfig.out, pass.getAsBuffer());
// Update status indicator
spinner.succeed(`Your pass has been saved to "${passConfig.out}"`);
// Clear pass model of old assets
emptyDirSync('./src/template.pass');
// Open exported file after completion
if (openAfterCompletion === 'true') {
    exec(`open ${passConfig.out}`);
}
