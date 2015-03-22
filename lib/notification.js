var notifications = require("sdk/notifications");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var icon = self.data.url("img/v2ex.ico");
            
exports.notify = function(msg) {
    msg = JSON.parse(msg);
    notifications.notify({
        title: "温馨提示",
        iconURL: icon,
        text: msg.content,
        onClick: function () {
            tabs.open(msg.to);
        }
    });
}
    