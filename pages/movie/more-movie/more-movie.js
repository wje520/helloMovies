// pages/movie/more-movie/more-movie.js
var app=getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options==>",options)
    var category=options.category;
    //可直接在这里定义数据，不必在data处初始化
    this.data.navigateTitle=category;
    console.log("category==>",category)
    var dataUrl="";
    switch(category){
      case '正在热映':
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
          break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    console.log("dataUrl==>",dataUrl)
    this.data.requestUrl=dataUrl;
    wx.showLoading({
      title: '加载中',
    })
    util.http(dataUrl,this.processDoubanData);
  },
  processDoubanData(moviesDouban){
    var movies=[];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    // 每次上拉刷新，更新movies保存所有的的电影条目数据
    var totalMovies=[];
    totalMovies=this.data.movies.concat(movies)
    this.setData({
      movies: totalMovies
    });
    // 重新绑定数据之后，结束下拉刷新
    wx.stopPullDownRefresh();
    // 隐藏loading
    wx.hideLoading();
  },
// 跳转到电影详情页
  onMovieTap(event){
  var movieId=event.currentTarget.dataset.movieId;
  wx.navigateTo({
    url: '../movie-detail/movie-detail?id='+movieId,
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
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
    var refreshUrl = this.data.requestUrl + "?star=0&count=20";
    // 页面刷新，恢复初始值  只加载前20条
    this.data.movies=[];
    util.http(refreshUrl, this.processDoubanData);
    wx.showLoading({
      title: '加载中',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var totalCount=this.data.movies.length;
    var nextUrl=this.data.requestUrl+"?start="+totalCount+ "&count=20";
    util.http(nextUrl, this.processDoubanData);
    wx.showLoading({
      title: '加载中',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})