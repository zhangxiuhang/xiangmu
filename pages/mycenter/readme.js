// pages/mycenter/readme.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopping_imgurl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orgguid = app.globalData.orgguid;
    switch (orgguid) {
      case '88':
        that.data.shopping_imgurl = 'http://romens-10034140.image.myqcloud.com/yn_buyinfo.jpg';
        break;
      case '16':
        that.data.shopping_imgurl = 'http://romens-10034140.image.myqcloud.com/drt_shopping1.jpg';
        break;
    }

    that.setData({
      shopping_imgurl: that.data.shopping_imgurl
    });
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