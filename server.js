const game = require('./gameserver')
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

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
