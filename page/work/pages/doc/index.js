import { $wuxDialog } from '../../../components/wux'
const App = getApp();
Page({
  data: {
    innerDocList:[],
    shareDocList:[]
  },
  onLoad(){
    var that = this;
    this.showList("1");
    //加载公共演示目录
    App.HttpServiceWork.docListAllShare({
      "token": App.getToken()
    }).then(json => {
      that.setData({
        shareDocList: json
      });
    });
  },
  showList:function(cate){
    var that = this;
    App.HttpServiceWork.docShareList({
      "token": App.getToken(),
      "cate":cate
    }).then(json => {
      App.log("showlist:",json);
      that.setData({
        innerDocList:json
      });
    });
  },
  createInnerFolder:function(){
    const that = this
    $wuxDialog.prompt({
      title: '提示',
      content: '文件夹名称',
      fieldtype: 'text',
      password: false,
      defaultText: '',
      placeholder: '请输入文件夹名称',
      maxlength: 8,
      onConfirm(e) {
        const value = that.data.$wux.dialog.prompt.response;
        if(value != ""){
          App.HttpServiceWork.docShareAddFolder({
            "token": App.getToken(),
            "cate": "1",
            "scope": "",
            "pid": "",
            "title": value
          }).then(json => {
            that.showList("1");
          });
        }else{
          App.alert("添加失败，名称不能为空!");
        }
        
      },
    })
  }
});