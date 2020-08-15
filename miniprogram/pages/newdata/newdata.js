// pages/newdata/newdata.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    partpicker: ['文艺类', '体育类', '学术类','社会公益类'],
    objects: ['全体师生' ,'计算机工程学院', '管理学院','外国语学院','经济学院','汽车与交通工程学院','机械工程学院','电气工程学院','国际商学院','土木工程学院','珠宝学院','中兴通信工程学院','建筑学院'],
    owners: ['计算机工程学院团委、学生会', '管理学院团委、学生会', '外国语学院团委、学生会', '经济学院团委、学生会', '汽车与交通工程学院团委、学生会', '机械工程学院团委、学生会', '电气工程学院团委、学生会', '国际商学院团委、学生会', '土木工程学院团委、学生会', '珠宝学院团委、学生会', '中兴通信工程学院团委、学生会', '建筑学院团委、学生会', '学生艺术团', '就业指导中心', '星空创新中心', '学生社团联合会', '共青团华南理工大学广州学院委员会', '华广学生会', '华工广州学院招生办','足球协会','篮球协会','自行车协会','英语协会','粤语协会'],
    title:'',
    part:0,
    content:'',
    place:'',
    date:'',
    time:'',
    object:0,
    owner:0,
    img_url:[],
    hideAdd:0,
    imgID:[],
  },
    
  submit: function (e) {
    var that = this
    console.log(e.detail.value)
    this.setData({
      title: e.detail.value.title,
      content: e.detail.value.content,
      date: e.detail.value.date,
      time:e.detail.value.time,
      object: e.detail.value.object,
      part: e.detail.value.part,
      place: e.detail.value.place,
      owner: e.detail.value.owner,
    })
    if(e.detail.value.title==0){
      wx:wx.showToast({
        title: '请输入活动标题',
        duration:1500
      })
      setTimeout(function(){
        wx.hideToast()
      },2000)
    }
    else if(e.data.value.title==0){
      wx:wx.showToast({
        title: '请选择日期',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.time==0){
      wx:wx.showToast({
        title: '请选择活动开始时间',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.place==0){
      wx:wx.showToast({
        title: '请输入活动地点',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.content==0){
      wx:wx.showToast({
        title: '请输入活动详细内容',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else{
    console.log(this.data)
    wx.getStorage({
      key: 'divlocalStage',
      success: function (res) {
        var localopenid = res.data
        wx.request({
          url: 'http://2v73867b15.qicp.vip:14908/ssm/activity/insert', //仅为示例，并非真实的接口地址
          data: {
            userName: localopenid.openid,
            title: that.data.title,
            content: that.data.content,
            date: that.data.date,
            part: that.data.partpicker[that.data.part],
            object: that.data.object,
            visible: 1,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            for (var i=0; i < that.data.img_url.length; i++) {
              wx.cloud.uploadFile({
                cloudPath: "img/" + res.data.id + "_" + i,
                filePath: that.data.img_url[i],
                success: function (ress) {
                  that.data.imgID.push(ress.fileID)
                }
              })
            }
            var dataid=res.data.id
            console.log(dataid)
            setTimeout(() => {
              var imgI=that.data.imgID
              wx.cloud.callFunction({
                name:'uploadimg',
                data:{
                  dataid:dataid,
                  imgID:imgI,
                },
                success:function(e){
                  console.log(e)
                },
              })
            }, 2000);
          },
        })
      },
    })
  }
  },
  bindOwnerChange: function (e) {
    this.setData({
      owner: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindObjectChange: function (e) {
    this.setData({
      object: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindchangepick:function(e){
    this.setData({
      part: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  chooseimage:function(e){
    var that=this;
    wx.chooseImage({
      count:9,
      sizeType:['original','compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        if (res.tempFilePaths.length > 0) {

          //图如果满了9张，不显示加图
          if (res.tempFilePaths.length == 9) {
            that.setData({
              hideAdd: 1
            })
          } else {
            that.setData({
              hideAdd: 0
            })
          }
          //把每次选择的图push进数组
          let img_url = that.data.img_url;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            img_url.push(res.tempFilePaths[i])
          }
          that.setData({
            img_url: img_url
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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