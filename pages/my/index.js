const App = getApp()
Page({
  data: {
    userInfo: {},
    cacheSize:0,
    version:App.Config.version,
    desc:App.Config.desc
  },
  doClearCache:function(){
    wx.clearStorage();
    this.onShow();
    wx.showToast({
        title: "清理缓存成功！",
        icon: 'success'
    });
  },
  doScan:function(){

  },
  onLoad: function () {
    console.log('mypage onLoad:', App)
    var that = this;
    App.getUserInfo().then(userInfo => {
      that.setData({
        userInfo:userInfo,
        teamName:App.getCache("teamName")
      })
    });
  },
  onShow:function(){
      var that = this;
      wx.getStorageInfo({
        success: function(res) {
          that.setData({
              cacheSize:parseFloat(res.currentSize/1024).toFixed(3)
          });
          that.setData({
              cacheLimitSize:parseFloat(res.limitSize/1024).toFixed(3)
          });
        }
      })
  },
  switchTeam:function(){
    var that = this;
    this.showTeamList().then(json => {
      var arrIds = [],arrNames=[];
      json.forEach(function (elem, index) {
        arrIds.push(elem.team.id);
        arrNames.push(elem.team.title);
      });
      wx.showActionSheet({
        itemList: arrNames,
        success: function (res) {
          var _teamId = arrIds[res.tapIndex];
          if (_teamId == null || typeof (_teamId) ==="undefined"){
            return;
          }
          App.HttpServiceWork.teamChange({
            "token": App.getToken(),
            "teamid": _teamId
          }).then(data => {
            if(data.ret){
              App.putCache("teamId", _teamId);
              App.putCache("teamName", arrNames[res.tapIndex]);
              var _user = App.getCache("user");
              _user.user.teamId = _teamId;
              _user.user.teamName = arrNames[res.tapIndex];
              App.putCache("user",_user);
              App.log("start relaunch...");
              wx.reLaunch({
                url: '/pages/starter/starter'
              });
            }else{
              App.alert("操作失败！");
            }
          });
        }
      })
    });
  },
  showTeamList:function(){
    return App.HttpServiceWork.teamList({
      "token": App.getToken()
    });
  }
})
