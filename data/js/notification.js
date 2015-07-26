(function() {

    var homepageURL = window.location.protocol + "//" + window.location.hostname;
    var currentURL = window.location.toString();

    function  getInterval() {
        var interval = localStorage.getItem("checkInterval") || 10;
        return parseInt(interval) * 1000 * 60;
    }

    function checkNewMessage(feed, callback) {
        $.ajax({
            url: feed,
            dataType: "html",
            success: function(html) {
                var unread = $("a[href='/notifications']", html)[0].innerHTML;
                unread = /\d+/.exec(unread)[0];
                if (unread > 0) {
                    var msg = {
                        to: homepageURL + "/notifications",
                        content: "您有" + unread + "条新消息"
                    }
                    self.port.emit("new-msg", JSON.stringify(msg));   
                }
            }
        });   
    }

    function getNotification() {
        $.ajax({
            url: homepageURL, 
            dataType: "html",
            success: function(html) {
                var signinInput = $("a[href='/signin']", html);
                if (signinInput && signinInput.length && signinInput.length > 0 && ! currentURL.contains("v2ex.com/signin")) {
                    var msg = {
                        to: homepageURL + "/signin",
                        content: "您还没有登录呢"
                    };
                    self.port.emit("new-msg", JSON.stringify(msg));   
                } else {
                    if (! currentURL.contains("v2ex.com/notifications")) {
                        checkNewMessage(homepageURL);    
                    };
                    
                }
            }
        });
        setTimeout(getNotification, getInterval());
    }
        
    function init() {
        var flag = sessionStorage.getItem("v2ex.ext.isStarted") || false;
        flag = JSON.parse(flag);
        if (! flag ) {
            sessionStorage.setItem("v2ex.ext.isStarted", true);
            getNotification();
        };
    }
    init();

    //监听checkInterval；如改变，覆盖之前的值。
    self.port.on("checkInterval", function(interval) {
        localStorage.setItem("checkInterval", interval);
    });

})();
