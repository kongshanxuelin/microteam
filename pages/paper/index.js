const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: App.Config.domain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var token = App.getToken();
      var t = options.type;
      var id = options.id;
      console.log("create:",t,id)
      if (typeof (t) != "undefined" && t === "bond"){
        this.setData({
          path: App.Config.domain + "bond/" + id
        });
      }else if (typeof (t) != "undefined" && t === "actCreate") {
        this.setData({
          path: App.Config.domain + "act/create/" + token
        });
      } else if (typeof (t) != "undefined" && t === "actDetail") {
        this.setData({
          path: App.Config.domain + "act/detail/" + id + "," + token
        });
      } else if (typeof (t) != "undefined" && t === "actList") {
        this.setData({
          path: App.Config.domain + "act/list/" + token
        });
      }else{
        if(typeof(t)!="undefined" && id!=""){
          this.setData({
            path: App.Config.domain + "paper/" + id
          });
        }else{
          this.setData({
            path: App.Config.domain + "?token=" + token
          });
        }
      }
      console.log("load webview url:", this.data.path)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
      console.log(options.webViewUrl)
  }
})