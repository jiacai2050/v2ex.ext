var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
    include: "*.v2ex.com", 
    contentScriptFile: [
        data.url("js/jquery-2.1.1.min.js"), 
        data.url("js/jquery.powertip.min.js"), 
        data.url("js/v2ex.ext.js")
    ],
    contentStyleFile: [
        data.url("css/jquery.powertip.min.css"),
        data.url("css/v2ex.ext.css")
    ]
});
