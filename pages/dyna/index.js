import { $wuxButton } from '../../page/components/wux'
const App = getApp();
var util = require('../../utils/util.js')
Page({
  data: {
    userInfo: {}, // 存放用户信息
    scrolltop: 20, // 滚动轴TOP
    p:1,//当前滚动的页码
    dz_id:"",
    zan:"点赞",
    commentInput:"添加评论",
    commentFocus:false,  //评论输入框获取焦点
    showComment:false, //是否显示评论区
    animationData: {},
    animationData1: {}, // 发布按钮下滑动画
    page: {}, // 分页的对象，内含列表
    hasNext:false,
    nextPage:1,
    height:0,//高度
    cz_flag: false, // 控制点赞评论按钮
    cz_right: 0, // 点赞评论定位right
    cz_top: 80, // 点赞评论定位top
    cz_pinglunbox:80,
    animationData: {},
    animationData1: {}, // 发布按钮下滑动画
    animationData2: {} // 位置按钮下滑动画
  },
  bindAdd:function(){
    App.WxService.navigateTo('/pages/dyna/publish/index');
  },
  showList:function(cb){
    console.log(App.globalData.user.uid);
    var that = this;
    App.HttpServiceWork.dynaList({
      "token": App.getToken(),
      "p": this.data.p
    }).then(json => {
      App.log(json);
      if(typeof cb === "function"){
        cb();
      }
      if (json.page.result != null && json.page.result.length>0){
        for (var ii in json.page.result){
            var _item = json.page.result[ii];
            _item.niceTime = util.formatNiceTime(_item.dt);
            if (_item.openid === App.globalData.user.uid){
              _item.showDelete = true;
            }else{
              _item.showDelete = false;
            }
            if(_item.imageList && _item.imageList.length>0){
              for (var jj in _item.imageList){
                var _item2 = _item.imageList[jj];
                _item2.path = App.Config.uploadPath + _item2.path;
                _item2.spath = App.Config.uploadPath + _item2.spath;
                _item.imageList[jj] = _item2;
              }
            }
            json.page.result[ii] = _item;
        }
      }
      if(that.data.p <= 1){
        that.data.page.result = json.page.result;
        //缓存第一页内容
        App.setCacheAsyn("dynsList", json.page);
      }else{
        that.data.page.result = (that.data.page.result||[]).concat(json.page.result);
      }
      that.setData({
         page: that.data.page,
         hasNext:json.page.hasNext,
         nextPage: json.page.nextPage
      });
    });
  },
  initButton(position = 'bottomRight') {
    var that = this;
    this.button = $wuxButton.init('br', {
      position: position,
      buttons: [
        {
          label: '发布动态',
          icon: "data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEkElEQVRoQ92aj3EUOwzGpQoeVABUQKgAqABSAVABUAGkAqCCBxUAFUAqACqAVECoQMxvkQ7tZr32+vby4HnmJju5s61Pfz7J8qpsMMzsiojcE5HrInLH//KcxzcR4fPR/75X1fN9t9feBVzoByLyUESOOtf5LCKvReRNL5jVAMwMzT52wdF8jPcigkBo+ FxVed4NMwMkv8dCPGOxGFgCIK9UFSs1j1UAzOyZiDxxQdjklI1Vlc1XDzPDenxu + 2SAvFTVk9bFmgC49v5NroK2n6zVVkkot+ rLZBWsd9yyfhWAa + mFa / 0MjakqbrL5MDPcC2teww1F5GnNuosAXHg0z3jjWt+ bOZaQOzlgDQiC8WgJRBHARHg0waKXNsyMWMPyiyBmAUyEX9TAIRFN5CAm3k33uwDAA/aD+/yla34qYLIErntrGthzAD4525BcoLj/ fJgZgU1MfFbVW1mgEQAzey4icD1sc9SbHbdG7IENtcJOJ6qKnMPYAXAuRvtky7uHospecE6xuPbIlTIAWIYSgSLrfu9Gh5xnZgQxJcjOCgMAN9FX1/6Nlgx4SEFLa7uXICdWQM7zABCce6qqZMM/dpgZVQC100DvASCYZy/ ONzMST7gfRV5TUbZmXsoNAyOpu8/3IaJVq7XRgnkjhvJPRowxN9fMVs8zM/O1rgIArqfe2St4zQwlwGDB01j1m6reWPLHnnnJjY4BEBqoaqsiCIH1zwTAmapOj5ajZcxs9byUr04AEEGxF/eXXEFE3k1PZxlBpwtBNOSEUwBAS2iJOmN0DGylokkS/OHzQjEcL2fdaGbecLTMmbYQNxxJf7loBMSeAYw20MqofsruMaccM5ud16K4ndz7AkgpHs1fz/VTKsI4rJNrdmNp3mUDCBe8UHp7aT7LRsl1u0r2TSyQq9cS25gZbRKqyF2MtcyrWSEDuLDBQrKKTAvfQ7/RYiky2IRlhrZJy7wKZUcQnzXTaIHu2GcxASZtT2XqTpwpfgYabUpkhYyJUIvVa++8igXi4DUksqZSoidjeqm+OtM2 + H / kmKGUwJ + rxVzBFarlR++8igV+ F3OuJTLwzVoTyYWJg341Y4YQvfMKWTg85ouqHk0PNN2BVTP7Vt+n7D060OBG0CnV5N9wpNxl / blDPdXj8VYa23IdM3vrJ77xod7jgIqUWMAKe5XWWwqd4ihKaLRPz2q4CCk1tviS1H/QTnQrUGdKaiqUPN/YSkiDkWCZR62bHPJ3yXUG5sl7lZq7JApcqatS3BJMyiMj14k9/n/t9eRKkTD4F/ dhr7bUbG0tv1CMJm6xX7XmiokWNy510MD2gKXNEw2yviumZAkWQnhiAnZiwUNe8iE8bIPPc6F44VZmMYgL9QcLshD1EoNnrLHqUrrkNt6dyG3JL1igZf1VrURnBE5hWIOBJaBbbjBXDzOLVxWioYzWuejeXWDUFl0FIGVsQBDkASTAAIjPj8KrBvweYeMT8g2CuzJWWXU1gBQbFIDxqkC4Vk1h0+ 9xFQSn/uoih24AWRJnjniJI163oRORB/du8brN8FJIr9B50Z/ cy68g7J / c9AAAAABJRU5ErkJggg ==",
        }
      ],
      buttonClicked(index, item) {
        App.log(index,item);
        if(index == 0){
          that.bindAdd();
        }
        return true
      }
    })
  },
  onLoad: function () {
    //初始化右下角按钮
    this.initButton();

    var that = this
    this.setData({
      userInfo: App.globalData.user.user
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        });
      }
    });

    App.getCacheAsyn("dynsList",function(res){
      console.log("get cache:",res);
      if(res.data && res.data.length>0){
        that.setData({
          page: res.data,
          hasNext: res.data.hasNext,
          nextPage: res.data.nextPage
        });
      }
    });
  },
  onShow:function(){
    this.setData({
      p:1
    });
    this.showList();
  },
  donghua: function (topNum) // 发布按钮动画
  {
    var that = this
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 0,
    });
    animation.opacity(0).translateY(topNum + 5).step()
    that.setData({
      animationData1: animation.export()
    })
    setTimeout(function () {
      animation.opacity(1).step()
      that.setData({
        animationData1: animation.export()
      })
    }, 1500)
  },
  onPullDownRefresh: function () { //下拉刷新
    console.log("pulldown refresh trigger..")
    var that = this;
    this.setData({
      p: 1
    });
    this.showList(function(){
      wx.stopPullDownRefresh();
    });
  },
  onReachBottom:function(){
    if (this.data.hasNext){
      App.log("onreachebottom");
      this.setData({
        p: this.data.nextPage
      });
      this.showList();
    }
  },
  bindDele: function (e) { //删除文章
    var id = e.target.dataset.id;
    var that = this
    wx.showModal({
      content: '您确定要删除么？',
      success: function (res) {
        if (res.confirm) {
          App.HttpServiceWork.dynaRemove({
            "token": App.getToken(),
            "id": id
          }).then(json => {
            if(json.ret){
              that.renderQuan(id);
            }
          });
        }
      }
    });
  },
  renderQuan: function (id){
    var that = this;
    var ss = this.data.page.result;
    if (typeof ss === "object") {
      ss.forEach(function (elem, index) {
        if (elem.id === id) {
          var removed = ss.splice(index, 1);
        }
      });
      this.data.page.result = ss;
      this.setData({
        page: that.data.page
      });
    }
  },
  renderQuanRemoveComment:function(id,cid){
    var ss = this.data.page.result;
    if (typeof ss === "object") {
      ss.forEach(function (elem, index) {
        if (elem.id === id) {
          if (elem.comments && elem.comments.length>0){
            elem.comments.forEach(function (comm, index2) {
              if(comm.id === cid){
                var removed = elem.comments.splice(index2, 1);
              }
            });
          }
        }
      });
      this.data.page.result = ss;
      this.setData({
        page: this.data.page
      });
    }
  },
  renderQuanAddComment: function (id, thisComm) {
    var ss = this.data.page.result;
    if (typeof ss === "object") {
      ss.forEach(function (elem, index) {
        if (elem.id === id) {
          if (elem.comments && elem.comments.length > 0) {
              elem.comments.push(thisComm);
          }else{
              elem.comments = [thisComm];
          }
        }
      });
      this.data.page.result = ss;
      this.setData({
        page: this.data.page
      });
    }
  },
  previewImage: function (e) { // 展示图片
    var current = e.target.dataset.src;
    console.log(e.target.dataset.count);
    var count = [];
    for (var index in e.target.dataset.count){
      count.push(e.target.dataset.count[index].path);
    }
    wx.previewImage({
      current: current,
      urls: count
    });
  },
  bindAddCommentBlur:function(){
    this.setData({
      showComment: false,
      commentFocus: false
    });
  },
  bindAddComment:function(e){
    var that = this;
    var content = e.detail.value;
    App.HttpServiceWork.dynaAddComment({
      "token": App.getToken(),
      "id": this.data.dz_id,
      "content": content
    }).then(json => {
      App.log("bindAddComment", json);
      that.setData({
        showComment: false,
        commentFocus: false,
        commentContent: ""
      });
      that.renderQuanAddComment(that.data.dz_id,json.comment);
    });
  },
  bindPingLunA:function(e){
    var offsetTop = Math.floor(e.currentTarget.offsetTop);
    this.setData({
      showComment: true,
      commentFocus: true,
      commentInput: "添加评论",
      cz_pinglunbox: offsetTop + this.data.height
    });
  },
  bindPingLunB:function(e){
    var that = this;
    var commId = e.target.dataset.id;
    var fid = e.target.dataset.fid;
    //评论创建者
    var uid = e.target.dataset.create_uid;

    var offsetTop = Math.floor(e.currentTarget.offsetTop);
    App.log(offsetTop, this.data.height);
    this.setData({
      cz_pinglunbox: offsetTop + this.data.height
    });
    App.log("pinglunb:", uid,App.globalData.user);
    if(App.globalData.user.user.uid === uid){
      wx.showActionSheet({
        itemList: ['删除'],
        success: function (res) {
          if (res.tapIndex == 0){
            App.HttpServiceWork.removeComment({
              "token": App.getToken(),
              "id": commId
            }).then(json => {
              App.log("removeComment", json);
              that.renderQuanRemoveComment(fid, commId);
            });
          }
        }
      })
    }else{
      //App.log(commId,fid);
      this.setData({
        showComment: true,
        commentFocus: true,
        commentInput: "回复评论"
      });
    }
    
  },
  bindCaoZuo: function (e) {
    var that = this
    var dz_id = e.currentTarget.dataset.id;
    var offsetTop = Math.floor(e.currentTarget.offsetTop);
    that.setData({
      dz_id: dz_id,
      cz_top: offsetTop,
      cz_flag: true
    });
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
    });
    setTimeout(function () {
      animation.right(40).opacity(1).step()
      that.setData({
        animationData: animation.export()
      })
    }, 300)
    var timeout = setTimeout(function () {
      animation.top(0).right(0).opacity(0).step();
      that.setData({
        animationData: animation.export()
      });
    }, 5000);
  },
  bindDianZan: function (){
    App.HttpServiceWork.dynaLike({
      "token": App.getToken(),
      "id": this.data.dz_id,
      "sts": "like"
    }).then(json => {
      App.log("bindDianZan", json);
    });
  }
})
