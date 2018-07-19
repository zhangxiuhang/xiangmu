// 获取应用实例
const app = getApp();

Page({
  data: {
    motto: 'Hello World 4',
    avatar: '',
    nickName: '',
    user_id: ''
  },
  // 事件处理函数
  bindViewTap() {
    my.navigateTo({
      url: '../logs/logs',
    });
  },
  onLoad() {
    var that = this;
    let res = my.getStorageSync({ key: 'user_id' });
    if (res.data !== undefined) {
      that.data.user_id = res.data.user_id;
    }

    if (that.data.user_id === '') {
      my.alert({ content: '未从支付宝获取到用户信息' });
      return;
    }

    let userinfo = my.getStorageSync({ key: 'userinfo' });
    if (userinfo.data !== undefined) {
      that.data.avatar = userinfo.data.avatar;
      that.data.nickName = userinfo.data.nickName;
    }

    that.setData({
      avatar: that.data.avatar,
      nickName: that.data.nickName
    });

    // 调用应用实例的方法获取全局数据
    // my.getStorage({
    //   key: 'user_id',
    //   success: function (res) {
    //     if (res.data !== undefined) {
    //       if (res.data.user_id !== undefined) {
    //         that.data.user_id = res.data.user_id;
    //         my.alert({ content: 'normal:'+that.data.user_id });
    //       }
    //     }
    //   },
    //   fail: function (res) {
    //     my.alert({ content: res.errorMessage });
    //   }
    // });

    // my.getStorage({
    //   key: 'userinfo',
    //   success: function (res) {
    //     if (res.data !== undefined) {
    //       if (res.data.avatar !== undefined) {
    //         that.data.avatar = res.data.avatar;
    //         that.data.nickName = res.data.nickName;
    //         that.setData({
    //           avatar: that.data.avatar,
    //           nickName: that.data.nickName
    //         });
    //       }
    //     }
    //   },
    //   fail: function (res) {
    //     my.alert({ content: res.errorMessage });
    //   }
    // });
  },
});
