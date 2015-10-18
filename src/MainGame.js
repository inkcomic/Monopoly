/**
 * Created by bin on 2015/10/18.
 */

var MainGameUI = cc.Layer.extend({
    btnProfileName:null,
    ctor : function () {
        this._super();
        var widgetSize = this.getContentSize();

        // Create the imageview
        var imageView = new ccui.ImageView("res/cocosui/b11.png");
        imageView.x = widgetSize.width / 2;
        imageView.y = widgetSize.height / 2 + imageView.height / 4;
        imageView.setOpacity(100);
        this.addChild(imageView);

        this.initBriefProfile();
    },
    onEnter : function () {
        this._super();

    },
    initBriefProfile:function(){
        var widgetSize = this.getContentSize();
        // Create the text button
        this.btnProfileName = new ccui.Button();
        this.btnProfileName.setTouchEnabled(true);
        this.btnProfileName.setTitleText(ProfileName);
        this.btnProfileName.setTitleFontSize(20);
        this.btnProfileName.x = this.btnProfileName.width;
        this.btnProfileName.y = widgetSize.height - this.btnProfileName.height;
        this.addChild(this.btnProfileName);

        //update data
        var ProfileName="";
        var currentUser = Bmob.User.current();
        if (currentUser) {
            ProfileName ="你好:"+ currentUser.get("username");
            this.btnProfileName.setTitleText(ProfileName);
        } else {
            this.btnProfileName.setTitleText(ProfileName);
        }


    }


});