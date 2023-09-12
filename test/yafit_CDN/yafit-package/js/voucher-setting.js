// 전역 참조 변수
var voucherInfo1;
var voucherInfo2;

// 이용권 변경 시 호출
function changeVoucherType1() {
	displayVoucherInfo1();
}
function changeVoucherType2() {
	displayVoucherInfo2();
}

// 선택된 이용권 정보 표시
function displayVoucherInfo1() {
	// 선택한 이용권 타입 가져오기
	let selectObj = document.getElementById('voucherType1');
	let voucherCode = selectObj.options[selectObj.selectedIndex].value;
	//console.log('선택된 이용권 :', voucherCode);

	// 이용권 정보 가져오기
	voucherInfo1 = getVoucherInfo(voucherCode);

	// 이용권 정보 표시
	//console.log('이용권 코드 :', voucherInfo1.code);
	//console.log('사이클/센서 :', voucherInfo1.cycleOrSensorPirce);
	//console.log('아이패드 :', voucherInfo1.ipadPrice);
	//console.log('앱 이용권 정가 :', voucherInfo1.price);
	//console.log('앱 이용권 할인율 :', voucherInfo1.discount);
	//console.log('앱 이용권 할인가 :', voucherInfo1.discountPrice);
	//console.log('총 가격 :', voucherInfo1.totalPrice);
	//console.log('지급 마일리지 :', voucherInfo1.point);
	//console.log('실 부담금 :', voucherInfo1.realPrice);
	//console.log('코드 :', voucherInfo1.code);

	let cycleBasicPrice1 = document.getElementById('cycleBasicPrice1');
	let iPadBasicPrice1 = document.getElementById('iPadBasicPrice1');
	let discountBadge1 = document.getElementById('discountBadge1');
	let discountPrice1 = document.getElementById('discountPrice1');
	let allPrice1 = document.getElementById('allPrice1');
	let realPrice1 = document.getElementById('realPrice1');
	let mileage1 = document.getElementById('mileage1');

	discountBadge1.innerHTML = voucherInfo1.discount + " 할인가";
	cycleBasicPrice1.innerHTML = voucherInfo1.cycleOrSensorPirce;
	iPadBasicPrice1.innerHTML = voucherInfo1.ipadPrice;
	discountPrice1.innerHTML = voucherInfo1.discountPrice;
	allPrice1.innerHTML = voucherInfo1.totalPrice + "원";
	realPrice1.innerHTML = voucherInfo1.monthRealPrice + "원";
	mileage1.innerHTML = voucherInfo1.point;

	if(voucherInfo1.discount ==  '0%') {discountBadge1.style.display = 'none'}
	else {discountBadge1.style.display = 'block'}

	if(voucherInfo1.packageType == 'G') {discountBadge1.style.backgroundColor = '#FEE510'}
	else {discountBadge1.style.backgroundColor = '#00CC66'}
}


function displayVoucherInfo2() {
	// 선택한 이용권 타입 가져오기
	let selectObj = document.getElementById('voucherType2');
	let voucherCode = selectObj.options[selectObj.selectedIndex].value;
	//console.log('선택된 이용권 :', voucherCode);

	// 이용권 정보 가져오기
	voucherInfo2 = getVoucherInfo(voucherCode);

	// 이용권 정보 표시
	//console.log('이용권 코드 :', voucherInfo2.code);
	//console.log('사이클/센서 :', voucherInfo2.cycleOrSensorPirce);
	//console.log('아이패드 :', voucherInfo2.ipadPrice);
	//console.log('앱 이용권 정가 :', voucherInfo2.price);
	//console.log('앱 이용권 할인율 :', voucherInfo2.discount);
	//console.log('앱 이용권 할인가 :', voucherInfo2.discountPrice);
	//console.log('총 가격 :', voucherInfo2.totalPrice);
	//console.log('지급 마일리지 :', voucherInfo2.point);
	//console.log('실 부담금 :', voucherInfo2.realPrice);
	console.log('코드 :', voucherInfo2.code);

	let cycleBasicPrice2 = document.getElementById('cycleBasicPrice2');
	let iPadBasicPrice2 = document.getElementById('iPadBasicPrice2');
	let discountBadge2 = document.getElementById('discountBadge2');
	let discountPrice2 = document.getElementById('discountPrice2');
	let allPrice2 = document.getElementById('allPrice2');
	let realPrice2 = document.getElementById('realPrice2');
	let mileage2 = document.getElementById('mileage2');

	discountBadge2.innerHTML = voucherInfo2.discount + " 할인가";
	cycleBasicPrice2.innerHTML = voucherInfo2.cycleOrSensorPirce;
	iPadBasicPrice2.innerHTML = voucherInfo2.ipadPrice;
	discountPrice2.innerHTML = voucherInfo2.discountPrice;
	allPrice2.innerHTML = voucherInfo2.totalPrice + "원";
	realPrice2.innerHTML = voucherInfo2.monthRealPrice + "원";
	mileage2.innerHTML = voucherInfo2.point;

	if(voucherInfo2.discount ==  '0%') {discountBadge2.style.display = 'none'}
	else {discountBadge2.style.display = 'block'}

	if(voucherInfo2.packageType == 'G') {discountBadge2.style.backgroundColor = '#FEE510'}
	else {discountBadge2.style.backgroundColor = '#00CC66'}
}

function voucherOrder1() {
	document.location.href = 'https://www.yanadoo.co.kr/mypage/order/cart/promotion/' +
			voucherInfo1.code +
			'?errorReturnUrl=' +
			encodeURIComponent(document.location.pathname);
}

function voucherOrder2() {
	document.location.href = 'https://www.yanadoo.co.kr/mypage/order/cart/promotion/' +
			voucherInfo2.code +
			'?errorReturnUrl=' +
			encodeURIComponent(document.location.pathname);
}
