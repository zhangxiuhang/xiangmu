App({
  onLaunch(options) {
     
  },
  
  onLoad() {

  },
 
  globalData: {
    userInfo: null,
    orgguid: '88',
    searchcon: '',
    user_id: '',//支付宝userid
    projecttitle: '天任售货机平台',
    appid: '2018061360353335',
    appsecret: '',
    isGetedAuth: 0,//是否获取到授权
    isCanceledAuth: 0,//是否取消了授权
    alipay_user_id: '', //支付宝获取的uid
    getting_userinfo: 0,//获取用户信息中,=1
    red_path: '',
    goods_id: '',
    hostname: 'https://www.tianrenyun.com.cn',
    showcardtype: '1',//会员卡样式类别 1，0
    IS_BRANCH_STOCK: 1, //门店库存是否开启
    isNeedLogin: 0//0为不需要登录，1为需要手机号验证码登录
  },
});
