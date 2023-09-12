// 화면 로드시
document.addEventListener('DOMContentLoaded', function () {
	slideEvent();
	tabEvent();
});
// 두잇 참여 가이드 슬라이드
function slideEvent() {
	const guideDoitGalleryThumbs = new Swiper('.doit-slide-text', {
		slidesPerView: 1,
		freeMode: false,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		simulateTouch: false,
		allowTouchMove: false,
		observer: true,
		observeParents: true
	});
	const guideDoitGalleryTop = new Swiper('.doit-slide-img', {
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.doit-slide-next',
			prevEl: '.doit-slide-prev',
		},
		pagination: {
			el: '.doit-slide-pagination',
			clickable: true,
		},
		thumbs: {
			swiper: guideDoitGalleryThumbs
		}
	});
// 스폰서의 프로모션 가이드
	const guideSponsorGalleryThumbs = new Swiper('.sponsor-slide-text', {
		slidesPerView: 1,
		freeMode: false,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		simulateTouch: false,
		allowTouchMove: false,
		observer: true,
		observeParents: true
	});
	const guideSponsorGalleryTop = new Swiper('.sponsor-slide-img', {
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.sponsor-slide-next',
			prevEl: '.sponsor-slide-prev',
		},
		pagination: {
			el: '.sponsor-slide-pagination',
			clickable: true,
		},
		thumbs: {
			swiper: guideSponsorGalleryThumbs
		}
	});
// ucd 가이드 슬라이드
	const guideUcdGalleryThumbs = new Swiper('.ucd-slide-text', {
		slidesPerView: 1,
		freeMode: false,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		simulateTouch: false,
		allowTouchMove: false,
		observer: true,
		observeParents: true
	});
	const guideUcdGalleryTop = new Swiper('.ucd-slide-img', {
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.ucd-slide-next',
			prevEl: '.ucd-slide-prev',
		},
		pagination: {
			el: '.ucd-slide-pagination',
			clickable: true,
		},
		thumbs: {
			swiper: guideUcdGalleryThumbs
		}
	});
// 두잇 개설 가이드 슬라이드
	const guideDoitCreateGalleryThumbs = new Swiper('.gallery-thumbs1', {
		slidesPerView: 1,
		freeMode: false,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		simulateTouch: false,
		allowTouchMove: false,
		observer: true,
		observeParents: true
	});
	const guideDoitCreateGalleryTop = new Swiper('.gallery-top1', {
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.create-doit-slide-next',
			prevEl: '.create-doit-slide-prev',
		},
		pagination: {
			el: '.create-doit-slide-pagination',
			clickable: true,
		},
		thumbs: {
			swiper: guideDoitCreateGalleryThumbs
		}
	});
	const guideCreateGalleryThumbs = new Swiper('.gallery-thumbs2', {
		slidesPerView: 1,
		freeMode: false,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		simulateTouch: false,
		allowTouchMove: false,
		observer: true,
		observeParents: true
	});
	const guideCreatGalleryTop = new Swiper('.gallery-top2', {
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.create-pro-slide-next',
			prevEl: '.create-pro-slide-prev',
		},
		pagination: {
			el: '.create-pro-slide-pagination',
			clickable: true,
		},
		thumbs: {
			swiper: guideCreateGalleryThumbs
		}
	});
}
// tab event
// function tabEvent() {
// 	const tabBtns = document.querySelectorAll(".tab-btn li");
// 	const tabContents = document.querySelectorAll(".tab-contents");
// 	// 웹 카테고리 클릭 이벤트
// 	for(let i=0; i<tabBtns.length; i++) {
// 		tabBtns[i].addEventListener("click", function (e){
// 			tabBtnRemove();
// 			e.currentTarget.classList.add('active');
// 			let targetType = e.currentTarget.getAttribute('data-target');
// 			tabContents[i].classList.add("active")
// 		});
// 	}
// 	// 탭 버튼 active 지우기
// 	function tabBtnRemove() {
// 		for(let i=0; i<tabBtns.length; i++) {
// 			if(tabBtns[i].classList.contains("active")) {
// 				tabBtns[i].classList.remove("active")
// 				tabContents[i].classList.remove("active");
// 			}
// 		}
// 	}
// }

// tab
function tabEvent() {
	const tabBtn = $('.tab-btn li');
	const tabContents = $('.tab-contents');

	tabBtn.on("click", function() {
		tabBtn.removeClass("active");
		tabContents.removeClass("active");
		$(this).addClass("active");
		var content = $(this).attr("data-target");
		$(content).addClass("active");
	});
}
