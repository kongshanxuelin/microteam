import { $wuxButton } from '../../components/wux'
//index.js
//获取应用实例
var App = getApp()
Page({
  data: {
    navButtons: [
      { text: "指派任务", icon: "../../images/working/task.png", link: "/pages/working/task/task" },
      { text: "工作日志", icon: "../../images/working/note.png", link: "/pages/working/worknote/writenote?act=day&tmplId=lkbcyn5beo" },
      { text: "团队文档", icon: "../../images/working/document.png", link: "/pages/working/doc/index" },
      { text: "试题秀", icon: "../../images/working/doc.png", link: "/pages/paper/index" },
      { text: "拉人入团", icon: "../images/share.png", link: "/pages/my/team-share/index" }
    ],
    icon: '../../images/home.png',
    taskIcon:'../../images/working/task.png',
    processIcon:'../../images/working/process.png',
    team:{},
    anno:{},
    task:{},
    process:{num:0,pro:{}}
  },
  initButton(position = 'bottomRight') {
    var that = this;
    this.button = $wuxButton.init('br', {
      position: position,
      buttons: [
        {
          label: '团队成员',
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADf0lEQVRoQ+1ZvW8TMRR/z5dWMMEILIEUu4zASgv9B5CoGOiOhJhQywQ7EogBChNCDIxlAST+AD5nykjipDRComwgMZQh54ec+ipz3J3tu7RpUG5L7vze+/l9/Z6NMOIPjrj98P8CkFK+JqIZRKwN20tEtImIDzjnN9O2ZHpASvkCAC4M2/C0/snJydl6vf7B/j8TQLvd/kFEB/caAAB4yTmfDwWwxDlfHhYYKeUbADhn9L/lnM+NAeymN8YeAIBxDlQJuV0PoU6nM6OUekhEJxBxvzbeNKLPjLFrU1NTf9VxF7iyAD4S0Smtm3POXEqS9z4NkIieCyEuBsgML6NaeLfbnYnj+Guj0ej6KJNSrgLASZ9vAeAT51xvkPMp5QGn1NQHUsrbAHAj+ZuIfiPichRFj/R/cRxfJaJFRNxnLb2TxW3SuncLQA8AIqP8O+f8cNYmSCk3AOCQyYueEGLCtVnBAEwcb7drk4B38+hEs9m8xBhbMUZBrVY7mhd2a2tr9V6vt464RcGUUgvT09PPikAEAbCNsYUSUUcIcTxnV23mmrv7VqJveyGLnFUKIb1DcRyvZxj6Dwu0DCqsEqEGhX6fNw8sJoKUUhtFbk6VzuF6wJVQWe9TYUdRFB0ryoE4jr8AbI2yA8+BMgD0GinldhUiog0hxBFXFdLVlXPuHFeDktgYo5PSuwqZNek+sMkYu88Ye2x2+opSaimhFgbc4PtAmSpkJfPwO3GZKmQB0Il/L4nvgnAkALjuO6YGh5AJCe8qZEDrsPPiNhaw1SiK5l1cqxSAkGSWUv4EgAPWmhgAXimlVpLya0JzAQDOW5RD0+zchPftM5VO5jLos5NlZrDW3CZpoiGMTvtyITO4vLNivtAQ26sp4MQYO5s36ASFUEgVspklADg7cAZFsDlREYP190BIFWq1WpSwSsbYbOioaDz43gDLnfyCPJAqif2fWVzIVq6HFyFEf/YNfVqtlj607Q85eZtQCoDLkNQE5kzcPHmphM7szDsFwI5L7+TNyAOnnFIAdDIj4i1E/MU5P51WbN4/RcQJxthcaPwn8nzklALQbre/EVF/rs06k3eF2CDflwVg3w+MjxareGTsgfHpdJX42RpX/alEomvkL/mazeYTxtjlips38OXe16wJDyeiM3vhohsANgHA/6J74Fu3gwIrTWQ7aJe36JEH8AdjbuFPQHPK7QAAAABJRU5ErkJggg==",
        },
        {
          label: '债券扫一扫',
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABy0lEQVRoQ+1Z3W3CMBA+S/idEYiU82sZoUzQjgATlBHoBG03oBvABKUTlGcfUtiA9j3SVa5SRCGJnObHSfA9n++++z5bujsL6LiJjuOHzAKiKBrFcXwDAGOXRTLzJwC8K6W2aThSC9Baj4UQbwAwdAn+NDczL5VSs3M8qQUQ0QEABDPPhRD7FhQxB4A7Zp4ppZaneC4KSNj/EEK8hGFoDjq3KIqGcRwfmPlVKTXNLYCIbgHAXJ9HRFw4R58AICI2bwERDb6jXSjgC6hJMq9ATcRah/UKWFNVk6NXoCZircN6BaypqsnxehQwBBLRipkXWT14TSTnht3tds8AsAnDcJXbC7kAVyZnf0fKMqw0ebY/CvxOYk2yVyLXBhEn5vxRgWQLYV56awb5nAJXiGiwZq9VSrDT6NH+vIFGaaswWT8V0Fo/SCnXQRC0Yan1o5fBlLZi7NpaZY2I934vVOEbtA51PfOAXy1aX4pijv4KFeOrem+vQPWcFovoFSjGV/Xe1gokeyFm5q2UchIEgfmndWpEZD4bn9L+7VLbabNEYmbT/bXJvgaDweic0Mx5QGs9FUL8+dJ0VQ0z76WUi7T2vp8DjSum/5O38wp8A3KpZUC+fbh0AAAAAElFTkSuQmCC",
        },
        {
          label: '团队动态',
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEqUlEQVRoQ+2Z4XHUQAyFpQqgA0gFhAogFQAVQCoAKiBUQKiApAKSCkgqgFRAUgGkAjHfjeTZ0629a9/dD2ayM5kLnGO/Jz09adcq//nS/xy/PBCIDJrZoYi8EpGn/sO/H/v3tyLCz18RuRKRa1X9tYvsb5UBMwPsexF57aDnYILMmYh8VVXILVqLCDjwTyLybuSpdx7x8mvIPhm5/kJEPi4hMpuAmQH8JAEBMCAuVBWJjC4ze+kZI2uZ0Imqfp6Tim4CZoaef4gI2o51DZkW6DFAToZgvCiuoTaOVBWJNVcXAS9QwEdREnGAo+Gtl5khRYhERgAPiWahNwlUwN+IyMveCPWy8wwjw8hGF4lJAl6sP4vIn6vqWOH2Yp28zszI6lu/CBLPp4q7RQDwofm9gw9micSVqh6NsR4lYGZoEsdh3ahqWbw7iTY3cenQS3Cnz2EIZoabhZz4/+x8KwxVAi6d346Sgj3cg+bpC7mX0KEhEsQo4ijsg5qUxgh8d6/mXse7chsHBsDo3jmTa5F2d/rmF1UlvEEgRX+IyLaacTAU5yrClXXPOJIznaS0kYUagVOPEM/Aiyc76xQx1zcDHvpFMuWiCTIDheMwE33I9/NmRw9ibVxTI/DHbfNOVfNDuxJRFCaAovnF356LyClNqhXd+AMzgyi1cKuqByWINQLetLDOKtsW+okhD3ng7wBfTZ4pspMWbWalKugLQ4fOBIjYFwc6Sz6VpsdtcLAAvjbbmBldF3mx1kA1ZLRW6JnAcFNVbY4Z5YNS85mclZYYhZmZP28tW5lANI9Z+nfNUzurqLdqJ5HtynRRB2vOmAlEAc+yz9S1h77hNSWlZueSLQp56MylOjKBSNNcAuj7URn9ZAiDf4+R7TCI/RBI3XIosERgVaQefUYUrLUptVRjeyMQHr3RSbOExsi2ou+2GwTuVXXoLWNFvNEwag8xM/a1zE1dfaMoxOrYMEXEzMgcjXWyiIfNRI+N9nRSlw3jAj0mOnt1bGgQiPq8VFUCt1o5A+UeYNLeWp3UvT6Al+ME0Wc87z4LSvXE8QuduUqATUvXKJG8fOikjXGCB5/NAe/67xsl/OLRwanwZKQQG56VJj0jbFDyuExXDuBdRyWVUSL0v+Fci8bpFH3qBkIZOKcXDG9bHb20pNra0GxsqJOX1+puq8OuSvTZC0Rw2huaiubWtpSpk5bPY87nsKu7OFv+n2y6b0vpBHANgDAe8EmRrvSbrBNHWVSYHeDBgKGE9fZv6h1oaamDlIrzTEZvHGVRYXYQKKUz71ilcJvybAawx60H7+J7M+MkIk4AJ8+kWidzpBESzxzY3kkk8M2m19x1eReEBPXA4vc3u5aOuxtzVTgO4DlEnjyhbhLweqBDo/k4JaOwcRycZ+tlZowc5dFLF/iNWWgKSeX4O7IxnGfOZTLSvWcd33dloAQ20gfICBnCqydT7pIk4rUXg6NuMxac2QRcUngzKY9TtXz/8rUq32EG8fq1huWScXtJE1xEoLDZIEI0o8h7lYTOydpW3XsrAklaFDpE4gU3n0EKsEiLpscnbzOb7796IrEzAj0P28c1DwT2EdU59/wHhJ+PT7j4Q2sAAAAASUVORK5CYII=",
        }
      ],
      buttonClicked(index, item) {
        if (index == 1) {
          App.WxService.navigateTo('/pages/bond/index');
        } else if (index == 0) {
          App.WxService.navigateTo('/pages/contact/index');
        } else if (index == 2) {
          App.WxService.navigateTo('/pages/dyna/index');
        }
        return true
      }
    })
  },
  onLoad: function () {
    //初始化右下角按钮
    this.initButton();
    var that = this;
    var _team = App.getCurrentTeam();
    console.log("index:",_team);
    if(_team!=null){
      this.setData({
        team:_team
      });
    }
  },
  getHomeData:function(cb){
    var that = this;
    App.HttpServiceWork.myHome({
      "token": App.getToken(),
    }).then(json => {
      App.log(json);
      if (json.anno) {
        that.setData({
          anno: json.anno
        });
      }
      if (json.task) {
        that.setData({
          task: json.task
        });
      }
      if (json.processList && json.processList.length>0){
        that.setData({
          process: { num: json.processList.length, pro: json.processList[0]}
        })
      }
      if(typeof cb === "function"){
        cb();
      }
    });
  },
  onPullDownRefresh: function () { //下拉刷新
    this.getHomeData(function () {
      wx.stopPullDownRefresh;
    });
  },
  onShow:function(){
    console.log("index onShow");
    var _cache  = App.getCache("user");
    if(typeof _cache === "object"){
      this.setData({
          user:_cache
      });
    }
    var _team = App.getCurrentTeam();
    wx.setNavigationBarTitle({
      title: '小团队' + ' - ' + _team.teamName
    });
    this.getHomeData();
  },
  moreAction:function(){
    App.WxService.showActionSheet({
        itemList: ['创建团队', '切换团队'],
    }).then(res=>{
        if(res.tapIndex === 0){
          App.WxService.navigateTo('/pages/index/teamadd/teamadd');
        }else if(res.tapIndex === 1){
          App.WxService.navigateTo('/pages/index/teamchange/teamchange');
        }
    });
  }
})
