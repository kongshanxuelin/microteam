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
    var user = App.getCache("user");
    var _teamId = user.user.company_id;
    this.setData({
        cTeamId:_teamId
    });
    this.listMyTeam();
  },
  doOK:function(){
    var that = this;
    var teamId = this.data.teamid;
    App.HttpServiceWork.teamChange({token:App.getToken(),teamid:teamId})
    .then(json => {
        console.log(json,teamId,json.ret);
        if(json && json.ret){
            var _team = that.getTeam(teamId);
            console.log(_team);
            var _user = App.globalData.user.user;
            _user.company_id = _team.team.id;
            _user.company_name = _team.team.title;
            App.globalData.user.user = _user;
            App.putCache("user",App.globalData.user);
            wx.switchTab({
                url: '/pages/index/index'
            });
        }
    });
  },
  selectChange:function(e){
    var _v = e.detail.value;
    this.setData({
      teamid:_v
    });
  },
  listMyTeam:function(){
      var that = this;
      App.HttpServiceWork.teamList({token:App.getToken()})
      .then(json => {
            that.setData({
                myteams:json
            });
      });
  },
  getTeam:function(teamid){
      var teams = this.data.myteams;
      for(var i in teams){
          if(teams[i].team.id === teamid){
                return teams[i];
          }
      }
  }
})
