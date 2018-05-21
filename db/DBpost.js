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
  // 实现收藏功能
  collect(){
    return this.updatePostData('collect')
  }
  // 实现点赞功能
  up(){
    return this.updatePostData('up')
  }
  updatePostData(category){
    // console.log(this)
    var itemData = this.getPostItemById(),
        postData=itemData.data,
        allPostData = this.getAllPostData();
    switch(category){
      case 'collect':
      // 处理收藏逻辑
        if (!postData.collectionStatus){
          // 当前状态未收藏
          postData.collectionNum++;
          postData.collectionStatus=true;
        }else {
          // 当前状态收藏
          postData.collectionNum--;
          postData.collectionStatus=false;
          }
          break;
        case 'up':
        // 处理点赞逻辑
        if (!postData.upStatus){
          postData.upNum++;
          postData.upStatus=true;
        }else {
          postData.upNum--;
          postData.upStatus=false;
        }
        break;
      default:
        break;

    }
    // 更新缓存数据
      allPostData[itemData.index]=postData;
      this.execSetStorageSync(allPostData);
      return postData;

  }
};
export {DBPost}