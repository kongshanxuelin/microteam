const App = getApp();
Page({
  data: {
    listData:[],
    recordsTotal:0,
    p:1,
    lt: "<",
    gt:">",
    hasNext:false,
    selObj:{},
    index:0,
    array:[]
  },
  onLoad: function () {
    var that = this;
    this.loadWebStatServer(function(){
      that.switchStat();
    });
  },
  bindPickerChange:function(e){
    var _index = e.detail.value;
    this.setData({
      selObj:this.data.array[_index],
      p:1,
      index:_index
    });
    this.switchStat();
  },
  loadWebStatServer:function(cb){
    var that = this;
    App.HttpServiceWork.netFlowListServer({
      "token": App.getToken()
    }).then(json => {
      that.setData({
        array:json
      });
      if(json.length>0){
        that.setData({
          selObj: json[0],
          p: 1,
          index: 0
        });
      }
      cb();
    });
  },
  switchStat:function(cb){
    var that = this;
    App.HttpServiceWork.netFlow({
      "token": App.getToken(),
      "start": this.data.p,
      "ds-name": this.data.selObj["dsname"],
      "id": this.data.selObj["prj_id"],
      "ps":"20",
      "type":"json"
    }).then(json => {
      if(that.data.p == 1){
        that.data.listData = [];
      }
      that.data.listData = (that.data.listData || []).concat(json.data);
      for(var i in that.data.listData){
        var _ss = that.data.listData[i].view_page;
        if(_ss!="" && _ss.length>12){
          that.data.listData[i].view_page = _ss.substring(0,12)+"...";
        }
      }
      that.setData({
        listData: that.data.listData,
        recordsTotal: json.recordsTotal
      });
      if (json.recordsTotal*1.0 / 20 > that.data.p){
        that.setData({
          p:that.data.p + 1,
          hasNext:true
        });
      }else{
        that.setData({
          hasNext:false
        })
      }
      if(typeof cb === "function"){
        cb();
      }
    });
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      this.setData({
        p:1
      });
      this.switchStat(function(){
        wx.stopPullDownRefresh();
      });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasNext)
      this.switchStat();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})