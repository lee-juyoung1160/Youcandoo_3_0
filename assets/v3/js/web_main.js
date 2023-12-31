window.addEventListener("load", function (){
	loadingVideoHandlers();
	mainScrollMotion();
});
// ga btn track
const googleStoreBtn_MainPg = document.querySelector(".w-main-article__store-wrapper .google-store-btn");
const appStoreBtn_MainPg = document.querySelector(".w-main-article__store-wrapper .app-store-btn");
const googleStoreBtn_JoinPg = document.querySelector(".join-google-store");
const appStoreBtn_JoinPg = document.querySelector(".join-app-store");
const mobileStoreBtn = document.querySelector(".m-app-download");
googleStoreBtn_MainPg.addEventListener("click", googleStoreTrack);
appStoreBtn_MainPg.addEventListener("click", appStoreTrack);
googleStoreBtn_JoinPg.addEventListener("click", googleStoreTrack);
appStoreBtn_JoinPg.addEventListener("click", appStoreTrack);
mobileStoreBtn.addEventListener("click", mobileStore);

function googleStoreTrack() {gtag('event','button',{'event_category':'main','event_label':'button_store_google'});}
function appStoreTrack() {gtag('event','button',{'event_category':'main','event_label':'button_store_ios'});}
function mobileStore() {gtag('event','button',{'event_category':'main','event_label':'button_store_both'});}

