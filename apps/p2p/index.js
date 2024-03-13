const yargs = require('yargs')
const {main} = require('./server/main')

async function p2p() {
    yargs
        .command(
            "start",
            "start",
            yargs => yargs
                .option("port", { type: "number", default: 9000 }),
            async (argv) => {
                await main(argv.port)
            }
        )
        .demandCommand(1)
        .recommendCommands()
        .parse(process.argv.slice(2))
}

module.exports = p2p