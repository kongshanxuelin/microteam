var App = getApp()
Page({
  data: {
    listData: [],
    hasNext:false,
    p:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.refreshData();
  },
  refreshData:function(cb){
    var that = this;
    App.HttpServiceWork.tmplDataNoteList({
      "token": App.getToken(),
      "p": this.data.p
    }).then(json => {
      if (that.data.p == 1) {
        that.data.listData = [];
      }
      that.data.listData = (that.data.listData || []).concat(json.page.result);

      that.setData({
        listData: that.data.listData,
        hasNext: json.page.hasNext,
        p:json.page.nextPage
      });

      if (typeof cb === "function") {
        cb();
      }

    });
  },
  onPullDownRefresh: function () {
    this.setData({
      p: 1
    });
    this.refreshData(function () {
      wx.stopPullDownRefresh();
    });
  },
  onReachBottom: function () {
    if (this.data.hasNext){
      this.refreshData();
    }
  },

})