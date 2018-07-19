// pages/index/scancode.js
//获取应用实例
const app = getApp();
import util from '/utils/util';
Page({
  ...util,
  data: {
    bindevent: '',
    showModalStatus: false
  },

  onLoad(options) {
    this.data.bindevent = 'scanCodeTap';
    //this.showNearbyBranch();
    this.getLocation();
     this.showNearbyShebei();

  },

  scanCodeTap() {
    var that = this;
    get_scancode(that);
  },
  //显示选择配送地址
  powerShow: function (e) {
    console.log('jinlials');
    var currentStatu = e.currentTarget.dataset.statu; 
    const animation = my.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    this.animation = animation;
    animation.top('0px').step();
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
  },
  //关闭显示选择配送地址
  powerClose: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var animation = my.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    this.animation = animation;
    this.setData({
      animationData: animation.export(),
      showModalStatus: false
    })
  },
  //获取当前位置坐标
  getLocation: function (e) {
    var that = this;
    my.getLocation({
      type: 2,
      success(res) {
        my.hideLoading();
        console.log(res)
        console.log(res.longitude)
        console.log(res.latitude)

        //定位到的当前地址名称,并将地址存入到缓存中
        var selectUserAddr = res.province + res.city + res.district + res.streetNumber['street'] + res.streetNumber['number'];
        //var selectUserAddr = res.province + res.city + res.district;
        my.setStorageSync({key: 'selectUserAddr',data: selectUserAddr});
        console.log(selectUserAddr);

        var gg_lng = res.longitude;
        var gg_lat = res.latitude;
        //高德坐标转百度坐标
        var X_PI = Math.PI * 3000.0 / 180.0;
        var x = gg_lng, y = gg_lat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        console.log(bd_lng)
        console.log(bd_lat)

        my.setStorageSync({key: 'posLat',data: bd_lat});
        my.setStorageSync({key: 'posLng',data: bd_lng});
        my.setStorageSync({key: 'selectLat',data: bd_lat});
        my.setStorageSync({key: 'selectLng',data: bd_lng});
        that.showNearbyShebei();
        that.setData({
              selectUserAddr: selectUserAddr
            });
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败' });
      },
    })
  },
  
  //获取附近设备
  showNearbyShebei:function(){
     var that = this;
     my.httpRequest({
                url: 'https://www.tianrenyun.com.cn/vendor/api/device/list',
                data: {
                  "type":"2",
                  "level":"2"
                },
                method: 'POST',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                success: (res) => {
                  console.log('设备信息');
                  console.log(res.data);
                  that.setData({
                   EquipmentList: res.data.data,
                   });
                
                }

              })


  },

  //
  radioChange: function (e) {
    var that = this;
    var branch_str = e.detail.value;
    var branch_str = branch_str.split('|');
    var branch_idx = branch_str[0];
    var branch_guid = branch_str[1];
    var branch_code = branch_str[2];
    var branch_name = branch_str[3];
    var branch_address = branch_str[4];

    console.log(branch_guid);
    console.log(branch_code);
    console.log(branch_name);
    console.log(branch_address);

    // wx.setStorageSync('branch_guid', branch_guid); //设置门店guid
    // wx.setStorageSync('branch_code', branch_code); //设置门店guid
    // wx.setStorageSync('branch_name', branch_name); //设置门店名
    // wx.setStorageSync('branch_address', branch_address); //设置门店地址
    
    my.setStorageSync({key: 'branch_guid',data: branch_guid});
    my.setStorageSync({key: 'branch_code',data: branch_code});
    my.setStorageSync({key: 'branch_name',data: branch_name});
    my.setStorageSync({key: 'branch_address',data: branch_address});

    var branchlist = that.data.BRANCHLIST;
    
    console.log('7878');
    console.log(branchlist);

    var newbranchlist = new Array();
    if (!util.isNull(branchlist)) {
      for (var v in branchlist) {
        if (my.getStorageSync({ key: 'branch_guid' }).data == branchlist[v]['GUID']) {
          branchlist[v]['checked'] = 1;
        } else {
          branchlist[v]['checked'] = 0;
        }

        var branch_v = branchlist[v];
        newbranchlist.push(branch_v);
      }

      that.setData({
        BRANCHLIST: newbranchlist
      });
    }

  },
  //测试获取用户的guid
testgetuser: function () {
 const that = this;
      my.getAuthCode({
        scopes: 'auth_user',
        success: (res) => {
          app.globalData.isCanceledAuth = 0;
          my.getAuthUserInfo({
            //获取用户基本信息，昵称和头像
            success: (userInfo) => {
              //获取用户user_id
              // var post_data = {
              //   'QueryType': 'ali_getuserinfo_new',
              //   'UserGuid': app.globalData.UserGuid,
              //   'Params': '{"authcode":"' + res.authCode + '","orgguid":"88-1"}'
              // };
              // my.httpRequest({
              //   url: 'https://mshop.yiyao365.cn/quickProjectAPI', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
              //   data: post_data,
              //   method: 'POST',
              //   header: { 'Content-Type': 'application/x-www-form-urlencoded' },
              //   success: (res) => {
              //     console.log('resss');
              //     console.log(res.data);
              //   }

              // })

            }
          })
        }
      })
},

testtype:function(){

        my.httpRequest({
                url: 'https://www.tianrenyun.com.cn/vendor/api/store/type', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
                //data: post_data,
                data: {
                  "appId":"wx51ca265fba5a68d3",//微信
                  //"appId":"2018061360353335",//支付宝
                },
                method: 'POST',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                success: (res) => {
                  console.log('resss');
                  console.log(res.data);
                 
                 //请求商品类型
                my.httpRequest({
                url: 'https://www.tianrenyun.com.cn/vendor/api/goods/typeList', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
                data: {
                   "type":"2",
                   "level":"2"

                },
                method: 'POST',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                success: (res) => {
                  console.log('商品类型返回');
                  console.log(res.data);
                }

              })
                 

                }

              })

},

//测试获取商品分类
goodslistcs:function(){

        my.httpRequest({
                url: 'https://www.tianrenyun.com.cn/vendor/api/goods/list', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
                //data: post_data,
                data: {
                  "CommodityType":"10",
                  "type":"2",
                  "level":"2"
                },
                method: 'POST',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                success: (res) => {
                  console.log('resss');
                  console.log(res.data);
                
                }

              })

},
//获取设备数
getshebei:function(){
        my.httpRequest({
                url: 'https://www.tianrenyun.com.cn/vendor/api/device/list',
                data: {
                  "type":"2",
                  "level":"2"
                },
                method: 'POST',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                success: (res) => {
                  console.log('设备信息');
                  console.log(res.data);
                
                }

              })

},
//获取设备位置
GetshebeiLocation:function(e){

  var longitude =  e.currentTarget.dataset.lng;
  var latitude =  e.currentTarget.dataset.lat;
  var name =  e.currentTarget.dataset.deviceName;
  var address =  e.currentTarget.dataset.deviceProperty;


  my.openLocation({
  longitude: '121.549697',
  latitude: '31.227250',
  name: '支付宝',
  address: '杨高路地铁站',
});

}

})

//允许从相机和相册中扫码方法
function get_scancode(that) {
  // 允许从相机和相册扫码
  console.log('1515');
  my.scan({
    type: '',
    success: (res) => {
      if (res.code.indexOf('/') > 0) {
        //有‘/’，表示是扫出来的是链接，没有是扫的条形码
          my.navigateTo({
            url: '../youxian/goodssort'
          })
      } else {
        my.navigateTo({
          url: '../youxian/goodsdetails?id=' + res.code
        })
      }

    },
    fail: (res) => {

    }
  });
}


//高德坐标转百度（传入经度、纬度）
function bd_encrypt(gg_lng, gg_lat) {
  var X_PI = Math.PI * 3000.0 / 180.0;
  var x = gg_lng, y = gg_lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  console.log(bd_lng)
  console.log(bd_lat)
  return {
    bd_lat: bd_lat,
    bd_lng: bd_lng
  };

}
//百度坐标转高德（传入经度、纬度）
function bd_decrypt(bd_lng, bd_lat) {
  var X_PI = Math.PI * 3000.0 / 180.0;
  var x = bd_lng - 0.0065;
  var y = bd_lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  var gg_lng = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  return { lng: gg_lng, lat: gg_lat }
}


