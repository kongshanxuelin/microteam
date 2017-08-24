//index.js
//获取应用实例
var App = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    projects:[]
  },
  onLoad: function () {
    var that = this;
  },
  onShow:  function(){
    this.listProjects();
  },
  inputTyping: function (e) {
        console.log(e.detail.value)
        this.setData({
            inputVal: e.detail.value
        });
        this.searchProjects(e.detail.value);
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
      this.searchProjects("");
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  searchProjects:function(_q){
      var that = this;
      App.HttpServiceWork.projectSearch({q:_q,token:App.getToken()}).then(json => {
          console.log(json)
          that.setData({
              projects:json
          });
      });
  },
  listProjects:function(){
      var that = this;
      App.HttpServiceWork.projectList({token:App.getToken()}).then(json => {
          App.log(json);

          that.setData({
              projects:json
          });
      });
  },
  addProject:function(){

  },
  goProjectAdd:function(){
      App.WxService.navigateTo('/pages/apps/project/add/index');
  },
  projectTap:function(e){
      var _id = e.currentTarget.dataset.projectid;
      App.WxService.navigateTo('/pages/apps/project/detail/detail?id='+_id);
  }
})
