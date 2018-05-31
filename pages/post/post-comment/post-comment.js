// pages/post/post-comment/post-comment.js
import { DBPost } from '../../../db/DBPost.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useKeyboardFlag: true,
    keyboardInputValue: '',
    sendMoreMsgFlag: false,
    // 保存已选择的图片
    chooseFiles: [],
    // 删除图片的索引
    deleteIndex: -1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.dbPost = new DBPost(postId);
    var comments = this.dbPost.getCommentData();
    // 绑定评论数据
    this.setData({
      comments: comments
    })
    // console.log(comments)
  },
  // 实现图片预览功能
  previewImg(event) {
    console.log("this.data.comments", this.data.comments)
    var commentIdx = event.currentTarget.dataset.commentIdx,
      imgIdx = event.currentTarget.dataset.imgIdx,
      imgs = this.data.comments[commentIdx].content.img;
    wx.previewImage({
      current: imgs[imgIdx], //当前预览的图片的http链接
      urls: imgs, //所有预览图片的http链接列表[]
    })
  },
  // 实现语音和键盘输入的切换
  switchInputType() {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },
  // 获取input输入
  bindCommentInput(event) {
    var val = event.detail.value;//获取input输入值
    // var pos=event.detail.cursor;
    // console.log(pos)
    // console.log(val)
    this.data.keyboardInputValue = val;
  },
  // 实现自定义发送 提交用户评论
  submitComment() {
    var newData = {
      username: "wje",
      avatar: "/images/avatar/avatar-3.png",
      create_time: new Date().getTime() / 1000,
      content: {
        txt: this.data.keyboardInputValue,
      },
    };
    if (!newData.content.txt) {
      // 评论数据为空，不执行任何操作
      return;
    }
    // 保存新评论到缓存数据库当中
    this.dbPost.newComment(newData);
    // 显示操作结果
    this.showCommitSuccessToast();
    // 重新渲染并绑定所有数据
    this.bindCommentData();
    // 评论成功后清空input值
    this.resetAllDefaultStatus();
  },
  // 评论提交成功后的交互反馈
  showCommitSuccessToast() {
    wx.showToast({
      title: '评论成功',
      duration: 1000,
      icon: 'success'
    })
  },
  //绑定评论数据
  bindCommentData() {
    var comments = this.dbPost.getCommentData();
    this.setData({
      comments: comments
    })
  },
  // 评论成功 清空input值
  resetAllDefaultStatus() {
    this.setData({
      keyboardInputValue: ''
    })
  },
  // 控制拍照面板的显示和隐藏
  sendMoreMsg() {
    this.setData({
      sendMoreMsgFlag: !this.data.sendMoreMsgFlag
    })
  },
  // 实现选择图片和拍照功能
  chooseImage(event) {
    var imgArr = this.data.chooseFiles;
    var leftCount = 3 - imgArr.length;
    if (leftCount <= 0) {
      return;
    }
    var sourceType = event.currentTarget.dataset.category;
    var _self = this;
    wx.chooseImage({
      count: leftCount,
      sourceType: sourceType,
      success: function (res) {
        console.log(res)
        _self.setData({
          chooseFiles: imgArr.concat(res.tempFilePaths)
        })
      },
    })
  },
  // 删除已选择的图片
  deleteImage(event) {
    var index = event.currentTarget.dataset.idx;
    this.setData({
      deleteIndex: index
    })
    this.data.chooseFiles.splice(index, 1);
    // 因为删除的动画执行设置为500毫秒，所以这里延时500毫秒再执行数据绑定
    setTimeout(() => {
      this.setData({
        chooseFiles: this.data.chooseFiles,
        deleteIndex: -1
      })
    }, 500)
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