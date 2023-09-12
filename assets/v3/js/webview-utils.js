
	const fileUploadUrl = 'https://fileuploader.youcandoo.co.kr/multi';
	const baseApiUrl = `${api_server_url}/v3.0/webview/`;
	const api = {
		/** FAQ **/
		faqType : baseApiUrl+'faq/get/type',
		faqList : baseApiUrl+'faq/get/list',
		/** 공지 **/
		noticeList : baseApiUrl+'notice/get/list',
		detailNotice : baseApiUrl+'notice/get/detail/',
		/** 이벤트 **/
		eventList : baseApiUrl+'event/get/list/progress',
		endEventList : baseApiUrl+'event/get/list/end',
		detailEvent : baseApiUrl+'event/get/detail/',
		announcementList : baseApiUrl+'event/get/list/announce',
		/** 1: 1 문의 **/
		createInquiry : baseApiUrl+'qna/register',
		inquiryList : baseApiUrl+'qna/get/list',
		detailInquiry : baseApiUrl+'qna/get/detail/',
		getUserInfo : baseApiUrl+'qna/get/profile',
		guestLogin : baseApiUrl+'qna/login',
		/** 상품교환 **/
		giftList : baseApiUrl+'gift/get/list',
		applyGift : baseApiUrl+'gift/set/exchange',
		/** 친구초대 **/
		referral : baseApiUrl+'invite/get/status',
	}
	const message = {
		submit : '등록하시겠습니까?',
		required : '필수 항목입니다.',
		input: '입력해주세요.',
		select: '선택해주세요.',
		check: '확인해주세요.',
		loadError: '불러올 수 없습니다.',
		ajaxError : '처리 중 오류가 발생했습니다.',
		noCellphoneNum : '발송할 전화 번호가 존재하지 않습니다.',
		noDeviceInfo : '기기로 부터 정보를 가져올 수 없습니다.',
		notSupportedDevice : '지원하지 않는 기기입니다.',
		notSupportedExt : '지원하지 않는 형식입니다.',
		overSizeFile : '파일은 최대 10mb까지 등록 가능합니다.',
		privacyAgree : '개인정보 수집 및 이용동의를 체크해주세요.',
		invalidLogin : '이메일과 비밀번호를 다시 한번 확인해주세요.',
		noLevelInfo : '닉네임/레벨 정보가 없습니다.',
	}
	const noImage = 'https://youcandoo.yanadoocdn.com/v3/youcandoo/assets/images/webviewimg/icon-no-img.png';
	const faqArrow = 'https://youcandoo.yanadoocdn.com/v3/youcandoo/assets/images/webviewimg/v3/faq_btn_list_down.png';
	const faqNoContent = 'https://youcandoo.yanadoocdn.com/v3/youcandoo/assets/images/webviewimg/v3/faq_search_result.png';
	const eventNoContent = 'https://youcandoo.yanadoocdn.com/v3/youcandoo/assets/images/webviewimg/v3/event_img_empty.png';
	const iconDelete = 'https://youcandoo.yanadoocdn.com/v3/youcandoo/assets/images/webviewimg/v3/inquiry_btn_write_delete.png';
	const iconAttach = 'https://youcandoo.yanadoocdn.com/v3/youcandoo/assets/images/webviewimg/v3/inquiry_icon_attached_file.png';
	const inquiryNoContent = 'https://youcandoo.yanadoocdn.com/v3/youcandoo/assets/images/webviewimg/v3/inquiry_none_img.png';
	const noticeNoContent = 'https://youcandoo.yanadoocdn.com/v3/youcandoo/assets/images/webviewimg/v3/notice_empty_img.png';
	const iconUcd = 'https://youcandoo.yanadoocdn.com/v3/youcandoo/assets/images/webviewimg/v3/gift_icon_ucd.png';
	const userAgentOsType = navigator.userAgent.toLowerCase();
	function isAos()
	{
 		return userAgentOsType.indexOf('android') > -1;
	}

	function isIos()
	{
		return (userAgentOsType.indexOf("iphone") > -1 || userAgentOsType.indexOf("ipad") > -1 || userAgentOsType.indexOf("ipod") > -1);
	}

	function isEmpty(value)
	{
		return (
			/** null or undefined **/
			(value == null) ||

			/** has length and it's zero **/
			(value.hasOwnProperty('length') && value.length === 0) ||

			/** is an Object and has no keys **/
			(value.constructor === Object && Object.keys(value).length === 0) ||

			(value.constructor === String && value.trim() === '')
		)
	}

	function isEmail(param)
	{
		let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

		return regExp.test(param);
	}

	/** 숫자 형식에 , 붙이기 **/
	function numberWithCommas(num)
	{
		return isEmpty(num) ? 0 : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function onErrorImage()
	{
		document.querySelectorAll('img').forEach(element => {
			element.addEventListener('error', function () {
				this.setAttribute('src', noImage)
			})
		})
	}

	function isBackAction()
	{
		const hasNavigation = window.performance.getEntriesByType("navigation")[0];
		const navigationType = isEmpty(hasNavigation) ? window.performance.navigation.type : hasNavigation.type;
		return ('back_forward' === navigationType || 2 === navigationType)
	}

	function isSuccessResp(data)
	{
		return Number(data.status) === 0;
	}

	function getErrorMessage(status)
	{
		switch (Number(status))	{
			case 20004 :
				return 'account_token 키가 존재하지 않음'
			case 20005 :
				return 'store 값 없음'
			case 20006 :
				return '만료된 account_token'
			case 20011 :
				return '통합서버 PHP Error Return'
			case 20254 :
				return '삭제된 문의입니다.'
			case 20278 :
				return '상품교환 gift_uuid 키가 존재하지 않음'
			case 20279 :
				return '상품교환 qty 키가 존해하지 않음'
			case 20280 :
				return '상품교환 신청 상품정보가 없음'
			case 20281 :
				return '보유 UCD가 부족합니다.'
			case 20213 :
				return 'UCD 선물함 받기 처리 오류'
			default :
				return '처리중 오류가 발생했습니다.'
		}
	}

	function XMLHttpRequestWithJson(url, params, successCallback, errMsg)
	{
		const xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.responseType = 'json';
		xhr.send(params);

		xhr.onload = function() {
			(xhr.status === 200) ? successCallback(xhr.response) : alert(errMsg);
		};
	}

	function onClickBtnBack()
	{
		isEmpty(document.referrer) ? webviewClose() : webviewBack();
	}

	function webviewBack()
	{
		if (isAos())
		{
			try {
				window.webview.webviewback();
			} catch (e) {
				window.history.back();
			}
		}
		else if (isIos())
		{
			try {
				const param = JSON.stringify({ "action" : {"pageType" : "webview_back"} });
				const message = "jscall://"+encodeURIComponent(param);
				let iframe = document.createElement('iframe');
				iframe.setAttribute('src', message);
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;
			} catch (e) {
				alert(message.ajaxError);
			}
		}
		else
		{
			alert(message.notSupportedDevice);
			window.history.back();
		}
	}

	function webviewClose()
	{
		if (isAos())
		{
			try {
				window.webview.closeview();
			} catch (e) {
				window.history.back();
			}
		}
		else if (isIos())
		{
			try {
				const param = JSON.stringify({ "action" : {"pageType" : "webview_close"} });
				const message = "jscall://"+encodeURIComponent(param);
				let iframe = document.createElement('iframe');
				iframe.setAttribute('src', message);
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;
			} catch (e) {
				alert(message.ajaxError);
			}
		}
		else
		{
			alert(message.notSupportedDevice);
			window.history.back();
		}
	}

	document.documentElement.classList.add(osType());
	function osType()
	{
		return (userAgentOsType.indexOf('android') > -1) ? 'aos' : 'ios';
	}
