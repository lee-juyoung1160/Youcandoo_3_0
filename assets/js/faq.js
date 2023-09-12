const moreBtn = document.querySelector(".pagination");
const board = document.getElementById("faq-board");
const tabBtns = document.querySelectorAll(".w-faq-btn li");
let limit = 10;
let pageNum = 1;
let countList = new Array;

// 화면 로드시
document.addEventListener('DOMContentLoaded', function () {
	tabCreate("");
	scrollTopEvent();
	listCreate("", "", pageNum);
	clickEvent();
});
// 리스트 그려주는 함수
function listCreate(keyword, type, pageNum) {
	keyword = (keyword) ? keyword : "";
	type = (type) ? type : "";

	let param = {
		"title" : keyword,
		"type" : type
	};
	$.ajax({
		url: api_server_url+"/v1.0/web/faq/list",
		type: "POST",
		data: JSON.stringify(param),
		async:false,
		dataType: "json",
		error : function(e) {

		},
		success:function(row) {
			for(let i=((pageNum-1) * limit ); i < (pageNum * limit); i++) {
				let obj = row.data[i];
				// 보여지는 리스트 개수, 빈값 제외
				countList.push(obj);
				countList  = countList.filter(function(item) {
					return item !== null && item !== undefined && item !== '';
				});
				// 값이 없을때 동작 중지
				if(obj === undefined) {
					break;
				}
				const list = document.createElement("li");
				const titleWrap = document.createElement("div");
				const titleBox = document.createElement("div");
				const division = document.createElement("p");
				const mainTitle = document.createElement("p");
				const btn = document.createElement("div");
				const icon = document.createElement("img");
				const listContent = document.createElement("p");

				list.classList.add("list-open-btn");
				list.setAttribute("data-idx",obj.idx);
				list.classList.add("clearfix");
				titleWrap.classList.add("title-wrap");
				titleWrap.classList.add("clearfix");
				titleBox.classList.add("title-box");
				division.classList.add("division");
				mainTitle.classList.add("title");
				btn.classList.add("btn");
				icon.src = "https://service.yanadoocdn.com/youcandoo/assets/images/i-arrow-up.png?resource_version=<?=$resource_version?>";
				listContent.classList.add("list-contents");

				board.appendChild(list);
				list.appendChild(titleWrap);
				titleWrap.appendChild(titleBox);
				titleBox.appendChild(division);
				titleBox.appendChild(mainTitle);
				titleWrap.appendChild(btn);
				btn.appendChild(icon);
				list.appendChild(listContent);

				mainTitle.textContent = obj.title;
				division.textContent = "[" + obj.faq_type + "]";
				listContent.innerHTML = obj.contents;

				BindEventListener();
				// list.addEventListener("click", function (e){
				// 	listsRemove();
				// 	e.currentTarget.classList.add("active");
				// 	e.currentTarget.addEventListener("click", listsRemove);
				// });
			}
			moreBtn.textContent = "더보기" + "(" + countList.length + "/" + row.size +")";
		}
	})
}

function BindEventListener() {
	let btnList = $(".list-open-btn");
	let contentList = $(".list-contents");
	btnList.off("click");
	btnList.on("click", function() {
		if ($(this).hasClass("active")) {
			console.log($(this))
			btnList.removeClass("active");
			contentList.removeClass("active");
		} else {
			btnList.removeClass("active");
			contentList.removeClass("active");
			$(this).addClass("active");

			let content = $(this).attr("data-target");
			// console.log($(content));
			$(content).addClass("active");
		}
	});
}

// 탭 리스트 카운트
function tabCreate(keyword) {
	keyword = (keyword) ? keyword : "";
	let param = {
		"title" : keyword
	};
	$.ajax({
		url: api_server_url+"/v1.0/web/faq/type",
		type: "POST",
		data: JSON.stringify(param),
		async:false,
		dataType: "json",
		error : function(e) {

		},
		success:function(row) {
			const tabBtns_cnt = document.querySelectorAll(".w-faq-btn li.cnt span");
			const all = document.querySelector(".w-faq-btn li.all span");
			let total = 0;
			for (let index=0; index < row.length; index++) {
				total += row[index].cnt;
				if(row[index].type === tabBtns_cnt[index].getAttribute("name")) {
					tabBtns_cnt[index].textContent = "(" + row[index].cnt + ")";
				}
			}
			all.textContent = "(" + total + ")";
		}
	})
}

// 웹 탭, 모바일 셀렉 : 클릭 이벤트 및 type 보내기, 더보기 이벤트, 검색이벤트
function clickEvent() {
	const selectBox = document.getElementById("faq-btn");
	const searchWord = document.getElementById("searchWord");
	let targetType;
	let title;
	// 웹 카테고리 클릭 이벤트
	for(let i=0; i<tabBtns.length; i++) {
		tabBtns[i].addEventListener("click", function (e){
			tabBtnRemove();
			e.currentTarget.classList.add('active');
			targetType = e.currentTarget.getAttribute('data-tab');
			countList = new Array;
			pageNum = 1;
			clear();
			listCreate(title, targetType, pageNum);
		});
	}
	// 모바일 카테고리 셀렉박스 이벤트
	selectBox.addEventListener("change", function (e){
		const label = document.querySelector(".m-faq-btn label")
		let selected = e.target;
		targetType = selected.value;
		label.textContent = selected.options[e.target.selectedIndex].text;
		countList = new Array;
		pageNum = 1;
		clear();
		listCreate(title, targetType, pageNum);
	});
	// 더보기 클릭 이벤트
	moreBtn.addEventListener("click", function () {
		pageNum++;
		listCreate(title, targetType, pageNum);
	});
	// 검색기능
	searchWord.addEventListener("keydown", function (){
		if(window.event.keyCode == 13) {
			title = searchWord.value;
			countList = new Array;
			pageNum = 1;
			clear();
			tabCreate(title);
			listCreate(title, targetType, pageNum);
		}
	});
}
// 탭 버튼 active 지우기
function tabBtnRemove() {
	for(let i=0; i<tabBtns.length; i++) {
		if(tabBtns[i].classList.contains("active")) {
			tabBtns[i].classList.remove("active")
		}
	}
}
// 각 리스트 active 지우기
function listsRemove() {
	let lists = document.querySelectorAll(".list-open-btn");
	for(let i=0; i<lists.length; i++) {
		if(lists[i].classList.contains("active")) {
			lists[i].classList.remove("active");
		}
	}
}
// 전체리스트 지우기
function clear() {
	while(board.firstChild) {
		board.removeChild(board.firstChild);
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
