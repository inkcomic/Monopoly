
var LoginUI = cc.Layer.extend({
    btnLogin:null,
    ctor : function () {
        this._super();

        var widgetSize = this.getContentSize();
        this.btnLogin = new ccui.Button;
        this.btnLogin.setTouchEnabled(true);
        // textButton->loadTextures("cocosgui/backtotopnormal.png", "cocosgui/backtotoppressed.png", "");
        this.btnLogin.setTitleText("点击登陆");
        this.btnLogin.x=widgetSize.width/2;
        this.btnLogin.y = widgetSize.height/2;
        this.btnLogin.addTouchEventListener(this.touchEvent, this);

        this.addChild(this.btnLogin);


    },
    onEnter : function () {
        this._super();

    }

    ,touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
              //  alert("Touch Down");
                break;

            case ccui.Widget.TOUCH_MOVED:
             //   alert("Touch Move");
                break;

            case ccui.Widget.TOUCH_ENDED:
             //   alert("Touch Up");
                break;

            case ccui.Widget.TOUCH_CANCELED:
             //   alert("Touch Cancelled");
                break;

            default:
                break;
        }
    }
});