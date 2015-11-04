cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    var designSize = cc.size(480, 800);
    var screenSize = cc.view.getFrameSize();
/*
    if(!cc.sys.isNative && screenSize.height < 800){
        designSize = cc.size(320, 480);
        cc.loader.resPath = "res/Normal";
    }else{
        cc.loader.resPath = "res/HD";
    }
    */
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);

    //load resources
    Preloader.preload(g_resources, function () {
    //    Preloader.preload(g_opengl_resources, function () {
            Preloader.preload(g_ui, function () {
                gMainScene = new MainScene();
                cc.director.runScene(gMainScene);
            }, this);
    //    }, this);
    }, this);



};
cc.game.run();