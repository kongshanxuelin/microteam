const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    showPicker:false, //是否选择下拉框
    list:[],
    selectTip:"",
    index:0,//list当前选择的索引
    tmpPath:"",//最后一次选取的图片路径
    ta:"",//额外参数
    desc:"",  //功能描述
    descMap:{
    "ocr_car":"对准汽车拍照，即刻得知全球汽车品牌和型号" ,
    "ocr_flower":"对准花花草草拍个照，即刻得知花草品种" ,
    "ptu_datoutie":"给自拍照来个大头贴吧~" ,
    "ptu_face":"想要成为大明星吧，选个自拍照，选个角色，当主角吧~" ,
    "ptu_huazhuang":"给照片上各种美妆，只需要选个自拍照即刻" ,
    "ptu_yanzhi": "选张美图测测颜值吧~" ,
    "face_compare_age": "选两张图片，检测下基因相似度~" ,
    "face_check": "选个自拍照测测年龄吧~看看您的实际年龄和颜照有多少差距~" ,
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
    var that = this;
    this.id = options.id || "";
    this.desc = this.data.descMap[""+this.id];
    this.setData({
      id: this.id,
      desc: this.desc,
      selectTip: (this.id === "ptu_datoutie" ? "大头贴纸" : (this.id === "ptu_huazhuang" ? "妆容" : (this.id === "ptu_face" ? "扮演角色" : "")))
    });
    if (this.id === "ptu_datoutie" || this.id === "ptu_huazhuang" || this.id === "ptu_face"){
      App.HttpServiceWork.aiList({
        "token": App.getToken(),
        "action": this.id
      }).then(json => {
        that.setData({
          showPicker:true,
          list: json
        });
      });
    }
  },
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value,
      ta:this.data.list[e.detail.value].code
    });
    if (this.data.tmpPath!=""){
      this.uploadFile2Server(this.data.tmpPath);
    }
  },
  clickImage: function (e) {
    var src = e.target.dataset.src;
    if (src == "" || src.length < 1) return;
    wx.previewImage({
      current: src,
      urls: [src]
    });
  },
  previewImg:function(url){
    wx.previewImage({
      current: url,
      urls: [url]
    });
  },
  shareQrCode: function () {
    // var imageurl = App.Config.workPath + "r/wx/service/qrcode?path=ai_"+this.data.id;
    // wx.previewImage({
    //   current: imageurl,
    //   urls: [imageurl]
    // })
    wx.showModal({
      title: '提示',
      content: '点击图片，将预览图发送给朋友或分享到朋友圈即可!',
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
          that.setData({
            tmpPath:_path
          });
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
    console.log("start upload file:"+_path)
    //console.log(wx.uploadFile, App.WxService.uploadFile)
    App.WxService.uploadFile({
      url: App.Config.workPath + 'wx/upload',
      filePath: _path,
      formData: {
        "type": 'ai_'+this.data.id,
        "ta":that.data.ta
      },
      name: 'file'
    }).then(res => {
      var ret = JSON.parse(res.data);
      console.log("ret:",ret)
      if (ret.res) {
        var fileId = ret.id;
        that.setData({
          result: ret.result
        });
        if (ret.path){
          that.setData({
            imgurl: App.Config.uploadPath + ret.path
          });
          that.previewImg(App.Config.uploadPath + ret.path);
        }
        wx.hideLoading();
      }
    });
  }
})