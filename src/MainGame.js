/**
 * Created by bin on 2015/10/18.
 */

var MainGameUI = cc.Layer.extend({
    btnProfileName:null,
    btnLogout:null,
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

        this.DoUpdateProfile(function(profileObj){
            var nick = profileObj.get("nickName");
            alert(nick);
        },this);
    },

    initProfileUI:function(name){
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
        this.btnProfileName.setTitleFontSize(20);
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
        this.btnLogout.x = this.btnProfileName.x + this.btnProfileName.width + this.btnLogout.width;
        this.btnLogout.y = widgetSize.height - this.btnLogout.height;
        this.btnLogout.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.DoLogout();
                    break;
            }
        }, this);
        this.addChild(this.btnLogout);
    },
    initBriefProfile:function(){



        //update data
        var ProfileName="";
        var currentUser = Bmob.User.current();
        if (currentUser) {
            ProfileName ="你好:"+ currentUser.get("username");
            this.initProfileUI(ProfileName);
        } else {
            this.initProfileUI(ProfileName);
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
            query.get(currentUser.objectId, {
                success: function(userAgain) {
                    var ptrProfile = userAgain.get("profile");
                    if(null==ptrProfile)
                    {
                        //create new profile
                        var playerProfile = Bmob.Object.extend("PlayerProfile");
                        var _newProfile = new playerProfile();
                        //_newProfile.set("score", 137);
                        _newProfile.save(null, {
                            success: function(_newProfile) {

                                currentUser.set("profile",_newProfile);
                                currentUser.save();

                                _newProfile.fetch({
                                    success: function(post) {

                                        //call update function
                                        if (_EventCallback)
                                            _EventCallback(_newProfile);
                                        if (_EventListener && _EventSelector)
                                            _EventSelector.call(_EventListener,_newProfile);
                                    }
                                });
                            },
                            error: function(_newProfile, error) {
                                // 添加失败
                                //alert('添加数据失败，返回错误信息：' + error.description);
                            }
                        });
                    }
                    else
                    {
                        ptrProfile.fetch({
                            success: function(post) {

                                //call update function
                                if (_EventCallback)
                                    _EventCallback(post);
                                if (_EventListener && _EventSelector)
                                    _EventSelector.call(_EventListener,post);
                            }
                        });


                    }





                }
            });

        }

    }
});