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
        voucherInfos['1002958'] = new VoucherInfo('골드 1개월', 'G', '1','','','39,900','0%','39,900','39,900','24,600','15,300','15300','15,300','YFC_Appticket_G1');
        voucherInfos['2002959'] = new VoucherInfo('골드 3개월 [+79,800]', 'G', '3','','','119,700','0%','119,700','119,700','73,800','45,900','15300','15,300','YFC_Appticket_G3');
        voucherInfos['3002960'] = new VoucherInfo('골드 6개월 [+151,600]', 'G', '6','','','239,400','20%','191,500','191,500','147,600','43,900','7316.66666666667','7,316 ','YFC_Appticket_G6');
        voucherInfos['4002961'] = new VoucherInfo('골드 12개월 [+318,900]', 'G', '12','','','478,800','25%','358,800','358,800','295,200','63,600','5300','5,300','YFC_Appticket_G12');
        voucherInfos['5002962'] = new VoucherInfo('골드 24개월 [+438,900]', 'G', '24','','','957,600','50%','478,800','478,800','590,400','-111,600','-4650','0','YFC_Appticket_G24');
        voucherInfos['6002956'] = new VoucherInfo('프리미엄 12개월 [+409,200]', 'P', '12','','','598,800','25%','449,100','449,100','435,200','13,900','1158.33333333333','1,158','YFC_Appticket_P12');
        voucherInfos['7002957'] = new VoucherInfo('프리미엄 24개월 [+558,900]', 'P', '24','','','1,197,600','50%','598,800','598,800','850,400','-251,600','-10483.3333333333','0','YFC_Appticket_P24');
                
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
