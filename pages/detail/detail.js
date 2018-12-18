var light = null
var app = getApp();

Page({
  data: {
    address: [{
      title: '车位地址',
      content: '北京邮电大学沙河校区西门'
    },
    {
      title: '当前地址',
      content: '北京邮电大学沙河校区'
    }
    ],
    source: [{
      caption: '预约时间',
      content: '13：00'
    },
    {
      caption: '车辆型号',
      content: '丰田TV7167GL'
    },
    {
      caption: '使用时长',
      content: '2小时'
    }
    ],
    other: '学校附近，注意安全驾驶。',
    phone: '4008003030'
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  convert: function () {
    var categories = [];
    var humidity = [];
    var light = [];
    var tempe = [];

    var length = app.globalData.light.datapoints.length
    for (var i = 0; i < length; i++) {
      categories.push(app.globalData.humidity.datapoints[i].at.slice(11, 19));
      humidity.push(app.globalData.humidity.datapoints[i].value);
      light.push(app.globalData.light.datapoints[i].value);
      tempe.push(app.globalData.temperature.datapoints[i].value);
    }
    return {
      categories: categories,
      humidity: humidity,
      light: light,
      tempe: tempe
    }
  },

  send: function () {
    var that = this
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/502966669/datapoints?datastream_id=Light,Temperature,Humidity&limit=15',
      header: {
        'content-type': 'application/json',
        'api-key': 'oTyoqEVmtQONgEI4=ZRZzXeyIKU='
      },
      success: function (res) {
        var app = getApp()
        var light = app.globalData.light;
        if (light > 200) {
          wx.showModal({
            title: '提示',
            content: '有空余车位！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        else if (light <= 200) {
          wx.showModal({
            title: '提示',
            content: '无剩余车位',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      },

    })
  },




  makePhoneCall: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data['phone']
    })
  },
  showMap: function (e) {
    var index = e.target['dataset'].index;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })

  }
})