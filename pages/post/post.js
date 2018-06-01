// pages/post/post.js
// var dataObj=require("../../data/data.js")
import {DBPost} from '../../db/DBPost.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 动态数据绑定
    // this.setData({
    //   postList:dataObj.postList
    // })
    var dbPost=new DBPost();
    this.setData({
      postList:dbPost.getAllPostData()
    })
  },
  onTapToDetail(event){
    var postId=event.currentTarget.dataset.postId;
    console.log(postId)
     wx.navigateTo({
    url: 'post-detail/post-detail?id='+postId,
  })
  },
  // 从swiper跳转到文章详情
  onSwiperTap(event){
    //targe指最开始被触发的元素（）。currentTarget指捕获事件的元素（这里指swiper）
    var postId=event.target.dataset.postId; 
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
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