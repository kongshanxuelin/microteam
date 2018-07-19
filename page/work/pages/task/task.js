var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fzr:{},
    cyr: [],
    shr: {},
    content:"",
    endTime:"未设置",
    uid:"",
    proId:"",
    projectList: [
      { id: "1", title:"年假"},
      { id: "2", title: "事病假"},
      { id: "3", title: "开会" },
      { id: "4", title: "出差" }
    ],
    projectListIndex:0,
    tmpl:{} //任务的自定义模板
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var _proId = options.proId || "";
    console.log("proId:",_proId);
    this.setData({
      "proId": _proId,
      "token": App.getToken(),
      uid:App.globalData.user.user.uid
    });

    App.HttpServiceWork.tmplGet({
      "token": App.getToken(),
      "id": "1"
    }).then(json => {
      json.mode = "edit";
      that.setData({
        tmpl: json
      });
    });

    App.HttpServiceWork.projectList({
      "token": App.getToken()
    }).then(json => {
        that.setData({
          projectList: that.data.projectList.concat(json)
        });
    });

  },
  bindPickEndTime: function(e){
    this.setData({
      endTime: e.detail.value
    })
  },
  bindPickerProjects:function(e){
    //console.log(this.data.projectList[e.detail.value]);
    this.setData({
      projectListIndex: e.detail.value
    });
  },
  bindInputTaskContent:function(e){
    this.setData({
      content:e.detail.value
    });
  },
  addTask:function(){
    var that = this;
    if (typeof this.data.fzr.uid === "undefined"){
      App.alert("请选择任务负责人");
      return;
    }
    if (typeof this.data.cyr.uid === "undefined") {
      App.alert("请选择至少一个任务参与人");
      return;
    }
    if (typeof this.data.shr.uid === "undefined") {
      App.alert("请选择审核人");
      return;
    }
    if (typeof this.data.cyr.uid === "object"){
      this.data.cyr.uid = this.data.cyr.uid.join(",");
    }
    var _params = {
      "token": App.getToken(),
      "proid": this.data.projectList[this.data.projectListIndex].id,
      "tmpl_id": "1",
      "content": this.data.content,
      "end_time": this.data.endTime === "未设置" ? "" : this.data.endTime,
      "fzr": this.data.fzr.uid,
      "joiner": this.data.cyr.uid,
      "auditer": this.data.shr.uid
    };
    if (this.data.proId!=""){
      _params.proid = this.data.proId;
    }
    App.HttpServiceWork.taskAdd(_params).then(json => {
      if(json.ret){
        if (that.data.proId === ""){
          wx.switchTab({
            url: '/pages/index/index'
          });  
        }else{
          App.WxService.navigateTo('/page/work/pages/project/detail/detail?id=' + that.data.proId);
        }
      }else{
        App.alert("操作失败！");
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})