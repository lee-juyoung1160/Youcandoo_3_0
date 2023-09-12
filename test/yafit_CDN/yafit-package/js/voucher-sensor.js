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
        voucherInfos['1002950'] = new VoucherInfo('골드 1개월', 'G', '1','60,000','','39,900','0%','39,900','99,900','24,600','75,300','75300','75,300','YFC_SensorPKG_G1');
        voucherInfos['2002951'] = new VoucherInfo('골드 3개월 [+79,800]', 'G', '3','60,000','','119,700','0%','119,700','179,700','73,800','105,900','35300','35,300','YFC_SensorPKG_G3');
        voucherInfos['3002952'] = new VoucherInfo('골드 6개월 [+151,600]', 'G', '6','60,000','','239,400','20%','191,500','251,500','147,600','103,900','17316.6666666667','17,316','YFC_SensorPKG_G6');
        voucherInfos['4002953'] = new VoucherInfo('골드 12개월 [+318,900]', 'G', '12','60,000','','478,800','25%','358,800','418,800','295,200','123,600','10300','10,300','YFC_SensorPKG_G12');
        voucherInfos['5002954'] = new VoucherInfo('골드 24개월 [+438,900]', 'G', '24','60,000','','957,600','50%','478,800','538,800','590,400','-51,600','-2150','0','YFC_SensorPKG_G24');
        voucherInfos['6002948'] = new VoucherInfo('프리미엄 12개월 [+409,200]', 'P', '12','60,000','','598,800','25%','449,100','509,100','435,200','73,900','6158.33333333333','6,158','YFC_SensorPKG_P12');
        voucherInfos['7002949'] = new VoucherInfo('프리미엄 24개월 [+558,900]', 'P', '24','60,000','','1,197,600','50%','598,800','658,800','850,400','-191,600','-7983.33333333333','0','YFC_SensorPKG_P24');
                
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
