
var LoginUI = cc.Layer.extend({
    labelTitleName:null,
    btnLogin:null,
    labelAccount:null,
    textAccount:null,
    labelPassword:null,
    textPassword:null,
    btnGoRegisiter:null,
    ctor : function () {
        this._super();


    },
    onEnter : function () {
        this._super();
        this.initUI();
    },
    initUI:function(){
        var widgetSize = this.getContentSize();

        // Name label
        if(this.labelTitleName!=null){
            this.removeChild(this.labelTitleName);this.labelTitleName=null;
        }
        this.labelTitleName = new ccui.Text();
        this.labelTitleName.string = "中国富豪榜";
        this.labelTitleName.fontSize = 80;
        var xTitleName = widgetSize.width/2;
        var yTitleName = widgetSize.height - this.labelTitleName.height;
        this.labelTitleName.x = xTitleName;
        this.labelTitleName.y = yTitleName;
        this.labelTitleName.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.labelTitleName.setColor(cc.color.YELLOW);
        this.addChild(this.labelTitleName);
        yTitleName -= this.labelTitleName.height;

        // account label
        if(this.labelAccount!=null){
            this.removeChild(this.labelAccount);this.labelAccount=null;
        }
        this.labelAccount = new ccui.Text();
        this.labelAccount.string = "账户：";
        this.labelAccount.fontSize = 30;
        var xAccount = this.labelAccount.width/2;
        var yAccount = yTitleName - this.labelAccount.height;
        this.labelAccount.x = xAccount;
        this.labelAccount.y = yAccount;
        xAccount += this.labelAccount.width/2;
        this.addChild(this.labelAccount);

        // account input
        if(this.textAccount!=null){
            this.removeChild(this.textAccount);this.textAccount=null;
        }
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
        if(this.labelPassword!=null){
            this.removeChild(this.labelPassword);this.labelPassword=null;
        }
        this.labelPassword = new ccui.Text();
        this.labelPassword.string = "密码：";
        this.labelPassword.fontSize = 30;
        var xPassword=this.labelPassword.width/2;
        var yPassword=yAccount-this.labelPassword.height;
        this.labelPassword.x=xPassword;
        this.labelPassword.y=yPassword;
        xPassword+=this.labelPassword.width/2;
        this.addChild(this.labelPassword);

        // password input
        if(this.textPassword!=null){
            this.removeChild(this.textPassword);this.textPassword=null;
        }
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
        if(this.btnLogin!=null){
            this.removeChild(this.btnLogin);this.btnLogin=null;
        }
        this.btnLogin = new ccui.Button;
        this.btnLogin.setTouchEnabled(true);
        this.btnLogin.loadTextures("res/cocosui/backtotopnormal.png","res/cocosui/backtotoppressed.png","");
        this.btnLogin.setTitleText("点击登陆");
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
                    //alert(this.textAccount.getString()+":"+this.textPassword.getString());
                    this.DoLogin(this.textAccount.getString(),this.textPassword.getString());
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


        //goRegisiter button
        if(this.btnGoRegisiter!=null){
            this.removeChild(this.btnGoRegisiter);this.btnGoRegisiter=null;
        }
        this.btnGoRegisiter = new ccui.Button;
        this.btnGoRegisiter.setTouchEnabled(true);
        this.btnGoRegisiter.loadTextures("res/cocosui/backtotopnormal.png","res/cocosui/backtotoppressed.png","");
        this.btnGoRegisiter.setTitleText("注册账号");
        this.btnGoRegisiter.setTitleFontSize(22);
        var xGoRegisiter=xLogin+150;
        var yGoRegisiter=yLogin;
        this.btnGoRegisiter.x= xGoRegisiter;
        this.btnGoRegisiter.y = yGoRegisiter;
        this.btnGoRegisiter.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:

                    break;

                case ccui.Widget.TOUCH_MOVED:
                    //   alert("Touch Move");
                    break;

                case ccui.Widget.TOUCH_ENDED:
                    gMainLayer.switchToUI(layers.regisiter_ui);
                    break;

                case ccui.Widget.TOUCH_CANCELED:

                    break;

                default:
                    break;
            }
        }, this);
        this.addChild(this.btnGoRegisiter);
    },
    DoLogin:function(account,passwd){
        Bmob.User.logIn(account, passwd, {
            success: function(user) {
                gMainLayer.switchToUI(layers.maingame_ui);
            },
            error: function(user, error) {
                switch(error.code){
                    case 101:
                        alert("出错啦: "  + "用户名密码不匹配.");
                        break;
                    case 109:
                        alert("出错啦: " +  "检查用户名密码是否为空.");
                        break;
                    case 209:
                        alert("出错啦: " +  "该账号已经已经登录.");
                        break;
                    default:
                        // Show the error message somewhere and let the user try again.
                        alert("出错啦: " + error.code + " " + error.message);
                        break;
                }

            }
        });
    }

});