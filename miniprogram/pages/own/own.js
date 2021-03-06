// pages/own/own.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=''
    wx.getStorage({
      key: 'divlocalStage',
      success: function (res) {
        id=res.data.openid
        console.log(id)
      },
    })
    var that=this
    wx.request({
      url: 'http://2v73867b15.qicp.vip:14908/ssm/activity/selectByOpenID', //仅为示例，并非真实的接口地址
      data: {
        username:id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data),
          that.setData({
            list: res.data
          })
      }
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