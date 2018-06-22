import { $wuxDialog } from '../../../../components/wux'
var App = getApp()
Page({
  data: {
    processList: [],
    processHis:{},
    p:1, //流程流程分页当前页码
    hasNext: true,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    this.showMyProcess();
  },
  onPullDownRefresh: function () {
    this.setData({
      p: 1
    });
    this.showProcessList();
  },
  onReachBottom: function () {
    if (this.data.currentTab == 1 && this.data.hasNext){
      this.showProcessList();
    }
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    this.showProcessList();
  },
  //点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    this.showProcessList();
  },
  showProcessList:function(){
    if (this.data.currentTab == 0){
      this.showMyProcess();
    }else{
      this.showHisProcess();
    }
  },
  showMyProcess: function () {
    var that = this;
    App.HttpServiceWork.processMyList({
      "token": App.getToken()
    }).then(json => {
      App.log(json);
      that.setData({
        processList: json
      });
    });
  },
  showHisProcess:function(){
    var that = this;
    var _p = this.data.p;
    App.HttpServiceWork.processHis({
      "token": App.getToken(),
      "p": _p
    }).then(json => {
      if (that.data.p > 1) {
        json.page.result = that.data.processHis.result.concat(json.page.result);
      }
      that.setData({
        processHis: json.page,
        p: json.page.nextPage,
        hasNext: json.page.hasNext
      });
    });
  },
  showProcessGet(instId,cb){
    App.HttpServiceWork.processGet({
      "token": App.getToken(),
      "id": instId
    }).then(json => {
      App.log(json);
      if(typeof cb == "function"){
        cb(json);
      }
    });
  },
  auditProcess(instId,msg,yesOrNo,cb){
    App.HttpServiceWork.processAudit({
      "token": App.getToken(),
      "instid": instId,
      "memo":msg,
      "d": yesOrNo
    }).then(json => {
      App.log(json);
      if(typeof cb == "function"){
        cb(json);
      }
    });
  },
  dealWithProcess:function(e){
    var instId = e.currentTarget.dataset.id;
    var that = this;
    var _msg = "";
    that.showProcessGet(instId, function (json) {
      var _formData = json.data;
      for (var index in _formData){
        if (_formData[index].field_value_display && _formData[index].field_value_display!=""){
          _msg += _formData[index].title + ":" + _formData[index].field_value_display + "\t";
        }else{
          _msg += _formData[index].title + ":" + _formData[index].field_value + "\t";
        }
      }
      $wuxDialog.prompt({
        title: '提示',
        content: _msg,
        fieldtype: 'text',
        password: false,
        defaultText: '',
        placeholder: '请输入审批意见',
        maxlength: 8,
        confirmText: "同意",
        cancelText: "拒绝",
        onCancel(e) {
          const value = that.data.$wux.dialog.prompt.response;
          App.alert("no" + value + instId);
          that.auditProcess(instId,value,"0",function(json){
            if(json.ret){
              App.alert("操作成功！");
            }else{
              App.alert("操作失败！");
            }
            that.showMyProcess();
          });
        },
        onConfirm(e) {
          const value = that.data.$wux.dialog.prompt.response;
          App.alert("yes:" + value + instId);
          that.auditProcess(instId, value, "1",function(json){
            if (json.ret) {
              App.alert("操作成功！");
            } else {
              App.alert("操作失败！");
            }
            that.showMyProcess();
          });
        },
      });
    });

    
  }
});