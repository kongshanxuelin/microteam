const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [
      { id:"ocr_car",label: "汽车识别", icon:"./img/car.png"},
      { id: "ocr_flower",label: "花草识别", icon: "./img/flower.png" },
      { id: "ptu_datoutie",label: "大头贴", icon: "./img/datou.jpg" },
      { id: "ptu_face", label: "人脸融合", icon: "./img/ronghe.png" },
      { id: "ptu_huazhuang", label: "人脸美妆", icon: "./img/meizhuang.jpg" },
      { id: "ptu_yanzhi",label: "颜值检测", icon: "./img/yanzhi.png" },
      //{ id: "face_compare_age",label: "父子检测", icon: "./img/car.png" },
      { id: "face_check",label: "年龄测算", icon: "./img/age.png" },
      //{ id: "ocr_pic_scene",label: "场景检测", icon: "./img/car.png" },
      //{ id: "ocr_isfood",label: "美食识别", icon: "./img/car.png" },
      { id: "ocr_pic_thing",label: "物件识别", icon: "./img/thing.png" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  tapGrid:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/ai/ocr/index?id=' + id
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