//index.js
//获取应用实例
var App = getApp()
Page({
  data: {
    navButtons: [
      { text: "指派任务", icon: "../../images/working/task.png", link: "/pages/working/task/task" },
      { text: "工作日志", icon: "../../images/working/note.png", link: "/pages/working/worknote/writenote?act=day&tmplId=lkbcyn5beo" },
      { text: "团队文档", icon: "../../images/working/document.png", link: "/pages/working/doc/index" },
      { text: "试题秀", icon: "../../images/doc.png", link: "/pages/paper/index" },
      { text: "邀请加入", icon: "../images/share.png", link: "/pages/my/team-share/index" }
    ],
    icon: '../../images/home.png',
    taskIcon:'../../images/working/task.png',
    processIcon:'../../images/working/process.png',
    team:{},
    anno:{},
    task:{},
    process:{num:0,pro:{}}
  },
  onLoad: function () {
    var that = this;
    var _team = App.getCurrentTeam();
    if(_team!=null){
      this.setData({
        team:_team
      });
    }
  },
  getHomeData:function(cb){
    var that = this;
    App.HttpServiceWork.myHome({
      "token": App.getToken(),
    }).then(json => {
      App.log(json);
      if (json.anno) {
        that.setData({
          anno: json.anno
        });
      }
      if (json.task) {
        that.setData({
          task: json.task
        });
      }
      if (json.processList && json.processList.length>0){
        that.setData({
          process: { num: json.processList.length, pro: json.processList[0]}
        })
      }
      if(typeof cb === "function"){
        cb();
      }
    });
  },
  onPullDownRefresh: function () { //下拉刷新
    this.getHomeData(function () {
      wx.stopPullDownRefresh;
    });
  },
  onShow:function(){
    var _cache  = App.getCache("user");
    if(typeof _cache === "object"){
      this.setData({
          user:_cache
      });
    }
    var _team = App.getCurrentTeam();
    wx.setNavigationBarTitle({
      title: '小团队' + ' - ' + _team.teamName
    });
    this.getHomeData();
  },
  moreAction:function(){
    App.WxService.showActionSheet({
        itemList: ['创建团队', '切换团队'],
    }).then(res=>{
        if(res.tapIndex === 0){
          App.WxService.navigateTo('/pages/index/teamadd/teamadd');
        }else if(res.tapIndex === 1){
          App.WxService.navigateTo('/pages/index/teamchange/teamchange');
        }
    });
  }
})
