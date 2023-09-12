/**
 * 문자열을 입력받아 날짜형식 문자열을 리턴한다.
 * @param str
 * @returns
 */
function gfn_strToDateFormat(str) {
    if (str.length == 8) {
        return str.substring(0, 4) + "." + str.substring(4, 6) + "." + str.substring(6, 8);
    } else {
        return str;
    }
}

/**
 * 콤마찍기
 * @param num
 * @returns
 */
function gfn_numberFormat(num) {
    /*
     var pattern = /(-?[0-9]+)([0-9]{3})/;
     while(pattern.test(num)) {
     num2 = num.replace(pattern,"$1,$2");
     }
     return num;
     */
    num = String(num);
    return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");

}

/**
 * 콤마제거
 * @param num
 * @returns
 */
function gfn_unNumberFormat(num) {
    return (num.replace(/\,/g, ""));
}

/**
 * 공백으로 처리
 * @param str
 * @returns
 */
function gfn_str(str) {
    return (typeof(str) == "undefined" ? "" : "" + str);
}


/**
 * 파일 업로드(공통)
 * @param serverUrl
 * @param types
 * @param savepath
 * @param formname
 * @param textname
 */
function gfn_fileUpload(serverUrl, types, savepath, formname, textname) {
    // var addUrlInfo = '?isJsp=YES&serverUrl=' + serverUrl + '&types=' + types + '&savepath=' + savepath + '&formname=' + formname + '&textname=' + textname;
    // var newwin = window.open('http://upfile.neungyule.com/pages/common/upload.asp' + addUrlInfo, 'uploadFrm', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=no,width=526,height=323,top=400,left=400');
    // newwin.focus();
    var addUrlInfo = '?serverUrl=' + serverUrl + '&types=' + types + '&savepath=' + savepath + '&formname=' + formname + '&textname=' + textname;
    var newwin = window.open('/common/uploadgate' + addUrlInfo, 'uploadFrm', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=no,width=526,height=323,top=400,left=400');
    newwin.focus();
}

function gfn_fileUpload2(serverUrl, types, savepath, formname, textname) {
    var addUrlInfo = '?serverUrl=' + serverUrl + '&types=' + types + '&savepath=' + savepath + '&formname=' + formname + '&textname=' + textname;
    var newwin = window.open('/common/uploadgate2' + addUrlInfo, 'uploadFrm', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=no,width=526,height=323,top=400,left=400');
    newwin.focus();
}

/**
 * 파일 업로드(마케팅 동의 체크 없는 ver)
 * @param serverUrl
 * @param types
 * @param savepath
 * @param formname
 * @param textname
 */
function gfn_fileUploadNotAgree(serverUrl, types, savepath, formname, textname){
	// var addUrlInfo = '?isJsp=YES&serverUrl=' + serverUrl + '&types=' + types + '&savepath=' + savepath + '&formname=' + formname + '&textname=' + textname;
	// var newwin = window.open('http://upfile.neungyule.com/pages/common/upload.asp' + addUrlInfo, 'uploadFrm', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=no,width=526,height=323,top=400,left=400');
	// newwin.focus();
	var addUrlInfo = '?serverUrl=' + serverUrl + '&types=' + types + '&savepath=' + savepath + '&formname=' + formname + '&textname=' + textname;
	var newwin = window.open('/common/uploadgateNotAgree' + addUrlInfo, 'uploadFrm', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=no,width=526,height=323,top=400,left=400');
	newwin.focus();
}



/**
 * 숫자입력 체크
 * @param obj
 * @param msg
 * @returns {Boolean}
 */
function fn_IsNotANumber_onKeyUp(obj, msg) {
    if (obj.value > "") {
        if (obj.value.match(/[0-9]+/g) != obj.value) {
            alert(msg);
            obj.value = obj.value.replace(/[^0-9]/g, "")
            obj.focus();
            return true;
        }
    }
    return false;
}

function gfn_dateAdd(strInterval, intIncrement, objDate, flag) {
    if (typeof (objDate) == "string") {
//		objDate = new Date(objDate);
        objDate_data = new Date(objDate.substr(0, 4), parseInt(objDate.substr(5, 2), 10) - 1, parseInt(objDate.substr(8, 2), 10));


        if (isNaN(objDate_data)) {
            throw ("DateAdd: Date is not a valid date");
        }
    }

    if (
        strInterval != "M"
        && strInterval != "D"
        && strInterval != "Y"
        && strInterval != "h"
        && strInterval != "m"
        && strInterval != "uM"
        && strInterval != "uD"
        && strInterval != "uY"
        && strInterval != "uh"
        && strInterval != "um"
        && strInterval != "us"
    ) {
        throw ("DateAdd: Second parameter must be M, D, Y, h, m, uM, uD, uY, uh, um or us");
    }

//	if (typeof (intIncrement) != "number") {
//		throw ("DateAdd: Third parameter must be a number");
//	}

    switch (strInterval) {
        case "M":
            objDate_data.setMonth(parseInt(objDate_data.getMonth(), 10) + parseInt(intIncrement, 10));
            break;
        case "D":
            objDate_data.setDate(parseInt(objDate_data.getDate(), 10) + parseInt(intIncrement, 10));
            break;
        case "Y":
            objDate_data.setYear(parseInt(objDate_data.getYear(), 10) + parseInt(intIncrement, 10));
            break;
        case "h":
            objDate_data.setHours(parseInt(objDate_data.getHours(), 10) + parseInt(intIncrement, 10));
            break;
        case "m":
            objDate_data.setMinutes(parseInt(objDate_data.getMinutes(), 10) + parseInt(intIncrement, 10));
            break;
        case "s":
            objDate_data.setSeconds(parseInt(objDate_data.getSeconds(), 10) + parseInt(intIncrement, 10));
            break;
        case "uM":
            objDate_data.setUTCMonth(parseInt(objDate_data.getUTCMonth(), 10) + parseInt(intIncrement, 10));
            break;
        case "uD":
            objDate_data.setUTCDate(parseInt(objDate_data.getUTCDate(), 10) + parseInt(intIncrement, 10));
            break;
        case "uY":
            objDate_data.setUTCFullYear(parseInt(objDate_data.getUTCFullYear(), 10) + parseInt(intIncrement, 10));
            break;
        case "uh":
            objDate_data.setUTCHours(parseInt(objDate_data.getUTCHours(), 10) + parseInt(intIncrement, 10));
            break;
        case "um":
            objDate_data.setUTCMinutes(parseInt(objDate_data.getUTCMinutes(), 10) + parseInt(intIncrement, 10));
            break;
        case "us":
            objDate_data.setUTCSeconds(parseInt(objDate_data.getUTCSeconds(), 10) + parseInt(intIncrement, 10));
            break;
    }
    if (flag == "-") {
        return objDate_data.getUTCFullYear() + '-' + RIGHT('0' + (parseInt(objDate_data.getMonth(), 10) + 1), 2) + '-' + RIGHT('0' + objDate_data.getDate(), 2);
    }
    if (flag == ".") {
        return objDate_data.getUTCFullYear() + '.' + RIGHT('0' + (parseInt(objDate_data.getMonth(), 10) + 1), 2) + '.' + RIGHT('0' + objDate_data.getDate(), 2);
    }

}


/**
 * 입력문자열 길이 체크
 * 한글(2) 영문(1) 따로 계산할때
 * @param obj
 * @param minlen
 * @param maxlen
 * @param msg
 * @returns {Boolean}
 */
function gfn_illegalField(obj, minlen, maxlen, msg) {
    var tempMsg = "";
    var temp;
    var strlength;
    strlength = 0;
    len = obj.value.length;
    for (var k = 0; k < len; k++) {
        temp = obj.value.charAt(k);

        if (escape(temp).length > 4) {
            strlength += 2;
        } else {
            strlength++;
        }

        if (strlength <= maxlen) {
            tempMsg += temp;
        }
    }

    if (strlength < minlen || strlength > maxlen) {
        alert(msg + " 길이는 최소" + minlen + "자(한글" + (minlen / 2 ) + ") 이상, 최대 " + maxlen + "자(한글" + (maxlen / 2) + ") 이하 이어야 합니다.");
        obj.value = tempMsg;
        obj.focus();
        return true;
    }
    return false;
}


/**
 * 날짜체크
 * @param dateStr
 * @returns {Boolean}
 */
function isValidDate(dateStr) {

    var year = Number(dateStr.substr(0, 4));
    var month = Number(dateStr.substr(5, 2));
    var day = Number(dateStr.substr(8, 2));

    if (month < 1 || month > 12) { // check month range
        return false;
    }

    if (day < 1 || day > 31) {
        return false;
    }

    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        return false;
    }

    if (month == 2) { // check for february 29th
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !isleap)) {
            return false;
        }
    }

    return true;
}

