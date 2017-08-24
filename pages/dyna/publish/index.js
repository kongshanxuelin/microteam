const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    fileIds: [],//上传的文件ID列表
    content:"",
    addr:"",
    viewScope:"公开",
    uploadPath: App.Config.uploadPath
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  changeContent:function(e){
     this.setData({
       content: e.detail.value
     });
  },
  pubQuan:function(){
    var that = this;
    this.uploadFile2Server(function () {
      App.HttpServiceWork.dynaPublish({
        "req.token": App.getToken(),
        "req.content": that.data.content,
        "req.fileIds": that.data.fileIds.join(","),
        "req.addr": that.data.addr,
        "req.scope": that.data.viewScope
      }).then(json => {
        console.log("pub finsih:",json);
        if(json.ret){
          wx.switchTab({
            url: '/pages/dyna/index'
          }); 
        }else{
          App.alert("发布失败！");
        }
      });
    });

  },
  //选择位置
  chooseLoc: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (obj) {
        that.setData({
          addr: obj.address
        })
      }
    });
  },
  removeImage: function (e) {
    var current = e.target.dataset.src;
    for (var i = 0; i < this.data.imageList.length; i++) {
      if (current === this.data.imageList[i]) {
        this.data.imageList.splice(i, 1);
      }
    }
    this.setData({
      imageList: this.data.imageList
    });
  },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    });
  },

  chooseAlbum:function(){
    var that = this
    wx.chooseImage({
      sourceType: ['camera'],
      sizeType: ['compressed'],
      count: 9,
      success: function (res) {
        App.log("res.tempFilePaths type:", typeof (res.tempFilePaths), res.tempFilePaths)
        that.data.imageList = that.data.imageList.concat(res.tempFilePaths);
        if (that.data.imageList.length>9){
          that.data.imageList = that.data.imageList.splice(0,9);
        }
        that.setData({
          imageList: that.data.imageList
        })
      }
    });
  },
  chooseCamera:function(){
    App.log("chooseCamera");
    var that = this;
    wx.chooseImage({
      sourceType: ['album'],
      sizeType: ['compressed'],
      count: 9,
      success: function (res) {
        that.data.imageList = that.data.imageList.concat(res.tempFilePaths);
        if (that.data.imageList.length > 9) {
          that.data.imageList = that.data.imageList.splice(0, 9);
        }
        that.setData({
          imageList: that.data.imageList
        })
      }
    });
  },
  uploadFile2Server: function (cb) {
    var that = this;
    console.log(this.data.imageList);
    if (this.data.imageList.length > 0) {
      var _path = this.data.imageList.shift();
      console.log("upload file:",_path);
      wx.showToast({
        title: '正在上传...',
        icon: 'success'
      })
      App.WxService.uploadFile({
        url: App.Config.workPath + 'wx/upload',
        filePath: _path,
        name: 'file'
      }).then(res => {
        var ret = JSON.parse(res.data);
        App.log("upload finished:", ret);
        if (ret.res) {
          App.log("push file id:", ret.id);
          that.data.fileIds.push(ret.id);
          that.setData({
            fileIds: that.data.fileIds
          });
        }
        that.uploadFile2Server(cb);
      });
    } else {
      wx.hideToast();
      cb();
    }
  }
})