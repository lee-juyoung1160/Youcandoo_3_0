// update 2022-03-30 / v1.6 */
const JWT_HEADER_KEY = 'Authorization';
const JWT_PREFIX = 'Bearer ';
const META_SUCCESS_CODE = 200;
const KEY_USER = 'user';
const KEY_ACCESS_TOKEN = 'access_token';
const KEY_REFRESH_TOKEN = 'refresh_token';

let presentProductSeqLamp = 1000920;
let presentProductSeqHumidifier = 1000919;

window.addEventListener('load', function () {
	var allElements = document.getElementsByTagName('*');
	Array.prototype.forEach.call(allElements, function (el) {
		var includePath = el.dataset.includePath;
		if (includePath) {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					el.outerHTML = this.responseText;
				}
			};
			xhttp.open('GET', includePath, true);
			xhttp.send();
		}
	});

	showProfileImage();
});

function handleScroll() {
	const ScrollChk = window.scrollY || document.documentElement.scrollTop;
	const setScroll = document.querySelector('body').classList;
	!ScrollChk <= 0 ? setScroll.add('fixed') : setScroll.remove('fixed');
}

function modalYU(linkURL) {
	let node = document.createElement('div');
	node.classList.add('pop-yu');
	document.querySelector('header').after(node);

	let yuButton =
		linkURL == undefined || linkURL == '' || linkURL == 'none'
			? ''
			: '<button class="btn active" onclick="window.location.href=\'' +
			linkURL +
			'\'"><span>�낇븰湲� �� 8,250�먭낵 �④퍡 寃곗젣</span></button>';
	let yuContent =
		'  <div class="modal-wrap course">\n' +
		'    <div class="dimmed" onclick="closeModal(\'pop-yu\');"></div>\n' +
		'    <div class="modal-inner">\n' +
		'      <button type="button" class="btn-modal-close white" onclick="closeModal(\'pop-yu\');"><i class="blind">�リ린</i></button>\n' +
		'      <div class="modal-content type-fixed-button" style="height:80%;">\n' +
		'        <div class="btn-flex-form">\n' +
		'          <div class="course-txt">\n' +
		'            <strong>YANADOO UNIVERSITY <br/><span>�섏엯�숉쉶�먥��</span> �꾩슜 �곹뭹�낅땲��</strong>\n' +
		'            <p>�쒕떖, 而ㅽ뵾 �� �� �� 媛믪쑝濡� <br/>�낇븰�뚯썝留뚯쓽 �꾨━誘몄뾼 �쒗깮 �됱깮 �좎�!</p>\n' +
		'            <p><span>�ㅼ쭅 �낇븰 �뚯썝留� �꾨━�� �쒗깮</span></p>\n' +
		'            <img src=https://english.yanadoocdn.com/upload/yanadoo/new/common/img_entrance_goods.png alt=""/>\n' +
		'          </div>' +
		yuButton +
		'          <a class="btn-yta" href="/promotion/yanadooUniversity"><span>�낇븰湲� �� 8,250�먭낵 �④퍡 寃곗젣</span></a>\n' +
		'         <span className="month-price-txt">* 珥� 99,000�� / 12媛쒖썡 (臾�) �좊� ��</span>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>';
	document.querySelector('body').classList.add('modal-open');
	document.querySelector('.pop-yu').innerHTML = yuContent;
}