/**
 * 인풋폼 달력
 */
$(document).ready(function () {
    var datePickers = $(".datePicker");

    if (datePickers.length == 0) {
        return;
    }
    datePickers.datepicker({
        showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
//		buttonImage: "/css/cupertino/images/btn_cal.gif", // 버튼 이미지
        buttonImage: "http://pic.neungyule.com/tomatoclass/img/common/icon_calendar2.gif", // 버튼 이미지
        buttonImageOnly: true, // 버튼에 있는 이미지만 표시한다.
        changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.
        changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
        minDate: '-100y', // 현재날짜로부터 100년이전까지 년을 표시한다.
        nextText: '다음 달', // next 아이콘의 툴팁.
        prevText: '이전 달', // prev 아이콘의 툴팁.
        numberOfMonths: [1, 1], // 한번에 얼마나 많은 월을 표시할것인가. [2,3] 일 경우, 2(행) x 3(열) = 6개의 월을 표시한다.
        stepMonths: 1, // next, prev 버튼을 클릭했을때 얼마나 많은 월을 이동하여 표시하는가.
        yearRange: 'c-10:c+10', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
        showButtonPanel: true, // 캘린더 하단에 버튼 패널을 표시한다.
        currentText: '오늘', // 오늘 날짜로 이동하는 버튼 패널
        closeText: '닫기',  // 닫기 버튼 패널
        dateFormat: "yy-mm-dd", // 텍스트 필드에 입력되는 날짜 형식.
//		showAnim: "fade", //애니메이션을 적용한다.
        showMonthAfterYear: true, // 월, 년순의 셀렉트 박스를 년,월 순으로 바꿔준다.
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], // 요일의 한글 형식.
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] // 월의 한글 형식.
    });
    datePickers.attr("maxlength", "10");

    datePickers.change(function () {
        ValidDateInputText(this);
    });
    datePickers.keydown(function (event) {
        if (event.keyCode == 13) {
            ValidDateInputText(this);
        }
    });
});

/**
 * 오늘날짜 가져오기
 * @returns {String}
 */
function fnc_getcheckTodate() {
    var d = new Date(); //오늘날짜 데이터 세팅
    var thisDate = leadingZeros(d.getFullYear(), 4) + '-' + leadingZeros(d.getMonth() + 1, 2) + '-' + leadingZeros(d.getDate(), 2);
    /*
     + leadingZeros(d.getHours(), 2) + ':' + leadingZeros(d.getMinutes(), 2) + ':' + leadingZeros(d.getSeconds(), 2);

     */
    return thisDate;
}

