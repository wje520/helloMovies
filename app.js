//app.js
App({
  onLaunch: function () {
    // 缓存初始化数据
    var storageData=wx.getStorageSync('postList');
    if(!storageData){
      // 如果缓存postList不存在
      var dataObj = require('data/data.js');
      wx.clearStorageSync();
      wx.setStorageSync('postList', dataObj.postList)
    }
    this.getUserInfo();
  },
  getUserInfo() {
    // 对用户基本信息使用缓存
    var userInfoStorage = wx.getStorageSync('user');
    if (!userInfoStorage) {
      var that = this;
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.globalData.userInfo = res.userInfo
              wx.setStorageSync('user', res.userInfo)
            },
            fail: function (res) {
              console.log(res);
            }
          })
        }
      })
    }
    else {
      this.globalData.userInfo = userInfoStorage;
    }
  },
// 在这里设置全局变量
  globalData: {
    userInfo: null,
    doubanBase: "http://t.yushu.im",
  }
})