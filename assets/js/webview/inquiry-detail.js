
	const titleEl 	  = $('#title');
	const btnStatus 	 = $('#btnStatus');
	const createDate 	 = $('#createDate');
	const imageTxtWarp   = $('.file-view-text');
	const imageWarp   = $('.file-view-img');
	const contentsEl  = $('#contents');
	const commentEl   = $('#comment');

	$(() => {
		getDetail();
	})

	function getDetail()
	{
		$.ajax({
			global: false,
			url: api.detailInquiry,
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
		if (!isEmpty(data.data))
		{
			let { title, status, is_resource, contents, created_datetime, comment, comment_datetime, is_expire, expire_date } = data.data;
			let hasAttachment = is_resource === 'Y';
			let iconAttach = hasAttachment ? '<img class="icon_clip" src="https://service.yanadoocdn.com/youcandoo/assets/images/webviewimg/icon_clip.png?resource_version=<?=$resource_version?>" alt="첨부파일">' : '';
			let disabled = status === '대기' ? 'disabled' : '';
			titleEl.prepend(title);
			titleEl.append(iconAttach);
			btnStatus.prop('disabled', disabled);
			btnStatus.text('답변'+status);
			createDate.html(created_datetime.substring(0, 10));
			contentsEl.prepend(contents);
			if (hasAttachment)
			{
				let isExpired = is_expire === 'Y';
				if (!isEmpty(comment))
				{
					let expireTxt = isExpired ? '첨부파일 기간만료' : `첨부파일 이미지 만료기간: ~ ${expire_date}`;
					let expireClass = isExpired ? 'error-color' : '';
					let expireEl = `<img class="icon_clip" src="https://service.yanadoocdn.com/youcandoo/assets/images/webviewimg/icon_clip.png?resource_version=<?=$resource_version?>" alt="첨부파일"><span class="${expireClass}">${expireTxt}</span>`;

					imageTxtWarp.html(expireEl)
				}

				if (!isExpired)
				{
					let imgEls = '';
					let attachments = data.data.qna_resource;
					for (let i=0; i<attachments.length; i++)
					{
						let imgUrl = attachments[i];
						imgEls += `<li><img src="${imgUrl}" alt="" onerror="onErrorImage(this);"></li>`;
					}

					imageWarp.html(imgEls);
				}
			}

			if (!isEmpty(comment))
			{
				let commentContainer =
					`<div class="page-footer">
						<div class="container">
							<p>
							<span class="board-tit">유캔두 답변</span>
							<span class="date">${comment_datetime.substring(0, 10)}</span>
							</p>
							<div class="text">${comment}</div>
						</div>
					</div>`;

				commentEl.html(commentContainer);
			}
		}
	}