/**
 * 월 or 일 이 한자리일 경우 2자리로 세팅해주는 함수
 * @param n
 * @param digits
 * @returns {String}
 */
function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }

    return zero + n;
}

/**
 * 날짜추가
 * @param strInterval
 * @param intIncrement
 * @param objDate
 * @returns {String}
 */
function fnc_DateAdd(strInterval, intIncrement, objDate) {
    if (typeof (objDate) == "string") {
//		objDate = new Date(objDate);
        objDate_data = new Date(objDate.substr(0, 4), parseInt(objDate.substr(5, 2), 10) - 1, parseInt(objDate.substr(8, 2), 10));


        if (isNaN(objDate_data)) {
            throw ("DateAdd: Date is not a valid date");
        }
    }

    if (
        strInterval != "M"
        && strInterval != "D"
        && strInterval != "Y"
        && strInterval != "h"
        && strInterval != "m"
        && strInterval != "uM"
        && strInterval != "uD"
        && strInterval != "uY"
        && strInterval != "uh"
        && strInterval != "um"
        && strInterval != "us"
    ) {
        throw ("DateAdd: Second parameter must be M, D, Y, h, m, uM, uD, uY, uh, um or us");
    }

    if (typeof (intIncrement) != "number") {
        throw ("DateAdd: Third parameter must be a number");
    }

    switch (strInterval) {
        case "M":
            objDate_data.setMonth(parseInt(objDate_data.getMonth(), 10) + parseInt(intIncrement, 10));
            break;
        case "D":
            objDate_data.setDate(parseInt(objDate_data.getDate(), 10) + parseInt(intIncrement, 10));
            break;
        case "Y":
            objDate_data.setYear(parseInt(objDate_data.getYear(), 10) + parseInt(intIncrement, 10));
            break;
        case "h":
            objDate_data.setHours(parseInt(objDate_data.getHours(), 10) + parseInt(intIncrement, 10));
            break;
        case "m":
            objDate_data.setMinutes(parseInt(objDate_data.getMinutes(), 10) + parseInt(intIncrement, 10));
            break;
        case "s":
            objDate_data.setSeconds(parseInt(objDate_data.getSeconds(), 10) + parseInt(intIncrement, 10));
            break;
        case "uM":
            objDate_data.setUTCMonth(parseInt(objDate_data.getUTCMonth(), 10) + parseInt(intIncrement, 10));
            break;
        case "uD":
            objDate_data.setUTCDate(parseInt(objDate_data.getUTCDate(), 10) + parseInt(intIncrement, 10));
            break;
        case "uY":
            objDate_data.setUTCFullYear(parseInt(objDate_data.getUTCFullYear(), 10) + parseInt(intIncrement, 10));
            break;
        case "uh":
            objDate_data.setUTCHours(parseInt(objDate_data.getUTCHours(), 10) + parseInt(intIncrement, 10));
            break;
        case "um":
            objDate_data.setUTCMinutes(parseInt(objDate_data.getUTCMinutes(), 10) + parseInt(intIncrement, 10));
            break;
        case "us":
            objDate_data.setUTCSeconds(parseInt(objDate_data.getUTCSeconds(), 10) + parseInt(intIncrement, 10));
            break;
    }

    return objDate_data.getUTCFullYear() + '-' + RIGHT('0' + (parseInt(objDate_data.getMonth(), 10) + 1), 2) + '-' + RIGHT('0' + objDate_data.getDate(), 2);
}

/**
 *
 * @param str
 * @param len
 * @returns
 */
function RIGHT(str, len) {
    len = isNaN(len) ? 1 : +len;
    return C_STR(str).substring(C_STR(str).length - len);
}

/**
 *
 * @param str
 * @returns
 */
function C_STR(str) {
    return (typeof(str) == "undefined" ? "" : "" + str);
}

/**
 * 숫자만 입력
 * @param obj
 * @param msg
 * @returns {Boolean}
 */
function IsNotANumber_onKeyUp(obj, msg) {
    if (obj.value > "") {
        if (obj.value.match(/[0-9]+/g) != obj.value) {
            alert(msg);
            obj.value = obj.value.replace(/[^0-9]/g, "")
            obj.focus();
            return true;
        }
    }
    return false;
}

/**
 * 팝업 사이즈 조정
 */
function gfn_popupResize() {
    var callIdx = 1;
    var initWidth = 0;
    var initHeight = 0;
    var w = 0;
    var h = 0;

    var me = this;

    this.resizing = function () {
        marginY = 0;

        // 브라우저별 높이 조절. (표준 창 하에서 조절해 주십시오.)
        if (navigator.userAgent.indexOf("MSIE 6") > 0) marginY = 21;        // IE 6.x
        else if (navigator.userAgent.indexOf("MSIE 7") > 0) marginY = 21;    // IE 7.x
        else if (navigator.userAgent.indexOf("MSIE 10") > 0) marginY = 20;    // IE 10.x
        else if (navigator.userAgent.indexOf("Firefox") > 0) marginY = 150;   // FF
        else if (navigator.userAgent.indexOf("Chrome") > 0) marginY = 20;  // Chrome

        // body의 자식 개체를 통해 너비, 높이를 구한다.
        if (callIdx == 1) {
            //alert(navigator.userAgent);
            var childs = document.getElementsByTagName("body")[0].childNodes;
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].nodeType == 1) {
                    if (initWidth < childs[i].offsetWidth) initWidth = childs[i].offsetWidth;

                    initHeight += childs[i].offsetHeight;
                }
            }

            var bodySize = getBodySize();
            var bodyWidth = bodySize.totalWidth;
            var bodyHeight = bodySize.totalHeight;

            // 사이즈가 개체와 동일하면 처리 중단.
            if (initWidth == bodySize.displayWidth && initHeight == bodySize.displayHeight) return;

            window.resizeTo(initWidth, initHeight);

            //alert(initWidth + " : " + initHeight);
        }
        // resizing된 창 크기가 내부 개체의 크기였기 때문에 차이값을 구하여 다시 resizing.
        else if (callIdx == 2) {
            var bodySize = getBodySize();
            w = bodySize.totalWidth * 2 - bodySize.displayWidth;
            h = bodySize.totalHeight * 2 - bodySize.displayHeight;
            window.resizeTo(w, h + marginY);

            //alert(w + " : " + h);
        }
        // scrollbar가 있는 경우 scrollbar의 폭으로 크기가 맞지 않는 경우가 있어 다시 resizing.
        else {
            var bodySize = getBodySize();
            w = w - (bodySize.totalWidth - initWidth);
            h = h - (bodySize.totalHeight - initHeight);
            window.resizeTo(w, h + marginY);

            //alert(bodySize.totalWidth + " : " + initWidth + "\n\n" + bodySize.totalHeight + " : " + initHeight );

            /*/ 팝업 가운데 정렬
             var left = (screen.width - initWidth) / 2;
             var top = (screen.height - initHeight) / 2;
             window.moveTo(left, top);*/
        }

        if (callIdx < 3) {
            callIdx++;
            setTimeout(me.resizing, 20);
        }
    }

    this.resizing();
}

