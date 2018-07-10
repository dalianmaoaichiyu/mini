 // pages/video/video.js
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  }, onLoad: function (options) {
     var that=this
     getData(that,1)
  },
})

function getData(that, page) {
  var urls = [];
  wx.showToast({
    title: '',
    icon: 'loading',
    duration: 10000
  })
  wx.request({
    url: 'https://gank.io/api/data/all/10/' + page,
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