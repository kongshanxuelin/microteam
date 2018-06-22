import {
  init,                    // 初始化组件及页面
  Tabbar,                  // Tabbar是组件的事件注册中心
  setTabbarData            // 设置/更新 tabbar显示的数据
} from "../tmpl/tabbar";
const App = getApp();

const UserPageData = {
  data: {
    mode: "view",
    curTab: "未完成",
    touid: "",
    taskList:[],
    taskList2:[],
    p: 1,
    p2:1,
    winH:0,
    hasNext:true,
    hasNext2: true,
    q: ""//名片搜索关键字
  },
  onLoad: function (option) {
    var that = this;

    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          winH: res.windowHeight
        });
      }
    });

    this.listTask(1);
  },
  onPullDownRefresh: function () {
    if (this.data.curTab === "未完成"){
      this.setData({
        p:1
      });
      this.listTask(1);
    }else{
      this.setData({
        p2: 1
      });
      this.listTask(2);
    }
  },
  onReachBottom: function () {
    if (this.data.curTab === "未完成") {
      if(this.data.hasNext)
        this.listTask(1);
    } else {
      if(this.data.hasNext2)
        this.listTask(2);
    }
  },
  listTask:function(sts){
    var _p = 1;
    if (this.data.curTab === "未完成") {
      _p = this.data.p;
    } else {
      _p = this.data.p2;
    }

    var that = this;
    App.HttpServiceWork.taskList({ 
      "token": App.getToken(),
      "sts":sts,
      "p":_p
     }).then(data => {
        if(sts === 1){
          if (this.data.p > 1){
            data.page.result = this.data.taskList.page.result.concat(data.page.result);
          }
          App.log(data);          
          that.setData({
            taskList: data,
            p: data.page.nextPage,
            hasNext: data.page.hasNext
          });
        }else if(sts === 2){
          if (this.data.p2 > 1) {
            data.page.result = this.data.taskList2.page.result.concat(data.page.result);
          }
          that.setData({
            taskList2: data,
            p2: data.page.nextPage,
            hasNext2: data.page.hasNext
          })
        }

        wx.stopPullDownRefresh();
    });
  },
  tapRemoveTask:function(e){
    var that = this;
    var _id = e.currentTarget.dataset.id;
    App.confirm("是否确认删除此任务？",function(){
      that.removeTask(_id, function (data) {
        console.log(data);
        if (that.data.curTab === "未完成") {
          that.listTask(1);
        } else {
          that.listTask(2);
        }
      });
    });
    
  },
  restartTask:function(e){
    var that = this;
    var _id = e.currentTarget.dataset.id;
    that.changeTask(_id, 1, function (data) {
      that.listTask(2);
    });
  },
  removeTask:function(id,cb){
    App.HttpServiceWork.taskRemove({
      "token": App.getToken(),
      "id": id+""
    }).then(data => {
      if(typeof cb === "function"){
        cb(data);
      }
    });
  },
  changeTask: function (id, sts, cb) {
    App.HttpServiceWork.taskChangeStatus({
      "token": App.getToken(),
      "id": id+"",
      "sts":sts
    }).then(data => {
      if (typeof cb === "function") {
        cb(data);
      }
    });
  },
  onTabClick: function (ev) {
    console.log("###########tabar click:", ev);
    this.setData({
      curTab: ev
    });
    if(ev === "未完成"){
      this.listTask(1);
    }else{
      this.listTask(2);
    }
  },
  finishTask:function(e){
    var that = this;
    var _id = e.currentTarget.dataset.id;
    this.changeTask(_id, "2", function (data) {
      console.log(data);
      that.listTask(1);
    });
  }
};

const tabbarData = [
  {
    iCount: 0,
    active: true,
    sIconUrl: "/images/unfinished.png",
    sIconActiveUrl: "/images/unfinished-active.png",
    sTitle: "未完成",
  },
  {
    iCount: 0,
    sIconUrl: "/images/finished.png",
    sIconActiveUrl: "/images/finished-active.png",
    sTitle: "已完成",
  },
];

setTabbarData(tabbarData);
init(UserPageData);