const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var teamId = options.teamid;
    //App.log(teamId);
    this.setData({
      "teamid": teamId
    });

    App.HttpServiceWork.teamGet({
      id: teamId
    }).then(data => {
      App.log(data);
      that.setData({
        team:data
      });
    });
  },
  addTeamConfirm:function(e){
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              //调取个人资料
              App.getUserInfo().then(data => {
                wx.login({
                  success: function (res) {
                    if (res.code) {
                      wx.request({
                        url: App.Config.basePath + 'auth/wx_login.jhtml',
                        data: {
                          code: res.code,
                          nickName: App.globalData.userInfo.nickName,
                          avatarUrl: App.globalData.userInfo.avatarUrl
                        },
                        header: {
                          'content-type': 'application/json'
                        },
                        success: function (res) {
                          if (res.statusCode === 200) {
                            App.globalData.user = res.data;
                            if (App.globalData.user.user && App.globalData.user.user.teamId != "") {
                              App.putCache("teamId", App.globalData.user.user.teamId);
                              App.putCache("teamName", App.globalData.user.user.teamName);
                            }
                            App.putCache("user", res.data);


                            App.HttpServiceWork.teamShare({ token: App.getToken(), id: that.data.teamid })
                              .then(json => {
                                if (json.ret) {
                                  App.alert("成功加入团队!");
                                  wx.switchTab({
                                    url: '/pages/index/index'
                                  });

                                } else {
                                  App.alert(json.msg || "操作失败!");
                                  wx.switchTab({
                                    url: '/pages/index/index'
                                  });
                                }
                              });
                          }
                        }
                      })
                    } else {
                      that.log('获取用户登录态失败！' + res.errMsg)
                    }
                  }
                });
              });
            },
            fail(){
              App.alert("未同意授权获取用户信息");
              //wx.clearStorage();
            }
          })
        }else{
          App.HttpServiceWork.teamShare({ token: App.getToken(), id: that.data.teamid })
            .then(json => {
              if (json.ret) {
                App.alert("成功加入团队!");
                wx.switchTab({
                  url: '/pages/index/index'
                });

              } else {
                App.alert(json.msg || "操作失败!");
                wx.switchTab({
                  url: '/pages/index/index'
                });
              }
            });
        }
      }
    })
  }
})