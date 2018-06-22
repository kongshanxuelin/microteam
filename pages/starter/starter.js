var App = getApp();
Page({
  data: {
    isGrant:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHaveTeam: true,
    btn:"即刻进入"
  },
  onLoad: function (option) {
    var that = this;
    var _action = option.action || "";
    var _scene = decodeURIComponent(option.scene||"");
    console.log("_scene:" + _scene);
    if (_scene == 'bond') {
        App.log("microTeam", _scene);
        App.WxService.navigateTo("/pages/bond/index");
    }else if (_scene.indexOf('ai')==0) {
      _scene = _scene.substring(3, _scene.length);
      App.WxService.navigateTo("/pages/ai/ocr/index?id=" + _scene);
    }else{
        //查看用户是否有过授权
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              App.log("用户已授权过.")
              that.setData({
                isGrant: true
              });

              if (App.globalData.shareTeamId!=""){
                App.log("加入团队确认：", App.globalData.shareTeamId);
              }

              //检查登录态
              wx.checkSession({
                success: function () {
                  App.globalData.user = App.getCache("user");
                  console.log("***global user:", App.globalData.user);
                  if ((typeof App.globalData.user === "undefined") || (App.globalData.user === "")) {
                    App.log("****no cache user")
                    App.login();
                  } else {
                    //检查wx.sumslack.com的token当前是否有效
                    App.log("****cache user check token")
                    App.calUserFromServer();
                  }
                },
                fail: function () {
                  App.log("强制重新从服务端换取token，因为session_key已经过期");
                  App.login();
                }
              });
              /*
              wx.reLaunch({
                url: '/pages/index/index'
              });
              */
            }
          }
        });
        
        if (option.scene) {
          var _scene = decodeURIComponent(option.scene);
          App.log("scene:", _scene);
          if (_scene.indexOf("s.team=") >= 0) {
            var _shareTeamId = _scene.substring("s.team=".length, _scene.length);
            App.log("share teamid:", _shareTeamId);
            App.globalData.shareTeamId = _shareTeamId;

            App.WxService.navigateTo('/pages/my/team-share-confirm/index?teamid=' + _shareTeamId);
            /*
            后续的微信版本已经不支持直接获取用户信息
            if (App.getToken()){
              App.HttpServiceWork.teamShare({ token: App.getToken(), id: _shareTeamId })
              .then(json => {
                if(json.ret){
                  App.alert("成功加入团队!");
                }else{
                  App.alert(json.msg || "操作失败!");
                }
                setTimeout(function(){
                  that.doRelauch();
                },1500);
              });
            }
            */
          } 
        }else{
          if (_action === "createTeam") {
            this.setData({
              isHaveTeam: false
            });
          }
        }

        if (App.globalData.networkType === "none"){
          this.setData({
            btn:"离线浏览"
          })
        }

        
    }
  },
  doRelauch:function(){
    wx.reLaunch({
        url: '/pages/starter/starter'
    });
  },
  onShow:function(){
    var that = this;          
    setTimeout(function(){
        var animation = wx.createAnimation({  
            duration: 1000  
        })  
        animation.opacity(0).scale(1.5, 1.5).step();
        that.setData({  
            animationData: animation.export()  
        });    
    },1000);      
    
  },
  launchMain:function(){
    wx.switchTab({
      url: '/pages/index/index'
    });  
  },
  inputTeamName:function(e){
      this.setData({
          title:e.detail.value
      });
  },
  createTeam:function(){
      if(typeof this.data.title=== "undefined" || this.data.title === ""){
          App.alert("请输入名称");
          return;
      }
      App.HttpServiceWork.teamCreate({token:App.getToken(),title:this.data.title})
      .then(json => {
          if(json && json.ret && json.team){
              App.calUserFromServer();
          }
      },err => {
          console.log(err);
      });  
  },
  bindGetUserInfo: function (e) {
    console.log("*******bind user info:",e);
    if(typeof e.detail.userInfo == "undefined"){
      App.alert("必须授权登录才能使用!")
    }else{
      // setTimeout(() => {
      //   this.doRelauch();
      // },500);
      App.login();
    }
  }
})
