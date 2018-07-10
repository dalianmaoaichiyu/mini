// pages/mine/mine.js

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
    var that=this;
    getData(that,1)
  }, onItemClick: function (event) {
    var targetUrl = "/pages/img/img";
    if (event.currentTarget.dataset.url != null)
      targetUrl = targetUrl + "?url=" + event.currentTarget.dataset.url;
    console.log(targetUrl)
    wx.navigateTo({
      url: targetUrl
    });
  }, onReachBottom:function(){
    console.log("加载更多")
    getData(this,2)
  }
})
function getData(that,page){
  var urls=[];
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
        urls.push({ src: res.data.results[i].url, time: res.data.results[i].desc, title: res.data.results[i].type })
      }
      that.setData({ items: urls })
      wx.hideToast()
    }
  })
}