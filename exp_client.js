const { spawn } = require('child_process')
const yargs = require('yargs')
const path = require('path')
yargs
    .command(
        "start",
        "start",
        yargs => yargs,
        start
    )
    .demandCommand(1)
    .recommendCommands()
    .parse(process.argv.splice(2))

async function start() {
    const path1 = path.join(process.cwd(), 'apps', 'p2p', 'example', 'client', 'satu')
    const path2 = path.join(process.cwd(), 'apps', 'p2p', 'example', 'client', 'dua')

    const child1 = spawn('/bin/bash', ['-c', `serve -p 3011 -s ${path1}`])
    child1.stdout.on('data', (data) => {
        console.log("[client1]: " + data.toString())
    })

    const child2 = spawn('/bin/bash', ['-c', `serve -p 3012 -s ${path2}`])
    child2.stdout.on('data', (data) => {
        console.log("[client2]: ", data.toString())
    })
}