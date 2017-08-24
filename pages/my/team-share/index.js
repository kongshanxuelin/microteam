const App = getApp()
Page({
  data: {
    qrcode_url:""
  },
  onLoad: function (options) {
    if (App.getCurrentTeam()!=null){
      var imageurl = App.Config.workPath + "r/wx/service/teamQrcode?teamid=" + App.getCurrentTeam().teamId;
      this.setData({
        qrcode_url: imageurl,
        hasTeam:true
      });
    }else{
      this.setData({
        hasTeam: false
      });
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  previewImage:function(){
    wx.previewImage({
      current: this.data.qrcode_url,
      urls: [this.data.qrcode_url]
    });
  }
})