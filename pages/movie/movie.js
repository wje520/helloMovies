// pages/movie/movie.js
var app = getApp();
var util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    // 搜索面板和电影资讯面板的显隐控制
    containerShow:true,
    searchPanelShow:false,
    searchResult:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },
  getMovieListData(url, settedKey,categoryTitle) {
    wx.showLoading({
      title: '加载中',
    })
    var that=this;
    wx.request({
      url:url,
      method:'GET',
      header:{
        'content-type':'json'
      },
      success(res){
        console.log(res)
        that.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail(error) {
        // fail
        console.log(error)
      }
    })
  },
  processDoubanData(moviesDouban, settedKey,
    categoryTitle) {
    var movies = [];
    console.log(moviesDouban)
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
    // 动态设置数据绑定key，key不同绑定不同的数据，这是电影模块一大注意点
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
    wx.hideLoading();
    console.log('inTheaters', this.data.inTheaters);
    console.log("searchResult=>", this.data.searchResult)
  },
  // 跳转到更多电影页面
  onMoreTap(event){
    var category=event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category,
    })
  },
  // 输入框聚焦时触发
  onBindFocus(event){
  this.setData({
    containerShow:false,
    searchPanelShow:true
  })
  },
  // 取消搜索
  onCancelImgTap(){
  this.setData({
    containerShow:true,
    searchPanelShow:false,
    // 清空搜索结果和input值
    searchResult:{},
    inputValue:""
  })
  },
  // 响应搜索事件
  onBindConfirm(event){
  var keyWord=event.detail.value;
  var searchUrl = app.globalData.doubanBase +
    "/v2/movie/search?q=" + keyWord;
  this.getMovieListData(searchUrl, "searchResult", "");
  },
  // 跳转到电影详情页
  onMovieTap(event){
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId,
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