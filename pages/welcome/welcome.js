//index.js
//获取应用实例
const app = getApp()
Page({
  onTapJump(event){
    // 实现页面跳转，并且可返回
    wx.navigateTo({
      url: '../post/post',
    })
  }
})
