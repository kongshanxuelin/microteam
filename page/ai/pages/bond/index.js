//index.js

// 获取显示区域长宽
const device = wx.getSystemInfoSync()
const W = device.windowWidth
const H = device.windowHeight - 50

let cropper = require('../../../components/welCropper/welCropper.js');

const App = getApp();

Page({
  data: {
    height: H - 250,
    bonds: []
  },
  onLoad: function () {
    var that = this
    // 初始化组件数据和绑定事件
    cropper.init.apply(that, [W, H]);
  },
  shareQrCode: function () {
    var imageurl = App.Config.workPath + "r/wx/service/qrcode?path=bond";
    console.log("imageurl:", imageurl);
    wx.previewImage({
      current: imageurl,
      urls: [imageurl]
    })
  },
  goBondDetail: function (e) {
    var _id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/paper/index?type=bond&id=' + _id
    })
  },
  uploadFile2Server: function (_path) {
    var that = this;
    wx.showLoading({
      title: '正在识别...'
    })
    console.log("######upload url:" + App.Config.workPath + 'wx/upload');
    App.WxService.uploadFile({
      url: App.Config.workPath + 'wx/upload',
      filePath: _path,
      formData: {
        type: 'ocrtype',
      },
      name: 'file'
    }).then(res => {
      var ret = JSON.parse(res.data);
      App.log("upload finished:", ret);
      if (ret.res) {
        App.log("push file id:", ret.id);
        var fileId = ret.id;

        // that.setData({
        //   imageUrl: App.Config.uploadPath + ret.path
        // });

        that.data.bonds = JSON.parse(ret.ocr_r);
        console.log(that.data.bonds);


        that.setData({
          imageUrl: App.Config.uploadPath + ret.ocr_url,
          bonds: that.data.bonds
        });

        wx.hideLoading();
        that.hideCropper();

      }
    });
  },
  clickImage: function (e) {
    var src = e.target.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    });
  },
  selectTap(e) {
    let that = this
    let mode = e.currentTarget.dataset.mode
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const tempFilePath = res.tempFilePaths[0]
        console.log(tempFilePath)

        // 将选取图片传入cropper，并显示cropper
        // mode=rectangle 返回图片path
        // mode=quadrangle 返回4个点的坐标，并不返回图片。这个模式需要配合后台使用，用于perspective correction
        // let modes = ["rectangle", "quadrangle"]
        // let mode = modes[1]   //rectangle, quadrangle
        that.showCropper({
          src: tempFilePath,
          mode: mode,
          sizeType: ['original'],   //'original'(default) | 'compressed'
          callback: (res) => {
            if (mode == 'rectangle') {
              console.log("crop callback:" + res);
              
              // wx.previewImage({
              //   current: res,
              //   urls: [res]
              // });

              that.uploadFile2Server(res);
            }
           

            // that.hideCropper() //隐藏，我在项目里是点击完成就上传，所以如果回调是上传，那么隐藏掉就行了，不用previewImage
          }
        })
      }
    })
  }
})
