import os from 'os';
import chalk from 'chalk';
import { readFileSync } from 'fs';

console.log('Preparo chatunity-bot...')
import { join, dirname } from 'path'
import { createRequire } from "module";
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) 
const { name, author } = require(join(__dirname, './package.json')) 
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

say('ChatUnity\nBot', {
    font: 'chrome',
    align: 'center',
    gradient: ['red', 'magenta']})
    say(`da chatunity`, {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']})

var isRunning = false
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
if (isRunning) return
isRunning = true
let args = [join(__dirname, file), ...process.argv.slice(2)]

setupMaster({
exec: args[0],
args: args.slice(1), })
let p = fork()
p.on('message', data => {
console.log('[RECEIVED]', data)
switch (data) {
case 'reset':
p.process.kill()
isRunning = false
start.apply(this, arguments)
break
case 'uptime':
p.send(process.uptime())
break }})
p.on('exit', (_, code) => {
isRunning = false
console.error('Errore inaspettato', code)
  
p.process.kill()
isRunning = false
start.apply(this, arguments)
  
if (code === 0) return
watchFile(args[0], () => {
unwatchFile(args[0])
start(file)})})
let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
if (!opts['test'])
if (!rl.listenerCount()) rl.on('line', line => {
p.emit('message', line.trim())})}
start('main.js')

// Additional Information
const ramInGB = os.totalmem() / (1024 ** 3);
const freeRamInGB = os.freemem() / (1024 ** 3);
const packageJsonObj = JSON.parse(readFileSync(join(__dirname, './package.json'), 'utf8'));
const currentTime = new Date().toLocaleTimeString();

console.log(chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
console.log(chalk.blueBright('┊') + chalk.yellow(`🖥️ ${os.type()}, ${os.release()} - ${os.arch()}`));
console.log(chalk.blueBright('┊') + chalk.yellow(`💾 Total RAM: ${ramInGB.toFixed(2)} GB`));
console.log(chalk.blueBright('┊') + chalk.yellow(`💽 Free RAM: ${freeRamInGB.toFixed(2)} GB`));
console.log(chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
console.log(chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
console.log(chalk.blueBright('┊') + chalk.blue.bold(`🟢INFORMAZIONI :`));
console.log(chalk.blueBright('┊') + chalk.blueBright('┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
console.log(chalk.blueBright('┊') + chalk.cyan(`💚 Nome: ${packageJsonObj.name}`));
console.log(chalk.blueBright('┊') + chalk.cyan(`𓃠 Versione: ${packageJsonObj.version}`));
console.log(chalk.blueBright('┊') + chalk.cyan(`💜 Update: Entra nel nostro canale per ricevere aggiornamenti `));
console.log(chalk.blueBright('┊') + chalk.cyan(`💬 Autore del progetto: ChatUnity `));
console.log(chalk.blueBright('┊') + chalk.blueBright('┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
console.log(chalk.blueBright('┊') + chalk.yellow(`💜 Collaboratori: vale`));
console.log(chalk.blueBright('┊') + chalk.yellow(`Supporto: +8619858371809`));
console.log(chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
console.log(chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));
console.log(chalk.blueBright('┊') + chalk.cyan(`⏰ Ora attuale :`));
console.log(chalk.blueBright('┊') + chalk.cyan(`${currentTime}`));
console.log(chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅'));