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
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
// 在这里设置全局变量
  globalData: {
    userInfo: null,
    doubanBase: "http://t.yushu.im",
  }
})