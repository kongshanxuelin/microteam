//index.js
//获取应用实例
var App = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  onLoad: function () {
    var that = this;
  },
  inputTeamName:function(e){
      this.setData({
          title:e.detail.value
      });
  },
  createTeam:function(){
      App.HttpServiceWork.teamCreate({token:App.getToken(),title:this.data.title})
      .then(json => {
          console.log(json);
          if(json && json.team){
              App.globalData.cteam = json.team;
              wx.navigateBack({
                      delta: 1
              });
          }
      });  
  }
})
