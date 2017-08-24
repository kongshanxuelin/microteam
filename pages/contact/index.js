const App = getApp();
Page({
  data: {
    // 当前选择的导航字母
    selected: 0,
    // 选择字母视图滚动的位置id
    scrollIntoView: 'A',
    // 导航字母
    letters: [],
    groups: []
  },
  onLoad: function (options) {
    var that = this;

    App.HttpServiceWork.teamMembers({
      "token": App.getToken()
    }).then(json => {
        that.setData({
          letters: json.letters.split(","),
          groups: json.groups
        });

        const res = wx.getSystemInfoSync(),
        letters = that.data.letters;
        // 设备信息
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          pixelRatio: res.pixelRatio
        });
        // 第一个字母距离顶部高度，css中定义nav高度为94%，所以 *0.94
        const navHeight = that.data.windowHeight * 0.94, // 
          eachLetterHeight = navHeight / 26,
          comTop = (this.data.windowHeight - navHeight) / 2,
          temp = [];

        that.setData({
          eachLetterHeight: eachLetterHeight
        });

        // 求各字母距离设备左上角所处位置

        for (let i = 0, len = letters.length; i < len; i++) {
          const x = that.data.windowWidth - (10 + 50) / that.data.pixelRatio,
            y = comTop + (i * eachLetterHeight);
          temp.push([x, y]);
        }
        that.setData({
          lettersPosition: temp
        })

    });

    
  },
  tabLetter(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selected: index,
      scrollIntoView: index
    })

    this.cleanAcitvedStatus();
  },
  // 清除字母选中状态
  cleanAcitvedStatus() {
    setTimeout(() => {
      this.setData({
        selected: 0
      })
    }, 500);
  },
  touchmove(e) {
    const x = e.touches[0].clientX,
      y = e.touches[0].clientY,
      lettersPosition = this.data.lettersPosition,
      eachLetterHeight = this.data.eachLetterHeight,
      letters = this.data.letters;
    console.log(y);
    // 判断触摸点是否在字母导航栏上
    if (x >= lettersPosition[0][0]) {
      for (let i = 0, len = lettersPosition.length; i < len; i++) {
        // 判断落在哪个字母区域，取出对应字母所在数组的索引，根据索引更新selected及scroll-into-view的值
        const _y = lettersPosition[i][1], // 单个字母所处高度
          __y = _y + eachLetterHeight; // 单个字母最大高度取值范围
        if (y >= _y && y <= __y) {
          this.setData({
            selected: letters[i],
            scrollIntoView: letters[i]
          });
          break;
        }
      }
    }
  },
  touchend(e) {
    this.cleanAcitvedStatus();
  }
})