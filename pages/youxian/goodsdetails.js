//获取应用实例
const app = getApp();
//import common from '/utils/common';
import util from '/utils/util';
//import WxParse from '/wxParse/wxParse.js';
var WxParse = require('../../wxParse/wxParse.js');
Page({
  //...common,
  ...util,
  data: {
    imgUrls: ['http://romens-10034140.image.myqcloud.com/conew_88_w001000009_002.jpg?imageView2/0/w/640/format/png/q/100'],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    buynum: 1,
    stockcount: 0,
    havestock: '获取中...',
    goodsprice: 0,
    goodsguid: 0,
    collectstate: '收藏',
    collectevent: 'doCollectTap',
    goodsname: '',
    goodsimg: '',
    goodsweight: 0,
    collecticon: 's-5',
    branchid: '',
    buymyself: 0,
    id: '',
    cartgoodssorts: 0,
    indicatorDots: false,
    IS_BRANCH_STOCK: app.globalData.IS_BRANCH_STOCK,
    branch_guid: '',
    branch_name: '当前门店',//当前门店
    branch_address: '',
    barcode: '',
    selected: true,
    selected1: false,
    selected2: false,
    commonprice: 0,
    shopping_imgurl: '',
    LIMIT_GOODS_NUM: '',
    LIMIT_GOODS_HAVE_NUM: '',
    seckillid: '',
    isover: 0
  },
  /*tab切换*/
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected2: true,
      selected1: false
    })
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function (e) {
    //console.log(e.id);
    // if (e.id != '' && e.id != undefined) {
    //   var id = e.id;//获取商品的id
    // } else if (app.globalData.goods_id != undefined && app.globalData.goods_id != '') {
    //   var id = app.globalData.goods_id;//获取商品的id，通过支付宝的扫一扫，扫商品码时，进入此操作，有用，勿删除，张红霞2018-3-8
    // }

    // if (id == '' || id == undefined) {
    //   my.showToast({
    //     type: 'fail',
    //     content: '未找到相应的商品信息~~',
    //     duration: 2500
    //   });
    //   return;
    // }

    var that = this;
    if (e.id != '' && e.id != undefined) {
       var id = e.id;//获取商品的id
     }
    //var id = '163';
    
    get_goodsdetails(id, that);
    my.hideLoading();
  },
  onShow: function (e) {
    var that = this;
  },
  productCountPlus: function () {
    var buynum = this.data.buynum + 1;
    this.setData({ buynum: buynum, cartgoodssorts: buynum });
  },
  productCountMinus: function () {
    if (this.data.buynum <= 1) {
      my.showToast({
        type: 'fail',
        content: '最少购买一个!',
        duration: 1000
      });
      return;
    }

    var buynum = this.data.buynum - 1;
    this.setData({ buynum: buynum });
  },

  goIndexTap: function () {
    //回到首页
    my.switchTab({
      //url: '../index/index',
      url: '../youxian/index',
      success: function (res) {
        // success
        console.log(res);
      },
      fail: function (res) {
        // fail
        console.log(res);
      },
      complete: function () {
        // complete
      }
    })
  },
  goToCart: function () {
     my.navigateTo({
      url: '../cart/index'
    })
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '为您推荐' + app.globalData.projecttitle + '小程序',
      path: '/pages/youxian/goodsdetails?id=' + that.data.id,
      success: function (res) {
        console.log(that.data.id);
        // 转发成功
      },
      fail: function (res) {
        // console.log('fail');
        // 转发失败
      }
    }
  },
});

function get_goodsdetails(id, that) {
  var id = id;
  my.httpRequest({
    url: 'https://www.tianrenyun.com.cn/vendor/api/goods/queryGoodsDetail',
    data: {
            "goodsId": id
          },
    method: 'POST',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (r) {
      console.log('商品详情返回');
      console.log(r.data);
      // if (r.data == '' || r.data.data.length == 0) {
      //   my.hideLoading();
      //   my.showToast({
      //     type: 'success',
      //     content: '未找到相应的商品信息~~',
      //     duration: 2500
      //   });
      //   return;
      // }
       
        that.setData({
        goodsdetails: r.data.data,
        });



      my.hideLoading();
    }
  });
}