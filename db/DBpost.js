class DBpost {
  constructor(url){
  this.storageKeyName='postList';
  }
  // 获取所有的文章信息
  getAllPostData(){
    var res = wx.getStorageSync(this.storageKeyName);
    if(!res){
      res=require('../data/data.js').postList;
      this.initPostList(res);
    }
    return res;
  }
  // 保存或更新缓存数据
  execSetStorageSync(data){
    wx.setStorageSync(this.storageKeyName, data)
  }
};
export {DBpost}