/**
 * Created by bin on 2015/10/18.
 */

var MainGameUI = cc.Layer.extend({
    btnProfileName:null,
    btnLogout:null,
	
	btnLeaderBoard:null,
	btnEveryQuest:null,
	btnNearPlayer:null,
	btnRecharge:null,
    lableMoney:null,
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
            var nick = profileObj.get("nickName");
            if(nick)
            {
                var ProfileName ="<" + nick + ">";
                this.initProfileUI(ProfileName,profileObj.get("money"));
            }
        }, this);
    },
    initProfileUI:function(name,money){
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
        if(this.lableMoney!=null){
            this.removeChild(this.lableMoney);this.lableMoney=null;
        }
        this.lableMoney = new ccui.Text();
        this.lableMoney.string = "金币：" + money;
        this.lableMoney.setColor(cc.color.YELLOW);
        this.lableMoney.fontSize = 18;
        var xAccount = this.lableMoney.width/2;
        var yAccount = this.btnLogout.y - this.lableMoney.height;
        this.lableMoney.x = xAccount;
        this.lableMoney.y = yAccount;
        xAccount += this.lableMoney.width/2;
        this.addChild(this.lableMoney);

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
            var query = new Bmob.Query(Bmob.User);
            query.include("profile");

            query.get(currentUser.id, {
                success: function(userAgain) {
                    var ptrProfile = userAgain.get("profile");
                    var ptrProfileId = ptrProfile.id;

                    if(ptrProfileId)
                    {
                        //call update function
                        if (_EventCallback)
                            _EventCallback(ptrProfile);
                        if (_EventListener && _EventSelector)
                            _EventSelector.call(_EventListener,ptrProfile);
                    }
                }
            });



        }

    }
});