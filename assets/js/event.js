const tabBtns = document.querySelectorAll(".tab-btn li");
const tabList = document.querySelector(".tab-list");
const moreBtn = document.querySelector(".more-btn");
const error = document.querySelector(".error-section");
let limit = 6;
let pageNum = 1;
let onTabValue = "progress";
let countList = new Array;
// 화면 로드시
document.addEventListener('DOMContentLoaded', function () {
	scrollTopEvent();
	tabBtnEvent();
	listCreate();
});
function listCreate(value, row) {
	let param = {
		"status": onTabValue,
	};
	$.ajax({
		url: api_server_url+"/v1.0/web/event/listStatus",
		type: "POST",
		data: JSON.stringify(param),
		async:false,
		dataType: "json",
		error : function(e){
		},
		success:function(row){
			nullCheck(row);
			for(let i=((pageNum-1) * limit ); i < (pageNum * limit); i++) {
				let obj = row[i];
				countList.push(obj);
				if(obj === undefined) {
					break;
				}
				const li = document.createElement("li");
				const link = document.createElement("a");
				const img = document.createElement("img");
				const textWrap = document.createElement("div");
				const titleWrap =  document.createElement("div");
				const state = document.createElement("p");
				const title = document.createElement("p");
				const date = document.createElement("p");
				const queryString = "?referralViewType=homepage&isPush=false";

				textWrap.classList.add("text-wrap");
				date.classList.add("date");
				titleWrap.classList.add("title-wrap");
				titleWrap.classList.add("clearfix");
				state.classList.add("state");
				title.classList.add("title");
				li.setAttribute("data-idx",obj.idx);
				if(obj.event_type === "link") {
					link.setAttribute("href", obj.link_url+queryString);
				}else {
					link.setAttribute("href","/event/detail/"+obj.idx+queryString);
				}
				tabList.appendChild(li);
				li.appendChild(link);
				link.appendChild(img);
				link.appendChild(textWrap);
				textWrap.appendChild(titleWrap);
				titleWrap.appendChild(state);
				titleWrap.appendChild(title);
				textWrap.appendChild(date);
				title.textContent = obj.title;
				date.textContent = obj.date;
				if(obj.event_name === "결과발표") {
					date.textContent = obj.created_datetime ;
				}else {
					date.textContent = obj.date;
				}
				state.textContent = obj.event_status;
				img.src = obj.thumbnail_image_url;
				moreBtn.textContent = "더보기" + "(" + countList.length + "/" + row.length + ")";
			}
		}
	});
}
// 전체리스트 지우기
function clear() {
	while(tabList.firstChild) {
		tabList.removeChild(tabList.firstChild);
	}
	while(error.firstChild) {
		error.removeChild(error.firstChild);
	}
}
// 탭버튼 클릭 이벤트
function tabBtnEvent() {
	for(let i=0; i<tabBtns.length; i++) {
		tabBtns[i].addEventListener("click", function (e){
			remove();
			pageNum = 1;
			countList = new Array;
			e.currentTarget.classList.add('active');
			onTabValue = e.currentTarget.getAttribute('data-tab');
			clear();
			listCreate(onTabValue);
		});
	}
}
function remove() {
	for(let i=0; i<tabBtns.length; i++) {
		if(tabBtns[i].classList.contains("active")) {
			tabBtns[i].classList.remove("active")
		}
	}
}
// 더보기
moreBtn.addEventListener("click", function () {
	pageNum++;
	listCreate(onTabValue);
});
// 값없을때
function nullCheck(row) {
	if(!row.length) {
		moreBtn.style.display = "none";
		error.style.display = "block";
		const errorContents = document.createElement("div");
		const wrap = document.createElement("div");
		const img = document.createElement("img");
		const title =  document.createElement("h2");
		const text = document.createElement("p");
		img.src = "https://service.yanadoocdn.com/youcandoo/assets/images/icon_no_contents.svg";
		errorContents.classList.add("error", "error-contents");
		wrap.classList.add("wrap");
		img.classList.add("error-icon");
		title.classList.add("main-title");
		text.classList.add("main-text")
		error.appendChild(errorContents);
		errorContents.appendChild(wrap);
		wrap.appendChild(img);
		wrap.appendChild(title);
		wrap.appendChild(text);
		title.textContent = "지금은 볼 수 있는 콘텐츠가 없네요.";
		text.textContent = "다음 번에 다시 찾아주세요!";
	} else {
		error.style.display = "none";
		moreBtn.style.display = "block";
	}
}
// scrolltop event
function scrollTopEvent() {
	const scrollTop = document.querySelector('.top-btn');
	// 뷰 화면 사이즈 변경시 발생하는 이밴트
	window.addEventListener('resize', function () {
		const mql = window.matchMedia("screen and (max-width: 600px)");
		window.addEventListener('scroll', function () {
			if (mql.matches && window.pageYOffset > 200) {
				!scrollTop.classList.contains('active');
				scrollTop.classList.add('active');
			}else {
				scrollTop.classList.remove('active');
			}
		});
	});
	// 모바일이면서 스크롤할때만 탑버튼 나오기
	scrollEvent();
	function scrollEvent() {
		window.addEventListener('scroll', function () {
			if (window.pageYOffset > 200 && window.innerWidth < 600) {
				!scrollTop.classList.contains('active');
				scrollTop.classList.add('active');
			}else {
				scrollTop.classList.remove('active');
			}
		});
	}
	// 스크롤 클릭시 상단으로 가는 이밴트
	scrollTop.addEventListener('click', function() {
		scroll(0, 200);
		function scroll (target, duration) {
			if (duration <= 0) {return};
			let difference = target - document.documentElement.scrollTop;
			let speed = difference / duration * 10;
			setTimeout(function() {
				document.documentElement.scrollTop += speed;
				if (document.documentElement.scrollTop == target) {return};
				scroll(target, duration - 10);
			}, 10);
		}
	});
}
