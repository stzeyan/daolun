
Page({
    data:{
        homeLink:'../list/list',
        myLink:'../user/user'
    },
  navigateTo(url){
    wx.navigateTo({
      url: url
    });
  },
    goHome:function(){
      var that = this
      console.log(this.data)
      wx.switchTab({
        url: '/pages/list/list',
      })
    },
    viewMyList:function(){
      wx.switchTab({
        url: '/pages/user/user',
      })
    }
})
