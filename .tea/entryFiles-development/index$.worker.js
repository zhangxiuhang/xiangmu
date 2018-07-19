require('./config$');

function success() {
require('../..//app');
require('../../pages/youxian/index');
require('../../pages/youxian/goodsdetails');
require('../../pages/youxian/coupon');
require('../../pages/youxian/goodssort');
require('../../pages/mycenter/mycenter');
require('../../pages/mycenter/goodscollect');
require('../../pages/mycenter/mycoupon');
require('../../pages/mycenter/readme');
require('../../pages/logs/logs');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
