//index.js
const app = getApp()

Page({
  data: {
    keys:'',
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://2v73867b15.qicp.vip:14908/ssm/activity/showAll', //仅为示例，并非真实的接口地址
      data: {
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
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
  },
  skip:function(e){
    var that=this
    var ID = e.currentTarget.id;
    var mesg=that.data.list[ID];
    mesg=JSON.stringify(mesg);
    wx.navigateTo({
      url: '../detail/detail?Mesgs='+mesg,
    })
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
    switch (this.data.TabCur) {
      case "0":
        this.onLoad()
        break;
      case "1":
        this.getPart("文艺类")
        break;
      case "2":
        this.getPart("体育类")
        break;
      case "3":
        this.getPart("学术类")
        break;
      case "4":
        this.getPart("社会公益类")
        break;
      default:
    }
    wx.showToast({
      title: '刷新',
      icon: 'success',
      duration: 2000
    })
  },
  tabSelect(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      TabCur: id,
      scrollLeft: (id - 1) * 60
    })
    switch (id) {
      case "0":
        this.onLoad()
        break;
      case "1":
        this.getPart("文艺类")
        break;
      case "2":
        this.getPart("体育类")
        break;
      case "3":
        this.getPart("学术类")
        break;
      case "4":
        this.getPart("社会公益类")
        break;
      default:
    }
  },
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onPageScroll: function (e) {
    console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  getPart: function (part) {
    var that = this;
    console.log(part)
    wx.request({
      //请求地址
      url: 'http://2v73867b15.qicp.vip:14908/ssm/activity/selectByPart',
      data: {
        part:part
      },//发送给后台的数据
      header: {//请求头
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //res.data相当于ajax里面的data,为后台返回的数据
        //如果在sucess直接写this就变成了wx.request()的this了
        //必须为getdata函数的this,不然无法重置调用函数
        console.log(res.data),
          that.setData({
            list: res.data
          })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  key:function(e){
    this.setData({
      keys: e.detail.value
    })
  },
  search:function(){
    var arr = [];
    if (this.data.keys == '') {
      return;
    }
    for (let i in this.data.list) {
      console.log(this.data.list[i])
      if(this.data.list[i].title.indexOf(this.data.keys)>=0){
        arr.push(this.data.list[i])
        continue
      }
      if (this.data.list[i].content.indexOf(this.data.keys) >= 0) {
        arr.push(this.data.list[i])
        continue
      }
      if (this.data.list[i].object.indexOf(this.data.keys) >= 0) {
        arr.push(this.data.list[i])
        continue
      }
      if (this.data.list[i].part.indexOf(this.data.keys) >= 0) {
        arr.push(this.data.list[i])
        continue
      }
      if (this.data.list[i].date.indexOf(this.data.keys) >= 0) {
        arr.push(this.data.list[i])
        continue
      }
    }
    this.setData({
      list:arr,
    })
  }
})
