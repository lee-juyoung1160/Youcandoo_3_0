const eventIndex = document.getElementById("event-index");
const mainTitle = document.querySelector(".main-title");
const mainDate = document.querySelector(".date");
const detailImg = document.querySelector(".detail-img");
const detailText = document.querySelector(".detail-text");
const detailNotice = document.querySelector(".detail-notice");
// 화면 로드시
document.addEventListener('DOMContentLoaded', function () {
	listCreate(eventIndex.value);
});
function listCreate(index) {
	let param = {
		"idx" : index
	};
	$.ajax({
		url: api_server_url+"/v1.0/web/event/info",
		type: "POST",
		data: JSON.stringify(param),
		async: false,
		dataType: "json",
		error : function(e) {
		},
		success: function (row){
			if(row != undefined) {
				mainTitle.textContent = row.data.title;
				if(row.data.event_name === "결과발표") {
					mainDate.textContent = "등록일자 : " + row.data.created_datetime ;
				}else {
					mainDate.textContent = "기간 : " + row.data.start_date + " ~ " + row.data.end_date;
				}
				const detailImg_inner = document.createElement("div");
				const detailImg_img = document.createElement("img");
				const detailText_inner = document.createElement("div");
				const detailText_P = document.createElement("p");
				const detailNotice_inner = document.createElement("div");
				const detailNotice_P =  document.createElement("p");
				const detailNotice_ul =  document.createElement("ul");

				detailImg_inner.classList.add("inner");
				detailText_inner.classList.add("inner");
				detailNotice_inner.classList.add("inner");
				detailNotice_P.classList.add("title");

				detailImg.appendChild(detailImg_inner);
				detailImg_inner.appendChild(detailImg_img);
				detailText.appendChild(detailText_inner);
				detailText_inner.appendChild(detailText_P);
				detailNotice.appendChild(detailNotice_inner);
				detailNotice_inner.appendChild(detailNotice_P);
				detailNotice_inner.appendChild(detailNotice_ul);

				detailImg_img.src = row.data.image_url;
				detailText_P.innerHTML = row.data.contents;
				detailNotice_P.textContent = "※ 알아두세요!";

				for (let i=0; i < row.data.notice.length; i++) {
					let detailNotice_li = document.createElement("li");
					detailNotice_ul.appendChild(detailNotice_li);
					detailNotice_li.textContent = row.data.notice[i];
				}
			}
		}
	});
}
