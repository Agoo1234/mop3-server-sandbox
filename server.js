const fs = require('fs')
const game = require('./gameserver')
console.log("\n\n\n\n\n\n\n\n\n\n\n")
srv = new game(6969)
setInterval(function () {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    usage = `${new Date}     Usage: ${Math.round(used * 100) / 100} MB     Players: ${srv.countPlayers()}\n\n`
    fs.writeFile('./memory.txt', usage, { flag: 'a+' }, err => {
        if (err) {
            console.error(err)
            return
        }
    })
  }, 300000);