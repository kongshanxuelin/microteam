var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projects: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.listProjects();
  },
  clickProject:function(e){
    var _id = e.currentTarget.dataset.id;
    console.log(_id);
    App.WxService.navigateTo('../../page/work/pages/project/detail/detail?id=' + _id);
  },
  listProjects: function () {
    var that = this;
    App.HttpServiceWork.projectList({ token: App.getToken() }).then(json => {
      App.log(json);

      that.setData({
        projects: json
      });
    });
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
  onShareAppMessage: function () {
  
  }
})