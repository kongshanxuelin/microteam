var App = getApp()
var sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //Tabs
    tabs: ["收入", "支出"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    mWidth:0,

    cate_check:{},

    cate:{},
    cal:{}
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  inputje:function(e){
    var je = e.detail.value;
    this.data.cal.je = je;
    this.setData({
      cal:this.data.cal
    });
  },
  getCheckCid:function(){
    for (var k in this.data.cate_check) {
      if(this.data.cate_check[k]) return k;
    }
    return "";
  },
  checkCate:function(e){
    var _id = e.currentTarget.dataset.id;
    for (var k in this.data.cate_check){
      this.data.cate_check[k] = false;
    }
    this.data.cate_check[_id] = !this.data.cate_check[_id];
    this.setData({
      cate_check: this.data.cate_check
    })
  },
  onLoad: function (options) {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          mWidth: res.windowWidth,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    var _prjid = options.prjid || "";
    var _id = options.id || "";  //有ID的情况下，是保存操作
    
    this.data.cal.id = _id;
    this.data.cal.prjid = _prjid;

    this.setData({
      cal: this.data.cal
    });
    if (this.data.cal.id != ""){
     
      App.HttpServiceWork.projectCalsGet({
        "token": App.getToken(),
        "id":this.data.cal.id
      }).then(json => {
        console.log("cal get:",json);
        this.setData({
          cal: json,
          activeIndex: parseInt(json.d),
          sliderOffset: this.data.mWidth / this.data.tabs.length * parseInt(json.d)
        });
        this.data.cate_check[this.data.cal.cid] = true;
        this.setData({
          cate_check: this.data.cate_check
        });
        console.log("#####:", this.data.cate_check)

      });
    }
    //加载分类
    App.HttpServiceWork.projectCalsCate({
      "token": App.getToken()
    }).then(json => {
      console.log("cal cate:", json);
      this.setData({
        cate: json
      })
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
  
  },
  bindInputTaskContent: function (e) {
    this.data.cal.dd = e.detail.value;
    this.setData({
      cal: this.data.cal
    });
  },
  addCalIt:function(){
    this.data.cal.token = App.getToken();
    this.data.cal.d = this.data.activeIndex;
    this.data.cal.cid = this.getCheckCid();
    if (this.data.cal.cid === "") {
      App.alert("请选项一个 " + (this.data.cal.d == 0 ? "收入" : "支出") + " 费用类别!");
      return;
    }
    if(this.data.cal.id === ""){
      App.HttpServiceWork.projectCalsAdd(this.data.cal).then(json => {
        if(json.ret){
          App.WxService.redirectTo('/page/work/pages/project/detail/detail?tab=1&id=' + this.data.cal.prjid);
        }else{
          App.alert("添加失败！");
        }
      });
    }else{
      App.HttpServiceWork.projectCalsSave(this.data.cal).then(json => {
        if (json.ret) {
          console.log("goto:", '/page/work/pages/project/detail/detail?tab=1&id=' + json.zhang.prjid)
          App.WxService.redirectTo('/page/work/pages/project/detail/detail?tab=1&id=' + json.zhang.prjid);
        } else {
          App.alert("保存失败！");
        }
      });
    }
    
  }
})