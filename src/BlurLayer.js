/**
 * Created by bin on 2015/11/2.
 */


cc.GLNode = cc.GLNode || cc.Node.extend({
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this._renderCmd._needDraw = true;
        this._renderCmd.rendering =  function(ctx){
            cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
            cc.kmGLPushMatrix();
            cc.kmGLLoadMatrix(this._stackMatrix);

            this._node.draw(ctx);

            cc.kmGLPopMatrix();
        };
    },
    draw:function(ctx){
        this._super(ctx);
    }
});
//------------------------------------------------------------------
//
// ShaderNode
//
//------------------------------------------------------------------
var ShaderNode = cc.GLNode.extend({
    ctor:function(vertexShader, framentShader) {
        this._super();
        this.init();

        if( 'opengl' in cc.sys.capabilities ) {
            this.width = 1024;
            this.height = 1024;
            this.anchorX = 0.5;
            this.anchorY = 0.5;

            this.shader = cc.GLProgram.create(vertexShader, framentShader);
            this.shader.retain();
            this.shader.addAttribute("aVertex", cc.VERTEX_ATTRIB_POSITION);
            this.shader.link();
            this.shader.updateUniforms();

            var program = this.shader.getProgram();
            this.uniformCenter = gl.getUniformLocation( program, "center");
            this.uniformResolution = gl.getUniformLocation( program, "resolution");
            this.initBuffers();

            this.scheduleUpdate();
            this._time = 0;
        }
    },
    draw:function() {
        this.shader.use();
        this.shader.setUniformsForBuiltins();

        //
        // Uniforms
        //
        var frameSize = cc.view.getFrameSize();
        this.shader.setUniformLocationF32( this.uniformCenter, frameSize.width/2, frameSize.height/2);
        this.shader.setUniformLocationF32( this.uniformResolution, 1024, 1024);

        cc.glEnableVertexAttribs( cc.VERTEX_ATTRIB_FLAG_POSITION );

        // Draw fullscreen Square
        gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        gl.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    },

    update:function(dt) {
        this._time += dt;
    },
    initBuffers:function() {

        //
        // Square
        //
        var squareVertexPositionBuffer = this.squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        vertices = [
            1024,            1024,
            0,              1024,
            1024,            0,
            0,              0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
});

var BlurLayer = cc.Layer.extend({
    bgTex:(null),
    ctor : function () {
        this._super();


        var widgetSize = this.getContentSize();;

         this.setColor(cc.color(255, 255, 255, 255));

         var layer1 = cc.LayerColor.create(cc.color(0, 0, 0, 128), widgetSize.width, widgetSize.height);
        layer1.setPosition(cc.p(0, 0));
        this.addChild(layer1);

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


