var App = getApp()
Page({
  data: {
    mode:"single",//single,multi
    items:[],
    propid:"",//但eform值时有效
    _from:"" //点击来源：eform：来自eform模板
  },
  onLoad: function (option) {
      this.setData({
        mode:(option.mode || "single"),
        _from: (option.from || ""),
        propid: (option.propid || ""),
        p:option.p,
        uid:option.uid
      });
      this.listTeamUser();
  },
  listTeamUser:function(){
    var that = this;
    App.HttpServiceWork.teamUsers({token:App.getToken()}).then(data => {
        /*
         var ss = [];
         for(var i in json){
            json[i]["checked"] = (this.data.uid.indexOf(json[i].uid)>=0);
            ss.push(json[i]);
         }
         that.setData({
           items:ss
         });      
         */      
        that.setData({
          items: data
        });   
    });
  },
  doOK:function(){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];
    var _data = {};
    if (this.data._from === "eform"){
      _data[this.data.p] = { propid: this.data.propid,uid: this.data.selectedIds, nick: this.getSelectedNick(this.data.selectedIds) };
      prevPage.cb_selectuser(_data);
    }else{
      _data[this.data.p] = {uid:this.data.selectedIds,nick:this.getSelectedNick(this.data.selectedIds)};
      prevPage.setData(_data);
    }
    
    wx.navigateBack();
  },
  selectChange:function(e){
    var _v = e.detail.value;
    this.setData({
      selectedIds:_v
    });
  },
  getSelectedNick:function(obj){
    if(typeof obj === "object"){
        var nicks = [];
        for(var i in obj){
          nicks.push(this.getNick(obj[i]));
        }
        return nicks;
    }else if(typeof obj === "string"){
        return this.getNick(obj);
    }
  },
  getNick:function(uid){
    for(var i in this.data.items){
      if(this.data.items[i].uid === uid){
        return this.data.items[i].nick;
      }
    }
  }
})
