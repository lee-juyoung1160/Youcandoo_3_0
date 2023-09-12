const noticeIndex = document.getElementById("notice-index");
const mainTitle = document.querySelector(".main-title");
const mainDate = document.querySelector(".date");
const detailImg = document.querySelector(".detail-img");
const detailText = document.querySelector(".detail-text");

// 화면 로드시
document.addEventListener('DOMContentLoaded', function () {
	listCreate(noticeIndex.value);
});
function listCreate(index){
	let param = {
		"idx" : index
	};
	$.ajax({
		url: api_server_url+"/v1.0/web/notice/info",
        type: "POST",
        data: JSON.stringify(param),
        async:false,
        dataType: "json",
        error : function(e) {

        },
		success:function(row) {
			if(row !== undefined) {
				if(row.notice_image_url === "") {
					detailImg.parentNode.removeChild(detailImg)
				}
				mainTitle.textContent = row.title;
				mainDate.textContent = "등록일자 : " + row.created_datetime;
				const detailImg_inner  = document.createElement("div");
				const detail_img = document.createElement("img");
				const detailText_inner = document.createElement("div");
				const detailText_P = document.createElement("p");

				detailImg_inner.classList.add("inner");
				detailText_inner.classList.add("inner");

				detailImg.appendChild(detailImg_inner);
				detailImg_inner.appendChild(detail_img);
				detailText.appendChild(detailText_inner);
				detailText_inner.appendChild(detailText_P);

				detail_img.src = row.notice_image_url;
				detailText_P.innerHTML = row.notice_contents;
			}
		}
	});
}

