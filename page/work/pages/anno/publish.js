const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindTitle:function(e){
    this.setData({
      title:e.detail.value
    });
  },
  bindContent: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  
  publish:function(e){
    App.HttpServiceWork.annoPublish({
      "token": App.getToken(),
      "t": this.data.title,
      "c": this.data.content
    }).then(json => {
      App.log("publish anno", json);
      App.alert("发布公告成功！");
    });
  }
})