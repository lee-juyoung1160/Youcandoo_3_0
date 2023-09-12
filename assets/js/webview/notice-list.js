
	const listWrap 	= $('#listWrap');
	let pageLength = 10;
	let currentLength = 0;
	let totalLength = 0;

	$(() => {
		if (isBackAction()) setPageFromHistory();

		getNoticeList();

		$(window).on('scroll', function () {

			let scrollTop 		= document.documentElement.scrollTop;
			let documentHeight 	= document.body.scrollHeight;
			let windowHeight 	= window.screen.height

			if (scrollTop+10 >= (documentHeight - windowHeight))
			{
				if (currentLength !== totalLength)
				{
					pageLength += pageLength;
					getNoticeList();
				}
			}
		});
	})

	function getNoticeList()
	{
		$.ajax({
			global: false,
			url: api.noticeList,
			type: "POST",
			dataType: 'json',
			data: params(),
			success: function(data) {
				buildList(data);
			},
			error: function (request, status) {
			},
			complete: function (xhr, status) {
			}
		});
	}

	function params()
	{
		let param = {
			"page" : 1,
			"limit" : pageLength
		}

		sessionStorage.setItem("limit", pageLength);

		return JSON.stringify(param);
	}

	function buildList(data)
	{
		let listEl = '';
		if (!isEmpty(data.data))
		{
			currentLength = data.data.length;
			totalLength = data.size;

			for (let { idx, is_top, title, created_datetime } of data.data)
			{
				let isTop = is_top === 'Y';
				let topFixedClass = isTop ? 'top-fix' : '';
				let iconTopFixed = isTop ? `<i><img class='only-m' src='https://service.yanadoocdn.com/youcandoo/assets/images/webviewimg/advertising.png?resource_version=<?=$resource_version?' alt='상단공지'></i>` : '';

				listEl +=
					`<li id="${idx}" class="${topFixedClass}">
						<a onclick="moveDetail(${idx})">more</a>
						<div class="clear_fix">
							${iconTopFixed}
							<p>
								<span class="board-tit">${title}</span>
								<span class="date">${created_datetime}</span>
							</p>
						</div>
					</li>`
			}
		}
		else
			listEl = `<strong class="no-contants">지금 볼 수 있는 콘텐츠가 없네요. <span>다음번에 다시 찾아주세요!</span></strong>`;

		listWrap.html(listEl);

		moveHistoryPage();
	}

	function moveDetail(_idx)
	{
		sessionStorage.setItem("idx", _idx);

		location.href = `/v1.0/web/notice/detail/${_idx}`;
	}

	/**
	 *  뒤로가기 했을 때 페이지 유지
	 * **/
	let historyIdx;
	function setPageFromHistory()
	{
		let historyPageLength = sessionStorage.getItem("limit");
		pageLength = historyPageLength;

		historyIdx = sessionStorage.getItem("idx");
	}

	function moveHistoryPage()
	{
		if (!isEmpty(historyIdx))
		{
			let offset = $("#"+historyIdx).offset();
			$('html, body').animate({scrollTop : offset.top}, 10);
		}
	}
