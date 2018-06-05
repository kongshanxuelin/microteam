import polyfill from 'assets/plugins/polyfill'
import WxValidate from 'helpers/WxValidate'
import HttpResource from 'helpers/HttpResource'
import HttpService from 'helpers/HttpService'
import HttpServicePaper from 'helpers/HttpServicePaper'
import HttpServiceWork from 'helpers/HttpServiceWork'
import WxService from 'helpers/WxService'
import Tools from 'helpers/Tools'
import Config from 'etc/config'
App({
  onLaunch: function (options) {
    if (options.query.scene && options.query.scene!=""){
      this.log("app launch:", decodeURIComponent(options.query.scene));
      this.globalData.scene = decodeURIComponent(options.query.scene);
      //如果是通过识别小程序码进来的
      if (this.globalData.scene!="") return;
    }
    var that = this;    
    wx.getNetworkType({
      success: function(res) {
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType;
        that.globalData.networkType = networkType;
      }
    });
    //侦听网络变化
    if(wx.onNetworkStatusChange){
      wx.onNetworkStatusChange(function(res) {
        that.globalData.networkType = res.networkType;
      });
    }
    /*设置用户信息全局变量
    this.getUserInfo().then(data=>{
      //that.log("global userinfo:", that.globalData.userInfo);
    });
    */

    /*
    *登录步骤：
    1：用wx.checkSession检查登录态
    2：fail：利用wx.login根据code换取token
    3：success：判断缓存是否有user，远程检测token合法性
    4：判断当前用户是否在某个团队，某种提示创建团队，拉人进入
    */
    //检查登录态
    wx.checkSession({
        success: function(){
          //缓存token
          that.globalData.user = that.getCache("user");

          // if (options.query && options.query.scene) {
          //   return;
          // }

          if (that.globalData.user.user && that.globalData.user.user.teamId != ""){
            that.putCache("teamId", that.globalData.user.user.teamId);
            that.putCache("teamName", that.globalData.user.user.teamName);
          }
          if((typeof that.globalData.user === "undefined") || (that.globalData.user === "")){
              that.login();
          }else{
              that.log("that.globalData.token:", that.getToken());
              that.calUserFromServer();
          }
      },
      fail: function(){
        that.log("强制重新从服务端换取token，因为session_key已经过期");
        that.login();
      }
    });
  },
  calUserFromServer:function(){
    var that = this;
    that.HttpService.checkLogin({ token: that.getToken() }).then(
      data => {
        if (!data.res) {
          that.login();
        }
        if (data.user && that.globalData.user.user) {
          that.log("get user from server:", data.user);
          that.globalData.user.user = data.user;
          that.putCache("user", that.globalData.user);
          setTimeout(function () {
            that.launchStartPage();
          }, 500);
        }
      }
    );
  },
  login:function(){
    var that = this;
    this.log("login func start...", that.globalData.scene);
    //调取个人资料
    this.getUserInfo().then(data=>{
        wx.login({
            success: function(res) {
              var _shareTeamId = "";
              if (that.globalData.scene.indexOf("s.team=") >= 0) {
                _shareTeamId = that.globalData.scene.substring("s.team=".length, that.globalData.scene.length);
                that.log("app launch teamid:", _shareTeamId);
              }
              if (res.code) {
                wx.request({
                  url: that.Config.basePath+ 'auth/wx_login.jhtml',
                  data: {
                    code: res.code,
                    nickName:that.globalData.userInfo.nickName,
                    avatarUrl:that.globalData.userInfo.avatarUrl,
                    teamid: _shareTeamId
                  },
                  header: {
                      'content-type': 'application/json'
                  },
                  success: function(res) {
                    if(res.statusCode === 200){
                        that.globalData.user = res.data;
                        if (that.globalData.user.user && that.globalData.user.user.teamId && that.globalData.user.user.teamId != "") {
                          that.putCache("teamId", that.globalData.user.user.teamId);
                          that.putCache("teamName", that.globalData.user.user.teamName);
                        }
                        that.putCache("user",res.data);
                        that.launchStartPage();
                    }
                  }
                })
              } else {
                that.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          });
    });
  },
  launchStartPage(){
      var user = this.globalData.user;
      this.log("launchStartPage",user);
      if (typeof(user.user.teamId) == "undefined" || user.user.teamId === ""){
          wx.redirectTo({
            url: '/pages/starter/starter?action=createTeam',
          })
      }else{
        wx.switchTab({
          url: '/pages/index/index',
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onShow();
          }
        }); 
      }
  },
  getUserInfo() {
		return this.WxService.login()
		.then(data => {
			return this.WxService.getUserInfo()
		})
		.then(data => {
			this.globalData.userInfo = data.userInfo
			return this.globalData.userInfo
		})
	},
  alert(msg,cb){
    // wx.showToast({
    //   title: msg,
    //   icon: 'success'
    // });

    wx.showModal({
      title: '提示',
      content: msg,
      showCancel:false,
      success:function(res){
        if(typeof cb === "function"){
          cb();
        }
      }
    })
  },
  confirm(msg,cb){
    wx.showModal({
      title: '提示',
      content: msg,
      success: function (res) {
        if (res.confirm) {
          if(typeof cb === "function"){
            cb();
          }
        }
      }
    });
  },
  getCache(_key){
    return wx.getStorageSync(_key);
  },
  putCache(_key,_value){
    wx.setStorageSync(_key,_value);
  },
  getCacheAsyn(_key,cb){
    wx.getStorage({
      key: _key,
      success: function (res) {
        if(typeof cb === "function"){
          cb(res);
        }
      }
    })
  },
  setCacheAsyn(_key,_value,cb) {
    wx.setStorage({
      key: _key,
      data: _value,
      success:function(res){
        if (typeof cb === "function") {
          cb(res);
        }
      }
    })
  },
  globalData:{
    userInfo:null,
    ws:null,
    scene:"" //进入应用的场景
  },
  getToken(){
      var _token =  "";
      if (this.globalData.user){
        _token = this.globalData.user.token;
      }
      if (typeof _token === "undefined" || _token === ""){
        _token = this.getCache("user").token;
        this.globalData.user.token = _token;
      }
      return _token;
  },
  getCurrentTeam(){
    if (typeof this.globalData.user == "undefined"){
      return null;
    }
    var _user = this.globalData.user.user;
    if ( typeof _user === "undefined") {
      _user = this.getCache("user").user;
    }
    if (_user.teamId && _user.teamId!="") {
      return { teamId: _user.teamId, teamName: _user.teamName};
    }
    return null;
  },
  getCurrentUserId(){
    var _user = this.globalData.user.user;
    return _user.uid;
  },
  getCurrentUserTeamIsAdmin(){
    var _user = this.globalData.user.user;
    var _teamId = _user.teamId;
    var teamList = _user.teamList;
    for (var i in teamList){
      var _t = teamList[i];
      if (_t && _t.team && (_t.team.id === _teamId)){
        for (var j in _t.members){
          var _u = _t.members[j];
          if(_u.uid === _user.uid){
            if (_u.role === "owner" || _u.role === "admin"){
              return true;
            }
          }
        }
      }
    }
    return false;
  },
  log(msg1,msg2,msg3){
    if(typeof msg3 != "undefined"){
        console.log("***info****", msg1,msg2,msg3);
    }else if (typeof msg2 != "undefined") {
        console.log("***info****", msg1, msg2);
    }else{
        console.log("***info****", msg1);
    }
  },
  WxValidate: (rules, messages) => new WxValidate(rules, messages), 
	HttpResource: (url, paramDefaults, actions, options) => new HttpResource(url, paramDefaults,      actions, options).init(), 
	HttpService: new HttpService, 
  HttpServicePaper: new HttpServicePaper,
  HttpServiceWork:new HttpServiceWork,
	WxService: new WxService, 
	Tools: new Tools, 
	Config: Config
})