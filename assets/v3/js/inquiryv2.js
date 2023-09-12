
	/** 문의등록 **/
	const username = document.getElementById('username');
	const password = document.getElementById('password');
	const email = document.getElementById('email');
	const nickname = document.getElementById('nickname');
	const selInquiryType = document.getElementById('selInquiryType');
	const title	= document.getElementById('title');
	const content = document.getElementById('content');
	const thumbnailWrap	= document.getElementById('thumbnailWrap');
	const chkReplyEmail	= document.getElementById('chkReplyEmail');
	const replyEmail = document.getElementById('replyEmail');
	const chkPrivacy = document.getElementById('chkPrivacy');
	/** 문의내역 **/
	const listWrap = document.getElementById('listWrap');
	const loginEmail = document.getElementById('loginEmail');
	const loginPassword = document.getElementById('loginPassword');

	let g_account_token = '';
	let g_app_version = '';
	let g_os_version = '';
	let g_device = '';

	if(sessionStorage.getItem("target"))
	{
		document.querySelectorAll('#tabWrap li').forEach(element => {
			if (element.dataset.target === sessionStorage.getItem("target"))
				onClickTab(element);
		});
	}

	getDeviceInfoFromNative();
	document.getElementById('btnBack').addEventListener('click', webviewClose);
	document.querySelectorAll('#tabWrap li').forEach(element => element.addEventListener('click', function () { onClickTab(this); }));
	['keyup', 'input', 'change'].forEach(e => username.addEventListener(e, function () { toggleRequiredElementError(this); }));
	['keyup', 'input', 'change'].forEach(e => password.addEventListener(e, function () { togglePasswordElementError(this); }));
	document.getElementById('btnShowPassword').addEventListener('click', function () { toggleShowPassword(this); });
	['keyup', 'input', 'change'].forEach(e => title.addEventListener(e, function () { countInputLength(this); toggleRequiredElementError(this); }));
	['keyup', 'input', 'change'].forEach(e => email.addEventListener(e, function () { toggleEmailElementError(this); }));
	selInquiryType.addEventListener('change', function () { toggleRequiredElementError(this); });
	['keyup', 'input', 'change'].forEach(e => content.addEventListener(e, function () { countInputLength(this); toggleRequiredElementError(this); }));
	document.querySelectorAll('input[name=attachment]').forEach(element => element.addEventListener('change', function () { onChangeAttachment(this); }));
	document.getElementById('chkReplyEmail').addEventListener('change', function () { onChangeChkReplyEmail(this); });
	['keyup', 'input', 'change'].forEach(e => replyEmail.addEventListener(e, function () { toggleEmailElementError(this); }));
	document.getElementById('chkPrivacy').addEventListener('change', function () { toggleChkPrivacyElementError(this); });
	document.getElementById('btnPrivacy').addEventListener('click', onClickPrivacy);
	document.getElementById('btnPrivacyOk').addEventListener('click', closeModalTerms);
	document.getElementById('btnSubmit').addEventListener('click', onSubmitInquiry);

	['keyup', 'input', 'change'].forEach(e => loginEmail.addEventListener(e, function () { toggleEmailElementError(this); }));
	['keyup', 'input', 'change'].forEach(e => loginPassword.addEventListener(e, function () { toggleRequiredElementError(this); }));
	document.getElementById('btnSuccessOk').addEventListener('click', onClickModalSuccessOk);
	document.getElementById('btnLogin').addEventListener('click', onClickBtnLogin);

	document.querySelectorAll('input[type=text], input[type=email], input[type=password]').forEach(element => {
		element.addEventListener('keyup', function (event) {
			onKeyupInputElement(event);
		})
	});

	/******************
	 *  상단 탭 클릭 이벤트
	 * ****************/
	function onClickTab(obj)
	{
		sessionStorage.setItem("target", obj.dataset.target);
		toggleActiveTab(obj);
	}

	function toggleActiveTab(obj)
	{
		document.querySelectorAll('#tabWrap li').forEach(element => element.classList.remove('active'));
		obj.classList.add('active');
		initForm();
		initPage();
	}

	/**  AOS는 native 펑션을 호출하면 token(Object)값을 return 해주고 IOS는 native 호출하면 웹의 getDeviceInfo(arg) callback 하면서 arg를 넘겨줌. **/
	function getDeviceInfoFromNative()
	{
		if (isAos())
		{
			let responseObjFromAos;
			try {
				/**  native 펑션을 호출하면 token(Object)값을 return **/
				responseObjFromAos = window.webview.getDeviceInfo();
			} catch (e) {
				alert(message.noDeviceInfo);
			} finally {
				getDeviceInfo(responseObjFromAos);
			}
		}
		else if (isIos())
		{
			try {
				/** native 호출하면 웹의 getDeviceInfo(arg) callback 하면서 arg를 넘겨줌. **/
				const param = JSON.stringify({ "action" : {"pageType" : "inquiry"} });
				const message = "jscall://"+encodeURIComponent(param);
				let iframe = document.createElement('iframe');
				iframe.setAttribute('src', message);
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;
			} catch (e) {
				/** native 호출에 실패했을 경우 getDeviceInfo() arg 없이 호출 **/
				alert(message.noDeviceInfo);
				getDeviceInfo();
			}
		}
		else
		{
			alert(message.notSupportedDevice);
		}
	}

	function getDeviceInfo(obj)
	{
		if (obj !== undefined && !isEmpty(obj))
		{
			const jsonObj = JSON.parse(obj)
			g_account_token = jsonObj.account_token;
			g_app_version = jsonObj.app_version;
			g_os_version = jsonObj.os_version;
			g_device = jsonObj.device;
		}

		sessionStorage.setItem("account_token", g_account_token);
		sessionStorage.setItem("app_version", g_app_version);
		sessionStorage.setItem("os_version", g_os_version);
		sessionStorage.setItem("device", g_device);

		if (!isEmpty(g_account_token))
			getUserInfo();

		initForm();
		initPage();
	}

	function getUserInfo()
	{
		const url = api.getUserInfo;
		const errMsg = `회원정보 ${message.loadError}`;
		const param = { "account_token" : g_account_token };

		XMLHttpRequestWithJson(url, JSON.stringify(param), getUserInfoCallback, errMsg);
	}

	function getUserInfoCallback(data)
	{
		isSuccessResp(data) ? setUserInfo(data) : alert(getErrorMessage(data.status));
	}

	let g_profile_uuid;
	function setUserInfo(data)
	{
		nickname.value = data.data.nickname;
		g_profile_uuid = data.data.profile_uuid;
		sessionStorage.setItem("nickname", data.data.nickname);
		sessionStorage.setItem("profile_uuid", g_profile_uuid);
	}

	function initPage()
	{
		document.querySelectorAll('#tabWrap li').forEach(element => {
			const targetId = element.dataset.target;
			if (element.classList.contains('active'))
			{
				document.getElementById(targetId).style.display = 'block';
				if (isEmpty(g_account_token))
				{
					showGuestElement();
					isEmpty(sessionStorage.getItem("login_email")) ? showGuestLoginForm() : showInquiryList();
				}
				else
					element.dataset.target === 'createForm' ? showMemberElement() : showInquiryList();
			}
			else document.getElementById(targetId).style.display = 'none';
		});
	}

	function showGuestLoginForm()
	{
		document.getElementById('guestLoginForm').style.display = 'block';
		listWrap.style.display = 'none';
	}

	function showInquiryList()
	{
		listWrap.style.display = 'block';
		document.getElementById('guestLoginForm').style.display = 'none';
		getInquiryList();
	}

	function showMemberElement()
	{
		document.querySelectorAll('.member-item').forEach(element => element.style.display = 'block');
		document.querySelectorAll('.guest-item').forEach(element => element.style.display = 'none');
	}

	function showGuestElement()
	{
		document.querySelectorAll('.guest-item').forEach(element => element.style.display = 'block');
		document.querySelectorAll('.member-item').forEach(element => element.style.display = 'none');
	}

	function initForm()
	{
		username.value = '';
		email.value = '';
		password.value = '';
		selInquiryType.value = '';
		title.value = '';
		content.value = '';
		chkReplyEmail.checked = false;
		replyEmail.value = '';
		chkPrivacy.checked = false;
		document.querySelectorAll('input[name=attachment]').forEach(element => {
			emptyFile(element)
			element.parentElement.style.display = 'block';
		});
		thumbnailWrap.innerHTML = '';
		setTextFileCount();
		toggleClassFull();
		loginEmail.value = '';
		loginPassword.value = '';
	}

	/******************
	 *  비회원 로그인
	 * ****************/
	function onClickBtnLogin()
	{
		if (guestLoginValidation())
		{
			const url = api.guestLogin;
			const errMsg = `로그인 ${message.ajaxError}`;
			const loginPass = CryptoJS.SHA512(loginPassword.value.trim());
			const param = {
				"email" : loginEmail.value.trim(),
				"password" : loginPass.toString()
			}

			sessionStorage.setItem("login_email", loginEmail.value.trim());
			sessionStorage.setItem("password", loginPass.toString());

			XMLHttpRequestWithJson(url, JSON.stringify(param), guestLoginCallback, errMsg);
		}
	}

	function guestLoginValidation()
	{
		if (isEmpty(loginEmail.value) || !isEmail(loginEmail.value))
		{
			toggleEmailElementError(loginEmail);
			loginEmail.focus();
			return false;
		}

		if (isEmpty(loginPassword.value))
		{
			toggleRequiredElementError(loginPassword);
			loginPassword.focus();
			return false;
		}

		return true;
	}

	function guestLoginCallback(data)
	{
		isSuccessResp(data) ? showInquiryList() : guestLoginFail();
	}

	function guestLoginFail()
	{
		sessionStorage.setItem("login_email", '');
		sessionStorage.setItem("password", '');
		alert(message.invalidLogin);
	}

	/******************
	 *  문의내역
	 * ****************/
	function getInquiryList()
	{
		const param = {
			"is_member" : isEmpty(g_account_token) ? 'N' : 'Y'
		}

		if (isEmpty(g_account_token))
		{
			const historyEmail = sessionStorage.getItem("login_email");
			const historyPass = sessionStorage.getItem("password");

			/** 비회원 로그인 기록이 있으면 기존 메일/아이디로 조회 **/
			param["email"] = isEmpty(historyEmail) ? loginEmail.val().trim() : historyEmail;
			param["password"] = isEmpty(historyPass) ? CryptoJS.SHA512(loginPassword.value.trim()).toString() : historyPass;
		}
		else
		{
			param["profile_uuid"] = sessionStorage.getItem('profile_uuid');
		}
		const url = api.inquiryList;
		const errMsg = `문의내역을 ${message.loadError}`;

		XMLHttpRequestWithJson(url, JSON.stringify(param), getInquiryListCallback, errMsg);
	}

	function getInquiryListCallback(data)
	{
		isSuccessResp(data) ? buildInquiryList(data) : alert(getErrorMessage(data.status));
	}

	function buildInquiryList(data)
	{
		listWrap.classList.remove('search_result');
		listWrap.classList.remove('list-wrap');
		let listEl = '<ul class="inner">';
		if (!isEmpty(data.data) && data.data.list.length > 0)
		{
			listWrap.classList.add('list-wrap');
			data.data.list.map(obj => {
				const { idx, created, is_attach, status, title } = obj;
				const iconAttachment = is_attach ? `<i class="icon-file"><img src="${iconAttach}" alt="첨부파일"></i>` : '';
				const statusClass = status === '답변완료' ? 'complete' : '';
				listEl +=
					`<li class="title-wrap">
						<a href="/webview/v3.0/qna/detail/${idx}">more</a>
						<p class="title">
							<span>${created}</span>
							<strong>
								${title}
								${iconAttachment}
							</strong>
						</p>
						<span class="icon-arrow ${statusClass}">${status}</span>
					</li>`
			})
			listEl += '</ul>';
		}
		else
		{
			listWrap.classList.add('search_result');
			listEl = `<img src="${inquiryNoContent}" alt=""><p>문의내역이 없어요</p>`
		}

		listWrap.innerHTML = listEl;

		onErrorImage();
	}

	/******************
	 *  문의 등록
	 * ****************/
	let requestFlag = true;
	function onSubmitInquiry()
	{
		if (submitValidation())
		{
			if (confirm(message.submit) && requestFlag)
			{
				requestFlag = false;
				hasFile() ? fileUploadRequest() : createRequest();
			}
		}
	}

	function hasFile()
	{
		return document.querySelectorAll('#thumbnailWrap li').length > 0
	}

	function submitValidation()
	{
		const isGuest = isEmpty(g_account_token);
		if (isGuest && isEmpty(username.value))
		{
			toggleRequiredElementError(username);
			username.focus();
			return false;
		}

		if (isGuest && (isEmpty(password.value) || !isValidPassword()))
		{
			togglePasswordElementError(password);
			password.focus();
			return false;
		}

		if (isGuest && (isEmpty(email.value) || !isEmail(email.value)))
		{
			toggleEmailElementError(email);
			email.focus();
			return false;
		}

		if (isEmpty(selInquiryType.value))
		{
			toggleRequiredElementError(selInquiryType);
			selInquiryType.focus();
			return false;
		}

		if (isEmpty(title.value))
		{
			toggleRequiredElementError(title);
			title.focus();
			return false;
		}

		if (isEmpty(content.value))
		{
			toggleRequiredElementError(content);
			content.focus();
			return false;
		}

		const isCheckedReplyEmail = chkReplyEmail.checked;
		if (!isGuest && isCheckedReplyEmail && (isEmpty(replyEmail.value) || !isEmail(replyEmail.value)))
		{
			toggleEmailElementError(replyEmail);
			replyEmail.focus();
			return false;
		}

		if (isGuest && !chkPrivacy.checked)
		{
			toggleChkPrivacyElementError(chkPrivacy);
			document.getElementById('btnPrivacy').focus();
			return false;
		}

		return true;
	}

	function isValidPassword()
	{
		const inputPass = password.value.trim();
		const regExp  = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
		const regExp1 = /(0123)|(1234)|(2345)|(3456)|(4567)|(5678)|(6789)|(7890)/;
		const regExp2 = /(\w)\1\1\1/;

		return regExp.test(inputPass) && (!regExp1.test(inputPass) && !regExp2.test(inputPass));
	}

	function fileUploadRequest()
	{
		let param  = new FormData();
		document.querySelectorAll('input[name=attachment]').forEach(element => param.append('file', element.files[0]));

		const xhr = new XMLHttpRequest();
		xhr.open("POST", fileUploadUrl, true);
		xhr.responseType = 'json';
		xhr.send(param);

		xhr.onload = function() {
			if (xhr.status === 200)
			{
				requestFlag = true;
				document.querySelectorAll('input[name=attachment]').forEach(element => {
					emptyFile(element);
					element.parentElement.style.display = 'block';
				})
				thumbnailWrap.innerHTML = '';
				setTextFileCount();
				toggleClassFull();
				isSuccessResp(xhr.response) ? createRequest(xhr.response) : alert(getErrorMessage(xhr.response.status));
			}
			else
			{
				requestFlag = true;
				document.querySelectorAll('input[name=attachment]').forEach(element => {
					emptyFile(element);
					element.parentElement.style.display = 'block';
				})
				thumbnailWrap.innerHTML = '';
				setTextFileCount();
				toggleClassFull();
				alert(message.ajaxError);
			}
		};
	}

	function createRequest(data)
	{
		const isMember = !isEmpty(g_account_token);
		const param = {
			"is_member" : isMember ? 'Y' : 'N',
			"qna_type" : selInquiryType.value,
			"email" : isMember ? replyEmail.value.trim() : email.value.trim(),
			"title" : title.value.trim(),
			"contents" : content.value.trim(),
			"app_version" : g_app_version,
			"os_version" : g_os_version,
			"device" : g_device
		}

		if (!isEmpty(data) && data.image_urls.length > 0)
		{
			let attachments = [];
			data.image_urls.map(url => {
				const obj = {
					"contents_type" : "image",
					"path" : url
				}
				attachments.push(obj);
			})
			param["attach"] = attachments;
		}

		if (isMember)
		{
			const isReplyMail = chkReplyEmail.checked;
			param["is_email"] = isReplyMail ? 'Y' : 'N';
			param["profile_uuid"] = g_profile_uuid;
		}
		else
		{
			const inputPassword = CryptoJS.SHA512(password.value.trim());
			param["name"] = username.value.trim();
			param["password"] = inputPassword.toString();

			sessionStorage.setItem("login_email", "");
			sessionStorage.setItem("password", "");
		}
		const errMsg = `문의 등록 ${message.loadError}`;

		XMLHttpRequestWithJson(api.createInquiry, JSON.stringify(param), createCallback, errMsg)
	}

	function createCallback(data)
	{
		requestFlag = true;
		isSuccessResp(data) ? fadeinModalSuccess() : alert(getErrorMessage(data.status));
	}

	function fadeinModalSuccess()
	{
		document.getElementById('modalSuccess').style.display = 'block';
		fadeinBackdrop();
	}

	function onClickModalSuccessOk()
	{
		document.getElementById('modalSuccess').style.display = 'none';
		fadeoutBackdrop();

		document.querySelectorAll('#tabWrap li').forEach((element, index) => {
			if (index === 1) onClickTab(element);
		});
	}

	function onChangeAttachment(obj)
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
			setFile(obj);
	}

	function emptyFile(obj)
	{
		obj.value = null;
	}

	function setFile(obj)
	{
		if(window.FileReader)
			obj.files && obj.files[0] ? readImage(obj) : emptyFile(obj);
	}

	function readImage(obj)
	{
		let reader = new FileReader();
		reader.readAsDataURL(obj.files[0]);

		reader.onload = function() {

			const thumbnailEl =
				`<div class="img"><img src="${reader.result}" alt=""></div>
				<i class="btn-delete-img" data-id="${obj.id}" onclick="onClickDelAttach(this);"><img src="${iconDelete}" alt=""></i>`

			const imageLi = document.createElement("li");
			imageLi.innerHTML = thumbnailEl;
			thumbnailWrap.prepend(imageLi);

			setTextFileCount();
			toggleClassFull();

			obj.parentElement.style.display = 'none';
		}
	}

	function onClickDelAttach(obj)
	{
		const fileId = obj.dataset.id;
		const targetFileEl = document.getElementById(fileId);

		targetFileEl.parentElement.style.display = 'block';
		obj.parentElement.remove();
		emptyFile(targetFileEl);
		setTextFileCount();
		toggleClassFull();
	}

	function setTextFileCount()
	{
		const count = thumbnailWrap.children.length;
		document.querySelectorAll('.file-count').forEach(element => element.textContent = `사진 ${count}/3`);
	}

	function toggleClassFull()
	{
		thumbnailWrap.children.length < 3
			? document.getElementById('fileWrap').classList.remove('full')
			: document.getElementById('fileWrap').classList.add('full');
	}

	function isImage(obj)
	{
		if (obj.files[0])
		{
			const file = obj.files[0];
			const fileType = file["type"];
			const imageTypes = ["image/jpeg", "image/png"];

			return imageTypes.indexOf(fileType) > -1;
		}
	}

	function isOverFileSize(obj)
	{
		if (obj.files[0])
		{
			const maxSize = 50 * 1024 * 1024;
			return obj.files[0].size > maxSize;
		}
	}

	function onChangeChkReplyEmail(obj)
	{
		const isChecked = obj.checked;
		replyEmail.disabled = !obj.checked;
		if (isChecked)
			addError(replyEmail.parentElement);
		else
		{
			replyEmail.value = '';
			removeError(replyEmail.parentElement)
		}
	}

	function toggleShowPassword(obj)
	{
		if (obj.classList.contains('active'))
		{
			obj.classList.remove('active');
			obj.classList.remove('eye-on');
			obj.classList.add('eye-off');
			password.setAttribute('type','password');
		}
		else
		{
			obj.classList.add('active');
			obj.classList.add('eye-on');
			obj.classList.remove('eye-off');
			password.setAttribute('type','text');
		}
	}

	function onClickPrivacy()
	{
		document.getElementById('modalPrivacy').style.display = 'block';
		fadeinBackdrop();
	}

	function closeModalTerms()
	{
		document.getElementById('modalPrivacy').style.display = 'none';
		fadeoutBackdrop();
	}

	function fadeinBackdrop()
	{
		document.body.style.overflow = 'hidden';
		document.getElementById('modalBackDrop').style.display = 'block';
	}

	function fadeoutBackdrop()
	{
		document.body.style.overflow = 'auto';
		document.getElementById('modalBackDrop').style.display = 'none';
	}

	/** 글자수 체크 **/
	function countInputLength(obj)
	{
		const maxLength = obj.getAttribute('maxLength');
		let inputLength = obj.value.trim().length;

		if (inputLength > maxLength && maxLength > 0)
		{
			obj.value(obj.value.slice(0, maxLength))
			inputLength = maxLength;
		}

		obj.previousElementSibling.innerHTML = `${inputLength}/${maxLength}`;
	}

	function onKeyupInputElement(event)
	{
		if (event.keyCode === 13)
		{
			const targetId = event.target.id;
			const inputElements = [];
			document.querySelectorAll('input[type=text], input[type=email], input[type=password], textarea').forEach((element, index) => {
				if (element.id === 'loginEmail' || element.id === 'loginPassword') return;
				if (window.getComputedStyle(element.parentElement.parentElement).display === 'block')
					inputElements.push(element);
			})
			inputElements.forEach((element, index) => {
				if (targetId === element.id)
					inputElements[index+1].focus();
			});
		}
	}

	function toggleRequiredElementError(obj)
	{
		const parentEl = obj.parentElement;
		(isEmpty(obj.value)) ? addError(parentEl) : removeError(parentEl);
	}

	function togglePasswordElementError(obj)
	{
		const parentEl = obj.parentElement;
		if (isEmpty(obj.value) || !isValidPassword())
			addError(parentEl);
		else
		{
			removeError(parentEl);
			parentEl.nextElementSibling.classList.remove('password-error-message');
		}
	}

	function toggleEmailElementError(obj)
	{
		const parentEl = obj.parentElement;
		(isEmpty(obj.value) || !isEmail(obj.value)) ? addError(parentEl) : removeError(parentEl);
	}

	function toggleChkPrivacyElementError(obj)
	{
		const parentEl = obj.parentElement;
		obj.checked ? removeError(parentEl) : addError(parentEl);
	}

	function addError(el)
	{
		el.parentElement.classList.add('error');
	}

	function removeError(el)
	{
		el.parentElement.classList.remove('error');
	}
