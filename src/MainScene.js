var layers={};
var currentUI=null;
var MainLayer = cc.Layer.extend({
    helloLabel:null,
    sprite:null,
    BAppID:"30cafee68a87f5dfbe3630fd072c259b",
    BRestAPIID:"66e637d0adb45aaee9faf46ee5f13a67",
    init:function () {
        var self = this;

        Bmob.initialize(this.BAppID,this.BRestAPIID);

        this._super();

        var size = cc.director.getWinSize();

        this.setupUI();



        self.autoSwitch();



    },
    setupUI:function(){
        layers.login_ui = new LoginUI();
        layers.regisiter_ui = new RegisiterUI();
        layers.maingame_ui = new MainGameUI();
    },
    autoSwitch:function(){
        var self = this;
        //if already logged in
        var currentUser = Bmob.User.current();
        if (currentUser) {
			
			//try ensure all tables
			Bmob.Cloud.run('EnsureAllTables', {"uid":currentUser.id}, {
                success: function(result) {
                    var resultObject= JSON.parse(result);
                    if(!resultObject.error){
                        //try get profile data
                        Bmob.Cloud.run('GetProfile', {"uid":currentUser.id}, {
                            success: function(result) {
                                var resultObject= JSON.parse(result);
                                if(!resultObject.error) {
                                  //  alert(resultObject.results[0].nickName);
                                    gGameData.setProfileInfo(resultObject.results[0]);
                                    self.switchToUI(layers.maingame_ui);
                                }
                            },
                            error: function(error) {
                            }
                        });
                    }
                    else{
                        alert(resultObject.error);
                        self.switchToUI(layers.maingame_ui);
                    }

                },
                error: function(error) {
                }
            });

        } else {
            Bmob.User.logOut();
            gMainLayer.switchToUI(layers.login_ui);
        }
    },
    switchToUI:function(goToUI){
        if(currentUI!=null){
            currentUI.removeFromParent();
        }
        currentUI = goToUI;
        this.addChild(currentUI);
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


var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gGameData = new GameData();
        gMainLayer = new MainLayer();
        this.addChild(gMainLayer);
        gMainLayer.init();
    }
});


var gMainLayer=null;
var gMainScene=null;
var gGameData=null;