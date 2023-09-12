# 유캔두 홈페이지/웹뷰

## Plugins
[kakao sdk](https://developers.kakao.com/docs/latest/ko/getting-started/sdk-js)

[onelink url generator](https://dev.appsflyer.com/hc/docs/onelinkurlgenerator)

## 주요 폴더 구조 및 설명
```bash
application
├── config
│   └── routes.php : 라우트 설정
├── controllers
│   └── v3_0 : 컨트롤러(페이지 매핑)
├── views
│   └── v3 : 페이지 마크업(html)
│       ├── layout : 홈페이지, 웹뷰 레이아웃 템플릿
│       ├── policy : 개인정보처리, 이용약관
│       ├── web : 홈페이지
│       ├── webview : 웹뷰
│       └── promotion_xxxx.html : 프로모션 브릿지 페이지들
├── assets
│   └── v3
│       └── css : 페이지 스타일(css)
│       └── js : 페이지 기능(js)
│           ├── fade_header.js : 웹뷰 헤더 toggle (e.g. 유캔두 스토리)
│           ├── gift.js : 웹뷰 상품교환
│           ├── inquiryv2.js : 웹뷰 1:1 문의
│           ├── kakao.min.js : Kakao SDK
│           ├── onelink-smart-script.js : onelink url generator
│           ├── web_common.js : 홈페이지 공통
│           ├── web_main.js : 홈페이지 메인
│           ├── web_policy.js : 홈페이지/웹뷰 이용약관, 개인정보처리
│           └── webview-utils.js : 웹뷰 공통 유틸
├── custom_event : 참여이벤트
└── test : 테스트용 페이지들
```
