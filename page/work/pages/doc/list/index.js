import { $wuxButton,$wuxDialog } from '../../../../components/wux'
const App = getApp();
Page({
  data: {
    cate:"",
    pid:"",
    doc:{},
    docList:[]
  },

  initButton(position = 'bottomRight') {
    var that = this;
    this.button = $wuxButton.init('br', {
      position: position,
      buttons: [
        {
          label: '创建文件夹',
          icon: "data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEkElEQVRoQ92aj3EUOwzGpQoeVABUQKgAqABSAVABUAGkAqCCBxUAFUAqACqAVECoQMxvkQ7tZr32+vby4HnmJju5s61Pfz7J8qpsMMzsiojcE5HrInLH//KcxzcR4fPR/75X1fN9t9feBVzoByLyUESOOtf5LCKvReRNL5jVAMwMzT52wdF8jPcigkBo+ FxVed4NMwMkv8dCPGOxGFgCIK9UFSs1j1UAzOyZiDxxQdjklI1Vlc1XDzPDenxu + 2SAvFTVk9bFmgC49v5NroK2n6zVVkkot+ rLZBWsd9yyfhWAa + mFa / 0MjakqbrL5MDPcC2teww1F5GnNuosAXHg0z3jjWt+ bOZaQOzlgDQiC8WgJRBHARHg0waKXNsyMWMPyiyBmAUyEX9TAIRFN5CAm3k33uwDAA/aD+/yla34qYLIErntrGthzAD4525BcoLj/ fJgZgU1MfFbVW1mgEQAzey4icD1sc9SbHbdG7IENtcJOJ6qKnMPYAXAuRvtky7uHospecE6xuPbIlTIAWIYSgSLrfu9Gh5xnZgQxJcjOCgMAN9FX1/6Nlgx4SEFLa7uXICdWQM7zABCce6qqZMM/dpgZVQC100DvASCYZy/ ONzMST7gfRV5TUbZmXsoNAyOpu8/3IaJVq7XRgnkjhvJPRowxN9fMVs8zM/O1rgIArqfe2St4zQwlwGDB01j1m6reWPLHnnnJjY4BEBqoaqsiCIH1zwTAmapOj5ajZcxs9byUr04AEEGxF/eXXEFE3k1PZxlBpwtBNOSEUwBAS2iJOmN0DGylokkS/OHzQjEcL2fdaGbecLTMmbYQNxxJf7loBMSeAYw20MqofsruMaccM5ud16K4ndz7AkgpHs1fz/VTKsI4rJNrdmNp3mUDCBe8UHp7aT7LRsl1u0r2TSyQq9cS25gZbRKqyF2MtcyrWSEDuLDBQrKKTAvfQ7/RYiky2IRlhrZJy7wKZUcQnzXTaIHu2GcxASZtT2XqTpwpfgYabUpkhYyJUIvVa++8igXi4DUksqZSoidjeqm+OtM2 + H / kmKGUwJ + rxVzBFarlR++8igV+ F3OuJTLwzVoTyYWJg341Y4YQvfMKWTg85ouqHk0PNN2BVTP7Vt+n7D060OBG0CnV5N9wpNxl / blDPdXj8VYa23IdM3vrJ77xod7jgIqUWMAKe5XWWwqd4ihKaLRPz2q4CCk1tviS1H/QTnQrUGdKaiqUPN/YSkiDkWCZR62bHPJ3yXUG5sl7lZq7JApcqatS3BJMyiMj14k9/n/t9eRKkTD4F/ dhr7bUbG0tv1CMJm6xX7XmiokWNy510MD2gKXNEw2yviumZAkWQnhiAnZiwUNe8iE8bIPPc6F44VZmMYgL9QcLshD1EoNnrLHqUrrkNt6dyG3JL1igZf1VrURnBE5hWIOBJaBbbjBXDzOLVxWioYzWuejeXWDUFl0FIGVsQBDkASTAAIjPj8KrBvweYeMT8g2CuzJWWXU1gBQbFIDxqkC4Vk1h0+ 9xFQSn/uoih24AWRJnjniJI163oRORB/du8brN8FJIr9B50Z/ cy68g7J / c9AAAAABJRU5ErkJggg ==",
        },
        {
          label: '添加文件',
          icon: "data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEkElEQVRoQ92aj3EUOwzGpQoeVABUQKgAqABSAVABUAGkAqCCBxUAFUAqACqAVECoQMxvkQ7tZr32+vby4HnmJju5s61Pfz7J8qpsMMzsiojcE5HrInLH//KcxzcR4fPR/75X1fN9t9feBVzoByLyUESOOtf5LCKvReRNL5jVAMwMzT52wdF8jPcigkBo+ FxVed4NMwMkv8dCPGOxGFgCIK9UFSs1j1UAzOyZiDxxQdjklI1Vlc1XDzPDenxu + 2SAvFTVk9bFmgC49v5NroK2n6zVVkkot+ rLZBWsd9yyfhWAa + mFa / 0MjakqbrL5MDPcC2teww1F5GnNuosAXHg0z3jjWt+ bOZaQOzlgDQiC8WgJRBHARHg0waKXNsyMWMPyiyBmAUyEX9TAIRFN5CAm3k33uwDAA/aD+/yla34qYLIErntrGthzAD4525BcoLj/ fJgZgU1MfFbVW1mgEQAzey4icD1sc9SbHbdG7IENtcJOJ6qKnMPYAXAuRvtky7uHospecE6xuPbIlTIAWIYSgSLrfu9Gh5xnZgQxJcjOCgMAN9FX1/6Nlgx4SEFLa7uXICdWQM7zABCce6qqZMM/dpgZVQC100DvASCYZy/ ONzMST7gfRV5TUbZmXsoNAyOpu8/3IaJVq7XRgnkjhvJPRowxN9fMVs8zM/O1rgIArqfe2St4zQwlwGDB01j1m6reWPLHnnnJjY4BEBqoaqsiCIH1zwTAmapOj5ajZcxs9byUr04AEEGxF/eXXEFE3k1PZxlBpwtBNOSEUwBAS2iJOmN0DGylokkS/OHzQjEcL2fdaGbecLTMmbYQNxxJf7loBMSeAYw20MqofsruMaccM5ud16K4ndz7AkgpHs1fz/VTKsI4rJNrdmNp3mUDCBe8UHp7aT7LRsl1u0r2TSyQq9cS25gZbRKqyF2MtcyrWSEDuLDBQrKKTAvfQ7/RYiky2IRlhrZJy7wKZUcQnzXTaIHu2GcxASZtT2XqTpwpfgYabUpkhYyJUIvVa++8igXi4DUksqZSoidjeqm+OtM2 + H / kmKGUwJ + rxVzBFarlR++8igV+ F3OuJTLwzVoTyYWJg341Y4YQvfMKWTg85ouqHk0PNN2BVTP7Vt+n7D060OBG0CnV5N9wpNxl / blDPdXj8VYa23IdM3vrJ77xod7jgIqUWMAKe5XWWwqd4ihKaLRPz2q4CCk1tviS1H/QTnQrUGdKaiqUPN/YSkiDkWCZR62bHPJ3yXUG5sl7lZq7JApcqatS3BJMyiMj14k9/n/t9eRKkTD4F/ dhr7bUbG0tv1CMJm6xX7XmiokWNy510MD2gKXNEw2yviumZAkWQnhiAnZiwUNe8iE8bIPPc6F44VZmMYgL9QcLshD1EoNnrLHqUrrkNt6dyG3JL1igZf1VrURnBE5hWIOBJaBbbjBXDzOLVxWioYzWuejeXWDUFl0FIGVsQBDkASTAAIjPj8KrBvweYeMT8g2CuzJWWXU1gBQbFIDxqkC4Vk1h0+ 9xFQSn/uoih24AWRJnjniJI163oRORB/du8brN8FJIr9B50Z/ cy68g7J / c9AAAAABJRU5ErkJggg ==",
        },
        {
          label: '拍照',
          icon: "data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEkElEQVRoQ92aj3EUOwzGpQoeVABUQKgAqABSAVABUAGkAqCCBxUAFUAqACqAVECoQMxvkQ7tZr32+vby4HnmJju5s61Pfz7J8qpsMMzsiojcE5HrInLH//KcxzcR4fPR/75X1fN9t9feBVzoByLyUESOOtf5LCKvReRNL5jVAMwMzT52wdF8jPcigkBo+ FxVed4NMwMkv8dCPGOxGFgCIK9UFSs1j1UAzOyZiDxxQdjklI1Vlc1XDzPDenxu + 2SAvFTVk9bFmgC49v5NroK2n6zVVkkot+ rLZBWsd9yyfhWAa + mFa / 0MjakqbrL5MDPcC2teww1F5GnNuosAXHg0z3jjWt+ bOZaQOzlgDQiC8WgJRBHARHg0waKXNsyMWMPyiyBmAUyEX9TAIRFN5CAm3k33uwDAA/aD+/yla34qYLIErntrGthzAD4525BcoLj/ fJgZgU1MfFbVW1mgEQAzey4icD1sc9SbHbdG7IENtcJOJ6qKnMPYAXAuRvtky7uHospecE6xuPbIlTIAWIYSgSLrfu9Gh5xnZgQxJcjOCgMAN9FX1/6Nlgx4SEFLa7uXICdWQM7zABCce6qqZMM/dpgZVQC100DvASCYZy/ ONzMST7gfRV5TUbZmXsoNAyOpu8/3IaJVq7XRgnkjhvJPRowxN9fMVs8zM/O1rgIArqfe2St4zQwlwGDB01j1m6reWPLHnnnJjY4BEBqoaqsiCIH1zwTAmapOj5ajZcxs9byUr04AEEGxF/eXXEFE3k1PZxlBpwtBNOSEUwBAS2iJOmN0DGylokkS/OHzQjEcL2fdaGbecLTMmbYQNxxJf7loBMSeAYw20MqofsruMaccM5ud16K4ndz7AkgpHs1fz/VTKsI4rJNrdmNp3mUDCBe8UHp7aT7LRsl1u0r2TSyQq9cS25gZbRKqyF2MtcyrWSEDuLDBQrKKTAvfQ7/RYiky2IRlhrZJy7wKZUcQnzXTaIHu2GcxASZtT2XqTpwpfgYabUpkhYyJUIvVa++8igXi4DUksqZSoidjeqm+OtM2 + H / kmKGUwJ + rxVzBFarlR++8igV+ F3OuJTLwzVoTyYWJg341Y4YQvfMKWTg85ouqHk0PNN2BVTP7Vt+n7D060OBG0CnV5N9wpNxl / blDPdXj8VYa23IdM3vrJ77xod7jgIqUWMAKe5XWWwqd4ihKaLRPz2q4CCk1tviS1H/QTnQrUGdKaiqUPN/YSkiDkWCZR62bHPJ3yXUG5sl7lZq7JApcqatS3BJMyiMj14k9/n/t9eRKkTD4F/ dhr7bUbG0tv1CMJm6xX7XmiokWNy510MD2gKXNEw2yviumZAkWQnhiAnZiwUNe8iE8bIPPc6F44VZmMYgL9QcLshD1EoNnrLHqUrrkNt6dyG3JL1igZf1VrURnBE5hWIOBJaBbbjBXDzOLVxWioYzWuejeXWDUFl0FIGVsQBDkASTAAIjPj8KrBvweYeMT8g2CuzJWWXU1gBQbFIDxqkC4Vk1h0+ 9xFQSn/uoih24AWRJnjniJI163oRORB/du8brN8FJIr9B50Z/ cy68g7J / c9AAAAABJRU5ErkJggg ==",
        }
      ],
      buttonClicked(index, item) {
        App.log(index, item);
        if (index == 0) {
          that.createFolder();
        }else if(index == 1){
          that.addFileFromAlbum();
        } else if (index == 2) {
          that.addFileFromCamera();
        }
        return true
      }
    })
  },
  showList: function () {
    var that = this;
    App.HttpServiceWork.docShareList({
      "token": App.getToken(),
      "cate": this.data.cate,
      "pid":this.data.pid
    }).then(json => {
      App.log("showlist:", json);
      that.setData({
        docList: json
      });
    });
  },
  onLoad(option){
    var pid = option.pid || "";
    var cate = option.cate || "3";
    this.setData({
      "pid":pid,
      "cate":cate
    });
    if (this.data.pid === "myfolder"){
      this.setData({
        doc:{ doc:{title:"我的文件夹"}}
      });
    } else if (this.data.pid === "mysharefolder") {
      this.setData({
        doc: { doc:{title: "我的共享文件夹"} }
      });
    }else{
      this.docInfo(pid);
    }
    this.initButton();

    this.showList();
  },
  uploadFile2Server: function (_path) {
    var that = this;
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
        var fileId = ret.id;
        App.HttpServiceWork.docAddFile({
          "token": App.getToken(),
          "cate": that.data.cate,
          "scope": "",
          "pid": that.data.pid,
          "fid": fileId
        }).then(json => {
          that.showList();
        });
      }
    });
  },
  addFileFromAlbum: function () {
    var that = this;
    wx.chooseImage({
      sourceType: ['album'],
      sizeType: ['compressed'],
      count: 1,
      success: function (res) {
        App.log("res.tempFilePaths type:", typeof (res.tempFilePaths), res.tempFilePaths)
        if (res.tempFilePaths.length == 1){
          var _path = res.tempFilePaths[0];
          that.uploadFile2Server(_path);
        }
      }
    });
  },
  addFileFromCamera: function () {
    var that = this;
    wx.chooseImage({
      sourceType: ['camera'],
      sizeType: ['compressed'],
      count: 1,
      success: function (res) {
        App.log("res.tempFilePaths type:", typeof (res.tempFilePaths), res.tempFilePaths)
        if (res.tempFilePaths.length == 1) {
          var _path = res.tempFilePaths[0];
          that.uploadFile2Server(_path);
        }
      }
    });
  },
  showMoreMenu:function(e){
    var docId = e.target.dataset.id;
    var isfile = e.target.dataset.isfile;
    var that = this;
    wx.showActionSheet({
      itemList: ['删除','重命名'],
      success: function (res) {
        if (res.tapIndex == 0) {
          App.confirm("你确定要删除该" + (isfile == '0' ? '文件夹' : '文件')+"吗？",function(){
            App.HttpServiceWork.docFileRemove({
              "token": App.getToken(),
              "id": docId
            }).then(json => {
              that.showList();
            });
          });
        } else if (res.tapIndex == 1) {
          $wuxDialog.prompt({
            title: '提示',
            content: '输入新名称',
            fieldtype: 'text',
            password: false,
            defaultText: '',
            placeholder: '请输入' + (isfile=='0'?'文件夹':'文件')+'名',
            maxlength: 48,
            onConfirm(e) {
              const value = that.data.$wux.dialog.prompt.response;
              if (value != "") {
                App.HttpServiceWork.docFileRename({
                  "token": App.getToken(),
                  "id": docId,
                  "title":value
                }).then(json => {
                  that.showList();
                });
              }
            }
          });
        }
      }
    });

  },
  previewFile:function(e){
    var src = e.target.dataset.src;
    var ext = e.target.dataset.ext;
    wx.showLoading({
      title: '正在加载文件',
    });
    if(ext === "1"){ //语音
      wx.downloadFile({
        url: src,
        success: function (res) {
          wx.hideLoading();
          wx.playVoice({
            filePath: res.tempFilePath
          })
        }
      })
    }else{
      wx.downloadFile({
        url: src,
        success: function (res) {
          wx.hideLoading();
          var filePath = res.tempFilePath;
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              App.log('打开文档成功', filePath)
            }
          })
        }
      })
    }
  },
  previewImage:function(e){
    var src = e.target.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    });
  },
  navFolder:function(e){
    var pid = e.target.dataset.id;
    App.WxService.navigateTo('/pages/working/doc/list/index?cate='+this.data.cate+'&pid='+pid);
  },
  docInfo:function(id){
    var that = this;
    App.HttpServiceWork.docShareGet({
      "token": App.getToken(),
      "id": id
    }).then(json => {
      App.log(json);
      that.setData({
        doc:json
      });
    });
  },
  createFolder: function () {
    const that = this
    $wuxDialog.prompt({
      title: '提示',
      content: '文件夹名称',
      fieldtype: 'text',
      password: false,
      defaultText: '',
      placeholder: '请输入文件夹名称',
      maxlength: 48,
      onConfirm(e) {
        const value = that.data.$wux.dialog.prompt.response;
        if (value != "") {
          App.HttpServiceWork.docShareAddFolder({
            "token": App.getToken(),
            "cate": that.data.cate,
            "scope": "",
            "pid": that.data.pid,
            "title": value
          }).then(json => {
            that.showList();
          });
        } else {
          App.alert("添加失败，名称不能为空!");
        }
      },
    })
  }
});