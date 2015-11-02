/**
 * Created by bin on 2015/11/2.
 */
var BlurLayer = cc.Layer.extend({
    ctor : function () {
        this._super();

        this.setColor(cc.color(255, 255, 255, 255));

        var widgetSize = this.getContentSize();;

        var layer1 = cc.LayerColor.create(cc.color(0, 0, 0, 128), widgetSize.width, widgetSize.height);
        layer1.setPosition(cc.p(0, 0));
        this.addChild(layer1);


        var bgTex = cc.RenderTexture.create(cc.visibleRect.width, cc.visibleRect.height);
        bgTex.begin();
        cc.director.getRunningScene().visit();
        bgTex.end();
        /*
         //create bulr background
         // var bg = cc.Sprite.create(bgTex);
         bgTex.setPosition(cc.p(0, widgetSize.height/2));
         bgTex.setContentSize(widgetSize.width, widgetSize.height);
         bgTex.setVisible(true);
         this.addChild(bgTex);
         */

    },
    onEnter : function () {
        this._super();
    },
    create:function(blurRaidus,bgColor){
       // var modalBg = this.create(blurRaidus, bgColor);
        //this.addChild(modalBg);
    }
});



var PopDialogMgr  = cc.Class.extend(/** @lends cc.Node# */{
    lstDialog:null,
    ctor : function () {
    },
    DoOkDlg:function(parentLayer,_infoText,_okText,callback){
        var self = parentLayer;
        self.removeChild(popOKDlg);
        var popOKDlg = new OKDialog();
        popOKDlg.create(_infoText,_okText,function(){
            callback();
            self.removeChild(popOKDlg);
        });
        parentLayer.addChild(popOKDlg);
    }
});

var OKDialog = BlurLayer.extend({
    labelInfoText:null,
    btnOK:null,
    ctor : function () {
        this._super(cc.color(255, 255, 255, 255));

        var touchListener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan
        };
        cc.eventManager.addListener(touchListener, this);
        this.m_touchListener = touchListener;
    },
    onTouchBegan:function(touch, event) {
        var target = event.getCurrentTarget();
        if(!target.isVisible() || (!target.isTouchInside(target,touch))){
            return false;
        }
        return true;
    },
    isTouchInside: function (owner,touch) {
        if(!owner || !owner.getParent()){
            return false;
        }
        var touchLocation = touch.getLocation(); // Get the touch position
        touchLocation = owner.getParent().convertToNodeSpace(touchLocation);
        return cc.rectContainsPoint(owner.getBoundingBox(), touchLocation);
    },
    create:function(_infoText,_okText,callback){
        var widgetSize = this.getContentSize();
        var self = this;

        // lableMoney label
        if(this.labelInfoText!=null){
            this.removeChild(this.labelInfoText);this.labelInfoText=null;
        }
        this.labelInfoText = new ccui.Text();
        this.labelInfoText.string = _infoText;
        this.labelInfoText.setColor(cc.color.YELLOW);
        this.labelInfoText.fontSize = 18;
        var xAccount = widgetSize.width/2;
        var yAccount = widgetSize.height*3/4 - this.labelInfoText.height;
        this.labelInfoText.x = xAccount;
        this.labelInfoText.y = yAccount;
        xAccount += this.labelInfoText.width/2;
        this.addChild(this.labelInfoText);


        if(this.btnOK!=null){
            this.removeChild(this.btnOK);
            this.btnOK=null;
        }
        // Create the profile button
        this.btnOK = new ccui.Button();
        this.btnOK.setTouchEnabled(true);
        this.btnOK.setTitleText(_okText);
        this.btnOK.setColor(cc.color.YELLOW);
        this.btnOK.setTitleFontSize(24);
        this.btnOK.x = widgetSize.width/2;
        this.btnOK.y = yAccount - this.btnOK.height;
        this.btnOK.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    callback();
                    break;
            }
        }, this);
        this.addChild(this.btnOK);
    }

});


