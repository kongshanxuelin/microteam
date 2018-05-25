const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    desc:"",  //功能描述
    descMap:{
    "ocr_car":"对准汽车拍照或者从相册中选取汽车，即刻得知汽车品牌和型号" ,
    "ocr_flower":"对准花花草草拍个照，即刻得知花草品种" ,
    "ptu_datoutie":"给自拍照来个大头贴吧~" ,
    "ptu_face":"想要成为大明星吧，选个自拍照，选个角色，当主角吧~" ,
    "ptu_huazhuang":"给照片上各种美妆，只需要选个自拍照即刻" ,
    "ptu_yanzhi": "选张美图测测颜值吧~" ,
    "face_compare_age": "选两张图片，检测下基因相似度~" ,
    "face_check": "选个没找测测年龄吧~看看您的实际年龄和颜照有多少差距~" ,
    "ocr_pic_scene": "请对准场景拍照" ,
    "ocr_isfood": "请对准美食拍照，即刻得知是否是美食" ,
    "ocr_pic_thing": "对准物体拍照，告诉您物体名称" 
    },
    result:"",  //返回结果
    imgurl:""   //返回图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id || "";
    this.desc = this.data.descMap[""+this.id];
    this.setData({
      id: this.id,
      desc: this.desc
    });
  },
  clickImage: function (e) {
    var src = e.target.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    });
  },
  shareQrCode: function () {
    var imageurl = App.Config.workPath + "r/wx/service/qrcode?path=ai_"+this.data.id;
    wx.previewImage({
      current: imageurl,
      urls: [imageurl]
    })
  },
  selectTap(e) {
    let that = this
    let mode = e.currentTarget.dataset.mode
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        if (res.tempFilePaths.length == 1) {
          var _path = res.tempFilePaths[0];
          that.uploadFile2Server(_path);
        }
      }
    })
  },
  uploadFile2Server: function (_path) {
    var that = this;
    that.setData({
      imgurl: _path
    });
    wx.showLoading({
      title: '正在分析图片...'
    })
    App.WxService.uploadFile({
      url: App.Config.workPath + 'wx/upload',
      filePath: _path,
      formData: {
        type: 'ai_'+this.data.id,
      },
      name: 'file'
    }).then(res => {
      var ret = JSON.parse(res.data);
      if (ret.res) {
        var fileId = ret.id;
        if (this.data.id === "ptu_datoutie" || this.data.id === "ptu_face" || this.data.id === "ptu_huazhuang" || this.data.id === "ptu_yanzhi"){
          that.setData({
            imgurl: ret.result,
            result: ""
          });
        }else{
          that.setData({
            imgurl: App.Config.uploadPath + ret.path,
            result: ret.result
          });
        }
        
        wx.hideLoading();
      }
    });
  }
})