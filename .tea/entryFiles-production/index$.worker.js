require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/youxian/index');
require('../../pages/youxian/goodsdetails');
require('../../pages/youxian/coupon');
require('../../pages/youxian/goodssort');
require('../../pages/index/index');
require('../../pages/goods/goodssort');
require('../../pages/goods/goodslist');
require('../../pages/goods/goodsdetails');
require('../../pages/cart/index');
require('../../pages/order/assistantconfirm');
require('../../pages/order/addresslist');
require('../../pages/order/addrinfo');
require('../../pages/order/orderdetails');
require('../../pages/order/orderlist');
require('../../pages/order/submitorder');
require('../../pages/order/submitordersucc');
require('../../pages/mycenter/mycenter');
require('../../pages/mycenter/goodscollect');
require('../../pages/mycenter/mycoupon');
require('../../pages/mycenter/readme');
require('../../pages/coupon/coupon');
require('../../pages/logs/logs');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
