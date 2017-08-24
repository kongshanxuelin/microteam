var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act:"",
    tmplId:"",
    tmpl:{},
    fieldValue:{},
    projectList: [
      { id: "1", title: "年假" },
      { id: "2", title: "事病假" },
      { id: "3", title: "开会" },
      { id: "4", title: "出差" }
    ],
    selectmuser: [], //发送给的人员列表
    projectListIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      this.data.act = options.act || "day";
      this.data.tmplId = options.tmplId || "day";
      this.setData({
        act:this.data.act,
        tmplId: this.data.tmplId
      });

      App.HttpServiceWork.projectList({
        "token": App.getToken()
      }).then(json => {
        that.setData({
          projectList: that.data.projectList.concat(json)
        });
        App.HttpServiceWork.tmplGet({
          "token": App.getToken(),
          "id": this.data.tmplId
        }).then(json => {
          App.log(json)
          json.mode = "edit";
          json.projectList = that.data.projectList;
          json.projectListIndex = 0;
          that.setData({
            tmpl: json
          });
          App.log("current tmpl:", that.data.tmpl);
        });
        
      });
  },
  bindPickerProjects: function (e) {
    App.log(e.currentTarget);
    this.data.tmpl.projectListIndex = e.detail.value;
    const propId = e.currentTarget.dataset.propid;
    
    this.data.fieldValue[propId] = this.data.projectList[e.detail.value].title;
    
    this.setData({
      projectListIndex: e.detail.value,
      tmpl: this.data.tmpl
    });
  },
  submitReport : function(){
    console.log(this.data.fieldValue);
    var params = this.data.fieldValue;
    params.token = App.getToken();
    params.tmplId = this.data.tmplId;
    App.HttpServiceWork.tmplDataAdd(params).then(json => {
      App.log(json);
      if(json.ret){
        App.alert("发送报告成功！");
      }else{
        App.alert("发送报告失败！");
      }
    });
  },
  cb_selectuser:function(data){
    App.log("cb select user:",data);
    const propId = data.selectmuser.propid;
    if (typeof data.selectmuser.uid === "object") {
      data.selectmuser.uid = data.selectmuser.uid.join(",");
      data.selectmuser.nick = data.selectmuser.nick.join(",");
    }
    this.data.fieldValue[propId] = data.selectmuser.uid;
    this.data.fieldValue["nick_" + propId] = data.selectmuser.nick
    this.data.tmpl.fieldValue = this.data.fieldValue;
    this.setData({
      tmpl: this.data.tmpl
    });
  },
  propChange  :function(e){
      const propId = e.currentTarget.dataset.propid;
      const propValue = e.detail.value;
      this.data.fieldValue[propId] = propValue;

      this.data.tmpl.fieldValue = this.data.fieldValue;
      this.setData({
        tmpl: this.data.tmpl
      });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})