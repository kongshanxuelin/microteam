//index.js
//获取应用实例
var App = getApp()
Page({
  data: {
      btnText:"创建项目"
  },
  onLoad: function (option) {
    var that = this;
    var nick = App.getCache("nick");
    var uid = App.getCache("uid");
    var projectId = (typeof option.id === "undefined") ? "" : option.id;
    this.setData({
      fzr:{},
      cyz:{},
      id:projectId,
      btnText:(projectId==""?"创建项目":"保存项目")
    });
    if(projectId!=""){
      this.goProjectGet(projectId);
    }
  },
  onShow:function(){
    console.log("======",this.data.userInfor);
  },
  bindInputTitle:function(e){
    this.setData({
      title: e.detail.value
    });
  },
  bindInputContent:function(e){
    this.setData({
      content: e.detail.value
    });
  },
  bindDateChange:function(e){
      this.setData({
        endTime: e.detail.value
      });
  },
  goProjectGet:function(id){
      var that = this;
      App.HttpServiceWork.projectGet({"id":id,token:App.getToken()}).then(json => {
          that.setData({
              project:json,
              endTime:json.edt,
              title:json.title,
              content:json.content
          });
          var members = json.members;
          if(members && members.length){
            //fzr:{"uid":uid,"nick":nick},
            //cyz:{"uid":[uid],"nick":[nick]},
            var _fzr = {},_cyz={uid:[],nick:[]};
            for(var i in members){
              var _m = members[i];
              if(_m.role === "owner"){
                _fzr.uid = _m.uid;
                _fzr.nick = App.getUser(_m.uid).nick;
              }else{
                _cyz.uid.push(_m.uid);
                _cyz.nick.push(App.getUser(_m.uid).nick);
              }
            }
            console.log(_cyz);
            that.setData({
              fzr:_fzr,
              cyz:_cyz
            });
          }
      });
  },
  removeProject:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该项目？不可恢复',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title:"正在删除..."
          });
          if(that.data.id != ""){
              App.HttpServiceWork.projectRemove({
                  id:that.data.id,
                  token:App.getToken(),
              }).then(json => {
                  wx.hideLoading();
                  if(json && json.ret){
                    wx.navigateBack({
                      delta: 1
                    });
                  }
              },err => {
                wx.hideLoading();
                wx.showToast({
                  title: '失败，请检查是否联网!',
                  icon: 'success',
                  duration: 2000
                });
              });       
          }
        }
      }
    })
  },
  finishProject:function(){

  },
  createProject:function(){
      var _title = this.data.title;
      var _content = this.data.content;
      var _fzr = this.data.fzr.uid;
      var _cyz = this.data.cyz.uid;
      if(typeof _cyz === "object") _cyz = _cyz.join(",");
      var _endTime = this.data.endTime;
      console.log(_title,_content,_fzr,_cyz);
      //?t=ss&c=ss&leader=1&joiners=2&sdt=2017-04-01&edt=2017-08-01
      wx.showLoading({
        title:"正在操作..."
      });
      if(this.data.id === ""){
        App.HttpServiceWork.projectCreate({
            t:_title,
            c:_content,
            leader:_fzr,
            joiners:_cyz,
            edt:_endTime,
            token:App.getToken(),
        }).then(json => {
            wx.hideLoading();
            if(json && json.ret){
              wx.navigateBack({
                delta: 1
              });
            }
        },err => {
          wx.hideLoading();
          wx.showToast({
            title: '失败，请检查是否联网!',
            icon: 'success',
            duration: 2000
          });
        });
      }else{
        App.HttpServiceWork.projectSave({
            id:this.data.id,
            t:_title,
            c:_content,
            leader:_fzr,
            joiners:_cyz,
            edt:_endTime,
            token:App.getToken(),
        }).then(json => {
            wx.hideLoading();
            if(json && json.ret){
              wx.navigateBack({
                delta: 1
              });
            }
        },err => {
          wx.hideLoading();
          wx.showToast({
            title: '失败，请检查是否联网!',
            icon: 'success',
            duration: 2000
          });
        });
      }
     
  }
})
