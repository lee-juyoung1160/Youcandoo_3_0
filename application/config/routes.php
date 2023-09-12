<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

$route['default_controller'] = "main";
# 21.08.02
//$route['default_controller'] = 'v3_0/Main/index';

$route['404_override'] = 'main/error';

/***** Homepage Menu View *****/
//# 공지사항
//$route['notice'] = 'main/notice';
//$route['notice/detail/(:any)'] = 'main/noticeDetail/$1';
//# FAQ
//$route['faq'] = 'main/faq';
//# Promotion Guide
//$route['guide/promotion'] = 'main/guidePromotion';
//# DoIt Guide
//$route['guide/doit'] = 'Main/guideDoit';
//# DoIt Create Guide
//$route['guide/create'] = 'Main/guideDoitCreate';
//# ucd Guide
//$route['guide/ucd'] = 'Main/guideUcd';
//# PromotionSponsor Guide
//$route['guide/join'] = 'Main/guideSponsorPro';
//# Event
//$route['event'] = 'Main/event';
//$route['event/detail/(:any)'] = 'main/eventDetail/$1';
//# 이벤트 프로모션
//$route['event/promotion'] = 'main/EventPromotion';

# 공지사항
$route['notice'] = 'main';
$route['notice/detail/(:any)'] = 'main';
# FAQ
$route['faq'] = 'main';
# Promotion Guide
$route['guide/promotion'] = 'main';
# DoIt Guide
$route['guide/doit'] = 'main';
# DoIt Create Guide
$route['guide/create'] = 'main';
# ucd Guide
$route['guide/ucd'] = 'main';
# PromotionSponsor Guide
$route['guide/join'] = 'main';
# Event
$route['event'] = 'main';
$route['event/detail/(:any)'] = 'main';
# 이벤트 프로모션
$route['event/promotion'] = 'main';

#2021.07.09 프로모션용 주소생성
$route['promotion'] = 'main/promotion';
$route['promotion/(:any)'] = 'main/promotion/$1';

/***** Mobile Web View *****/
# 앱내 마이페이지(고객센터)
$route['v1.0/web/mypage'] = 'main/mypage';
# 공지사항
$route['v1.0/web/notice'] = 'main/web_notice';
$route['v1.0/web/notice/detail/(:any)'] = 'main/web_notice_detail/$1';
# FAQ
$route['v1.0/web/faq'] = 'main/web_faq';
# 사업자정보
$route['web/company'] = 'main/web_company';

# 1:1문의
$route['v1.0/web/inquiry'] = 'main/web_inquiry';
$route['v1.0/web/inquiry/detail/(:any)'] = 'main/web_inquiry_detail/$1';

# 이벤트
$route['v1.0/web/event'] = 'main/web_event';
$route['v1.0/web/event/detail/(:any)'] = 'main/web_event_detail/$1';

# 상품권교환
$route['v1.0/web/giftcard'] = 'main/web_giftexchange';


/***** Mobile Web View (Ver 3.0) *****/
# FAQ
$route['webview/v3.0/faq'] = 'v3_0/webview/faq';

# 1:1문의
$route['webview/v3.0/qna'] = 'v3_0/webview/inquiry';
$route['webview/v3.0/qna/detail/(:any)'] = 'v3_0/webview/inquiry_detail/$1';

# 공지사항
$route['webview/v3.0/notice'] = 'v3_0/webview/notice';
$route['webview/v3.0/notice/detail/(:any)'] = 'v3_0/webview/notice_detail/$1';

# 이벤트
$route['webview/v3.0/event'] = 'v3_0/webview/event';
$route['webview/v3.0/event/detail/(:any)'] = 'v3_0/webview/event_detail/$1';

# 상품교환
$route['webview/v3.0/gift'] = 'v3_0/webview/gift';
$route['webview/v3.0/gift_complete'] = 'v3_0/webview/gift_complete';

# 레벨가이드
$route['webview/v3.0/level_guide'] = 'v3_0/webview/level_guide';

# 미션가이드
$route['webview/v3.0/mission_guide'] = 'v3_0/webview/mission_guide';

# 두잇가이드
$route['webview/v3.0/doit_guide'] = 'v3_0/webview/doit_guide';

# 유캔두 사용 가이드
$route['webview/v3.0/youcandoo_guide'] = 'v3_0/webview/ycd_guide';

# 스토리
$route['webview/v3.0/story/(:any)'] = 'v3_0/webview/story/$1';

# 오류
$route['webview/v3.0/error'] = 'v3_0/webview/error';

# 개인정보보호
$route['webview/v3.0/privacy'] = 'v3_0/policy/app_privacy/latest';
$route['webview/v3.0/privacy/(:any)'] = 'v3_0/policy/app_privacy/$1';
# 이용약관
$route['webview/v3.0/terms'] = 'v3_0/policy/app_terms/latest';
$route['webview/v3.0/terms/(:any)'] = 'v3_0/policy/app_terms/$1';

# 친구초대
$route['webview/v3.0/referral'] = 'v3_0/webview/referral';

/***** Homepagae (Ver 3.0) *****/
# V3 Main
$route['web/v3.0/main'] = 'v3_0/Main/index';
$route['web/v3.0/qna/kakao'] = 'v3_0/Main/kakao_ch';

# 개인정보보호
$route['web/v3.0/privacy'] = 'v3_0/policy/web_privacy/latest';
$route['web/v3.0/privacy/(:any)'] = 'v3_0/policy/web_privacy/$1';
# 이용약관
$route['web/v3.0/terms'] = 'v3_0/policy/web_terms/latest';
$route['web/v3.0/terms/(:any)'] = 'v3_0/policy/web_terms/$1';

# 개인정보보호
$route['view/v3.0/privacy'] = 'v3_0/policy/view_privacy/latest';
$route['view/v3.0/privacy/(:any)'] = 'v3_0/policy/view_privacy/$1';
# 이용약관
$route['view/v3.0/terms'] = 'v3_0/policy/view_terms/latest';
$route['view/v3.0/terms/(:any)'] = 'v3_0/policy/view_terms/$1';

/* End of file routes.php */
/* Location: ./application/config/routes.php */