/**
 * BodySize 구하기
 * @returns {___anonymous14651_14657}
 */
function getBodySize() {
    var objBody = getBody();

    var arrSize = new Array();

    arrSize["displayWidth"] = objBody.clientWidth;
    arrSize["displayHeight"] = objBody.clientHeight;
    arrSize["totalWidth"] = objBody.scrollWidth;
    arrSize["totalHeight"] = objBody.scrollHeight;

    return arrSize;
}

/**
 * Body 가져오기
 * @returns
 */
function getBody() {
    var objBody = null;

    if (document.documentElement.clientHeight == 0) objBody = document.body;
    else objBody = document.documentElement;

    return objBody;
}

/**
 *
 * @param o
 * @returns
 */
function CINT(o) {
    return parseInt(o);
}

function LEFT(str, len) {
    len = isNaN(len) ? 1 : +len;
    return C_STR(str).substring(0, len);
}

function MID(str, index, len) {
    index = isNaN(index) ? 0 : +index;
    if (!isNaN(len))
        return C_STR(str).substring(index, index + len);
    else
        return C_STR(str).substring(index);
}

// 24시간 기준 쿠키 설정하기
// expiredays 후의 클릭한 시간까지 쿠키 설정
function setCookie(cName, cValue, cDay) {
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; cross-site-cookie=bar; SameSite=None; Secure; path=/ ';
    if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

// 00:00 시 기준 쿠키 설정하기
// expiredays 의 새벽  00:00:00 까지 쿠키 설정
function setCookieAt00( name, value, expiredays ) {
    var todayDate = new Date();
    todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
    if ( todayDate > new Date() )
    {
        expiredays = expiredays - 1;
    }
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; cross-site-cookie=bar; SameSite=None; Secure; expires=" + todayDate.toGMTString() + ";"
}

function deleteCookie(cName) {
    var expireDate = new Date();

    //어제 날짜를 쿠키 소멸 날짜로 설정한다.
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cName + "= " + "; expires=" + expireDate.toGMTString() + "; cross-site-cookie=bar; SameSite=None; Secure; path=/";
}

// 쿠키 입력
function set_cookie(name, value, expirehours, domain) {
    var today = new Date();
    today.setTime(today.getTime() + (60 * 60 * 1000 * expirehours));
    document.cookie = name + "=" + escape(value) + "; path=/; cross-site-cookie=bar; SameSite=None; Secure; expires=" + today.toGMTString() + ";";
    if (domain) {
        document.cookie += "domain=" + domain + ";";
    }
}

// 쿠키 얻음
function get_cookie(name) {
    var find_sw = false;
    var start, end;
    var i = 0;

    for (i = 0; i <= document.cookie.length; i++) {
        start = i;
        end = start + name.length;

        if (document.cookie.substring(start, end) == name) {
            find_sw = true
            break
        }
    }

    if (find_sw == true) {
        start = end + 1;
        end = document.cookie.indexOf(";", start);

        if (end < start)
            end = document.cookie.length;

        return document.cookie.substring(start, end);
    }
    return "";
}

// 쿠키 지움
function delete_cookie(name) {
    var today = new Date();

    today.setTime(today.getTime() - 1);
    var value = get_cookie(name);
    if (value != "")
        document.cookie = name + "=" + value + "; path=/; cross-site-cookie=bar; SameSite=None; Secure; expires=" + today.toGMTString();
}

/**
 * 레이어 숨기기
 */
function gfn_layerClose(id) {
    $('#' + id + '').css('display', 'none');
}

/**
 * 공지팝업 닫기
 */
function gfn_closePopup(id) {
    setCookie(id, "done", 1); //하룻동안 열지 않음
    gfn_layerClose(id);
}

/**
 * 공지팝업 닫기
 */
function gfn_closePopup2(id) {
    var dt = new Date();
    // Display the month, day, and year. getMonth() returns a 0-based number.
    var month = dt.getMonth() + 1;
    var day = dt.getDate() + 1;
    var year = dt.getFullYear();
    var tmpDate = new Date(month + "/" + day + "/" + year);
    document.cookie = id + "=" + escape("done") + "; path=/; cross-site-cookie=bar; SameSite=None; Secure; expires=" + tmpDate.toGMTString() + ";";
    gfn_layerClose(id);
}

/**
 * 공지팝업 닫기
 */
function gfn_closePopup3(id) {
    if ($('#closeChk').is(':checked')) {
        setCookie(id, "done", 1); //하룻동안 열지 않음
    }
    gfn_layerClose(id);
}

/**
 * 쿠키 값 가져오기
 */
function getCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;

    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1) endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }

        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0) break;
    }

    return "";

}

