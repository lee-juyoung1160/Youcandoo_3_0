
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
	function numberWithCommas(x)
	{
		return isEmpty(x) ? 0 : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	const userAgentOsType = navigator.userAgent.toLowerCase();
	function isAos()
	{
 		return userAgentOsType.indexOf('android') > -1;
	}

	function isIos()
	{
		return (userAgentOsType.indexOf("iphone") > -1 || userAgentOsType.indexOf("ipad") > -1 || userAgentOsType.indexOf("ipod") > -1);
	}

	const NavType = window.PerformanceNavigation.TYPE_BACK_FORWARD;
	function isBackAction()
	{
		return NavType === window.performance.navigation.type;
	}

	function isSuccessResp(data)
	{
		return data.status === 0;
	}

	function onErrorImage(obj)
	{
		$(obj).attr('src', 'https://service.yanadoocdn.com/youcandoo/assets/images/webviewimg/icon-no-img.png?resource_version=<?=$resource_version?');
	}

	const message = {
		submit : '등록하시겠습니까?',
		required : '필수 항목입니다.',
		input: '입력해주세요.',
		select: '선택해주세요.',
		check: '확인해주세요.',
		ajaxError : '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
		noDeviceInfo : '기기로 부터 정보를 가져올 수 없습니다.',
		notSupportedDevice : '지원하지 않는 기기입니다.',
		notSupportedExt : '지원하지 않는 형식입니다.',
		overSizeFile : '파일은 최대 10mb까지 등록 가능합니다.',
		termsAgree : `개인정보 수집 및 이용약관 동의를 체크해주세요.`
	}

	const baseApiUrl = `${api_server_url}/v1.0/web/`;
	const api = {
		/** 공지 **/
		noticeList : baseApiUrl+'notice/list',
		noticeDetail : baseApiUrl+'notice/info',
		/** 이벤트 **/
		eventList : baseApiUrl+'event/listStatus',
		eventDetail : baseApiUrl+'event/info',
		/** 1: 1 문의 **/
		getUserInfo : baseApiUrl+'qna/member/info',
		questLogin : baseApiUrl+'qna/nonmember/login',
		requestInquiry : baseApiUrl+'qna/create',
		listInquiry : baseApiUrl+'qna/list',
		detailInquiry : baseApiUrl+'qna/detail',
		/** 상품교환 **/
		getUserUcd : baseApiUrl+'giftcard/status',
		giftList : baseApiUrl+'giftcard/list',
		giftApply : baseApiUrl+'giftcard/request',
	}

	const fileUploadUrl = 'https://fileuploader.youcandoo.co.kr/file/upload/multi';
