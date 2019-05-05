// pages/mine/mine.js

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    urls:[],
    page: 15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      page: 15
    })
    var that=this;
    getData(that, this.data.page)
  }, onItemClick: function (event) {
    var targetUrl = "/pages/img/img";
    if (event.currentTarget.dataset.url != null)
      targetUrl = targetUrl + "?url=" + event.currentTarget.dataset.url;
    console.log(targetUrl)
    wx.navigateTo({
      url: targetUrl
    });
  }, onReachBottom:function(){
    console.log("加载更多" + this.data.page)
    this.data.page = this.data.page+1
    getData(this,this.data.page)
  }   ,onPullDownRefresh() {
    this.data.page=15
    console.log("加载更多" + this.data.page)
    this.data.urls=[];
    getData(this, this.data.page)
    // onLoad();
  },
})
function getData(that,page){
 
  wx.showToast({
    title: '',
    icon: 'loading',
    duration: 10000
  })
  wx.request({
    url: 'https://gank.io/api/data/福利/10/'+page,
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      if (res.error) {
        return
      }
     
      var i = 0;
      for (; i < res.data.results.length; i++) {
        that.data.urls.push({ src: res.data.results[i].url, time: res.data.results[i].desc, title: res.data.results[i].type })
      }
      that.setData({ items: that.data.urls })
      wx.hideToast()
    }
  })
}