function ValidDateInputText(obj) {
    var str = $(obj).val();

    str = $.trim(str);

    if (str.length == 8 && $.isNumeric(str)) {
        str = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2);
    }

    if (str.length > 0 && isValidDate(str) == false) {
        alert("잘못된 날짜 입력입니다.");
        str = "";
    }

    $(obj).val(str);
}

/**
 * 플레이어(무료,강사,대표강의)
 * @param encUrl
 */
function gfn_player(encUrl, title) {
    var f = document.PlayForm;
    var w = window.open("", "playerPopWin", "width=820,height=650, scrollbars=no");
    f.action = "/common/player.do";
    f.encUrl.value = encUrl;
    f.title.value = title;
    f.method = "post";
    f.target = "playerPopWin";
    f.submit();
    w.focus();
    //window.open("/common/player.do?encUrl="+encUrl+"&title="+title,"playerPopup","width=820,height=650");
}

/**
 * 플레이어(샘플)
 * @param pdtInfoSeq
 * @param encUrl
 * @param title
 * @param type : OT, Sample
 */
function gfn_playerSample(pdtInfoSeq, encUrl, title, type) {
    var f = document.PlayForm;
    var w = window.open("", "playerSamplePopWin", "width=1048,height=562, scrollbars=no");
    f.action = "/common/playerSample.do";
    f.pdtInfoSeq.value = pdtInfoSeq;
    f.encUrl.value = encUrl;
    f.title.value = title;
    f.type.value = type;
    f.method = "post";
    f.target = "playerSamplePopWin";
    f.submit();
    w.focus();
}

/**
 * 플레이어(학습)
 * @param pdtInfoSeq
 * @param mSeq
 * @param oSeq
 * @param encUrl
 * @param saveYn
 * @param title
 */
function gfn_playerStudy(pdtInfoSeq, mSeq, oSeq, encUrl, saveYn, lectureUrlSeq) {
    var params = "?pdtInfoSeq=" + pdtInfoSeq + "&encUrl=" + encUrl + "&mSeq=" + mSeq + "&oSeq=" + oSeq + "&saveYn=" + saveYn + "&actionUrl=/common/playerStudy.do&lectureUrlSeq=" + lectureUrlSeq;
    var w = window.open("/common/playerBridge.do" + params, "playerStudyPopWin", "width=1048,height=562, scrollbars=no");
    w.focus();
}

function gfn_playerMaxStudy(pdtInfoSeq, mSeq, oSeq, encUrl, saveYn, lectureUrlSeq) {
    var params = "?pdtInfoSeq=" + pdtInfoSeq + "&encUrl=" + encUrl + "&mSeq=" + mSeq + "&oSeq=" + oSeq + "&saveYn=" + saveYn + "&actionUrl=/common/playerMaxStudy.do&lectureUrlSeq=" + lectureUrlSeq;
    var w = window.open("/common/playerBridge.do" + params, "playerStudyPopWin", "width=1048,height=562, scrollbars=no");
    w.focus();
}

function gfn_playerJuniorStudy(pdtInfoSeq, mSeq, oSeq, encUrl, saveYn, lectureUrlSeq, category) {
    var params = "?pdtInfoSeq=" + pdtInfoSeq + "&encUrl=" + encUrl + "&mSeq=" + mSeq + "&oSeq=" + oSeq + "&saveYn=" + saveYn + "&actionUrl=/common/playerJuniorStudy.do&lectureUrlSeq=" + lectureUrlSeq + "&category="+category;
    var w = window.open("/common/playerBridge.do" + params, "playerStudyPopWin", "width=1048,height=562, scrollbars=no");
    w.focus();
}

function gfn_playerMaxStudy(pdtInfoSeq, oSeq, mSeq) {
    var params = "?pdtInfoSeq=" + pdtInfoSeq + "&mSeq=" + mSeq + "&oSeq=" + oSeq + "&actionUrl=/common/playerMaxStudy.do";
    var w = window.open("/common/playerBridge.do" + params, "playerStudyPopWin", "width=1048,height=562, scrollbars=no");
    w.focus();
}

function gfn_playerMaxSample(pdtInfoSeq, mSeq, oSeq, encUrl, saveYn, lectureUrlSeq) {
    var params = "?pdtInfoSeq=" + pdtInfoSeq + "&encUrl=" + encUrl + "&mSeq=" + mSeq + "&oSeq=" + oSeq + "&saveYn=" + saveYn + "&actionUrl=/common/playerMaxSample.do&lectureUrlSeq=" + lectureUrlSeq;
    var w = window.open("/common/playerBridge.do" + params, "playerStudyPopWin", "width=1048,height=562, scrollbars=no");
    w.focus();
}

function gfn_playerRealListeningStudy(pdtInfoSeq, oSeq, mSeq, order) {
    var params = "?pdtInfoSeq=" + pdtInfoSeq + "&mSeq=" + mSeq + "&oSeq=" + oSeq + "&order="+ order +"&actionUrl=/common/playerRealListeningStudy.do";
    var w = window.open("/common/playerBridge.do" + params, "playerStudyPopWin", "width=1048,height=634, scrollbars=no");
    w.focus();
}


/**playerBridge.do
 * 플레이어(학습)
 * @param pdtInfoSeq
 * @param mSeq
 * @param oSeq
 * @param encUrl
 * @param saveYn
 * @param title
 */
