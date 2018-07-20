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
    App.WxService.navigateTo('../../taskcal/index?prjid=' + this.data.projectId);
  },
  onLoad: function (option) {
    var that = this;
    this.setData({
      projectId:option.id,
      activeIndex:option.tab || 0
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.initData();
  },
  
  initData:function(){
    //获取项目详情
    App.HttpServiceWork.projectGet({
      "token": App.getToken(),
      "id": this.data.projectId
    }).then(json => {
      wx.setNavigationBarTitle({
        title: json.title
      });
      this.setData({
        project: json
      })
    });

    App.HttpServiceWork.taskList({
      "token": App.getToken(),
      "proid": this.data.projectId,
      p:1
    }).then(json => {
      console.log(json);
      this.setData({
        listTask:json
      });

      App.HttpServiceWork.projectCalsList({
        "token": App.getToken(),
        "prjid": this.data.projectId,
        p: 1
      }).then(json => {
        console.log("zhang list:", json);
        this.setData({
          listZhang: json
        })
      });

    });

    
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    
  },
  showZhangAction:function(e){
    var that = this;
    var _id = e.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success: function (res) {
        if(res.tapIndex == 0){
          App.WxService.navigateTo('../../taskcal/index?prjid=' + that.data.projectId+"&id="+_id);
        }else if(res.tapIndex == 1){
          App.confirm("是否确认删除此条目？", function () {
            App.HttpServiceWork.projectCalsRemove({ 
              token: App.getToken(), id: _id }).then(json => {
              if(json.ret){
                that.initData();
              }else{
                App.alert("删除失败");
              }
            });
          });
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })

  }
})
