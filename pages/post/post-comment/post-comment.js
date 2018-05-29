// pages/post/post-comment/post-comment.js
import {DBPost} from '../../../db/DBPost.js'
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
    var postId=options.id;
    this.dbPost=new DBPost(postId);
    var comments=this.dbPost.getCommentData();
    // 绑定评论数据
    this.setData({
      comments:comments
    })
    console.log(comments)
  },
  // 实现图片预览功能
  previewImg(event){
    console.log("this.data.comments",this.data.comments)
    var commentIdx=event.currentTarget.dataset.commentIdx,
        imgIdx=event.currentTarget.dataset.imgIdx,
        imgs=this.data.comments[commentIdx].content.img;
    wx.previewImage({
      current:imgs[imgIdx], //当前预览的图片的http链接
      urls: imgs, //所有预览图片的http链接列表[]
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