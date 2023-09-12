
	let g_account_token = '';
	let g_balance = 0;
	let g_cellphone = '';
	let g_quantity = 1;

	getAccountTokenFromNative();
	document.getElementById('btnBack').addEventListener('click', webviewClose);
	document.getElementById('btnIncrease').addEventListener('click', onClickBtnIncrease);
	document.getElementById('btnDecrease').addEventListener('click', onClickBtnDecrease);
	document.getElementById('btnSubmitApply').addEventListener('click', onClickBtnSubmitApply);
	document.getElementById('btnCancelApply').addEventListener('click', fadeoutModalApply);
	document.getElementById('btnSubmit').addEventListener('click', onSubmitGift);
	document.getElementById('btnCancelSubmit').addEventListener('click', fadeoutModalSubmit);

	function getAccountTokenFromNative()
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
		}

		getGifts();
	}

	function getGifts()
	{
		const url = api.giftList;
		const errMsg = `상품목록을 ${message.loadError}`;
		const param = { "account_token" : g_account_token };

		XMLHttpRequestWithJson(url, JSON.stringify(param), getGiftsCallback, errMsg);
	}

	function getGiftsCallback(data)
	{
		isSuccessResp(data) ? buildSuccessPage(data) : alert(`상품 정보를 ${message.loadError}`);
	}

	function buildSuccessPage(data)
	{
		const {phone, ucd, list} = data.data;
		g_cellphone = phone;
		g_balance = ucd;
		document.getElementById('balance').textContent = numberWithCommas(g_balance);
		buildGifts(list);
	}

	function buildGifts(data)
	{
		if (!isEmpty(data) && data.length > 0)
		{
			data.map((obj, index) => {
				const { gift_uuid, gift_name, gift_ucd, gift_image_url, is_apply,  } = obj;
				const btnClass = (is_apply && Number(g_balance) >= gift_ucd) ? 'btn-available' : 'ucd-lack';
				const btnText = (is_apply && Number(g_balance) >= gift_ucd) ? '신청하기' : is_apply ? 'UCD 부족' : '재고소진';
				const giftEl =
					`<div class="inner">
						<div class="img"><img src="${gift_image_url}" alt=""></div>
						<div class="info">
							<p class="title">${gift_name}</p>
							<div class="price-wrap">
								<p class="price">
									<img src="${iconUcd}" alt="UCD">
									<strong>${numberWithCommas(gift_ucd)}</strong>
								</p>
								<button type="button" 
										class="${btnClass}" 
										data-uuid="${gift_uuid}" 
										data-name="${gift_name}" 
										data-price="${gift_ucd}">${btnText}
								</button>
							</div>
						</div>
					</div>`

				if (data.length - 1 === index)
				{
				}
				const listEl = document.createElement("li");
				listEl.innerHTML = giftEl;
				document.getElementById('giftWrap').append(listEl);
			})
		}
		document.querySelectorAll('.btn-available').forEach(element =>
			element.addEventListener('click', function () { onClickBtnApply(this); })
		);
		document.getElementById('notice').style.display = 'block';
		onErrorImage();
	}

	let g_gift_uuid;
	let g_gift_name;
	let g_price = 0;
	function onClickBtnApply(obj)
	{
		fadeinModalApply();
		initModalApply(obj);
		toggleBtnQuantity();
	}

	function initModalApply(obj)
	{
		g_gift_uuid = obj.dataset.uuid;
		g_price = obj.dataset.price;
		g_gift_name = obj.dataset.name;
		document.getElementById('applyGiftName').textContent = g_gift_name;
		initQuantity();
		displayQuantity();
	}

	function onClickBtnSubmitApply()
	{
		if (fadeinModalSubmitValid())
		{
			slideUp(document.getElementById('modalApply'), 500);
			fadeinModalSubmit();
			initModalSubmit();
		}
	}

	function fadeinModalSubmitValid()
	{
		if (isEmpty(g_cellphone))
		{
			alert(message.noCellphoneNum)
			return false;
		}

		return true;
	}

	function initModalSubmit()
	{
		const modalBodyEl =
			`<p>
				${g_gift_name}<br>
				상품 ${g_quantity}개를 신청했어요.<br>
				${g_cellphone} 번호로<br>
				다음주 수요일 발송됩니다.<br><br>
				<span>
					*번호가 다르다면, 나 > 프로필 편집 > 휴대폰<br>번호 인증을 통해 변경해주세요.<br><br>
				</span>
			</p>`

		document.getElementById('modalSubmitBody').innerHTML = modalBodyEl;
	}

	function onSubmitGift()
	{
		document.getElementById('btnSubmit').removeEventListener('click', onSubmitGift);

		const url = api.applyGift;
		const errMsg = `상품 신청 ${message.ajaxError}`;
		const param = {
			"account_token" : g_account_token,
			"gift_uuid": g_gift_uuid,
			"gift_qty" : g_quantity
		};

		XMLHttpRequestWithJson(url, JSON.stringify(param), submitGiftCallback, errMsg);
	}

	function submitGiftCallback(data)
	{
		isSuccessResp(data) ? applyGiftSuccess() : alert(getErrorMessage(data.status));
	}

	function applyGiftSuccess()
	{
		refreshUcd();
		location.href = '/webview/v3.0/gift_complete';
	}

	function fadeinModalSubmit()
	{
		fadeinBackDrop();
		document.getElementById('modalSubmit').style.display = 'block';
	}

	function fadeoutModalSubmit()
	{
		fadeoutBackDrop();
		document.getElementById('modalSubmit').style.display = 'none';
	}

	function fadeinModalApply()
	{
		fadeinBackDrop();
		slideDown(document.getElementById('modalApply'), 500);
	}

	function fadeoutModalApply()
	{
		fadeoutBackDrop()
		slideUp(document.getElementById('modalApply'), 500);
	}

	function fadeinBackDrop()
	{
		document.body.style.overflow = 'hidden';
		document.querySelector('.modal-bg').style.display = 'block';
	}

	function fadeoutBackDrop()
	{
		document.body.style.overflow = 'auto';
		document.querySelector('.modal-bg').style.display = 'none';
	}

	function onClickBtnIncrease()
	{
		++g_quantity;
		displayQuantity();
		toggleBtnQuantity();
	}

	function onClickBtnDecrease()
	{
		--g_quantity;
		displayQuantity();
		toggleBtnQuantity();
	}

	function displayQuantity()
	{
		document.getElementById('quantity').textContent = g_quantity;
		document.getElementById('totalPrice').textContent = `${numberWithCommas(g_quantity * g_price)} UCD`;
	}

	function toggleBtnQuantity()
	{
		document.getElementById('btnDecrease').disabled = g_quantity <= 1;

		document.getElementById('btnIncrease').disabled = (g_quantity+1) * g_price > g_balance;
	}

	function initQuantity()
	{
		g_quantity = 1;
	}

	function refreshUcd()
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
				const param = { "action" : { "pageType" : "refresh_ucd_history" } };
				const message = "jscall://"+encodeURIComponent(JSON.stringify(param));
				let iframe = document.createElement('iframe');
				iframe.setAttribute('src', message);
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;
			} catch (e) {
				console.log(e)
			}
		}
	}

	const slideDown = (target, duration=500) => {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;

		if (display === 'none')
			display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.boxSizing = 'border-box';
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout( () => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
		}, duration);
	}

	const slideUp = (target, duration=500) => {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.boxSizing = 'border-box';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout( () => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
		}, duration);
	}
