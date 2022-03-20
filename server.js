const game = require('./gameserver')
const writer1 = require("./modules/IMPmodules/writer.js");
const writer = new writer1();
console.log("\n\n\n\n\n\n\n\n\n\n\n")
srv = new game(6969)
process.stdin.resume();

function exitHandler(options, exitCode) {
    entities = srv.entities
    ws_new = srv.ws_new
    var string = "SERVER STOPPING/RESTARTING IN 3 SECONDS!"
    for (let da in entities) {
        if (entities[da].type == 2) {
            for (let bart in ws_new) {
                    ws_new[bart].send(writer.chat(entities[da].id, string))
            }
        }
    }
    var waitTill = new Date(new Date().getTime() + 3000);
    while(waitTill > new Date()){}
    console.log("stopping server")
    process.exit()
}

process.on('exit', exitHandler.bind(null,{cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));