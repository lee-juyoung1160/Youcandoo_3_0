
	const screenHeight = window.screen.height;
	const bottomEl =
		`<div class="text-wrap">
					<h4>&lt;안내&gt;</h4>
					<div>
						모바일상품권, 기프티콘은 매주 1회 발송돼요!<br>
						■전주 화요일부터 월요일까지 신청 기준으로 매주 수요일 발송<br><br>
						야나두 평생수강 패키지는 매월 2회 발송돼요!<br>
						■1일~15일까지 신청한 경우 당월 30일 발송<br>
						■16~말일까지 신청한 경우 익월 15일 발송
					</div>
				</div>`;

	const body 		= $("body");
	const section 	= $("section");
	const contents 	= $("#contents");
	/** 모달 **/
	const modalApply 	  	  = $("#modalApply");
	const modalApplyTitle  	  = $("#modalApplyTitle");
	const btnPlus  	  		  = $("#btnPlus");
	const btnMinus  	  	  = $("#btnMinus");
	const btnOkModalApply 	  = $("#btnOkModalApply");
	const btnCancelModalApply = $("#btnCancelModalApply");
	const modalBackDrop 	  = $("#modalBackDrop");

	let g_cellphone = '전화번호 없음';
	let g_quantity;
	let g_balance = 0;
	let g_account_token = '';

	$(() => {
		getFixedHeader();
		initQuantity();
		getTokenFromNative();

		btnPlus.on('click', function () { onClickPlus(); });
		btnMinus.on('click', function () { onClickMinus(); });
		btnOkModalApply.on('click', function () { loadConfirmModal(); });
		btnCancelModalApply.on('click', function () { cancelModalApply(); });
	});

	/**
	 *  AOS는 native를 호술해서 token값을 가져오고 IOS는 native 호출하면 IOS에서 callExchangeGiftCard를 callback 함.
	 * **/
	function getTokenFromNative()
	{
		if (isAos())
		{
			let responseObjFromAos;
			try {
				responseObjFromAos = callAos();
			} catch (e) {
				buildErrorModal(message.noDeviceInfo);
			} finally {
				callExchangeGiftCard(responseObjFromAos);
			}
		}
		else if (isIos())
		{
			try {
				callIos();
			} catch (e) {
				buildErrorModal(message.noDeviceInfo);
			}
		}
		else
		{
			buildErrorModal(message.notSupportedDevice);
		}
	}

	function callAos()
	{
		return window.webview.callExchangeGiftCard();
	}

	function callIos()
	{
		let message = "jscall://"+encodeURIComponent('{"validate":true}');
		let iframe = document.createElement('iframe');
		iframe.setAttribute('src', message);
		document.documentElement.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;
	}

	function callExchangeGiftCard(_token)
	{
		setGlobalAccountToken(_token);
		progressOn();
		getUserInfo();
	}

	function setGlobalAccountToken(_token)
	{
		if (_token !== undefined)
		{
			let jsonObj = JSON.parse(_token)
			g_account_token = jsonObj.account_token;
		}
	}

	function getUserInfo()
	{
		/*g_account_token = "ACT-7623650B-F804-6AEF-2A69-0BF9798803D3";*/
		$.ajax({
			global: false,
			url: api.getUserUcd,
			type: "POST",
			dataType: 'json',
			data: JSON.stringify({ "account_token" : g_account_token }),
			success: function(data) {
				getUserInfoSuccessCallback(data);
			},
			error: function (request, status) {
				progressOff();
				buildErrorModal(message.ajaxError);
			},
			complete: function (xhr, status) {
				getGift();
			}
		});
	}

	function getUserInfoSuccessCallback(data)
	{
		isSuccessResp(data) ? setGlobalInfo(data) : buildErrorModal(data.msg);
	}

	function setGlobalInfo(data)
	{
		let { point, phone } = data.data;
		g_balance = point;
		if (!isEmpty(phone))
			g_cellphone = phone;
	}

	function getGift()
	{
		$.ajax({
			global: false,
			url: api.giftList,
			type: "POST",
			dataType: 'json',
			success: function(data) {
				getGiftSuccess(data);
			},
			error: function (request, status) {
				alert(message.ajaxError);
			},
			complete: function (xhr, status) {
				progressOff();
			}
		});
	}

	function getGiftSuccess(data)
	{
		isSuccessResp(data) ? buildPage(data) : buildErrorModal(data.msg);
	}

	function buildPage(data)
	{
		let contentEl = '';
		contentEl +=
			`<div class="my-ucd clearfix">
					<strong>나의 보유 UCD<span>${numberWithCommas(g_balance)}</span></strong>
				</div>
	
				<ul class="gift-list">`

		for (let { gift_uuid, gift_name, gift_ucd, gift_image_url } of data.data)
		{
			let isOverPrice = gift_ucd > g_balance;
			let disabled = isOverPrice ? 'disabled' : '';
			let btnLabel = isOverPrice ? 'UCD 부족' : '신청하기';
			contentEl +=
				`<li class="clearfix">
						<div class="img-wrap">
							<img src="${gift_image_url}" alt="">
						</div>
						<div class="text-wrap">
							<p>${gift_name}</p>
							<strong>
								<img src="https://service.yanadoocdn.com/youcandoo/assets/images/webviewimg/icon_ucd.png?resource_version=<?=$resource_version?>" class="icon-ucd" alt="UCD">
									<span>${numberWithCommas(gift_ucd)}</span>
							</strong>
						</div>
						<button onclick="btnApplyGiftClick(this)" 
								id="${gift_uuid}" 
								name="${gift_name}" 
								data-ucd="${gift_ucd}" 
								type="button" 
								class="btn-gift-apply" 
								${disabled}>${btnLabel}</button>
					</li>`
		}

		contentEl +=
			`</ul>
		
				<div class="bottom">
					${bottomEl}
				</div>`

		contents.html(contentEl);
	}

	let g_gift_uuid;
	let g_price;
	let display_gift_name_on_popup;
	function btnApplyGiftClick(obj)
	{
		g_gift_uuid = obj.id;
		g_price = obj.dataset.ucd;
		display_gift_name_on_popup = obj.name;

		loadSlideUpModal();
	}

	function cancelModalApply()
	{
		initQuantity();
		closeModalApply();
	}

	function loadConfirmModal()
	{
		hideModalApply();
		buildConfirmModal();
	}

	function buildConfirmModal()
	{
		let confirmEl =
			`<div id="modalSubmit" class="overlay-modal" style="display: none;">
					<div class="modal-container">
						<p>${display_gift_name_on_popup}<br> ${g_quantity}개를 신청하셨습니다.<br>받으실 번호 ${g_cellphone}가<br>맞는지 확인해주세요.</p>
						<span>*번호가 다르다면, 나 > 프로필 편집 > 휴대폰 번호 인증을 통해 변경해주세요.</span>
						<div class="modal-btn-wrap clearfix">
							<button onclick="cancelConfirmModal();">취소</button>
							<button onclick="onSubmitGift();">신청</button>
						</div>
					</div>	
				</div>`

		section.append(confirmEl);

		let modalSubmit = $("#modalSubmit");
		let modalHeight = modalSubmit.height();
		let scrollTop = $(window).scrollTop();
		let top = ((screenHeight/2 - modalHeight*0.7)+scrollTop)+'px';
		modalSubmit.css('top', top);

		modalSubmit.fadeIn(400);
	}

	function cancelConfirmModal()
	{
		initQuantity();
		removeModalConfirm();
	}

	function removeModalConfirm()
	{
		backDropOut();
		let modalSubmit = $("#modalSubmit");
		modalSubmit.remove();
	}

	function onSubmitGift()
	{
		removeModalConfirm();
		submitRequest();
	}

	function submitRequest()
	{
		let param = {
			"account_token" : g_account_token,
			"gift_uuid" : g_gift_uuid,
			"gift_qty" : g_quantity
		}

		$.ajax({
			global: false,
			url: api.giftApply,
			type: "POST",
			dataType: 'json',
			data: JSON.stringify(param),
			success: function(data) {
				submitSuccess(data);
			},
			error: function (request, status) {
				buildErrorModal(message.ajaxError);
			}
		});
	}

	function submitSuccess(data)
	{
		if (isSuccessResp(data))
		{
			loadCompleteContents()
			callNativeForRefreshUcd();
		}
		else
			buildErrorModal(data.msg);
	}

	function loadCompleteContents()
	{
		let completeContents =
			`<div class="done-text-wrap">
				<img src="https://service.yanadoocdn.com/youcandoo/assets/images/webviewimg/icon_done.png?resource_version=<?=$resource_version?>" alt="">
				<p>신청이 완료되었습니다.</p>
			</div>
			<div class="bottom done-bottom">
				${bottomEl}
			</div>
			<div class="bottom-btn-wrap done-btn">
				<button onclick="pageReload();">추가신청</button>
				<button onclick="callNativeForCloseWebview();">확인</button>
			</div>`

		contents.html(completeContents);
		/*<div class="done-btn-wrap">
			<button onclick="pageReload();">추가신청</button>
		</div>*/
	}

	function pageReload()
	{
		getTokenFromNative();
	}

	function loadSlideUpModal()
	{
		modalApplyTitle.html(display_gift_name_on_popup);
		initQuantity();
		displayQuantity()
		toggleBtnQuantity();
		backDropIn();
		modalApplySideUp();
	}

	function modalApplySideUp()
	{
		modalApply.slideDown(400);
	}

	function closeModalApply()
	{
		backDropOut();
		hideModalApply();
	}

	function hideModalApply()
	{
		modalApply.hide();
	}

	function backDropIn()
	{
		body.css('overflow', 'hidden');
		modalBackDrop.fadeIn(400);
	}

	function backDropOut()
	{
		body.css('overflow', 'auto');
		modalBackDrop.hide();
	}

	function onClickPlus()
	{
		++g_quantity;
		displayQuantity();
		toggleBtnQuantity();
	}

	function onClickMinus()
	{
		--g_quantity;
		displayQuantity();
		toggleBtnQuantity();
	}

	function displayQuantity()
	{
		$("#quantity").html(g_quantity);
		$("#totalPrice").html(numberWithCommas(g_quantity * g_price));
	}

	function toggleBtnQuantity()
	{
		let isMinimum = g_quantity <= 1;
		btnMinus.prop('disabled', isMinimum);

		let isMaximum = (g_quantity+1) * g_price > g_balance;
		btnPlus.prop('disabled', isMaximum);
	}

	function initQuantity()
	{
		g_quantity = 1;
	}

	function getFixedHeader()
	{
		if (isAos())
		{
			contents.removeClass('no-title');
			$(".page-title-wrap").show();
		}
	}

	let animateProgress;
	let progressVal = 0;
	function progressOn()
	{
		let progressbar = $("#progressbar");
		if (progressbar.length > 0)
		{
			progressVal = 0;
			progressbar.val(progressVal);
			animateProgress = setInterval(progressIncrease, 5);
			progressbar.css('display', 'inline-block');
		}
	}

	function progressIncrease()
	{
		++progressVal;
		$("#progressbar").val(progressVal);
	}

	function progressOff()
	{
		$("#progressbar").css('display', 'none');
		clearInterval(animateProgress);
	}

	function buildErrorModal(msg)
	{
		let errorEl =
			`<div id="modalError" class="overlay-modal error-modal" style="display: none;">
					<div class="modal-container">
						<p><i class="fas fa-exclamation-circle"></i> ${msg}</p>
						<div class="modal-btn-wrap clearfix">
							<button onclick="closeErrorModal();">확인</button>
						</div>
					</div>	
				</div>`

		section.append(errorEl);

		let modalError = $("#modalError");
		let modalHeight = modalError.height();
		let scrollTop = $(window).scrollTop();
		let top = ((screenHeight/2 - modalHeight*0.7)+scrollTop)+'px';
		modalError.css('top', top);

		modalError.fadeIn(400);
		backDropIn();
		initQuantity();
	}

	function closeErrorModal()
	{
		backDropOut();
		$("#modalError").remove();
		callNativeForCloseWebview();
	}

	function callNativeForCloseWebview()
	{
		if (isAos())
		{
			/** aos **/
			try {
				window.webview.closeview();
			} catch (e) {
				console.log(e)
			}
		}
		else if (isIos())
		{
			/** ios **/
			try {
				let param = { "pageType" : "ucd_webview", "pageValue" : "close" };
				window.location = "jscall://"+encodeURIComponent(JSON.stringify(param));
			} catch (e) {
				console.log(e)
			}
		}
		else
		{
			buildErrorModal(message.notSupportedDevice);
		}
	}

	function callNativeForRefreshUcd()
	{
		if (isAos())
		{
			/** aos **/
			try {
				window.webview.refreshucdhistory();
			} catch (e) {
				console.log(e)
			}
		}
		else if (isIos())
		{
			/** ios **/
			try {
				let param = { "pageType" : "ucd_webview", "pageValue" : "refresh_ucd" };
				let message = "jscall://"+encodeURIComponent(JSON.stringify(param));
				let iframe = document.createElement('iframe');
				iframe.setAttribute('src', message);
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;
			} catch (e) {
				console.log(e)
			}
		}
		else
		{
			buildErrorModal(message.notSupportedDevice);
		}
	}