function gfn_playerStudyConfirm(pdtInfoSeq, mSeq, oSeq, encUrl, saveYn, title) {
    if (confirm("권장학습기간 전에 수강을 시작하시면 출석인정이 되지 않습니다.\n수강하시겠습니까?")) {
        var f = document.PlayForm;
        var w = window.open("", "playerStudyPopWin", "width=1048,height=562, scrollbars=no");
        f.action = "/common/playerStudy.do";
        f.pdtInfoSeq.value = pdtInfoSeq;
        f.encUrl.value = encUrl;
        f.title.value = title;
        f.mSeq.value = mSeq;
        f.oSeq.value = oSeq;
        f.saveYn.value = saveYn;
        f.method = "post";
        f.target = "playerStudyPopWin";
        f.submit();
        w.focus();
    }
}

function formatNum(result) {
    return formatnumber(result, 3);
}

function formatnumber(v1, v2) {
    var str = new Array();
    v1 = String(v1);
    for (var i = 1; i <= v1.length; i++) {
        if (i % v2) str[v1.length - i] = v1.charAt(v1.length - i);
        else str[v1.length - i] = ',' + v1.charAt(v1.length - i);
    }
    return str.join('').replace(/^,/, '');
}

/**
 * 날짜 빼기 날짜
 * @param startDate
 * @param endDate
 * @returns {Number}
 */
function datediff(startDate, endDate) {
    var sYear = startDate.substring(0, 4);
    var sMonth = startDate.substring(4, 6);
    var sDay = startDate.substring(6, 8);

    var eYear = endDate.substring(0, 4);
    var eMonth = endDate.substring(4, 6);
    var eDay = endDate.substring(6, 8);

    var sDate = new Date(sYear, parseInt(sMonth)-1, sDay);
    var eDate = new Date(eYear, parseInt(eMonth)-1, eDay);

    return (eDate - sDate) / (1000 * 60 * 60 * 24);
}

function addDate(pInterval, pAddVal, pYyyymmdd, pDelimiter) {
    var yyyy;
    var mm;
    var dd;
    var cDate;
    var oDate;
    var cYear, cMonth, cDay;

    if (pDelimiter != "") {
        pYyyymmdd = pYyyymmdd.replace(eval("/\\" + pDelimiter + "/g"), "");
    }

    yyyy = pYyyymmdd.substr(0, 4);
    mm = pYyyymmdd.substr(4, 2);
    dd = pYyyymmdd.substr(6, 2);

    if (pInterval == "yyyy") {
        yyyy = (yyyy * 1) + (pAddVal * 1);
    } else if (pInterval == "m") {
        mm = (mm * 1) + (pAddVal * 1);
    } else if (pInterval == "d") {
        dd = (dd * 1) + (pAddVal * 1);
    }

    cDate = new Date(yyyy, mm - 1, dd) // 12월, 31일을 초과하는 입력값에 대해 자동으로 계산된 날짜가 만들어짐.
    cYear = cDate.getFullYear();
    cMonth = cDate.getMonth() + 1;
    cDay = cDate.getDate();

    cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
    cDay = cDay < 10 ? "0" + cDay : cDay;

    if (pDelimiter != "") {
        return cYear + pDelimiter + cMonth + pDelimiter + cDay;
    } else {
        return cYear + cMonth + cDay;
    }

}

/*
 * 야나두 회원 로그인
 */
function gfn_loginSubmit() {
    document.gLoginForm.submit();
}

/**
 * 우편번호찾기 팝업
 * @param name_zip1
 * @param name_zip2
 * @param name_addr1
 * @param name_addr2
 * @param frmname
 */
function gfn_zipcodePopup(name_zip1, name_zip2, name_addr1, name_addr2, frmname) {
    var openUrl = "/common/getZipcodePopup.do?name_zip1=" + name_zip1 + "&name_zip2=" + name_zip2 + "&name_addr1=" + name_addr1 + "&name_addr2=" + name_addr2 + "&name_form=" + frmname;
    var newwin = window.open(openUrl, "popzip", "left=200,top=200,width=750,height=550");
    newwin.focus();
}

/**
 * 우편번호찾기 팝업
 * @param name_zip1
 * @param name_zip2
 * @param name_addr1
 * @param name_addr2
 * @param frmname
 */
function gfn_zipcodePopupNe(name_domain, name_zip1, name_addr1, name_addr2, name_form) {
    var openUrl = "http://post.neungyule.com?name_domain=" + name_domain + "&name_zip1=" + name_zip1 + "&name_addr1=" + name_addr1 + "&name_addr2=" + name_addr2 + "&name_form=" + name_form;
    var newwin = window.open(openUrl, "popzip", "left=200,top=200,width=750,height=550");
    newwin.focus();
}

/**
 * 우편번호찾기 팝업
 * @param name_zip1
 * @param name_zip2
 * @param name_addr1
 * @param name_addr2
 * @param frmname
 */
function gfn_zipcodePopupTc(name_zipcode, name_addr1, name_addr2, name_form) {
    var openUrl = "/common/getZipcodePopup.do?name_zipcode=" + name_zipcode + "&name_addr1=" + name_addr1 + "&name_addr2=" + name_addr2 + "&name_form=" + name_form;
    var newwin = window.open(openUrl, "popzip", "left=200,top=200,width=750,height=550");
    newwin.focus();
}

/*************************************************************
 *    DYNIFS - Dynamic IFrame Auto Size v1.0.0
 *
 *    Copyright (C) 2006, Markus (phpMiX)
 *    This script is released under GPL License.
 *    Feel free to use this script (or part of it) wherever you need
 *    it ...but please, give credit to original author. Thank you. :-)
 *    We will also appreciate any links you could give us.
 *    http://www.phpmix.org
 *
 *    Enjoy! ;-)
 *************************************************************/

