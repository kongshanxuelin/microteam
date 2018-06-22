const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    pwd:"",
    hasBind:false,
    btnLabel:"绑定Sumslack账号",
    sumslackUser:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    App.HttpServiceWork.sumslackCheck({
      "token": App.getToken()
    }).then(json => {
      App.log("onload", json);
      if(json.ret){
        that.setData({
          btnLabel:"重绑Sumslack账号",
          sumslackUser:json.user,
          hasBind:true
        })
      }else{
        that.setData({
          btnLabel: "绑定Sumslack账号",
          hasBind:false
        })
      }
    });
  },
  bindUser:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  bindPwd:function(e){
    this.setData({
      pwd: e.detail.value
    })
  },
  bindSumslack:function(e){
    App.HttpServiceWork.sumslackBind({
      "token": App.getToken(),
      "u": this.data.username,
      "p": this.data.pwd
    }).then(json => {
      App.log("bindSumslack", json);
      if(json.ret){
        App.alert("绑定成功！");
      }else{
        App.alert("账号核验失败,绑定失败！");
      }
    });
  }
})