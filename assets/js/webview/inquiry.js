
	const screenHeight = window.screen.height;
	const body		= $("body");
	const inputEl	= $("input");
	const btnFaq	= $("#btnFaq");
	const olTab 	= $("#olTab");
	/** 1:1문의 **/
	const nickname 	= $("#nickname");
	const username 	= $("#username");
	const email 	= $("#email");
	const selInquiryType = $("#selInquiryType");
	const title 	= $("#title");
	const content 	= $("#content");
	const attachment 	= $("input[name=attachment]");
	const btnDelAttach 	= $(".icon-delete-attach");
	const chkReplyMail 	= $("#chkReplyMail");
	const replyMail 	= $("#replyMail");
	const passwdWrap 	= $('.input-wrap.password')
	const passwd 	= $("#passwd");
	const btnViewPass = $("#btnViewPass");
	const chkAgreeTerms = $("#chkAgreeTerms");
	const btnTerms 	= $("#btnTerms");
	const memberEls = $(".member-item");
	const guestEls 	= $(".guest-item");
	const btnSubmit = $("#btnSubmit");
	/** 문의내역 **/
	const listContent = $("#listContent");
	/** modal **/
	const modalTerms 	= $("#modalTerms");
	const btnTermsOk 	= $("#btnTermsOk");
	const modalBackDrop = $("#modalBackDrop");
	const modalSuccess 	= $("#modalSuccess");
	const btnSuccessOk 	= $("#btnSuccessOk");

	let g_account_token = '';

	$(() => {
		isBackAction() ? setActiveTabFromHistory() : getDeviceInfoFromNative();
		inputEl		.on('keyup', function (event) { keyupOnInputElement(event); });
		btnViewPass	.on('click',function() { viewPassword(this); });
		btnFaq		.on('click',function() { goFaq(); });
		title 		.on("propertychange change keyup paste input", function () { checkInputLength(this); });
		content 	.on("propertychange change keyup paste input", function () { checkInputLength(this); });
		olTab		.on('click', function (event) { onClickTab(event.target); });
		btnDelAttach	.on('click', function () { onClickDelAttach(this); });
		attachment	.on('change', function () { onChangeValidationImage(this); });
		chkReplyMail.on('change', function () { onChangeCheckReplyMail(this); });
		btnSubmit	.on('click', function () { onClickBtnSubmit(); });
		btnTerms	.on('click', function () { onClickTerms(); });
		btnTermsOk	.on('click', function () { closeModalTerms(); });
		btnSuccessOk	.on('click', function () { onClickModalSuccessOk(); });
	})

	/**
	 *  AOS는 native를 호출해서 token값을 가져오고 IOS는 native 호출하면 IOS에서 callExchangeGiftCard를 callback 함.
	 * **/
	function getDeviceInfoFromNative()
	{
		if (isAos())
		{
			let responseObjFromAos;
			try {
				responseObjFromAos = callAosFunc();
			} catch (e) {
				alert(message.noDeviceInfo);
			} finally {
				getDeviceInfo(responseObjFromAos);
			}
		}
		else if (isIos())
		{
			try {
				callIosFunc();
			} catch (e) {
				alert(message.noDeviceInfo);
			}
		}
		else
		{
			alert(message.notSupportedDevice);
		}
	}

	function callAosFunc()
	{
		return window.webview.getDeviceInfo();
	}

	function callIosFunc()
	{
		let message = "jscall://"+encodeURIComponent('{ "inquiry" : true }');
		let iframe = document.createElement('iframe');
		iframe.setAttribute('src', message);
		document.documentElement.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;
	}

	function getDeviceInfo(obj)
	{
		setGlobalDeviceInfo(obj);

		if (!isEmpty(g_account_token))
			getUserInfo();

		initPage();
	}

	let g_app_version = '';
	let g_os_version = '';
	let g_device = '';
	function setGlobalDeviceInfo(obj)
	{
		if (obj !== undefined)
		{
			let jsonObj = JSON.parse(obj)
			g_account_token = jsonObj.account_token;
			g_app_version = jsonObj.app_version;
			g_os_version = jsonObj.os_version;
			g_device = jsonObj.device;
		}

		sessionStorage.setItem("account_token", g_account_token);
		sessionStorage.setItem("app_version", g_app_version);
		sessionStorage.setItem("os_version", g_os_version);
		sessionStorage.setItem("device", g_device);
	}

	function initPage()
	{
		let selectedTargetContent = '';
		olTab.children().each(function () {
			if ($(this).hasClass('on'))
				selectedTargetContent = $(this).data('target');
		});
		let isInputTab = selectedTargetContent === '#inquiry';

		/** 입력 폼 초기화 **/
		initForm();

		if (isEmpty(g_account_token))
			isInputTab ? showGuestElement() : isEmpty(sessionStorage.getItem("email")) ? initInquiryListPageForGuest() : getInquiryList();
		else
			isInputTab ? showMemberElement() : getInquiryList();
	}

	function initInquiryListPageForGuest()
	{
		let guestLoginEL =
			`<div class="contents">
				<p class="top-text-wrap">
					비회원인 경우 1:1문의 작성 시,<br>입력하신 이메일과 비밀번호로 조회가 가능해요.
				</p>
				<div class="item">
					<div class="input-wrap">
						<input type="email" placeholder="이메일을 입력해주세요" id="loginEmail">
					</div>
				</div>
				<div class="item">
					<div class="input-wrap">
						<input type="password" placeholder="비밀번호를 입력해주세요" id="loginPasswd">
					</div>
				</div>
				<div class="done-btn-wrap">
					<button onclick="onClickGuestLogin();" type="button">조회하기</button>
				</div>
			</div>`

		listContent.html(guestLoginEL);
	}

	function showMemberElement()
	{
		memberEls.show();
		guestEls.hide();
	}

	function showGuestElement()
	{
		guestEls.show();
		memberEls.hide();
	}

	function initForm()
	{
		username.val('');
		email.val('');
		passwd.val('');
		selInquiryType.val('');
		title.val('');
		content.val('');
		chkReplyMail.prop('checked', false);
		replyMail.val('');
		chkAgreeTerms.prop('checked', false);
		removeThumbnail(attachment);
		emptyFile(attachment);
	}

	function getUserInfo()
	{
		$.ajax({
			global: false,
			url: api.getUserInfo,
			type: "POST",
			dataType: 'json',
			data: JSON.stringify({ "account_token" : g_account_token }),
			success: function(data) {
				isSuccessResp(data) ? setUserInfo(data) : alert(data.msg);
			},
			error: function (request, status) {
				alert(message.ajaxError);
			}
		});
	}

	let g_profile_uuid;
	function setUserInfo(data)
	{
		nickname.val(data.data.nickname);
		g_profile_uuid = data.data.profile_uuid;
		sessionStorage.setItem("nickname", data.data.nickname);
		sessionStorage.setItem("profile_uuid", g_profile_uuid);
	}

	/******************
	 *  상단 탭 클릭 이벤트
	 * ****************/
	function onClickTab(target)
	{
		sessionStorage.setItem("target", $(target).data('target'));
		toggleOnAndOffTab(target);
		toggleShowAndHideTargetContent(target);
		initPage();
	}

	function toggleOnAndOffTab(target)
	{
		olTab.find('li').removeClass('on');
		$(target).addClass('on');
	}

	function toggleShowAndHideTargetContent(target)
	{
		$('article').hide();

		let targetContent = $(target).data('target');
		$(targetContent).show();
	}

	/******************
	 *  비회원 로그인
	 * ****************/
	function onClickGuestLogin()
	{
		if (guestLoginValidation())
		{
			let loginEmail = $("#loginEmail");
			let passwd = CryptoJS.SHA512($("#loginPasswd").val().trim());
			let param = {
				"email" : loginEmail.val().trim(),
				"password" : passwd.toString()
			}

			sessionStorage.setItem("email", loginEmail.val().trim());
			sessionStorage.setItem("password", passwd.toString());

			$.ajax({
				global: false,
				url: api.questLogin,
				type: "POST",
				dataType: 'json',
				data: JSON.stringify(param),
				success: function(data) {
					isSuccessResp(data) ? getInquiryList() : alert(data.msg);
				},
				error: function (request, status) {
					alert(message.ajaxError);
				}
			});
		}
	}

	function guestLoginValidation()
	{
		let loginEmail = $("#loginEmail");
		let loginPasswd = $("#loginPasswd");

		if (isEmpty(loginEmail.val()))
		{
			alert(`이메일을 ${message.input}`);
			loginEmail.trigger('focus');
			return false;
		}

		if (isEmpty(loginPasswd.val()))
		{
			alert(`비빌번호를 ${message.input}`);
			loginPasswd.trigger('focus');
			return false;
		}

		return true;
	}

	/******************
	 *  문의내역
	 * ****************/
	function getInquiryList()
	{
		let param = {
			"is_member" : isEmpty(g_account_token) ? 'N' : 'Y'
		}

		if (isEmpty(g_account_token))
		{
			let historyEmail = sessionStorage.getItem("email");
			let historyPass = sessionStorage.getItem("password");

			/*비회원 로그인 기록이 있으면 기존 메일/아이디로 조회*/
			param["email"] = isEmpty(historyEmail) ? $("#loginEmail").val().trim() : historyEmail;
			param["password"] = isEmpty(historyPass) ? CryptoJS.SHA512($("#loginPasswd").val().trim()).toString() : historyPass;
		}
		else
		{
			param["profile_uuid"] = g_profile_uuid;
		}

		$.ajax({
			global: false,
			url: api.listInquiry,
			type: "POST",
			dataType: 'json',
			data: JSON.stringify(param),
			success: function(data) {
				isSuccessResp(data) ? buildInquiryList(data) : alert(data.msg);
			},
			error: function (request, status) {
				alert(message.ajaxError);
			},
			complete: function (xhr, status) {
			}
		});
	}

	function buildInquiryList(data)
	{
		let listEls = '';
		let { qna_list, size } = data.data;
		if (size > 0)
		{
			listEls +=
				`<div class="board-list contents">
					<ul class="inquiry-board">`
			for (let { idx, title, created_datetime, status, is_resource } of qna_list)
			{
				let disabled = status === '대기' ? 'disabled' : '';
				let iconAttach = is_resource === 'Y' ? '<img class="icon_clip" src="https://service.yanadoocdn.com/youcandoo/assets/images/webviewimg/icon_clip.png?resource_version=<?=$resource_version?>" alt="첨부파일">' : '';
				listEls +=
						`<li>
							<a href="/v1.0/web/inquiry/detail/${idx}">more</a>
							<div>
								<p>
									<span class="board-tit">${title}${iconAttach}</span>
									<span class="date">${created_datetime.substring(0, 10)}</span>
								</p>
								<button type="button" ${disabled}>답변${status}</button>
							</div>
						</li>`
			}
			listEls +=
					`</ul>
				</div>`

		}
		else
		{
			listEls +=
				`<div class="no_inquiry">
					<img src="https://service.yanadoocdn.com/youcandoo/assets/images/webviewimg/icon_no_inquiry.png?resource_version=<?=$resource_version?>" alt="내역없음">
					<p>문의내역이 없어요</p>
				</div>`
		}

		listContent.html(listEls);

		if (size === 0)
		{
			/** 문의 내역 없을 때 해당 element에 스클롤 생기지 않게 하기 위해 **/
			let emptyEl = $(".no_inquiry");
			let paddingTop = emptyEl.css('padding-top');
			paddingTop = paddingTop.replace('px', '');
			let tabHeight = olTab.height();
			let height = screenHeight - (tabHeight + Number(paddingTop));

			emptyEl.css('height', height+'px');
		}
	}

	/******************
	 *  문의 등록
	 * ****************/
	function onClickBtnSubmit()
	{
		if (submitValidation())
		{
			if (confirm(message.submit))
				hasFile() ? onSubmitFile() : onSubmitNotice();
		}
	}

	function submitValidation()
	{
		let isGuest = isEmpty(g_account_token);
		if (isGuest && isEmpty(username.val()))
		{
			alert(`이름을 ${message.input}`);
			username.trigger('focus');
			return false;
		}

		if (isGuest && isEmpty(email.val()))
		{
			alert(`이메일을 ${message.input}`);
			email.trigger('focus');
			return false;
		}

		if (isGuest && !isEmail(email.val().trim()))
		{
			alert(`이메일 형식을 ${message.check}`);
			email.trigger('focus');
			return false;
		}

		if (isGuest && isEmpty(passwd.val()))
		{
			alert(`비밀번호를 ${message.input}`);
			passwd.trigger('focus');
			return false;
		}

		if (isGuest && !isValidPassword())
		{
			alert(`비밀번호 형식을 ${message.check}`);
			passwd.trigger('focus');
			return false;
		}

		if (isEmpty(selInquiryType.val()))
		{
			alert(`문의 유형을 ${message.select}`);
			selInquiryType.trigger('focus');
			return false;
		}

		if (isEmpty(title.val()))
		{
			alert(`제목을 ${message.input}`);
			title.trigger('focus');
			return false;
		}

		if (isEmpty(content.val()))
		{
			alert(`내용을 ${message.input}`);
			content.trigger('focus');
			return false;
		}

		if (!isGuest && chkReplyMail.is(':checked') && isEmpty(replyMail.val()))
		{
			alert(`메일 주소를 ${message.input}`);
			replyMail.trigger('focus');
			return false;
		}

		if (isGuest && !chkAgreeTerms.is(':checked'))
		{
			alert(message.termsAgree);
			return false;
		}

		return true;
	}

	function isValidPassword()
	{
		let password  = passwd.val().trim();
		let regExp  = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
		let regExp1 = /(0123)|(1234)|(2345)|(3456)|(4567)|(5678)|(6789)|(7890)/;
		let regExp2 = /(\w)\1\1\1/;

		return regExp.test(password) && (!regExp1.test(password) && !regExp2.test(password));
	}

	function onSubmitFile()
	{
		let attachment = $("input[name=attachment]");
		let param  = new FormData();
		for (let i=0; i<attachment.length; i++)
		{
			param.append('file', attachment[i].files[0]);
		}

		$.ajax({
			global: false,
			url: fileUploadUrl,
			type: "POST",
			processData: false,
			contentType: false,
			data: param,
			success: function(data) {
				isSuccessResp(data) ? onSubmitNotice(data) : alert(data.msg);
			},
			error: function (request, status) {
				alert(message.ajaxError);
			}
		});
	}

	function onSubmitNotice(data)
	{
		let images = [];
		if (!isEmpty(data))
			images = data.image_urls;
		let isMember = !isEmpty(g_account_token);
		let param = {
			"is_member" : isMember ? 'Y' : 'N',
			"qna_type" : selInquiryType.val(),
			"email" : isMember ? replyMail.val().trim() : email.val().trim(),
			"title" : title.val().trim(),
			"contents" : content.val().trim(),
			"qna_resource" : images,
			"app_version" : g_app_version,
			"os_version" : g_os_version,
			"device" : g_device
		}

		if (isMember)
		{
			let isReplyMail = chkReplyMail.is(':checked');
			param["is_email"] = isReplyMail ? 'Y' : 'N';
			param["profile_uuid"] = g_profile_uuid;
		}
		else
		{
			let password = CryptoJS.SHA512(passwd.val().trim());
			param["name"] = username.val().trim();
			param["password"] = password.toString();

			sessionStorage.setItem("email", "");
			sessionStorage.setItem("password", "");
		}

		$.ajax({
			global: false,
			url: api.requestInquiry,
			type: "POST",
			contentType: 'text/plain',
			dataType: 'json',
			data: JSON.stringify(param),
			success: function(data) {
				isSuccessResp(data) ? submitSuccess(data) : alert(data.msg);
			},
			error: function (request, status) {
				alert(message.ajaxError);
			}
		});
	}

	function submitSuccess()
	{
		modalSuccessFadein();
	}

	function modalSuccessFadein()
	{
		let windowHeight = window.screen.height;
		let modalHeight = modalSuccess.height();
		let scrollTop = $(window).scrollTop();
		let top = ((windowHeight/2 - modalHeight*0.9)+scrollTop)+'px';
		modalSuccess.css('top', top);
		modalSuccess.show();
		backDropIn();
	}

	function modalSuccessFadeout()
	{
		modalSuccess.hide();
		backDropOut();
	}

	function onClickModalSuccessOk()
	{
		modalSuccessFadeout();

		let listTab = olTab.children().eq(1);
		onClickTab($(listTab));
	}

	function hasFile()
	{
		let result = false;
		let attachment = $("input[name=attachment]");
		for (let i=0; i<attachment.length; i++)
		{
			if (attachment[i].files.length > 0)
				result = true;
		}

		return result;
	}

	function onChangeValidationImage(obj)
	{
		if (!isImage(obj) && obj.files[0])
		{
			alert(message.notSupportedExt);
			emptyFile(obj);
		}
		else if (isOverFileSize(obj) && obj.files[0])
		{
			alert(message.overSizeFile);
			emptyFile(obj);
		}
		else
		{
			setFile(obj);
		}
	}

	function emptyFile(obj)
	{
		removeThumbnail(obj);
		hideBtnDelAttach(obj);
		$(obj).val(null);
		$(obj).prop('disabled', false);
		/*$(obj).siblings('.upload-name').val('파일선택');*/
	}

	/** 파일 썸네일과 파일이름 보여주는 이벤트 **/
	function setFile(obj)
	{
		if(window.FileReader)
		{
			/*let file = obj.files[0];*/

			if (obj.files && obj.files[0])
			{
				/** 기존 썸네일 삭제 **/
				removeThumbnail(obj);

				/** 파일읽어서 썸네일 표출하기 **/
				readImage(obj);

				$(obj).prop('disabled', true);
				/*$(obj).siblings('.upload-name').val(file.name);*/
			}
			else
				emptyFile(obj);
		}
	}

	function readImage(obj)
	{
		let reader = new FileReader();
		reader.readAsDataURL(obj.files[0]);

		reader.onload = function() {

			let innerDom = '';
			innerDom +=
				`<div class="upload-display" style="width: 50px; height: 50px;">
					<div class="upload-thumb-wrap">
						<img src="${reader.result}" class="upload-thumb" alt="">
					</div>
				</div>`

			$(obj).parent().prepend(innerDom);
			showBtnDelAttach(obj);
		}
	}

	function removeThumbnail(obj)
	{
		$(obj).parent().children('.upload-display').remove();
	}

	function showBtnDelAttach(obj)
	{
		$(obj).siblings('.icon-delete-attach').show();
	}

	function hideBtnDelAttach(obj)
	{
		$(obj).siblings('.icon-delete-attach').hide();
	}

	function isImage(obj)
	{
		if (obj.files[0])
		{
			let file 		= obj.files[0];
			let fileType 	= file["type"];
			let imageTypes 	= ["image/jpeg", "image/png"];

			return $.inArray(fileType, imageTypes) >= 0;
		}
	}

	function isOverFileSize(obj)
	{
		if (obj.files[0])
		{
			let maxSize = 10 * 1024 * 1024;
			return obj.files[0].size > maxSize;
		}
	}

	function onClickDelAttach(obj)
	{
		let inputFile = $(obj).siblings('input');
		removeThumbnail($(inputFile));
		emptyFile($(inputFile));
	}

	function onChangeCheckReplyMail(obj)
	{
		let isChecked = $(obj).is(':checked');
		replyMail.prop('disabled', !isChecked);
		if (replyMail.prop('disabled'))
			replyMail.val('');
	}

	function viewPassword(obj)
	{
		passwdWrap.toggleClass('active');

		if (passwdWrap.hasClass('active'))
		{
			$(obj).children().removeClass("fa-eye-slash");
			$(obj).children().addClass("fa-eye");
			passwd.attr('type',"text")
		}
		else
		{
			$(obj).children().removeClass("fa-eye");
			$(obj).children().addClass("fa-eye-slash");
			passwd.attr('type','password');
		}
	}

	function onClickTerms()
	{
		modalTermsFadein();
	}

	function closeModalTerms()
	{
		modalTermsFadeout();
	}

	function modalTermsFadein()
	{
		let windowHeight = window.screen.height;
		let modalHeight = modalTerms.height();
		let scrollTop = $(window).scrollTop();
		let top = ((windowHeight/2 - modalHeight*0.7)+scrollTop)+'px';
		modalTerms.css('top', top);
		modalTerms.show();
		backDropIn();
	}

	function modalTermsFadeout()
	{
		modalTerms.hide();
		backDropOut();
	}

	function backDropIn()
	{
		body.css('overflow', 'hidden');
		modalBackDrop.show();
	}

	function backDropOut()
	{
		body.css('overflow', 'auto');
		modalBackDrop.hide();
	}

	/** 글자수 체크 **/
	function checkInputLength(obj)
	{
		let inputLength = $(obj).val().length;
		let maxLength   = $(obj).prop('maxLength');

		if (inputLength > maxLength && maxLength > 0)
		{
			$(obj).val($(obj).val().slice(0, maxLength))
			inputLength = maxLength;
		}

		$(obj).next().html(`${inputLength}/${maxLength}`);
	}

	function keyupOnInputElement(event)
	{
		if (event.keyCode === 13)
		{
			let target = event.target;
			let inputEls = $("#inquiry").find('input, textarea').filter(':visible');
			let nextEl = $(inputEls).eq($(inputEls).index($(target))+1);

			$(nextEl).trigger('focus');
		}
	}

	/**
	 *  뒤로가기 했을 때 선택했던 탭 유지하기
	 * **/
	function setActiveTabFromHistory()
	{
		nickname.val(sessionStorage.getItem("nickname"));
		g_account_token = sessionStorage.getItem("account_token");
		g_app_version = sessionStorage.getItem("app_version");
		g_os_version = sessionStorage.getItem("os_version");
		g_device = sessionStorage.getItem("device");
		g_profile_uuid = sessionStorage.getItem("profile_uuid");
		let historyTarget = sessionStorage.getItem("target");
		olTab.children().removeClass('on');
		if (isEmpty(historyTarget))
		{
			olTab.children().eq(0).addClass('on');
			onClickTab($(olTab.children().eq(0)));
		}
		else
		{
			olTab.children().each(function () {
				if ($(this).data('target') === historyTarget)
				{
					$(this).addClass('on');
					onClickTab($(this));
				}
			});
		}
	}

	function goFaq()
	{
		location.href = '/v1.0/web/faq';
	}
