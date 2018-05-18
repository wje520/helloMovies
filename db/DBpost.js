class DBPost {
  constructor(postId){
  this.storageKeyName='postList';
  this.postId=postId;
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
  //获取指定id的文章详情
  getPostItemById(){
    var postData=this.getAllPostData();
    for(let i=0;i<postData.length;i++){
      if(postData[i].postId==this.postId){
        return {
          index:i,
          data:postData[i]
        }
      }
    }
  }
};
export {DBPost}