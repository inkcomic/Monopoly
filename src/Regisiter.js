
var RegisiterUI = cc.Layer.extend({
    btnLogin:null,
    labelAccount:null,
    textAccount:null,
    labelPassword:null,
    textPassword:null,
    btnGoLogin:null,
    labelEmail:null,
    textEmail:null,
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

        // email label
        this.labelEmail = new ccui.Text();
        this.labelEmail.string = "电子邮箱：";
        this.labelEmail.fontSize = 30;
        var xEmail=this.labelEmail.width/2;
        var yEmail=yPassword-this.labelEmail.height;
        this.labelEmail.x=xEmail;
        this.labelEmail.y=yEmail;
        xEmail+=this.labelEmail.width/2;
        this.addChild(this.labelEmail);

        // email input
        this.textEmail = new ccui.TextField();
        this.textEmail.setMaxLengthEnabled(true);
        this.textEmail.setMaxLength(64);
        this.textEmail.setTouchEnabled(true);
        this.textEmail.fontName = "Marker Felt";
        this.textEmail.fontSize = 30;
        this.textEmail.placeHolder = "在此输入您的电子邮箱地址";
        this.textEmail.x = xPassword + 150;
        this.textEmail.y = yEmail;
        this.textEmail.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.textEmail.setTextVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.textEmail);


        //login button
        this.btnLogin = new ccui.Button;
        this.btnLogin.setTouchEnabled(true);
        this.btnLogin.loadTextures("res/cocosui/backtotopnormal.png","res/cocosui/backtotoppressed.png","");
        this.btnLogin.setTitleText("确认注册");
        this.btnLogin.setTitleFontSize(22);
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
                    this.DoRegisiter(this.textAccount.getString(),this.textPassword.getString(),this.textEmail.getString());
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

        //regisiter button
        this.btnGoLogin = new ccui.Button;
        this.btnGoLogin.setTouchEnabled(true);
        this.btnGoLogin.loadTextures("res/cocosui/backtotopnormal.png","res/cocosui/backtotoppressed.png","");
        this.btnGoLogin.setTitleText("返回登陆");
        this.btnGoLogin.setTitleFontSize(22);
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

    },
    DoRegisiter:function(acount,passwd,email){
        var user = new Bmob.User();
        user.set("username", acount);
        user.set("password", passwd);
        user.set("email", email);

        // other fields can be set just like with Bmob.Object
       // user.set("phone", "415-392-0202");

        user.signUp(null, {
            success: function(user) {
                alert("注册好啦: " + "去登陆吧!");
                gMainLayer.switchToUI(layers.login_ui);
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert("出错啦: " + error.code + " " + error.message);
            }
        });
    }


});