const App = getApp();
Page({
  data: {
    user:{},
    deptList:[]
  },
  bindInputValue:function(e){
    var v = e.detail.value;
    var name = e.currentTarget.dataset.name;
    this.data.user[name] = v;
    this.setData({
      user: that.data.user
    });
  },
  onLoad: function (options) {
    var that = this;
    App.HttpServiceWork.userInforGet({
      "token": App.getToken()
    }).then( user => {
        App.log(user);
        that.setData({
          "user":user.user
        });
    });
  },
  chooseDept:function(e){
    var that = this;
    App.HttpServiceWork.teamDeptList({
      "token": App.getToken()
    }).then(json => {
      App.log(json);
      that.setData({
        "deptList": json
      });

      var teamList = [];
      var teamListIds = [];
      for(var index in json){
        var _item = json[index];
        teamList.push(_item.team.title);
        teamListIds.push(_item.team.id);
      }

      wx.showActionSheet({
        itemList: teamList,
        success: function (res) {
          App.log("current user:",that.data.user);
          that.data.user["dept_id"] = teamListIds[res.tapIndex];
          that.data.user["dept_name"] = teamList[res.tapIndex];
          App.log("select dept:", that.data.user);
          that.setData({
            user: that.data.user
          });

        }
      })



    });
  },
  chooseLoc: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (obj) {
        that.data.user.addr = obj.address;
        that.setData({
          user: that.data.user
        })
      }
    });
  },
  saveInfor : function(){
    App.log("coming soon!", this.data.saveParam);
    this.data.user.token = App.getToken();
    App.HttpServiceWork.userInforSave(this.data.user).then(json => {
      App.log(json);
      if(json.ret){
        App.alert("更新个人资料成功！");
      }else{
        App.alert("更新个人资料失败！");
      }
    });
  }
})