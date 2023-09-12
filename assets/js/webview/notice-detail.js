
	const titleEl 	  = $('#title');
	const regDateEl   = $('#datetime');
	const contentsEl  = $('#contents');

	$(() => {
		getDetail();
	})

	function getDetail()
	{
		$.ajax({
			global: false,
			url: api.noticeDetail,
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
			let { title, notice_contents, notice_image_url, created_datetime } = data;
			let regDate = `등록일<em>${created_datetime}</em>`
			let image = !isEmpty(notice_image_url) ? `<strong><img src="${notice_image_url}" alt="" /></strong>` : '';
			let content = `<div class='text-wrap'>${notice_contents}</div>`

			titleEl.html(title);
			regDateEl.html(regDate);
			contentsEl.html(image+content);
		}
	}
