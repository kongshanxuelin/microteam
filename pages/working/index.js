//index.js
//获取应用实例
var util = require('../../utils/util.js')
var App = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    signInfor:{},
    processList:[],
    tmpl:{} //模板详细信息
  },
  onLoad: function () {
    var that = this;
    //获取签到信息
    App.HttpServiceWork.signInfo({
      "token": App.getToken()
    }).then(json => {
       that.setData({
         signInfor:json
       });
       App.log("sign log:", that.data.signInfor);
       //获取当前团队下定义的流程列表
       App.HttpServiceWork.processListTeam({
         "token": App.getToken()
       }).then(json => {
         App.log(json);
         that.setData({
           processList: json
         });
       });
    });

  },
  startProcess:function(e){
    var id = e.currentTarget.dataset.id;
    App.log("startProcess:",e,id);
    App.WxService.navigateTo('/pages/working/process/index?id='+id);
  },
  inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
  },
  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  //引导到全部应用页面
  goAllAppPage:function(){
    App.WxService.navigateTo('/pages/work/index');
  },
  bindSignOut: function () {
    var that = this;
    App.WxService.getLocation({
      type: 'wgs84'
    }).then(json => {
      var latitude = json.latitude;
      var longitude = json.longitude;
      App.HttpServiceWork.signOut({
        "token": App.getToken(),
        "let": latitude,
        "lot": longitude
      }).then(data => {
        if (data.ret) {
          App.alert("成功签出");
          var date = util.dateFormat(new Date(), "hh:mm:ss");
          that.data.signInfor.signout_time = date;
          that.setData({
            signInfor: that.data.signInfor
          })
        } else {
          App.alert(data.msg || "团队管理员尚未定义允许签出的位置！");
        }
      });
    });
  },
  bindSignIn: function () {
    var that = this;
    App.WxService.getLocation({
      type: 'wgs84'
    }).then(json => {
      var latitude = json.latitude;
      var longitude = json.longitude;
      App.HttpServiceWork.signIn({
        "token": App.getToken(),
        "let": latitude,
        "lot": longitude
      }).then(data => {
        console.log(data);
         if(data.ret){
           App.alert("成功打卡");
           var date = util.dateFormat(new Date(data.sign.create_time),"hh:mm:ss");
           that.data.signInfor.signin_time = date;
           that.setData({
             signInfor : that.data.signInfor
           })
        }else{
           App.alert(data.msg || "团队管理员尚未定义允许签到的位置！");
         }
      });
    });
  }
})
