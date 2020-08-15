// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  jump:function(){
    wx.navigateTo({
      url: '../newdata/newdata',
    })
  },
  jump_3: function () {
    wx.navigateTo({
      url: '../help/help',
    })
  },
  jump_4: function () {
    wx.navigateTo({
      url: '../us/us',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: function (result) {
        console.log(result.code);
        wx.request({
          url: 'http://2v73867b15.qicp.vip:14908/ssm/activity/wxLogin',
          data: {
            code: result.code
          },
          success: (loginState) => {
            console.log(loginState)
            wx.setStorage({
              key: "divlocalStage",
              data: loginState.data
            })
            wx.getSetting({
              success: (settingres) => {
                if (settingres.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                    withCredentials: "false",
                    lang: "zh_CN",
                    success: (userinfo) => {
                      console.log(userinfo.userInfo)
                    }
                  })
                }
              }
            })
          },
          fail() {
            console.log("request失败")
          }
        })
      },
      fail() {
        console.log("登陆失败")
      },
    })
  },
  showLast:function(){ 
      wx.navigateTo({
        url: '../own/own',
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