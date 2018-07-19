var sliderWidth = 96; 
var App = getApp()
Page({
  data: {
    projectId:"",
    project:{},
    
    listTask:{},
    listZhang:{},

    tabs:["任务","收支"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  addTask:function(){
    App.WxService.navigateTo('../../task/task?proId=' + this.data.projectId);
  },
  addZhang: function () {
    App.WxService.navigateTo('../../task/task?proId=' + this.data.projectId);
  },
  onLoad: function (option) {
    var that = this;
    this.setData({
      projectId:option.id
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    //获取项目详情
    App.HttpServiceWork.projectGet({
      "token": App.getToken(),
      "id": this.data.projectId
    }).then(json => {
      wx.setNavigationBarTitle({
        title: json.title
      });
      that.setData({
        project:json
      })
    });
    this.initData();
  },
  
  initData:function(){
    App.HttpServiceWork.taskList({
      "token": App.getToken(),
      "proid": this.data.projectId,
      p:1
    }).then(json => {
      console.log(json);
      this.setData({
        listTask:json
      })
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    
  },
  editProject:function(){
    App.WxService.navigateTo('/pages/apps/project/add/index?id='+this.data.projectId);
  }
})
