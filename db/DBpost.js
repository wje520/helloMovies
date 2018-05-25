var util=require('../utils/util.js');
class DBPost {
    constructor(postId) {
            this.storageKeyName = 'postList';
            this.postId = postId;
        }
        // 获取所有的文章信息
    getAllPostData() {
            var res = wx.getStorageSync(this.storageKeyName);
            if (!res) {
                res = require('../data/data.js').postList;
                this.initPostList(res);
            }
            return res;
        }
        // 保存或更新缓存数据
    execSetStorageSync(data) {
            wx.setStorageSync(this.storageKeyName, data)
        }
        //获取指定id的文章详情
    getPostItemById() {
            var postData = this.getAllPostData();
            for (let i = 0; i < postData.length; i++) {
                if (postData[i].postId == this.postId) {
                    return {
                        index: i,
                        data: postData[i]
                    }
                }
            }
        }
        // 实现收藏功能
    collect() {
            return this.updatePostData('collect')
        }
        // 实现点赞功能
    up() {
        return this.updatePostData('up')
    }
    updatePostData(category) {
        // console.log(this)
        var itemData = this.getPostItemById(),
            postData = itemData.data,
            allPostData = this.getAllPostData();
        switch (category) {
            case 'collect':
                // 处理收藏逻辑
                if (!postData.collectionStatus) {
                    // 当前状态未收藏
                    postData.collectionNum++;
                    postData.collectionStatus = true;
                } else {
                    // 当前状态收藏
                    postData.collectionNum--;
                    postData.collectionStatus = false;
                }
                break;
            case 'up':
                // 处理点赞逻辑
                if (!postData.upStatus) {
                    postData.upNum++;
                    postData.upStatus = true;
                } else {
                    postData.upNum--;
                    postData.upStatus = false;
                }
                break;
            default:
                break;

        }
        // 更新缓存数据
        allPostData[itemData.index] = postData;
        this.execSetStorageSync(allPostData);
        return postData;
    }
    // 获取评论数据
    getCommentData(){
      var itemData=this.getPostItemById().data;
      itemData.comments.sort(this.compareWithTime);  //sort方法里面填写函数
      var comment;
      for(var i=0;i<itemData.comments.length;i++){
        // 增加评论时间戳
        comment=itemData.comments[i];
        comment.create_time=util.getDiffTime(comment.create_time,true);
      }
      return itemData.comments;
    }
    // 评论降序排序
    compareWithTime(value1,value2){
    var flag=parseFloat(value1.create_time)-parseFloat(value2.create_time);
    if(flag<0){
      return 1;
    }else if(flag>0){
      return -1;
    }else {
      return 0;
    }
  }
};
export { DBPost }