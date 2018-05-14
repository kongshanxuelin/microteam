
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:"http://h5.sumslack.com/bond_d.jpg",
    bonds: []
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  shareQrCode:function(){
    var imageurl = App.Config.workPath + "r/wx/service/qrcode?path=bond";
    console.log("imageurl:",imageurl);
    this.setData({
      imageUrl: imageurl
    });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  
  clickImage:function(e){
      // var zuobiao = e.detail;
      // this.getBondIndex(zuobiao);
    var src = e.target.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    });
  },

  getBondIndex:function(zuobiao){
    
    
    var x = zuobiao.x - 5;
    var y = zuobiao.y - 5;
    console.log(zuobiao);
    for(var i=0;i<json.length;i++){
      var location = json[i].location;
      if(this.isInRect(x,y,location)){
        console.log("selected:"+i);
        wx.showToast({
          title: JSON.stringify(json[i].bonds),
          icon: 'success',
          duration: 10000
        });
      }
    } 
  },

  isInRect:function(x,y,rect){
    return x>=rect.left && x<=(rect.left+rect.width)
      && y>=rect.top && y<=(rect.top+rect.height);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  addFileFromCamera: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['拍照', '相册中选'],
      success: function (res) {
        switch(res.tapIndex){
          case 0:
            wx.chooseImage({
              sourceType: ['camera'],
              sizeType: ['compressed'],
              count: 1,
              success: function (res) {
                that.data.imageUrl = res.tempFilePaths;
                if (res.tempFilePaths.length == 1) {
                  var _path = res.tempFilePaths[0];
                  that.uploadFile2Server(_path);
                }
              }
            });
            break;
          case 1:
            wx.chooseImage({
              sourceType: ['album'],
              sizeType: ['compressed'],
              count: 1,
              success: function (res) {
                that.data.imageUrl = res.tempFilePaths;
                if (res.tempFilePaths.length == 1) {
                  var _path = res.tempFilePaths[0];
                  that.uploadFile2Server(_path);
                }
              }
            });
            break;
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    });


    
    
  },
  goBondDetail:function(e){
    var _id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/paper/index?type=bond&id='+_id
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
      formData:{
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

      }
    });
  }
})