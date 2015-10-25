function EnsureTables() {
    this.ensureAll = function(goNextStep)
    {
        var nextStep = goNextStep;
        this.UserProfile(function(){


            nextStep();
        });
    },
    this.UserProfile=function(goNextStep){
        var nextStep = goNextStep;
        var currentUser = Bmob.User.current();

        if (currentUser) {
            var query = new Bmob.Query(Bmob.User);
            query.include("profile");

            query.get(currentUser.id, {
                success: function(userAgain) {
                    var ptrProfile = userAgain.get("profile");
                    var ptrProfileId = ptrProfile.id;

                    if(null==ptrProfileId)
                    {
                        //create new profile
                        var playerProfile = Bmob.Object.extend("PlayerProfile");
                        var _newProfile = new playerProfile();
                        //_newProfile.set("score", 137);
                        _newProfile.save(null, {
                            success: function(_newProfile) {
                                currentUser.set("profile",_newProfile);
                                currentUser.save();

                                _newProfile.fetch({
                                    success: function(post) {
                                        //call update function
                                        nextStep();
                                    }
                                });
                            },
                            error: function(_newProfile, error) {
                                // 添加失败
                                //alert('添加数据失败，返回错误信息：' + error.description);
                            }
                        });
                    }
                    else{
                        //already have ok
                        nextStep();
                    }

                }
            });
        }


    }
}
