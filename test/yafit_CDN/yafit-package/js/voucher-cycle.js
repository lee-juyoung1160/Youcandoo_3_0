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
        voucherInfos['1002988'] = new VoucherInfo('골드 3개월', 'G', '3','640,000','','119,700','0%','119,700','759,700','73,800','685,900','228633.333333333','228,633','YFC_CyclePKG_G3');
        voucherInfos['2002989'] = new VoucherInfo('골드 6개월 [+71,800]', 'G', '6','640,000','','239,400','20%','191,500','831,500','147,600','683,900','113983.333333333','113,983','YFC_CyclePKG_G6');
        voucherInfos['3002990'] = new VoucherInfo('골드 12개월 [+239,100]', 'G', '12','640,000','','478,800','25%','358,800','998,800','295,200','703,600','58633.3333333333','58,633','YFC_CyclePKG_G12');
        voucherInfos['4002991'] = new VoucherInfo('골드 24개월 [+359,100]', 'G', '24','640,000','','957,600','50%','478,800','1,118,800','590,400','528,400','22016.6666666667','22,016','YFC_CyclePKG_G24');
        //voucherInfos['5002986'] = new VoucherInfo('프리미엄 12개월 [+329,400]', 'P', '12','640,000','','598,800','25%','449,100','1,089,100','435,200','653,900','54491.6666666667','54,491','YFC_CyclePKG_P12');
        voucherInfos['6002987'] = new VoucherInfo('프리미엄 24개월 [+479,100]', 'P', '24','640,000','','1,197,600','50%','598,800','1,238,800','850,400','388,400','16183.3333333333','16,183','YFC_CyclePKG_P24');

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
