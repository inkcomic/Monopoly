/**
 * Created by bin on 2015/11/2.
 */

var OpenGLTestLayer = cc.Layer.extend({
    _grossini:null,
    _tamara:null,
    _kathia:null,
    _code:null,

    ctor:function() {
        this._super(cc.color(0,0,0,255), cc.color(98,99,117,255) );
    },

    title:function () {
        return "OpenGLTest";
    },
    subtitle:function () {
        return "";
    },
    onBackCallback:function (sender) {
        var s = new OpenGLTestScene();
        s.addChild(previousOpenGLTest());
        director.runScene(s);
    },
    onRestartCallback:function (sender) {
        var s = new OpenGLTestScene();
        s.addChild(restartOpenGLTest());
        director.runScene(s);
    },
    onNextCallback:function (sender) {
        var s = new OpenGLTestScene();
        s.addChild(nextOpenGLTest());
        director.runScene(s);
    },

    // automation
    numberOfPendingTests:function() {
        return ( (arrayOfOpenGLTest.length-1) - OpenGLTestIdx );
    },

    getTestNumber:function() {
        return OpenGLTestIdx;
    }
});

var ShaderOutlineEffect = OpenGLTestLayer.extend({
    ctor:function() {
        this._super();
        var widgetSize = this.getContentSize();;
        if( 'opengl' in cc.sys.capabilities ) {
            if(cc.sys.isNative){
                this.shader = new cc.GLProgram("res/Shaders/example_Outline_noMVP.vsh", "res/Shaders/example_Outline.fsh");
                this.shader.link();
                this.shader.updateUniforms();
            }
            else{
                this.shader = new cc.GLProgram("res/Shaders/example_Outline.vsh", "res/Shaders/example_Outline.fsh");
                this.shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                this.shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                this.shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

                this.shader.link();
                this.shader.updateUniforms();
                this.shader.use();
                this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_threshold'), 1.75);
                this.shader.setUniformLocationWith3f(this.shader.getUniformLocationForName('u_outlineColor'), 0 / 255, 255 / 255, 0 / 255);
            }

            this.sprite = new cc.Sprite('res/cocosui/grossini-aliases.png');
            this.sprite.attr({
                x: widgetSize.width / 2,
                y: widgetSize.height / 2
            });
            this.sprite.runAction(cc.sequence(cc.rotateTo(1.0, 10), cc.rotateTo(1.0, -10)).repeatForever());

            if(cc.sys.isNative){
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.shader);
                glProgram_state.setUniformFloat("u_threshold", 1.75);
                glProgram_state.setUniformVec3("u_outlineColor", {x: 0/255, y: 255/255, z: 0/255});
                this.sprite.setGLProgramState(glProgram_state);
            }else{
                this.sprite.shaderProgram = this.shader;
            }

            this.addChild(this.sprite);

            this.scheduleUpdate();
        }
    },
    update:function(dt) {
        if( 'opengl' in cc.sys.capabilities ) {
            if(cc.sys.isNative){
                this.sprite.getGLProgramState().setUniformFloat("u_radius", Math.abs(this.sprite.getRotation() / 500));
            }else{
                this.shader.use();
                this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_radius'), Math.abs(this.sprite.getRotation() / 500));
                this.shader.updateUniforms();
            }
        }
    },
    title:function () {
        return "Shader Outline Effect";
    },
    subtitle:function () {
        return "Should see rotated image with animated outline effect";
    }

    //
    // Automation
    //
});


var BlurLayer = cc.Layer.extend({
    bgTex:(null),
    ctor : function () {
        this._super();


        var widgetSize = this.getContentSize();;

         this.setColor(cc.color(255, 255, 255, 255));

        // var layer1 = cc.LayerColor.create(cc.color(0, 0, 0, 128), widgetSize.width, widgetSize.height);
        //layer1.setPosition(cc.p(0, 0));
        //this.addChild(layer1);

        var llll = new ShaderOutlineEffect();
        this.addChild(llll);
/*
        this.bgTex = cc.RenderTexture.create(cc.visibleRect.width, cc.visibleRect.height);
        this.bgTex.begin();
        cc.director.getRunningScene().visit();
        this.bgTex.end();

        this.createShader(0,0);
        this.update(0);

        this.bgTex.setPosition(cc.p(widgetSize.width/2, widgetSize.height/2));
        this.bgTex.setContentSize(widgetSize.width, widgetSize.height);
        this.bgTex.setVisible(true);
        this.addChild(this.bgTex);

        var shaderNode = new ShaderNode("res/Shaders/example_Flower.vsh", "res/Shaders/example_Flower.fsh");
        this.addChild(shaderNode);
        shaderNode.x = widgetSize.width/2;
        shaderNode.y = widgetSize.height/2;
*/
    },
    onEnter : function () {
        this._super();
    },
    createShader:function(blurRaidus,bgColor){
       // var modalBg = this.create(blurRaidus, bgColor);
        //this.addChild(modalBg);


                if( 'opengl' in cc.sys.capabilities ) {
                    this.shader = new cc.GLProgram("res/Shaders/example_Outline.vsh", "res/Shaders/example_Blur.fsh");
					this.shader.retain();
                    this.shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                    this.shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                    this.shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

                    this.shader.link();
                    this.shader.updateUniforms();
                    this.shader.use();
                    this.shader.setUniformLocationWith2f(this.shader.getUniformLocationForName('blurSize'), 10.75,10);
                    this.shader.setUniformLocationWith4f(this.shader.getUniformLocationForName('substract'), 0 ,0 ,0, 0);

                    this.bgTex.shaderProgram = this.shader;


                    //this.addChild(this.sprite);

                    //this.scheduleUpdate();


                }
            },
            update:function(dt) {
                if( 'opengl' in cc.sys.capabilities ) {
                    if(cc.sys.isNative){
                        this.bgTex.getSprite().getGLProgramState().setUniformFloat("u_radius", Math.abs(this.bgTex.getSprite().getRotation() / 500));
                    }else{
                        this.shader.use();
                        this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_radius'), 10);
                        this.shader.updateUniforms();
                    }
                }
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
        this.btnOK.setTitleFontSize(26);
        this.btnOK.x = widgetSize.width/2;
        this.btnOK.y = yAccount - this.btnOK.height-20;
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


