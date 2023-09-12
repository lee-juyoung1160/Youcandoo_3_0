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
    try {
        // 이용권 타입 정보
        //voucherInfos['1002982'] = new VoucherInfo('골드 3개월', 'G', '3','640,000','430,000','119,700','0%','119,700','1,189,700','73,800','1,115,900','371966.666666667','371,966','YFC_AllPKG_G3');
        //voucherInfos['1002983'] = new VoucherInfo('골드 6개월', 'G', '6','640,000','430,000','239,400','20%','191,500','1,261,500','147,600','1,113,900','185650','185,650 ','YFC_AllPKG_G6');
        voucherInfos['11002984'] = new VoucherInfo('골드 12개월', 'G', '12','640,000','449,000','478,800','25%','358,800','1,428,800','295,200','1,133,600','94466.6666666667','94,466','YFC_AllPKG_G12');
        voucherInfos['21002985'] = new VoucherInfo('골드 24개월 [+120,000]', 'G', '24','640,000','449,000','957,600','50%','478,800','1,548,800','590,400','958,400','39933.3333333333','39,933','YFC_AllPKG_G24');
        voucherInfos['31002980'] = new VoucherInfo('프리미엄 12개월 [+90,300]', 'P', '12','640,000','449,000','598,800','25%','449,100','1,519,100','435,200','1,083,900','90325','90,325','YFC_AllPKG_P12');
        voucherInfos['41002981'] = new VoucherInfo('프리미엄 24개월 [+240,000]', 'P', '24','640,000','449,000','1,197,600','50%','598,800','1,668,800','850,400','818,400','34100','34,100','YFC_AllPKG_P24');
        
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
