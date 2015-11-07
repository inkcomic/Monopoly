/**
 * Created by bin on 2015/10/18.
 */

//返回今天开始/结束时间
function getNowFormatDate(isBegin) {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var timePart ;
    if(isBegin) {
        timePart = "00:00:00";
    }
    else {
        timePart = "23:59:59";
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + timePart;
    return currentdate;
}

var MainGameUI = cc.Layer.extend({
    btnProfileName:null,
    btnLogout:null,
	
	btnLeaderBoard:null,
	btnEveryQuest:null,
	btnNearPlayer:null,
	btnRecharge:null,
    labelMoney:null,
    btnEverySign:null,
    btnMoneyRank:null,
    btnBigRecharge:null,
    ctor : function () {
        this._super();
        var widgetSize = this.getContentSize();

        // Create the imageview
        var imageView = new ccui.ImageView("res/cocosui/b11.png");
        imageView.x = widgetSize.width / 2;
        imageView.y = widgetSize.height / 2 + imageView.height / 4;
        imageView.setOpacity(100);
        this.addChild(imageView);

    },
    onEnter : function () {
        this._super();

        this.initBriefProfile();

        this.DoUpdateProfile(function (profileObj){

            this.initProfileUI();

        }, this);
    },
    initProfileUI:function(){
        var nick = gGameData.profileInfo.nickName;
        var money = gGameData.profileInfo.money;
        var lastEverydaySign = new Date(gGameData.profileInfo.lastEverydaySign.iso);

        if(nick==null||money==null||lastEverydaySign==null)
            return;
        var name= "<" + nick + ">";

        var widgetSize = this.getContentSize();


        if(this.btnProfileName!=null){
            this.removeChild(this.btnProfileName);
            this.btnProfileName=null;
        }
        // Create the profile button
        this.btnProfileName = new ccui.Button();
        this.btnProfileName.setTouchEnabled(true);
        this.btnProfileName.setTitleText(name);
        this.btnProfileName.setColor(cc.color.YELLOW);
        this.btnProfileName.setTitleFontSize(24);
        this.btnProfileName.x = this.btnProfileName.width;
        this.btnProfileName.y = widgetSize.height - this.btnProfileName.height;
        this.addChild(this.btnProfileName);


        if(this.btnLogout!=null){
            this.removeChild(this.btnLogout);
            this.btnLogout=null;
        }
        // Create the profile button
        this.btnLogout = new ccui.Button();
        this.btnLogout.setTouchEnabled(true);
        this.btnLogout.setTitleText("登出");
        this.btnLogout.setColor(cc.color.YELLOW);
        this.btnLogout.setTitleFontSize(20);
        this.btnLogout.x = this.btnProfileName.x +200+ this.btnProfileName.width + this.btnLogout.width;
        this.btnLogout.y = widgetSize.height - this.btnLogout.height;
        this.btnLogout.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.DoLogout();
                    break;
            }
        }, this);
        this.addChild(this.btnLogout);

        // lableMoney label
        if(this.labelMoney!=null){
            this.removeChild(this.labelMoney);this.labelMoney=null;
        }
        this.labelMoney = new ccui.Text();
        this.labelMoney.string = "金币：" + money;
        this.labelMoney.setColor(cc.color.YELLOW);
        this.labelMoney.fontSize = 18;
        var xAccount = this.labelMoney.width/2;
        var yAccount = this.btnLogout.y - this.labelMoney.height;
        this.labelMoney.x = xAccount;
        this.labelMoney.y = yAccount;
        xAccount += this.labelMoney.width/2;
        this.addChild(this.labelMoney);


        //check Signed Status
        var dateTodayBeginSecond = (new Date(getNowFormatDate(true))).getTime();
        var dateTodayEndSecond = (new Date(getNowFormatDate(false))).getTime();
        var lastSignDateSecond = lastEverydaySign.getTime();
        var isSigned = false;
        if((dateTodayBeginSecond <= lastSignDateSecond) &&
            (dateTodayEndSecond >= lastSignDateSecond))
            isSigned = true;
        else
            isSigned = false;

        if(this.btnEverySign!=null){
            this.removeChild(this.btnEverySign);
            this.btnEverySign=null;
        }
        // Create the profile button
        this.btnEverySign = new ccui.Button();
        this.btnEverySign.setBright(!isSigned);
        this.btnEverySign.setEnabled(!isSigned);
        this.btnEverySign.setTouchEnabled(!isSigned);
        this.btnEverySign.setTitleText("每日签到");
        this.btnEverySign.setColor(isSigned?cc.color.GRAY:cc.color.YELLOW);
        this.btnEverySign.setTitleFontSize(20);
        this.btnEverySign.x = this.btnProfileName.x +100+ this.btnProfileName.width + this.btnEverySign.width;
        this.btnEverySign.y = widgetSize.height - this.btnEverySign.height;
        this.btnEverySign.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.DoEveryDaySign();
                    break;
            }
        }, this);
        this.addChild(this.btnEverySign);

        if(this.btnMoneyRank!=null){
            this.removeChild(this.btnMoneyRank);
            this.btnMoneyRank=null;
        }
        // Create the profile button
        this.btnMoneyRank = new ccui.Button();
        this.btnMoneyRank.setBright(!isSigned);
        this.btnMoneyRank.setEnabled(!isSigned);
        this.btnMoneyRank.setTouchEnabled(!isSigned);
        this.btnMoneyRank.setTitleText("中国富豪榜");
        this.btnMoneyRank.setColor(isSigned?cc.color.GRAY:cc.color.YELLOW);
        this.btnMoneyRank.setTitleFontSize(26);
        this.btnMoneyRank.x = this.btnProfileName.x +100+ this.btnProfileName.width + this.btnMoneyRank.width;
        this.btnMoneyRank.y = this.btnEverySign.y - this.btnEverySign.height - this.btnMoneyRank.height;
        this.btnMoneyRank.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.DoGlobalMoneyRank();
                    break;
            }
        }, this);
        this.addChild(this.btnMoneyRank);

        //recharge
        if(this.btnBigRecharge!=null){
            this.removeChild(this.btnBigRecharge);
            this.btnBigRecharge=null;
        }
        // Create the profile button
        this.btnBigRecharge = new ccui.Button();
        this.btnBigRecharge.setBright(true);
        this.btnBigRecharge.setEnabled(true);
        this.btnBigRecharge.setTouchEnabled(true);
        this.btnBigRecharge.setTitleText("充值");
        this.btnBigRecharge.setColor(cc.color.YELLOW);
        this.btnBigRecharge.setTitleFontSize(180);
        this.btnBigRecharge.x = widgetSize.width/2;
        this.btnBigRecharge.y = widgetSize.height/2 - this.btnBigRecharge.height;
        this.btnBigRecharge.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                        this.DoBuyGold();
                    break;
            }
        }, this);
        this.addChild(this.btnBigRecharge);
    },
    initBriefProfile:function(){

        //update data
        var ProfileName="";
        var currentUser = Bmob.User.current();
        if (currentUser) {
            ProfileName ="你好:"+ currentUser.get("username");
            this.initProfileUI(ProfileName,0);
        } else {
            this.initProfileUI(ProfileName,0);
        }


    },
    DoLogout:function(){
        Bmob.User.logOut();
        var currentUser = Bmob.User.current();  // this will now be null

        gMainLayer.switchToUI(layers.login_ui);
    },
    DoEveryDaySign:function(){
        var self = this;
        var currentUser = Bmob.User.current();  // this will now be null
        var oldMoney = gGameData.profileInfo.money;
        Bmob.Cloud.run('EveryDaySign', {"uid":currentUser.id}, {
            success: function(result) {
                var resultObject= JSON.parse(result);
                if(!resultObject.error) {
                    //update profile info /profile UI
                    gGameData.setProfileInfo(resultObject.results[0]);


                    var getMoney = gGameData.profileInfo.money -oldMoney;
                    gPopDialogMgr.DoOkDlg(self,"恭喜你获得("+getMoney+")金币","确定",function(){

                            self.initProfileUI();
                        }
                    );
                }
            },
            error: function(error) {
            }
        });
    },
    DoBuyGold:function(){
        var self = this;

        //disable buy
        self.btnBigRecharge.setBright(false);
        self.btnBigRecharge.setEnabled(false);
        self.btnBigRecharge.setTouchEnabled(false);
        self.btnBigRecharge.setColor(cc.color.GRAY);

        var currentUser = Bmob.User.current();  // this will now be null
        var oldMoney = gGameData.profileInfo.money;
        Bmob.Cloud.run('BuyGold', {"uid":currentUser.id,"goldAmount":1}, {
            success: function(result) {
                var resultObject= JSON.parse(result);
                if(!resultObject.error) {
                    //update profile info /profile UI
                    gGameData.setProfileInfo(resultObject.results[0]);

                    var getMoney = gGameData.profileInfo.money - oldMoney;
                    gPopDialogMgr.DoOkDlg(self,"恭喜你购买获得("+getMoney+")金币","确定",function(){
                            self.initProfileUI();

                            //disable buy
                            self.btnBigRecharge.setBright(true);
                            self.btnBigRecharge.setEnabled(true);
                            self.btnBigRecharge.setTouchEnabled(true);
                            self.btnBigRecharge.setColor(cc.color.YELLOW);
                        }
                    );
                }
            },
            error: function(error) {
            }
        });
    },
    DoUpdateProfile:function(selector,target){
        var currentUser = Bmob.User.current();

        //call back function
        var _EventCallback=null;
        var _EventListener=null;
        var _EventSelector=null;

        if(target === undefined)
            _EventCallback = selector;
        else {
            _EventSelector = selector;
            _EventListener = target;
        }

        if (currentUser) {
            Bmob.Cloud.run('GetProfile', {"uid":currentUser.id}, {
                success: function(result) {
                    var resultObject= JSON.parse(result);
                    if(!resultObject.error) {
                        gGameData.setProfileInfo(resultObject.results[0]);

                        if (_EventCallback)
                            _EventCallback(resultObject.results[0]);
                        if (_EventListener && _EventSelector)
                            _EventSelector.call(_EventListener,resultObject.results[0]);
                    }
                },
                error: function(error) {
                }
            });


        }
    },
    DoGlobalMoneyRank:function(selector,target){
        var layer = new GlobalMoneyRank();
        this.addChild(layer);
    }
});