function modalGoods() {
	closeModal('modal-yu-goods');
	let node = document.createElement('div');
	node.classList.add('modal-yu-goods');
	document.querySelector('header').after(node);

	getEntrancePresents();

	let yuContent =
		'<div class="modal-wrap modal-yu-goods">\n' +
		'  <div class="dimmed" onclick="closeModal(\'modal-yu-goods\');"></div>\n' +
		'  <div class="modal-inner">\n' +
		'    <button type="button" class="btn-modal-close" onclick="closeModal(\'modal-yu-goods\');"><i class="blind">�リ린</i></button>\n' +
		'    <div class="modal-content">\n' +
		'      <dl>\n' +
		'          <dt class="type-02">\n' +
		'               <strong><span>YANADOO UNIVERSITY</span><em>�깃났吏��� �낇븰��<br/>�곗뺨 �ㅽ듃瑜� �좏깮�� 二쇱꽭��</em></strong>\n' +
		'               <span><em>�됱깮 �낇븰 �뚯썝�� �� 寃껋쓣 �섏쁺�⑸땲��!</em></span>\n' +
		'          </dt>\n' +
		'          <dd>\n' +
		'             <ul>\n' +
		'               <li class="goods1">\n' +
		'                   <label for="goods1"><span class="goods-check-box"><input type="radio" id="goods1" name="yuGoods" value="' +
		presentProductSeqHumidifier +
		'"><span class="chk"></span><em>媛��듦린</em></span></label>\n' +
		'               </li>\n' +
		'               <li class="goods2">\n' +
		'                   <label for="goods2"><span class="goods-check-box"><input type="radio" id="goods2" name="yuGoods" value="' +
		presentProductSeqLamp +
		'"><span class="chk"></span><em>�⑦봽</em></span></label>\n' +
		'               </li>\n' +
		'             </ul>\n' +
		'             <em>(�곗뺨 �ㅽ듃 �좏깮 �� 蹂�寃� 遺덇�)</em>\n' +
		'          </dd>\n' +
		'      </dl>\n' +
		'      <button class="btn active" onclick="modalGoodsChecked();">�섍컯 �좎껌�섍린</button>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</div>';
	document.querySelector('body').classList.add('modal-open');
	document.querySelector('.modal-yu-goods').innerHTML = yuContent;
}

function modalGoodsChecked() {
	let radioCheck = document.getElementsByName('yuGoods');
	for (let i = 0; i < radioCheck.length; i++) {
		if (radioCheck[i].checked) {
			break;
		}
	}
}

function closeModal(popClassName) {
	let modalItem = document.querySelectorAll('.' + popClassName);
	document.querySelector('body').classList.remove('modal-open');
	for (let i = 0; i < modalItem.length; i++) {
		document.querySelectorAll('.' + popClassName)[i].style.display = 'none';
	}
}

function modalMediaOpen(mediaURL) {
	let modalItem = document.createElement('div');
	modalItem.classList.add('modal-wrap', 'modal-wrap-media');
	modalItem.innerHTML = '<div class="dimed" onclick="modalMediaClose();"></div>' +
		'<div class="modal-content">' +
		'  <button type="button" class="btn-close" onclick="modalMediaClose();">�リ린</button>' +
		'  <iframe width="100%" height="100%" frameborder="0" src="' + mediaURL + '" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>' +
		'</div>';
	document.querySelector('header').after(modalItem);
	document.querySelector('body').classList.add('locked-modal');
	document.querySelector('.modal-wrap-media').style.display = 'block';
}

function modalMediaClose() {
	document.querySelector('.modal-wrap-media').remove();
	document.querySelector('body').classList.remove('locked-modal');
}

/*document.write(
	'<link rel="stylesheet" type="text/css" href="common/css/reset.css" />' +
	'<link rel="stylesheet" type="text/css" href="common/css/common.css?v=1.6" />' +
	'<link rel="stylesheet" type="text/css" href="common/css/promotion.css?v=1.1" />' +
	'<link rel="stylesheet" type="text/css" href="common/css/swiper.min.css" media="screen">' +
	'<script type="text/javascript" src="common/js/jquery-2.2.4.min.js"></script>' +
	'<script type="text/javascript" src="common/js/comm.js"></script>' +
	'<script type="text/javascript" src="common/js/jquery.bxslider.js"></script>' +
	'<script type="text/javascript" src="common/js/swiper.min.js"></script>' +
	'<script type="text/javascript" src="common/js/headscript.js"></script>'
);*/

window.addEventListener('DOMContentLoaded', function () {
	getGnbList();

	let navMenu = document.querySelector('nav').querySelectorAll('ul')[0].querySelectorAll('ul');
	let activeCheckItem = document.querySelector('.landing').id;
	let headerItem = document.querySelector('header');
	let navItem = document.querySelector('nav').querySelector('ul').children;

	for (let i = 0; i < navMenu.length; i++) {
		for (let j = 0; j < navMenu[i].querySelectorAll('a').length; j++) {
			if (
				navMenu[i].querySelectorAll('a')[j].href.indexOf(location.href) != -1 ||
				(activeCheckItem != '' &&
					navMenu[i].querySelectorAll('a')[j].href.indexOf(activeCheckItem) != -1)
			) {
				navMenu[i].querySelectorAll('a')[j].classList.add('active');
				navMenu[i]
					.querySelectorAll('a')
					[j].parentNode.parentNode.parentNode.classList.add('active');
				navMenu[i]
					.querySelectorAll('a')
					[j].parentNode.parentNode.parentNode.classList.add('nav-main');
			}
		}
	}

	for (let i = 0; i < navItem.length; i++) {
		navItem[i].children[0].onclick = function () {
			if (window.innerWidth <= 1024 && headerItem.classList.value.indexOf('nav-mobile') != -1) {
				if (navItem[i].classList.value.indexOf('nav-main') != -1) {
					navItem[i].classList.remove('nav-main');
					return false;
				} else {
					for (let j = 0; j < navItem.length; j++) {
						navItem[j].classList.remove('nav-main');
					}
					navItem[i].classList.add('nav-main');
					return false;
				}
			}
		};
	}
	if((document.querySelector('.landing').classList.contains('gnb-none')) || (getParameterByName('gnbDisplay') === 'n')) document.querySelector('header').style.display = 'none';
});
// header scroll event
window.addEventListener('scroll', function () {
	handleScroll();
});