var DYNIFS = {
    // Storage for known IFrames.
    iframes: {},
    // Here we save any previously installed onresize handler.
    oldresize: null,
    // Flag that tell us if we have already installed our onresize handler.
    ready: false,
    // The document dimensions last time onresize was executed.
    dim: [-1, -1],
    // Timer ID used to defer the actual resize action.
    timerID: 0,
    // Obtain the dimensions (width,height) of the given document.
    getDim: function (d) {
        var w = 200, h = 200, scr_h, off_h;
        if (d.height) {
            return [d.width, d.height];
        }
        with (d.body) {
            if (scrollHeight) {
                h = scr_h = scrollHeight;
                w = scrollWidth;
            }
            if (offsetHeight) {
                h = off_h = offsetHeight;
                w = offsetWidth;
            }
            if (scr_h && off_h) h = Math.max(scr_h, off_h);
        }
        return [w, h];
    },
    // This is our window.onresize handler.
    onresize: function () {
        // Invoke any previously installed onresize handler.
        if (typeof this.oldresize == 'function') {
            this.oldresize();
        }
        // Check if the document dimensions really changed.
        var dim = this.getDim(document);
        if (this.dim[0] == dim[0] && this.dim[1] == dim[1]) return;
        // Defer the resize action to prevent endless loop in quirksmode.
        if (this.timerID) return;
        this.timerID = setTimeout('DYNIFS.deferred_resize();', 10);
    },
    // This is where the actual IFrame resize is invoked.
    deferred_resize: function () {
        // Walk the list of known IFrames to see if they need to be resized.
        for (var id in this.iframes) this.resize(id);
        // Store resulting document dimensions.
        this.dim = this.getDim(document);
        // Clear the timer flag.
        this.timerID = 0;
    },
    // This is invoked when the IFrame is loaded or when the main window is resized.
    resize: function (id) {
        // Browser compatibility check.
        if (!window.frames || !window.frames[id] || !document.getElementById || !document.body)
            return;
        // Get references to the IFrame window and layer.
        var iframe = window.frames[id];
        var div = document.getElementById(id);
        if (!div) return;
        // Save the IFrame id for later use in our onresize handler.
        if (!this.iframes[id]) {
            this.iframes[id] = true;
        }
        // Should we inject our onresize event handler?
        if (!this.ready) {
            this.ready = true;
            this.oldresize = window.onresize;
            window.onresize = new Function('DYNIFS.onresize();');
        }
        // This appears to be necessary in MSIE to compute the height
        // when the IFrame'd document is in quirksmode.
        // OTOH, it doesn't seem to break anything in standards mode, so...
        if (document.all) div.style.height = '0px';
        // Resize the IFrame container.
        var dim = this.getDim(iframe.document);
        div.style.height = (dim[1] + 20) + 'px';
    }
};


/**
 * 페밀리 사이트 이동
 */
function gfn_ssoURL() {
    if (document.getElementById('familysiteUrl').selectedIndex != 0) {
        var ssowin = window.open('https://members.neungyule.com/pages/t_member/bridge.asp?PURL=' + document.all.familysiteUrl[document.all.familysiteUrl.selectedIndex].value);
        ssowin.focus();
    }
}

/**
 * 로그인 체크
 */
function gfn_loginChk(f) {
    var f = document.loginForm;

    if (f.userId.value == "") {
        alert("아이디를 입력하세요.");
        f.userId.focus();
        return false;
    }

    if (f.passwd.value == "") {
        alert("비밀번호를 입력하세요.");
        f.passwd.focus();
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/member/loginCheck.do",
        data: $("[name=loginFrm]").serialize(),
        success: function(data){
            if(data.result > 0) {
                f.submit();
            } else {
                f.userId.value = '';
                f.passwd.value = '';
                alert("로그인에 실패하셨습니다.\r아이디, 비밀번호를 다시 확인해 주세요.");
                f.userId.focus();
            }
        }
    });

}

/**
 * 수강각오 팝업호출
 */
function popDetermination() {
    var popDetermination = window.open('/common/determinationPopup.do', 'determination', 'width=613,height=650, scrollbars=1');
    popDetermination.focus();
}


function getBrowserInfo() {

    var msie = /(msie) ([\d]{1,})./gi.exec(window.navigator.userAgent.split(';'));
    var firefox = /(firefox)\/([\d]{1,})./gi.exec(window.navigator.userAgent.split(' ')[6]);
    var safari = /(safari)\/([\d]{1,})./gi.exec(window.navigator.userAgent.split(' ')[9]);
    var chrome = /(chrome)\/([\d]{1,})./gi.exec(window.navigator.userAgent.split(' ')[8]);

    var name = '';
    var version = 0;

    if (msie) {
        name = msie[1].toLowerCase();
        version = msie[2];
    }
    else if (firefox) {
        name = firefox[1].toLowerCase();
        version = firefox[2];
    }
    else if (safari && !chrome) {
        name = safari[1].toLowerCase();
        version = /(version)\/([\d]{1,})./gi.exec(window.navigator.userAgent.split(' ')[8])[2];
    }
    else if (safari && chrome) {
        name = chrome[1].toLowerCase();
        version = chrome[2];
    }

    return {
        name: name,
        version: version
    }
}

/* 퍼블리싱 공통 스크립트 시작 */
//레이어 팝업
function offLayer(tempTyp) {
    var obj = document.getElementById('layer_' + tempTyp);
    if (obj.style.display == 'block')
        obj.style.display = 'none';
}

function viewLayer(tempTyp) {
    var obj = document.getElementById('layer_' + tempTyp);
    if (obj.style.display == 'none')
        obj.style.display = 'block';
}
/* 퍼블리싱 공통 스크립트 끝 */


