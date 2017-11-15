const App = getApp()
Page({
  data: {
    paper:{num:0,score:0,title:"xx",d:"yyyy"},
    rate:"",
    id:"",//试卷ID或答卷ID
    t:"",//当type=paper时，无需显示打败了xxx
    score:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var rid = options.rid;
      var that = this;
      var _type = options.type || "";
      this.setData({
        t: _type,
        id:rid
      });
      console.log(this.data.t)
      App.HttpServicePaper.paperGet({ "token": App.getToken(), "rid": rid, "type": this.data.t }).then(json => {
        this.setData({
          paper : json.paper,
          rate : json.rate,
          score : json.score
        });
      });
  },

  doStart: function(){
    App.WxService.navigateTo('/pages/paper/index?type=da&id='+this.data.paper.id);
  },

  share2Quan:function(){
    App.HttpServicePaper.paperGenImage({ 
      "token": App.getToken(), 
      "id": this.data.id, 
      "type": this.data.t }).then(json => {
        if(json.ret){
          wx.downloadFile({
            "url": json.url,
            success: function (pic) {
              wx.previewImage({
                current: pic.tempFilePath,
                urls: [pic.tempFilePath]
              });
            }
          })
        }
    });
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})