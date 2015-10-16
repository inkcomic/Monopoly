
var RegisiterUI = cc.Layer.extend({
    btnLogin:null,
    labelAccount:null,
    textAccount:null,
    labelPassword:null,
    textPassword:null,
    btnGoLogin:null,
    ctor : function () {
        this._super();
        var widgetSize = this.getContentSize();

        // account label
        this.labelAccount = new ccui.Text();
        this.labelAccount.string = "注册账户：";
        this.labelAccount.fontSize = 30;
        var xAccount=this.labelAccount.width/2;
        var yAccount=widgetSize.height-this.labelAccount.height;
        this.labelAccount.x=xAccount;
        this.labelAccount.y=yAccount;
        xAccount+=this.labelAccount.width/2;
        this.addChild(this.labelAccount);

        // account input
        this.textAccount = new ccui.TextField();
        this.textAccount.setMaxLengthEnabled(true);
        this.textAccount.setMaxLength(16);
        this.textAccount.setTouchEnabled(true);
        this.textAccount.fontName = "Marker Felt";
        this.textAccount.fontSize = 30;
        this.textAccount.placeHolder = "在此输入账户名(最长16位)";
        this.textAccount.x = xAccount + 150;
        this.textAccount.y = yAccount;
        this.textAccount.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.textAccount.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.textAccount);

        // password label
        this.labelPassword = new ccui.Text();
        this.labelPassword.string = "注册密码：";
        this.labelPassword.fontSize = 30;
        var xPassword=this.labelPassword.width/2;
        var yPassword=yAccount-this.labelPassword.height;
        this.labelPassword.x=xPassword;
        this.labelPassword.y=yPassword;
        xPassword+=this.labelPassword.width/2;
        this.addChild(this.labelPassword);

        // password input
        this.textPassword = new ccui.TextField();
        this.textPassword.setPasswordEnabled(true);
        this.textPassword.setPasswordStyleText("*");
        this.textPassword.setMaxLengthEnabled(true);
        this.textPassword.setMaxLength(16);
        this.textPassword.setTouchEnabled(true);
        this.textPassword.fontName = "Marker Felt";
        this.textPassword.fontSize = 30;
        this.textPassword.placeHolder = "在此输入密码(最长16位)";
        this.textPassword.x = xPassword + 150;
        this.textPassword.y = yPassword;
        this.textPassword.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.textPassword.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.textPassword);

        //login button
        this.btnLogin = new ccui.Button;
        this.btnLogin.setTouchEnabled(true);
        this.btnLogin.loadTextures("res/cocosui/backtotopnormal.png","res/cocosui/backtotoppressed.png","");
        this.btnLogin.setTitleText("点击登陆");
        var xLogin=widgetSize.width/2;
        var yLogin=widgetSize.height/2;
        this.btnLogin.x=xLogin;
        this.btnLogin.y = yLogin;
        this.btnLogin.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:

                    break;

                case ccui.Widget.TOUCH_MOVED:
                    //   alert("Touch Move");
                    break;

                case ccui.Widget.TOUCH_ENDED:
                    alert(this.textAccount.getString()+":"+this.textPassword.getString());
                    break;

                case ccui.Widget.TOUCH_CANCELED:
                    //   alert("Touch Cancelled");
                    break;

                default:
                    break;
            }
        }, this);
      //  yLogin-=this.btnLogin.height;
        this.addChild(this.btnLogin);


        //login button
        this.btnGoLogin = new ccui.Button;
        this.btnGoLogin.setTouchEnabled(true);
        this.btnGoLogin.loadTextures("res/cocosui/backtotopnormal.png","res/cocosui/backtotoppressed.png","");
        this.btnGoLogin.setTitleText("去登陆");
        var xGoRegisiter=xLogin+150;
        var yGoRegisiter=yLogin;
        this.btnGoLogin.x= xGoRegisiter;
        this.btnGoLogin.y = yGoRegisiter;
        this.btnGoLogin.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:

                    break;

                case ccui.Widget.TOUCH_MOVED:
                    //   alert("Touch Move");
                    break;

                case ccui.Widget.TOUCH_ENDED:
                    layers.regisiter_ui.removeFromParent();
                    gMainLayer.addChild(layers.login_ui);
                    break;

                case ccui.Widget.TOUCH_CANCELED:
                    //   alert("Touch Cancelled");
                    break;

                default:
                    break;
            }
        }, this);
        this.addChild(this.btnGoLogin);
    },
    onEnter : function () {
        this._super();

    }
});