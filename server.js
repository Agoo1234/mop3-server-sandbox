const { exec } = require("child_process");
const fs = require('fs')
const game = require('./gameserver')
const os = require('os')
console.log("\n\n\n\n\n\n\n\n\n\n\n")
srv = new game(6969)
var restart = true;
setInterval(function () {
    var used = process.memoryUsage().heapUsed / 1024 / 1024;
    usage = `${new Date}     Memory: ${Math.round(used * 100) / 100} MB     CPU Load: ${Math.round(100*os.loadavg()[0])/100}     Players: ${srv.countPlayers()}\n\n`
    fs.writeFile('./memory.txt', usage, { flag: 'a+' }, err => {
        if (err) {
            console.error(err)
            return
        }
    })
  }, 300000);

setInterval(function () {
    if (restart) {
        exec("pm2 restart DeployServer", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }
}, 14400);