
	const btnBack = document.getElementById("btnBack");
	if (btnBack) btnBack.addEventListener('click', () =>  webviewClose() );

	const userAgentOsType = navigator.userAgent.toLowerCase();
	function webviewClose()
	{
		if (userAgentOsType.indexOf('android') > -1)
		{
			try {
				window.webview.closeview();
			} catch (e) {
				window.history.back();
			}
		}
		else if (userAgentOsType.indexOf("iphone") > -1 || userAgentOsType.indexOf("ipad") > -1 || userAgentOsType.indexOf("ipod") > -1)
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
				alert('처리할 수 없습니다.');
			}
		}
	}
