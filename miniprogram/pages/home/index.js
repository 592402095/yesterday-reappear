// pages/home/index.js
var { API, YUDAO } = getApp();
var INFO = wx.getSystemInfoSync();

var TOP = 0;
var PAGE = 1;
var IS_UP = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    LOADING: false,
    SCROLL_TOP: 0,
    HEADER_OPACITY: 0,
    MENU_ANIMATION: {},
    HEIGHT: INFO.screenHeight,
    STATUS_HEIGHT: INFO.statusBarHeight,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    

    
  },
  viewDetailHandler: function (e) {
    var id = e.currentTarget.dataset.test;
    console.log(id);
    wx.navigateTo({
      url: '/pages/detail/index?id=' + id,
    })
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
    var data = wx.getStorageSync('userData');
    if (data) {
      this.setData({
        datas: data
      })
    }
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
   * 滚动事件
   */
  scrollHandler: function (e) {
    var { scrollTop } = e.detail;
    // 计算透明度
    var HEADER_OPACITY = parseFloat(scrollTop / 200).toFixed(2);
    if (HEADER_OPACITY > 1) HEADER_OPACITY = 1;
    if (HEADER_OPACITY < 0.1) HEADER_OPACITY = 0;

    this.setData({
      HEADER_OPACITY,
    });
    // 判断是不是向上
    var is_up = true;
    if (scrollTop < TOP) is_up = false;
    TOP = scrollTop;
    if (IS_UP === is_up) return;
    IS_UP = is_up;

    this.setData({
      MENU_ANIMATION: (HEADER_OPACITY === 0) ? this.SHOW_ANIMATION : (!is_up ? this.SHOW_ANIMATION : this.HIDE_ANIMATION)
    });
  },
  // 加载更多
  loadMoreHandler: function () {
    if (!this.data.CAN_LOAD_MORE) return;
    this.setData({
      LOADING: true
    });
    API.loadDiary(PAGE + 1).then(datas => {
      setTimeout(() => this.setData({
        LOADING: false,
        datas: this.data.datas.concat(datas),
        CAN_LOAD_MORE: datas.length > 0
      }), 500);
      PAGE += 1;
    }).catch(err => {})
  },
  // 返回顶部
  toTophandler: function () {
    this.setData({
      SCROLL_TOP: 0
    })
  },
  // 显示菜单
  showCreate: function (e) {
    var model = JSON.stringify(this.data.datas)
    wx.navigateTo({
      url: '/pages/create/index?model='+model,
    })
  }
})