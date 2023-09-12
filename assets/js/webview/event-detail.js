
	const titleEl 	  = $('#title');
	const eventDateEl = $('#eventDate');
	const contentsEl  = $('#contents');
	const eventNotice = $('#eventNotice');

	$(() => {
		getDetail();
	})

	function getDetail()
	{
		$.ajax({
			global: false,
			url: api.eventDetail,
			type: "POST",
			dataType: 'json',
			data: JSON.stringify({ "idx" : $("#idx").val() }),
			success: function(data) {
				setDetail(data);
			},
			error: function (request, status) {
			},
			complete: function (xhr, status) {
			}
		});
	}

	function setDetail(data)
	{
		if (!isEmpty(data))
		{
			let { event_type, title, contents, image_url, created_datetime, start_date, end_date } = data.data;
			let isAnnounce = event_type === 'announce';
			let dateClass = isAnnounce ? 'date2' : '';
			let _eventDate = isAnnounce
				? `등록일 <em>${created_datetime}</em>`
				: `기간 <em>${start_date} ~ ${end_date}</em>`;
			let image = !isEmpty(image_url) ? `<strong><img src="${image_url}" alt="" /></strong>` : '';
			let content = `<div class='text-wrap'>${contents}</div>`

			titleEl.html(title);
			eventDateEl.addClass(dateClass);
			eventDateEl.html(_eventDate);
			contentsEl.html(image+content);

			let { notice } = data.data
			for (let [index, val] of notice.entries())
				eventNotice.append(`<li>${val}</li>`);
		}
	}
