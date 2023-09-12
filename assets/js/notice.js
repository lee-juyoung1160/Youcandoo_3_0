const table = document.getElementById("notice-list");
const pagination = document.querySelector(".table-pagination");
let totalLength = 0;
let pageNum = 1;
let limit = 10;
let paginationList;
let titleList;

// 화면 로드시
document.addEventListener('DOMContentLoaded', function () {
	listCreate(pageNum);
	pagenation();
});

// 리스트 그리기
function listCreate(page) {
	let param = {
		"page" : page,
		"limit": limit
	};

	$.ajax({
		url: api_server_url+"/v1.0/web/notice/list",
		type: "POST",
		data: JSON.stringify(param),
		async:false,
		dataType: "json",
		error : function(e) {

		},
		success:function(row) {
			totalLength = row.size;
			clear();
			for(let i=0; i<row.data.length; i++) {
				let obj = row.data[i];
				let tr = document.createElement("tr");
				let title = document.createElement("td");
				let date = document.createElement("td");
				let icon = document.createElement("img");
				icon.src="https://service.yanadoocdn.com/youcandoo/assets/images/i-speaker.png?resource_version=<?=$resource_version?>";
				title.classList.add("title");
				icon.classList.add("speaker-icon");
				date.classList.add("date");
				tr.setAttribute("data-idx",obj.idx)
				table.appendChild(tr);
				tr.appendChild(title);
				tr.appendChild(date);
				title.textContent = obj.title;
				date.textContent = obj.created_datetime;
				if (!obj.is_top === "N") {
					title.appendChild(icon);
				}
				titleList = document.querySelectorAll("table tr");
			}
			bindEventListener();
		}
	});
}
// 상세페이지
function bindEventListener() {
	for(let i=0; i < titleList.length; i++) {
		titleList[i].addEventListener("click", function (e) {
			let idx = e.currentTarget.getAttribute('data-idx');
			if(idx !== "") {
				location.href = "/notice/detail/"+idx;
			}
		});
	}
}
// 페이지네이션 그리는 함수
function pagenation() {
	let totalPage = Math.ceil(totalLength/limit);
	const leftBtn = document.createElement("li");
	const rightBtn = document.createElement("li");
	const leftImg =  document.createElement("img");
	const rightImg =  document.createElement("img");
	leftImg.src= "https://service.yanadoocdn.com/youcandoo/assets/images/i-arrow.png?resource_version=<?=$resource_version?>";
	rightImg.src="https://service.yanadoocdn.com/youcandoo/assets/images/i-arrow.png?resource_version=<?=$resource_version?>";
	pagination.appendChild(leftBtn);
	for(let index=1; index <= totalPage; index++) {
		const pageNumber = document.createElement("li");
		pageNumber.classList.add("pageNum");
		pagination.appendChild(pageNumber);
		pageNumber.textContent = index;
		if(pageNumber.textContent === "1") {
			pageNumber.classList.add("active");
		}
	}
	pagination.appendChild(rightBtn);
	leftBtn.appendChild(leftImg);
	rightBtn.appendChild(rightImg);
	paginationList = document.querySelectorAll(".table-pagination li.pageNum");
	pagenationEvent();

	// 클릭이벤트
	leftBtn.addEventListener('click', prev, false);
	rightBtn.addEventListener('click', next, false);
}
// 페이지네이션 이벤트
function pagenationEvent() {
	for(let i=0; i<paginationList.length; i++) {
		paginationList[i].addEventListener("click", function (e){
			remove();
			e.currentTarget.classList.add('active');
			let pageNumber = Number(e.currentTarget.textContent);
			pageNum = pageNumber;
			listCreate(pageNumber);
		});
	}
}
// 페이지네이션 클릭이벤트 전체지우기
function remove() {
	for(let i=0; i<paginationList.length; i++) {
		if(paginationList[i].classList.contains("active")) {
			paginationList[i].classList.remove("active")
		}
	}
}

// 이전
function prev() {
	if(pageNum === 1) {
		return false;
	}
	pageNum--;
	remove()
	paginationList[pageNum-1].classList.add('active');
	listCreate(pageNum);
}
// 다음
function next() {
	let totalPage = Math.ceil(totalLength/limit);
	if (pageNum === totalPage) {
		return false;
	}
	pageNum++;
	remove()
	paginationList[pageNum-1].classList.add('active');
	listCreate(pageNum);
}
// 전체리스트 지우기
function clear() {
	while(table.firstChild) {
		table.removeChild(table.firstChild);
	}
}
