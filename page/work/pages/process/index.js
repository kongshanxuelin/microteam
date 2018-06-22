const App = getApp();
Page({
  data: {
    proId:"",
    process:{},
    fieldValue: {},
    tmpl:{}
  },
  onLoad: function (options) {
    var _proId = options.id || "";
    App.log("onload id:",_proId);
    this.setData({
      proId : _proId
    });
    this.processStart();
  },
  propChange: function (e) {
    const propId = e.currentTarget.dataset.propid;
    const propValue = e.detail.value;
    this.data.fieldValue[propId] = propValue;

    this.data.tmpl.fieldValue = this.data.fieldValue;
    this.setData({
      tmpl: this.data.tmpl
    });
  },
  submitProcess:function(){
    var param = this.data.fieldValue;
    param.token = App.getToken();
    param.pro_define_id = this.data.proId;

    App.HttpServiceWork.processSubmitInit(param).then(json => {
      App.log(json);
      if(json.ret){
        App.alert("已成功提交！",function(){
          wx.switchTab({
            url: '/pages/working/index'
          }); 
        });
      }else{
        App.alert("提交失败！");
      }
    });
  },
  processStart:function(){
    var that = this;
    App.HttpServiceWork.processStart({
      "token": App.getToken(),
      "id": this.data.proId
    }).then(json => {
      var _tmpl = json.tmpl || {};
      _tmpl.mode = 'edit';
      //加工一下tmpl下的fields下的ui_other
      for(var index in  _tmpl.fields){
        var _f = _tmpl.fields[index];
        if (_f.ui_component === "select"){
          var _uiOther = _f.ui_other;
          if (_uiOther.indexOf("select")!=0){
            json.tmpl.fields[index].ui_other = _f.ui_other.split(",");
          }
        }
      }
      that.setData({
        process: json.process,
        tmpl:_tmpl
      });
    });
  }
})