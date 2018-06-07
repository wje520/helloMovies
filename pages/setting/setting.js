// pages/setting/setting.js
// 获取小程序的APP对象
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 开放接口
    api: [
      { title: '清理缓存', tap: 'clearCache' },
      { title: '二维码', tap: 'scanCode' },
      { title: '用户登陆', tap: 'login' },
      { title: '校验用户信息', tap: 'check' },
      { title: '获取用户加密信息', tap: 'decrypted' },
      { title: '模板消息', tap: 'tplMessage' },
      { title: '微信支付', tap: 'wxPay' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    }
    console.log("userInfo=>",this.data.userInfo)
  },
  // 封装模态框
  showModal(title,content,callback){
    wx.showModal({
      title: title,
      content: content,
      showCancel: true,
      cancelColor: '#FF6666',
      confirmColor: '#7F8389',
      success: function (res) { 
        if(res.confirm){
          callback && callback();//短路运算，如果callback为true，才执行后面的
        }
      }
    })
  },
  clearCache(){
    this.showModal('清除缓存','确定要清除本地数据缓存吗？',function(){
      wx.clearStorage({
        success:function(){
          wx.showToast({
            title: '清除成功',
            icon: 'success',
            duration: 1000,
            mask:true
          })
        }
      })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})