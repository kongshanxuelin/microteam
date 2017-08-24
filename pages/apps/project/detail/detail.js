//index.js
//获取应用实例
var App = getApp()
Page({
  data: {
    
  },
  onLoad: function (option) {
    var that = this;
    this.setData({
      projectId:option.id
    });
  },
  editProject:function(){
    App.WxService.navigateTo('/pages/apps/project/add/index?id='+this.data.projectId);
  }
})
