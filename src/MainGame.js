/**
 * Created by bin on 2015/10/18.
 */

var MainGameUI = cc.Layer.extend({
    btnLogin:null,
    labelAccount:null,
    textAccount:null,
    labelPassword:null,
    textPassword:null,
    btnGoRegisiter:null,
    ctor : function () {
        this._super();
        var widgetSize = this.getContentSize();

        // Create the imageview
        var imageView = new ccui.ImageView("res/cocosui/b11.png");
        imageView.x = widgetSize.width / 2;
        imageView.y = widgetSize.height / 2 + imageView.height / 4;
        this.addChild(imageView);

    },
    onEnter : function () {
        this._super();

    }
});