/**
 * 이니시스 현금영수증, 카드전표, 구매영수증 보기
 */
function gfn_resultView(tid) {
    var receiptUrl = "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=" + tid + "&noMethod=1";
    window.open(receiptUrl, "receipt", "width=430,height=700, scrollbars=yes,resizable=yes,left=100,top=100");
}

/**
 * 인크로스 트래킹 로드
 * @param filename
 */
function loadJsFile(filename) {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);

    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

/**
 * 한줄응원글쓰기 팝업
 */
function popCheer() {
    var popDetermination = window.open('/common/cheerPopup.do', 'determination', 'width=630,height=451, scrollbars=1');
    popDetermination.focus();
}

/**
 * 한줄응원 목록 팝업호출
 */
function popCheerList() {
    var popCheerList = window.open('/common/cheerListPopup.do', 'determination', 'width=613,height=650, scrollbars=1');
    popCheerList.focus();
}


/**
 * 배너관리 팝업사이즈 입력시 호출
 */
function gfn_popBanner(url, popupName, width, height) {
    var popCheerList = window.open(url, popupName, "width=" + width + ",height=" + height + ", scrollbars=1");
    popCheerList.focus();
}

/**
 * 구매교재 등록
 */
function gfn_popBookIsdn(url) {
    var popBookIsdn = window.open(url, 'bookIsdn', 'width=613,height=260, scrollbars=1');
    popBookIsdn.focus();
}


//var idRegExp = /^[a-z0-9_]{6,12}$/; // 아이디 정규식 체크
var idRegExp = /^[a-z0-9]{6,12}$/; // 아이디 정규식 체크
var pwdRegExp = /^.*(?=^.{6,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=\*()\-_?~]).*$/; // 비밀번호 정규식 체크
var pwdSPExp = /^.*(?=.*[\'\",./`<>\\]).*$/;  // 비밀번호 정규식 체크


function clickIdSaveBtn(o) {
    if ($(o).is(':checked')) {
        o.value = 1;
    } else {
        o.value = 0;
    }
}

function sizeReload(frmId, class_name) {
    fv_width1 = $('.' + class_name).prop('scrollHeight');
    fv_width2 = $('.' + class_name).prop('offsetHeight');
    if (fv_width1 >= fv_width2) {
        parent.$('#' + frmId).css('height', fv_width1);
    } else {
        parent.$('#' + frmId).css('height', fv_width2);
    }
}

function fn_fileDownLoad(filePath) {
    if (filePath == '') {
        alert('해당파일이 없습니다.');
    } else {
        var f = document.fileForm;
        f.filePath.value = filePath;
        f.submit();
    }
}

function movieOpenMaxSample(number) {
    var w = 1044;//640
    var h = 562;//528
    if (!number) number = 1;
    window.open('/kollus/mplayer_max_sample.php?number=' + number, 'lecMove', "width=" + w + ",height=" + h + ",scrollbars=no,resizable=yes,copyhistory=no");
}

// 한글만 허용
function fn_CheckHangul(name) {
    strarr = new Array(name.length);
    schar = new Array('/', '.', '>', '<', ',', '?', '}', '{', ' ', '\\', '|', '(', ')', '+', '=');
    for (i = 0; i < name.length; i++) {
        for (j = 0; j < schar.length; j++) {
            if (schar[j] == name.charAt(i)) {
                alert("이름은 한글로 입력하십시오.");
                return false;
            }
            else
                continue;
        }
        strarr[i] = name.charAt(i)
        if ((strarr[i] >= 0) && (strarr[i] <= 9)) {
            alert("이름에 숫자가 있습니다. 이름은 한글로 입력하십시오.");
            return false;
        }
        else if ((strarr[i] >= 'a') && (strarr[i] <= 'z')) {
            alert("이름에 알파벳이 있습니다. 이름은 한글로 입력하십시오.");
            return false;
        }
        else if ((strarr[i] >= 'A') && (strarr[i] <= 'Z')) {
            alert("이름에 알파벳이 있습니다. 이름은 한글로 입력하십시오.");
            return false;
        }
        else if ((escape(strarr[i]) > '%60') && (escape(strarr[i]) < '%80')) {
            alert("이름에 특수문자가 있습니다. 이름은 한글로 입력하십시오.");
            return false;
        }
        else {
            continue;
        }
    }
    return true;
}

/**
 * 중복서브밋 방지
 * 사용법 : submit 전 if(gfn_doubleSubmitCheck()) return; 호출
 * 
 * @returns {Boolean}
 */
var gfn_doubleSubmitFlag = false;
function gfn_doubleSubmitCheck(){
    if(gfn_doubleSubmitFlag){
        return gfn_doubleSubmitFlag;
    }else{
        gfn_doubleSubmitFlag = true;
        return false;
    }
}

var YND_HOST = "yanadoo.co.kr";
function setHttps(url) {
    var HOSTNAME = window.location.hostname;

    if(url.startsWith("/")) {
        return "https://" + (HOSTNAME == YND_HOST ? "m." : "") + HOSTNAME + url;
    } else if(url.startsWith("localhost")) {
        url = "http://" + url;
    } else if(!url.startsWith("http") && url.indexOf(YND_HOST) > -1) {
        url = "https://" + url;
    }

    var re = new RegExp("(https?\:\/\/)([^\/\:]*)(\:\\d+)?(.*)");
    var matches = url.match(re);
    var host = matches[2] || "";
    var port = matches[3] || ":80";
    return (port == ":80" && host != "localhost" ? "https://" : "http://")
        + (host == YND_HOST ? "m." : "") + host
        + (port == ":80" ? "" : (matches[3] || ""))
        + (matches[4] || "");
}

