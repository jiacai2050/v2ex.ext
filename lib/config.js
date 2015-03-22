const config = require("sdk/simple-prefs");
const prefs = config.prefs;

exports.checkInterval = function(worker) {
    config.on("checkInterval", function(prefName) {
        worker.port.emit('checkInterval', prefs[prefName]);
    });    
}
