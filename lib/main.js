var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var notification = require("./notification");
var config = require("./config");

pageMod.PageMod({
    include: "*.v2ex.com", 
    contentScriptFile: [
        data.url("js/jquery-2.1.1.min.js"), 
        data.url("js/jquery.powertip.min.js"), 
        data.url("js/v2ex-ext.js"),
        data.url("js/cookie.js"),
        data.url("js/notification.js")
    ],
    contentStyleFile: [
        data.url("css/jquery.powertip.min.css"),
        data.url("css/v2ex.ext.css")
    ],
    onAttach: function(worker) {
        worker.port.on('new-msg', function(msg) {
            notification.notify(msg);
        });
        config.checkInterval(worker);
    }
});