function isEmpty(val) {
	return (
		val === undefined ||
		val === null ||
		val === '' ||
		(val !== null && typeof val === 'object' && !Object.keys(val).length)
	);
}

function isNotEmpty(val) {
	return !isEmpty(val);
}

function b64_to_utf8(str) {
	return decodeURIComponent(escape(window.atob(str)));
}

function isLoggedIn() {
	const refreshToken = getLocalRefreshToken();
	if (!isActiveToken(refreshToken)) {
		removeUserInfo();
		return false;
	}

	let accessToken = getLocalAccessToken();
	if (!isActiveToken(accessToken)) {
		accessToken = getAccessToken(refreshToken);
		return isActiveToken(accessToken);
	}

	return true;
}

function isActiveToken(token) {
	if (isEmpty(token)) {
		return false;
	}

	if (token.split('.').length !== 3) {
		return false;
	}

	try {
		const payload = b64_to_utf8(token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+'));
		const exp = JSON.parse(payload).exp;
		return new Date(exp * 1000) > new Date();
	} catch (e) {
		console.log(e);
		return false;
	}
}

function getAccessToken(refreshToken) {
	let accessToken = '';
	$.ajax({
		url: AUTH_API_HOST + '/auth/v2/sign-in/get-access-token',
		type: 'POST',
		async: false,
		beforeSend: function (xhr) {
			xhr.setRequestHeader(JWT_HEADER_KEY, JWT_PREFIX + refreshToken);
		},
		cache: false,
		dataType: 'json',
		success: function (result) {
			if (result.meta.code === META_SUCCESS_CODE) {
				accessToken = result.data.accessToken;
				localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
				localStorage.setItem(KEY_USER, JSON.stringify(result.data.user));
			}
		},
		error: function (e) {
			console.log(e);
		},
	});

	return accessToken;
}

function getLocalAccessToken() {
	return localStorage.getItem(KEY_ACCESS_TOKEN);
}

function getLocalRefreshToken() {
	return localStorage.getItem(KEY_REFRESH_TOKEN);
}

function getUserFromStorage() {
	return localStorage.getItem(KEY_USER);
}

let userSeq;
function getUser() {
	let userInfo = {};
	$.ajax({
		url: AUTH_API_HOST + '/auth/v2/user',
		type: 'GET',
		async: false,
		beforeSend: function (xhr) {
			let token = getLocalAccessToken();
			if (isNotEmpty(token)) {
				xhr.setRequestHeader(JWT_HEADER_KEY, JWT_PREFIX + token);
			}
		},
		cache: false,
		dataType: 'json',
		success: function (result) {
			if (result.meta.code === META_SUCCESS_CODE) {
				userSeq = result.data.userSeq;
				userInfo = result.data;
			} else {
			}
		},
		error: function (e) {
			console.log(e);
		},
	});

	return userInfo;
}

function showProfileImage() {
	if (!isLoggedIn()) {
		return;
	}
	const userInfoString = getUserFromStorage();
	if (isEmpty(userInfoString) || typeof userInfoString !== 'string') {
		return;
	}

	const userInfo = JSON.parse(userInfoString);
	if (userInfo.profileImageUrl && $('header .ico-user').length > 0) {
		$('header .ico-user')
			.css({ 'background-image': 'url(' + userInfo.profileImageUrl + ')' })
			.addClass('user-thumb-box');
	}
}

function removeUserInfo() {
	localStorage.removeItem('user');
	localStorage.removeItem('access_token');
	localStorage.removeItem('refresh_token');
}

function downloadCoupon(couponCode) {
	if (!isLoggedIn()) {
		alert('濡쒓렇�� �� �댁슜�� 二쇱꽭��.');
		window.location.href = '/login?pathname=' + encodeURIComponent(document.location.pathname);
		return false;
	}

	$.ajax({
		type: 'POST',
		beforeSend: function (xhr) {
			let token = getLocalAccessToken();
			if (isNotEmpty(token)) {
				xhr.setRequestHeader(JWT_HEADER_KEY, JWT_PREFIX + token);
			}
		},
		url: API_HOST + '/v2/coupon-publish?couponCode=' + couponCode,
		success: function (data) {
			if (data.meta.code === 200) {
				alert('�ㅼ슫濡쒕뱶媛� �꾨즺�섏뿀�듬땲��.\n�좎씤�� 媛�寃⑹쑝濡� 援щℓ�섏꽭��!');
				if (window['yndModalClose']) {
					yndModalClose();
				}
			} else if (data.meta.code === -1) {
				alert('�대� �ㅼ슫濡쒕뱶�섏뀲�듬땲��.\n�좎씤�� 媛�寃⑹쑝濡� 援щℓ�섏꽭��!');
				if (window['yndModalClose']) {
					yndModalClose();
				}
			} else {
				alert(data.meta.message);
			}
		},
		error: function (e) {
			alert('�ㅼ떆 �쒕룄�댁＜�몄슂.');
		},
	});
}

function isEntrancedUser() {
	if (!isLoggedIn()) {
		return false;
	}

	let userInfo = getUser();
	try {
		return userInfo.entrance && userInfo.entrance.entranceStatus === 'ENTRANCE';
	} catch (e) {
		console.log(e);
		return false;
	}
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	let regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
		results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getUtm() {
	let utm = '';
	try {
		utm +=
			getParameterByName('utm_source') +
			'&' +
			getParameterByName('utm_medium') +
			'&' +
			getParameterByName('utm_campaign') +
			'&' +
			getParameterByName('utm_content');
		utm = utm.replace(/&&/g, '&').replace(/&+$/, '');
	} catch (e) {}
	return utm;
}

function getEntrancePresents() {
	$.ajax({
		url: API_HOST + '/v2/store/entrance-present',
		type: 'GET',
		async: false,
		cache: false,
		dataType: 'json',
		success: function (result) {
			for (let i in result.data) {
				if (result.data[i].name.indexOf('媛��듦린') > -1) {
					presentProductSeqHumidifier = result.data[i].productSeq;
				} else if (result.data[i].name.indexOf('�⑦봽') > -1) {
					presentProductSeqLamp = result.data[i].productSeq;
				}
			}
		},
		error: function (e) {
			console.log(e);
		},
	});
}
function getGnbList() {
	$.ajax({
		url: API_HOST + '/v2/gnb-menu/list',
		type: 'GET',
		async: false,
		cache: false,
		dataType: 'json',
		success: function (result) {
			if (result.meta.code === 200 && result.data) {
				let gnbItems = result.data;

				let nav =
					`<div class="inner-col">` +
					`<section class="nav-group">` +
					`<div class="nav-item"><div class="nav-close" onclick=\"document.querySelector('header').classList.remove('active');"><span><i class="blind">�덉씠�� �リ린</i></span></div>` +
					`<button onclick=\"document.querySelector('header').classList.add('active'); document.querySelector('header').classList.add('nav-mobile');"><span class="ico-hamburger"><i class="blind">hamburger menu</i></span></button>` +
					`<h1><a href="/" class="logo"><i class="blind">�쇰굹��</i></a></h1>` +
					`<nav><a href="/" class="logo"><i class="blind">�쇰굹��</i></a><ul>`;

				for (let item of gnbItems) {
					nav += `<li class="${
						item.iconType && item.iconType !== 'NONE' ? item.iconType.toLowerCase() : ''
					}"><a href="${item.link}" target="_${item.linkTarget.toLowerCase()}">${
						item.menuName
					}</a><ul>`;
					for (let sub of item.childGnbMenus) {
						nav += `<li class="${
							sub.iconType && sub.iconType === 'NEW' ? sub.iconType.toLowerCase() : ''
						}"><a href="${sub.link}"  target="_${sub.linkTarget.toLowerCase()}">${
							sub.menuName
						}</a></li>`;
					}
					nav += `</ul></li>`;
				}
				nav +=
					`</ul>` +
					`<div class="btn-app-download header-mobile">` +
					`<strong class="title">�쇰굹�� �� 諛붾줈媛�湲�</strong>` +
					`<button type="button" onclick="window.open('https://play.google.com/store/apps/details?id=kr.co.yanadoo.app2');"><img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_android_download_288x288.png" alt=""></button>` +
					`<button type="button" onclick="window.open('https://itunes.apple.com/kr/app/id1539582420');"><img src="https://english.yanadoocdn.com/upload/yanadoo/new/common/ico_ios_download_288x288.png" alt=""></button></div>` +
					`</nav ></div></section>` +
					`<section class="nav-global">` +
					`<a href="/mypage/1"><span class="ico-user"><i class="blind">mypage</i></span></a>` +
					`</section></div>`;

				document.querySelector('header').innerHTML = nav;
			}
		},
		error: function (e) {
			console.log(e);
		},
	});
}

let yndPopupImage = document.createElement('img');
let yndPopupLink = document.createElement('a');
let yndPopupSeq;

function yndModal() {
	fn_setPopupInfo();

	yndPopupImage.addEventListener('load', function () {
		if (getCookie('p_ynd_modal' + yndPopupSeq) !== 'done') {
			let modalImage = document.querySelectorAll('.ynd-modal-content')[0];
			let modalWidth = yndPopupImage.clientWidth;
			let modalHeight = yndPopupImage.clientHeight;
			if (navigator.userAgent.indexOf('9.0') === -1) {
				document.querySelector('body').classList.add('locked-modal');
			} else {
				document.querySelector('body').className += ' locked-modal';
			}
			modalImage.setAttribute('style', 'width:' + modalWidth + 'px; height:' + modalHeight + 'px;');
			$('.ynd-modal').css('visibility', 'visible');
		}
	});
}

function fn_setPopupInfo() {
	const popupPathname = encodeURIComponent(location.pathname);
	let node = document.createElement('div');

	if (popupPathname && popupPathname !== null && popupPathname !== '') {
		$.ajax({
			type: 'GET',
			url: API_HOST + '/v2/popup/current?pathname=' + popupPathname,
			dataType: 'json',
			cache: false,
			success: function (result) {
				if (result.meta.code === 200 && result.data) {
					node.classList.add('ynd-modal-wrap');
					document.querySelector('header').after(node);

					let yndModalContent =
						'<div class="ynd-modal">\n' +
						'   <div class="ynd-bg" onclick="yndModalClose();"></div>\n' +
						'       <div class="ynd-modal-content">\n' +
						'           <button type="button" class="ynd-close" onclick="yndModalClose();">close</button>\n' +
						'           <button type="button" id="btn_yndModalTodayClose" class="ynd-today-close"></button>\n' +
						'   </div>\n' +
						'</div>';

					document.querySelector('.ynd-modal-wrap').innerHTML = yndModalContent;

					yndPopupSeq = result.data.seq;
					yndPopupImage.src = result.data.image;
					const popupCloseType = result.data.closeType;
					const popupMoveLink = result.data.link && result.data.link;
					document.getElementById('btn_yndModalTodayClose').innerHTML = popupCloseType;

					if (popupMoveLink) {
						yndPopupLink.href = popupMoveLink;
						$('.ynd-modal-content').prepend(yndPopupLink);
						$(yndPopupLink).prepend(yndPopupImage);
					} else {
						$('.ynd-modal-content').prepend(yndPopupImage);
					}

					if (popupCloseType && popupCloseType !== '�듭뀡 �놁쓬') {
						popupCloseType === '�ㅻ뒛 �섎（ �댁� �딄린'
							? $('.ynd-today-close').attr(
								'onclick',
								"yndModalCloseToday('p_ynd_modal" + yndPopupSeq + "', 1);"
							)
							: $('.ynd-today-close').attr(
								'onclick',
								"yndModalCloseToday('p_ynd_modal" + yndPopupSeq + "', 7);"
							);
					} else {
						$('.ynd-today-close').css('display', 'none');
					}
				}
			},
			error: function (data) {
				alert('�ㅼ떆 �쒕룄�댁＜�몄슂.');
			},
		});
	}
}

function yndModalCloseToday(cookies, date) {
	if (cookies == 'p_ynd_modal' + yndPopupSeq) {
		setCookieAt00(cookies, 'done', date);
		yndModalClose();
	}
}

function yndModalClose() {
	document.querySelector('.ynd-modal').setAttribute('style', 'visibility', 'hidden');
	if (navigator.userAgent.indexOf('9.0') === -1) {
		document.querySelector('body').classList.remove('locked-modal');
	} else {
		$('body').removeClass('locked-modal');
	}
}
