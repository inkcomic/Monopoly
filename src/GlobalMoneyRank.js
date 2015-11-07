/**
 * Created by bin on 2015/11/7.
 */

var GlobalMoneyRank = ModelLayer.extend({
    btnPrevious:null,
    ctor : function () {
        this._super();

        this.initBGUI();

        this.DoGetGlobalMoneyRank();
    },
    onEnter : function () {
        this._super();
    },
    initBGUI:function(){
        var widgetSize = this.getContentSize();

        this.setColor(cc.color(255, 255, 255, 255));

        var layer1 = cc.LayerColor.create(cc.color(0, 0, 0, 220), widgetSize.width, widgetSize.height);
        layer1.setPosition(cc.p(0, 0));
        this.addChild(layer1);



        // Create the profile button
        this.btnPrevious = new ccui.Button();
        this.btnPrevious.setTouchEnabled(true);
        this.btnPrevious.setTitleText("返回");
        this.btnPrevious.setColor(cc.color.YELLOW);
        this.btnPrevious.setTitleFontSize(26);
        this.btnPrevious.x =  widgetSize.width/2 +  this.btnPrevious.width/2;
        this.btnPrevious.y = widgetSize.height - this.btnPrevious.height;
        this.btnPrevious.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.DoPrevious();
                    break;
            }
        }, this);
        this.addChild(this.btnPrevious);



    },
    DoPrevious:function(){
        this.parent.removeChild(this);
    },
    initRankList:function( resquestResult) {
        if(!resquestResult.error){
            var widgetSize = this.getContentSize();

            //sort by order
            var sortArry = new Array()
            for(var i=0;i<resquestResult.count;++i)
            {
                sortArry.push(resquestResult.results[i]);
            }
;           sortArry.sort(function(item1,item2){
                return  item1.order- item2.order;
            });

            var yStart = this.btnPrevious.y - 50;
            var itemCount = Math.min(resquestResult.count,10);
            for(var i=0;i<itemCount;++i)
            {
                var moneyRankInfo = sortArry[i];
                var labelMoney = this.addMoneyRankItem(yStart,moneyRankInfo);
                yStart = yStart - labelMoney.height;
                this.addChild(labelMoney);
            }

        }

    },
    DoGetGlobalMoneyRank:function()
    {
        var self = this;
        var currentUser = Bmob.User.current();  // this will now be null
        var oldMoney = gGameData.profileInfo.money;
        Bmob.Cloud.run('GetGlobalMoneyRank', {"uid":currentUser.id}, {
            success: function(result) {
                var resultObject= JSON.parse(result);
                if(!resultObject.error) {
                    self.initRankList(resultObject);
                }
            },
            error: function(error) {
            }
        });
    },
    addMoneyRankItem:function(ypos,moneyRankInfo){
        var widgetSize = this.getContentSize();
        var labelMoney = new ccui.Text();
        labelMoney.string ="排名："+ moneyRankInfo.order + " " + "昵称："+moneyRankInfo.nickName +" " +"金币" + moneyRankInfo.money;
        labelMoney.setColor(cc.color.YELLOW);
        labelMoney.fontSize = 20;
        var xAccount = widgetSize.width/2;
        var yStart = ypos - labelMoney.height;
        labelMoney.x = xAccount;
        labelMoney.y = yStart;
        return labelMoney;
    }

});