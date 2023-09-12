
	const olTab 	= $('#olTab');
	const eventWrap = $('#eventWrap');

	$(() => {
		if (isBackAction()) setActiveTabFromHistory();
		getEventList();
		olTab.on('click', function (event) { onClickTab(event) });
	})

	function getEventList()
	{
		$.ajax({
			global: false,
			url: api.eventList,
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
		sessionStorage.setItem("status", getStatus());

		return JSON.stringify({ "status" : getStatus() });
	}

	function getStatus()
	{
		let status = '';
		olTab.children().each(function () {
			if ($(this).hasClass('on'))
				status = $(this).data('status');
		})

		return status;
	}

	function buildList(data)
	{
		let listEl = '';
		if (!isEmpty(data))
		{
			const queryString = "?referralViewType=webview&isPush=false";
			let isAnnounce = getStatus() === 'announce';
			let isEnd = getStatus() === 'end';
			for (let { idx, thumbnail_image_url, event_type, link_url, title, date, created_datetime } of data)
			{
				let displayDate = isAnnounce ? created_datetime : date;
				let detailUrl = `/v1.0/web/event/detail/${idx}${queryString}`
				if (event_type === 'link')
					detailUrl = link_url+queryString;
				if (isAnnounce) title = `<em class='evt-result-text only-m'>[결과발표]</em>${title}`;
				if (isEnd) title = `<em class='evt-result-text only-m'>[종료]</em>${title}`;
				listEl +=
					`<li>
						<a href="${detailUrl}">more</a>
						<div class="clearfix">
							<strong class="thumbnail" style="background-image: url(${thumbnail_image_url})"></strong>
							<p>
								<span class="board-tit">${title}</span>
								<span class="date">${displayDate}</span>
							</p>
						</div>
					</li>`
			}
		}
		else
			listEl = `<strong class="no-contants">지금 볼 수 있는 콘텐츠가 없네요. <span>다음번에 다시 찾아주세요!</span></strong>`;

		eventWrap.html(listEl);
	}

	function onClickTab(event)
	{
		toggleActive(event);
		getEventList();
	}

	function toggleActive(event)
	{
		let targetEl = event.target;
		$(targetEl).siblings().removeClass('on');
		$(targetEl).addClass('on');
	}

	/**
	 *  뒤로가기 했을 때 선택했던 탭 유지하기
	 * **/
	function setActiveTabFromHistory()
	{
		let historyStatus = sessionStorage.getItem("status");
		olTab.children().each(function () {
			$(this).removeClass('on');
			if ($(this).data('status') === historyStatus)
				$(this).addClass('on');
		});
	}
