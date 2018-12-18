var optionList = [
  [{
    name: '选择城市',
    id: ''
  }],
  {
    name: "北京市",
    id: '111'
  }

];

var list = [{
  information: '车位地址',
  select: '请选择地点',
  bindBtn: 'address',
  name: 'start',
  val: ''
}];
Page({
  data: {
    textHint: "欢迎车主添加您的车位相关信息，以便于我们帮您更精准地分配闲置车位。",
    hiddenBoolean: true,
    inputHidden: true,
    className: ['header'],
    infoList: list,
    options: '',
    screenBtn: '',
    infoId: '',
    checkHtml: ""
  },
  address: function (e) {
    var addId = e.currentTarget.id;
    if (addId <= 2) {
      this.setData({
        infoId: addId,
        options: [{
          name: '选择省份',
          id: ''
        },
        {
          name: "北京",
          id: '1'
        },
        {
          name: "天津",
          id: '2'
        }
        ],
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: 'cityBtn'
      });

    }
  },
  carType: function (e) {
    var addId = e.currentTarget.id;
    if (addId == 2) {
      this.setData({
        infoId: addId,
        options: type,
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: 'carBtn'
      });
    }
  },
  carExtent: function (e) {
    if (e.currentTarget.id == 4) {
      this.setData({
        infoId: e.currentTarget.id,
        options: size,
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: 'carBtn'
      });
    }
  },
  hiddenBtn: function (e) {
    this.setData({
      hiddenBoolean: !this.data.hiddenBoolean
    })
  },
  cityBtn: function (e) {
    var dataId = e.currentTarget.id;
    if (dataId != '') {
      this.setData({
        options: optionList[dataId],
        screenBtn: 'overBtn'
      })
    }
  },
  overBtn: function (e) {
    var zone,
      dataId = e.currentTarget.id,
      num = this.data.infoId;
    for (var i = 0; i < optionList.length; i++) {
        if (optionList[i].id == dataId) {
          zone = optionList[i].name;
        }
    }
    if (dataId != '') {
      this.data.infoList[this.data.infoId].val = dataId;
      this.data.infoList[this.data.infoId].select = zone;

      var newInfo = this.data.infoList;
      this.setData({
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: '',
        infoList: newInfo
      });

      console.log(newInfo);
    }
  },
  carBtn: function (e) {
    var me, zone;
    var dataId = e.currentTarget.id,
      arr = this.data.infoList[this.data.infoId];
    if (this.data.infoId == 3) {
      me = type;
    } else {
      me = size;
    }
    for (var i = 0; i < me.length; i++) {
      if (me[i].id == dataId) {
        zone = me[i].name;
      }
    }
    this.data.infoList[this.data.infoId].val = dataId;
    this.data.infoList[this.data.infoId].select = zone;

    var newInfo = this.data.infoList;
    this.setData({
      hiddenBoolean: !this.data.hiddenBoolean,
      screenBtn: '',
      infoList: newInfo
    })
  },
  formReset: function () {
    this.setData({
      infoList: list
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})