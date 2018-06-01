//index.js
//获取应用实例
const app = getApp()
Page({
  onTapJump(event){
    // navigateTo和redirectTo不能跳转到带有tab选项卡的页面，只有switchTab可以
    wx.switchTab({
      url: '../post/post',
    })
  }
})