//  DOM 트리를 완성하는 즉시 이미지 제거 및 비디오 생성
function loadingVideoHandlers() {
	const togetherArticle_ImgW01_web = document.querySelector(".w-together-article-video__wraaper .together-loadimg__01");
	const togetherArticle_ImgW02_web = document.querySelector(".w-together-article-video__wraaper .together-loadimg__02");
	const togetherArticle_video01_web =  document.querySelector(".w-together-article-video__wraaper .together-video__01");
	const togetherArticle_video02_web = document.querySelector(".w-together-article-video__wraaper .together-video__02");
	const togetherArticle_ImgW01_mo = document.querySelector(".m-together-article-video__wraaper .together-loadimg__01");
	const togetherArticle_ImgW02_mo = document.querySelector(".m-together-article-video__wraaper .together-loadimg__02");
	const togetherArticle_video01_mo =  document.querySelector(".m-together-article-video__wraaper .together-video__01");
	const togetherArticle_video02_mo = document.querySelector(".m-together-article-video__wraaper .together-video__02");

	const dataArticle_Img01 = document.querySelector(".data-loadimg__01");
	const dataArticle_Img02 = document.querySelector(".data-loadimg__02");
	const dataArticle_video01 = document.querySelector(".data-video__01");
	const dataArticle_video02 = document.querySelector(".data-video__02");

	const leaderArticleImg = document.querySelector(".leader-loadimg");
	const leaderArticleVideo = document.querySelector(".leader-video");

	togetherArticle_ImgW01_web.style.display = "none";
	togetherArticle_ImgW02_web.style.display = "none";
	togetherArticle_ImgW01_mo.style.display = "none";
	togetherArticle_ImgW02_mo.style.display = "none";
	togetherArticle_video01_web.style.display = "block";
	togetherArticle_video02_web.style.display = "block";
	togetherArticle_video01_mo.style.display = "block";
	togetherArticle_video02_mo.style.display = "block";
	togetherArticle_video01_web.src = "https://youcandoo.yanadoocdn.com/v3/web/assets/images/web_together01.mp4?resource_version=<?=$resource_version?>";
	togetherArticle_video02_web.src = "https://youcandoo.yanadoocdn.com/v3/web/assets/images/web_together02.mp4?resource_version=<?=$resource_version?>";
	togetherArticle_video01_mo.src = "https://youcandoo.yanadoocdn.com/v3/web/assets/images/web_together01.mp4?resource_version=<?=$resource_version?>";
	togetherArticle_video02_mo.src = "https://youcandoo.yanadoocdn.com/v3/web/assets/images/web_together02.mp4?resource_version=<?=$resource_version?>";

	dataArticle_Img01.style.display = "none";
	dataArticle_Img02.style.display = "none";
	dataArticle_video01.style.display = "block";
	dataArticle_video02.style.display = "block";
	dataArticle_video01.src =  "https://youcandoo.yanadoocdn.com/v3/web/assets/images/web_data_slide02.mp4?resource_version=<?=$resource_version?>";
	dataArticle_video02.src = "https://youcandoo.yanadoocdn.com/v3/web/assets/images/web_data_slide03.mp4?resource_version=<?=$resource_version?>";

	leaderArticleImg.style.display = "none";
	leaderArticleVideo.style.display = "block";
	leaderArticleVideo.src = "https://youcandoo.yanadoocdn.com/v3/web/assets/images/web_leader_img.mp4?resource_version=<?=$resource_version?>";
}
// data-article auto slide time event
let count = 100;
let time = 0;
function dataArticleAutoSlideTime(){
	clearInterval(time);
	time = setInterval("dataArticleAutoSlide()", 3000);
}
// scrollmotion event
function mainScrollMotion() {
	const windowH = window.innerHeight;
	const marginT = windowH / 1.8;
	let videoFlag = false;
	let counterFlag = false;

	const togetherArticleTop = document.querySelector(".together-article").offsetTop;
	const togetherVideoWraaper = document.querySelector(".m-together-article-video__wraaper");
	const togetherArticle_video01 =  document.querySelector(".m-together-article-video__wraaper .together-video__01");
	const togetherArticle_video02 = document.querySelector(".m-together-article-video__wraaper .together-video__02");

	const dataArticleTop = document.querySelector(".data-article").offsetTop;
	const dataArticle_video01 = document.querySelector(".data-video__01");
	const dataArticle_video02 = document.querySelector(".data-video__02");

	const leaderArticleTop = document.querySelector(".leader-article").offsetTop;
	const leaderArticleVideo = document.querySelector(".leader-video");

	window.addEventListener('scroll', function (){
		// together article script
		if(window.pageYOffset >= togetherArticleTop - marginT) {
			if(!videoFlag) {
				togetherArticle_video01.play();
				videoFlag = true;
				togetherArticle_video01.addEventListener('ended', function (event){
					togetherVideoWraaper.classList.add('active1');
					togetherVideoWraaper.classList.add('active2');
					togetherVideoWraaper.classList.add('active3');
					togetherArticle_video02.play();
				});
			}
		} else {
			videoFlag = false;
			togetherVideoWraaper.classList.remove('active3');
			togetherVideoWraaper.classList.remove('active2');
			togetherVideoWraaper.classList.remove('active1');
			togetherArticle_video01.pause();
			togetherArticle_video02.pause();
		}
		//data article script
		if(window.pageYOffset >= dataArticleTop - marginT) {
			if(dataArticle_video01.paused && dataArticle_video02.paused || !counterFlag) {
				counterAnimationHandler();
				counterFlag = true;
				count = count +1;
				if( count !== 0) {
					dataArticleAutoSlideTime();
				}
				if ( count === 0 ) {
					clearInterval(time);
				}
				dataArticle_video01.play();
				dataArticle_video02.play();
			}
		}else {
			counterFlag = false;
			clearInterval(time);
			dataArticle_video01.pause();
			dataArticle_video02.pause();
		}
		// leader article 관련
		if(window.pageYOffset >= leaderArticleTop - marginT) {
			if(leaderArticleVideo.paused) {
				leaderArticleVideo.play();
			}
		}else {
			leaderArticleVideo.pause();
		}
	});
}
// 카운트 애니메이션
function counterAnimationHandler() {
	const counter = document.querySelector('.data-article span.text-bold');
	counter.textContent = '0';
	counter.dataset.count = 0;
		const updateCounter = () => {
			const target = +counter.getAttribute('data-target');
			const count = +counter.dataset.count;
			const increment = target / 400;
			if (count < target) {
				const newCount = Math.ceil(count + increment);
				counter.dataset.count = newCount;
				counter.textContent = numberWithCommas(newCount)+"번";
				setTimeout(updateCounter, 1);
			} else {
				counter.textContent = numberWithCommas(target)+"번";
			}
		}
		updateCounter();
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
}
// data-article auto slide 이벤트
function dataArticleAutoSlide() {
	const btnTabEvent = document.querySelectorAll(".data-tab__btn-wrapper li");
	const tabSlideEvent = document.querySelectorAll(".data-tab__slide-wrapper li");
	let btnIdx = 0;
	for(let i=0; i<btnTabEvent.length; i++) {
		let activeBtn = btnTabEvent[i].classList.contains("active");
		let activeContent = tabSlideEvent[i].classList.contains("active");
		if(activeBtn === true && activeContent === true){
			btnIdx = i;
		}
	}
	let nextIdx = btnIdx+1;
	if(nextIdx > (btnTabEvent.length-1) && nextIdx > (tabSlideEvent.length-1)){
		nextIdx = 0;
	}
	for(let i=0; i<btnTabEvent.length; i++) {
		if(i === nextIdx) {
			btnTabEvent[i].classList.add('active');
			tabSlideEvent[i].classList.add('active');
		} else{
			btnTabEvent[i].classList.remove('active');
			tabSlideEvent[i].classList.remove('active');
		}
	}
}
// 모바일 스크롤시 앱 다운로드 생성
const mobileAppDownloadBtn = document.querySelector(".m-app-download");
window.addEventListener('scroll', function () {
	if (window.pageYOffset >= 35) {
		!mobileAppDownloadBtn.classList.contains('active');
		mobileAppDownloadBtn.classList.add('active');
	} else {
		mobileAppDownloadBtn.classList.remove('active');
	}
	if(window.pageYOffset >= 2873) {
		!mobileAppDownloadBtn.classList.contains('on');
		mobileAppDownloadBtn.classList.add('on');
	}else {
		mobileAppDownloadBtn.classList.remove('on');
	}
});




