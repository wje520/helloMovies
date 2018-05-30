// pages/post/post-detail/post-detail.js
import { DBPost } from '../../../db/DBPost.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 获取postId  与query参数名保持一致
        var postId = options.id;
        this.dbPost = new DBPost(postId);
        this.postData = this.dbPost.getPostItemById().data;
        this.setData({
            post: this.postData
        })
        this.setAnimation();
    },
    // 收藏功能
    onCollectionTap(event) {
        var newData = this.dbPost.collect();
        this.setData({
            'post.collectionStatus': newData.collectionStatus,
            'post.collectionNum': newData.collectionNum,
        })
        wx.showToast({
            title: newData.collectionStatus ? "收藏成功" : "收藏失败",
            icon: 'success',
            duration: 1000,
            mask: true
        })
    },
    //点赞功能
    onUpTap(event) {
        var newData = this.dbPost.up();
        this.setData({
                'post.upStatus': newData.upStatus,
                'post.upNum': newData.upNum,
            })
            // 增加点赞动画效果
        this.animationUp.scale(2).step();
        this.setData({
            animationUp: this.animationUp.export()
        })
        setTimeout(function() {
            this.animationUp.scale(1).step()
            this.setData({
                animationUp: this.animationUp.export()
            })
        }.bind(this), 300)
    },
    // 设置动画
    setAnimation() {
        var animationUp = wx.createAnimation({
            timingFunction: 'ease-in-out'
        })
        this.animationUp = animationUp;
    },
    // 跳转至评论页
    onCommentTap(event){
      var id=event.currentTarget.dataset.postId;
      wx.navigateTo({
        url: '../post-comment/post-comment?id='+id
      })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     * 一般在这里进行界面设置
     */
    onReady: function() {
        // 动态设置导航栏标题
        wx.setNavigationBarTitle({
            title: this.postData.title,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})