// 이용권 정보 리스트
var voucherInfos = {};
// 이용권 타입 기본 선택값
var voucherDefaultIndex = 0;

// 이용권 정보 반환
function getVoucherInfo(code) {
    return voucherInfos[code];
}

// 이용권 타입 기본값 설정
function setVoucherDefault(selectBoxName) {
    let selectObj = document.getElementById(selectBoxName);
    selectObj.selectedIndex = voucherDefaultIndex;
}

// 이용권 타입 추가
function setVoucherOption(selectBoxName) {
    let selectObj = document.getElementById(selectBoxName);

    Object.keys(voucherInfos).forEach(function(key) {
        let voucherInfo = getVoucherInfo(key);
        let option = document.createElement("option");
        option.text = voucherInfo.name;
        option.value = key;
        //option.value = voucherInfo.code;
        selectObj.add(option)        
    });
}

function VoucherInfo(name, packageType, period, cycleOrSensorPirce, ipadPrice, price, 
    discount, discountPrice, totalPrice, point, realPrice, 
    monthPrice, monthRealPrice, code) {
    this.name = name;
    this.packageType = packageType;
    this.period = period;
    this.cycleOrSensorPirce = cycleOrSensorPirce;
    this.ipadPrice = ipadPrice;
    this.price = price;
    this.discount = discount;
    this.discountPrice = discountPrice;
    this.totalPrice = totalPrice;
    this.point = point;
    this.realPrice = realPrice;
    this.monthPrice = monthPrice;
    this.monthRealPrice = monthRealPrice;
    this.code = code;
}

(function () {

	window.onpageshow = function (event) {
		if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
			setVoucherDefault("voucherType1");
			setVoucherDefault("voucherType2");
		}
	}
      
    try {
        // 이용권 타입 정보
        voucherInfos['1002692'] = new VoucherInfo('프리미엄 24개월', 'P', '24','640,000','560,000','1,197,600','83%','199,000','1,399,000','850,400','548,600','22858.3333333333','22,858','YFC_RnwPKG_P24');

        // 이용권 타입 정보 설정
        setVoucherOption('voucherType1');
        setVoucherOption('voucherType2');
        // 이용권 타입 기본값 설정
        setVoucherDefault('voucherType1');
        setVoucherDefault('voucherType2');
        // 이용권 정보 표시
        displayVoucherInfo1();
        displayVoucherInfo2();

    } catch (e) {
      console.log(e);
    }
})()
