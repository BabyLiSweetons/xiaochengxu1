// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content:'',
    date:'',
    object:'',
    part:'',
    imgurl:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mesg = JSON.parse(options.Mesgs)
    var id=mesg.id
    var that=this
    this.setData({
      id:mesg.id,
      title: mesg.title,
      content: mesg.content,
      date: mesg.date,
      object: mesg.object,
      part: mesg.part
    })
    wx.cloud.callFunction({
      name:'selctImg',
      data:{
        theid:id,
      },
      success:function(e){
        var data1=e.result.data
        that.setData({
          imgurl:data1[0].imgurl
        })
        console.log(that.data.imgurl)
      },
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