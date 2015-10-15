var     layers={};
var MyLayer = cc.Layer.extend({
    helloLabel:null,
    sprite:null,
    BAppID:"982ca10ccd64ffdbcfa0c8fe958c5f5d",
    BRestAPIID:"4355fa7993a2d34b0eb1dba8d2e3c82e",
    init:function () {

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.director.getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
    //    var closeItem = new cc.MenuItemImage(
    //       s_CloseNormal,
    //        s_CloseSelected,
    //        function () {
    //            cc.log("close");
    //        },this);
    //    closeItem.setAnchorPoint(0.5, 0.5);

    //    var menu = new cc.Menu(closeItem);
    //    menu.setPosition(0, 0);
     //   this.addChild(menu, 1);
    //    closeItem.setPosition(size.width - 20, 20);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
    //    this.helloLabel = new cc.LabelTTF("Hello World", "Impact", 38);
        // position the label on the center of the screen
    //    this.helloLabel.setPosition(size.width / 2, size.height - 40);
        // add the label as a child to this layer
    //    this.addChild(this.helloLabel, 5);

        // add "Helloworld" splash screen"
    //    this.sprite = new cc.Sprite(s_HelloWorld);
    //    this.sprite.setAnchorPoint(0.5, 0.5);
    //    this.sprite.setPosition(size.width / 2, size.height / 2);
    //    this.sprite.setScale(size.height / this.sprite.getContentSize().height);
    //    this.addChild(this.sprite, 0);

    //   this.PostDailyScore();
        //this.httpGetTest();
        //this.httpPostTest();
        layers.login_ui = new LoginUI();
        this.addChild(layers.login_ui);

    },
    PostDailyScore:function(){
        var winSize = cc.director.getWinSize();
        var self = this;
        var xhr = cc.loader.getXMLHttpRequest();

        xhr.open("POST", "https://api.bmob.cn/1/functions/testFuncCall");

        xhr.setRequestHeader("Access-Control-Allow-Origin","*");
        xhr.setRequestHeader("X-Bmob-Application-Id",this.BAppID);
        xhr.setRequestHeader("X-Bmob-REST-API-Key",this.BRestAPIID);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText.substring(0, 100) + "...";
               // var responseLabel = new cc.LabelTTF("POST Response (100 chars):  \n" + response, "Thonburi", 16);
               // self.addChild(responseLabel, 1);
                //responseLabel.anchorX = 0;
               // responseLabel.anchorY = 1;
               // responseLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;

               // responseLabel.x = winSize.width / 10 * 3;
              // responseLabel.y = winSize.height / 2;
            //    statusPostLabel.setString("Status: Got POST response! " + httpStatus);
            }
        };
        xhr.send("{}");
    },

    httpGetTest :function(){
        var winSize = cc.director.getWinSize();
        var self = this;

        var xhr = cc.loader.getXMLHttpRequest();
        var statusGetLabel = new cc.LabelTTF("Status:", "Impact", 18);
        this.addChild(statusGetLabel, 1);
        statusGetLabel.x = winSize.width / 2;
        statusGetLabel.y = winSize.height - 100;
        statusGetLabel.setString("Status: Send Get Request to httpbin.org");
        //set arguments with <URL>?xxx=xxx&yyy=yyy
        xhr.open("GET", "http://httpbin.org/get?show_env=1", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText.substring(0, 100) + "...";
                var responseLabel = new cc.LabelTTF("GET Response (100 chars): \n" + response, "Impact", 16);
                self.addChild(responseLabel, 1);
                responseLabel.anchorX = 0;
                responseLabel.anchorY = 1;
                responseLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;

                responseLabel.x = 10;
                responseLabel.y = winSize.height / 2;
                statusGetLabel.setString("Status: Got GET response! " + httpStatus);
            }
        };
        xhr.send();
    },
    httpPostTest:function()
    {
        var winSize = cc.director.getWinSize();
        var self = this;
                var xhr = cc.loader.getXMLHttpRequest();
        var statusPostLabel = new cc.LabelTTF("Status:", "Thonburi", 18);
        this.addChild(statusPostLabel, 1);

        statusPostLabel.x = winSize.width / 2;

        statusPostLabel.y = winSize.height - 140;
        statusPostLabel.setString("Status: Send Post Request to httpbin.org with plain text");

        xhr.open("POST", "http://httpbin.org/post");
        //set Content-type "text/plain;charset=UTF-8" to post plain text
        xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText.substring(0, 100) + "...";
                var responseLabel = new cc.LabelTTF("POST Response (100 chars):  \n" + response, "Thonburi", 16);
                self.addChild(responseLabel, 1);
                responseLabel.anchorX = 0;
                responseLabel.anchorY = 1;
                responseLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;

                responseLabel.x = winSize.width / 10 * 3;
                responseLabel.y = winSize.height / 2;
                statusPostLabel.setString("Status: Got POST response! " + httpStatus);
            }
        };
        xhr.send("plain text message");
    }
});


var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
