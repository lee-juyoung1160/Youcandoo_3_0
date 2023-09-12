<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

    // 메인
//	public function index() {
//	    $this->load->layout('main');
//	}
	public function index() {
		$this->load->helper('url');
		redirect('/web/v3.0/main');
	}
	// 이용약관
    public function terms() {
        $this->load->layout("terms");
    }
    // 개인정보처리방침
    public function privacy() {
        $this->load->layout("privacy");
    }

    // 공지사항
    public function notice() {
        $this->load->layout("notice");
    }
    // 공지사항 상세페이지
    public function noticeDetail($Index) {
        $data['index'] = $Index;
        $this->load->layout("notice-detail", $data);
    }

    // 고객센터
    public function faq() {
        $this->load->layout("faq");
    }
    // 이벤트 프로모션
    public function EventPromotion() {
        $this->load->layout("event_promotion");
    }

    // 이벤트
    public function event() {
        $this->load->layout("event");
    }
    // 이벤트 상세페이지
    public function eventDetail($Index) {
        $data['index'] = $Index;
        $this->load->layout("event-detail", $data);
    }
    // 프로모션 가이드
    public function guidePromotion() {
        $this->load->layout("guide-pro");
    }
    // 유캔두 사용 가이드 : 두잇참여하기
    public function guideDoit() {
        $this->load->layout("guide-doit");
    }
    // 유캔두 사용 가이드 : 두잇만들기
     public function guideDoitCreate() {
        $this->load->layout("guide-doit-create");
     }
     // 유캔두 사용 가이드 : ucd 사용
  	public function guideUcd() {
		$this->load->layout("guide-ucd");
  	}
  	// 유캔두 사용 가이드 : 스폰서 프로모션 가이드
  	public function guideSponsorPro() {
		$this->load->layout("guide-sponsor-pro");
  	}
	// 프로모션 진행
	public function promotion($Route = "") {
		$this->load->view("promotion_".$Route);
	}

    /**
     * WebView Controller법
     */
    public function error()
    {
		if(strpos($_SERVER['REQUEST_URI'],"webview")!==false){
			$this->load->helper('url');
			redirect('/webview/v3.0/error');
		}
        $this->load->layout("error");
    }

    ## MyPage
    public function mypage()
    {
        $this->load->webview("web/mypage-list");
    }

    ## Event
    public function web_event()
    {
        $this->load->webview("web/event-list-v2");
    }
    public function web_event_detail($idx)
    {
        $data['idx'] = $idx;
        $this->load->webview("web/event-detail-v2", $data);
    }

    ## FAQ
    public function web_faq()
    {
        $this->load->webview("web/faq-list");
    }

    ## Notice
    public function web_notice()
    {
        $this->load->webview("web/notice-list-v2");
    }
    public function web_notice_detail($idx)
    {
        $data['idx'] = $idx;
        $this->load->webview("web/notice-detail-v2", $data);
    }

    ## Gift Exchange
    public function web_giftexchange()
    {

		if(strtotime("2021-07-19 23:59:59") < time()){
			if(ENVIRONMENT=="production"){
				$this->load->helper('url');
				redirect('https://youcandoo.s3.ap-northeast-2.amazonaws.com/close/gift_close.html', 'refresh');
			}
		}
        $this->load->webview("web/gift-exchange-v2");
    }

    ## Company Info
    public function web_company()
    {
        $this->load->webview("web/company-info");
    }

    ## 1:1 문의
	public function web_inquiry()
    {
        $this->load->webview("web/inquiry");
    }
	public function web_inquiry_detail($idx)
    {
        $data['idx'] = $idx;
        $this->load->webview("web/inquiry-detail", $data);
    }

    #Temp
	public function send_mail()
	{
		$this->load->library('email');

		$Data = array();
		$HtmlSource = $this->load->view("v3/web/email",$Data, true);
		$to = "kathy@yanadoocorp.com";
		$subject = "유효기간 만료에 따른 소멸예정 UCD를 안내해드립니다.";
		$body = $HtmlSource;
		$this->email->push($to,$subject,$body);
		echo $this->email->print_debugger();
	}

	#Temp
	public function send_mail_extinction()
	{
		$this->load->library('email');

		$Data = array();
		$HtmlSource = $this->load->view("v3/web/email_extinction",$Data, true);
		$to = array("kathy@yanadoocorp.com","david@yanadoocorp.com");
		$subject = "유효기간 만료에 따른 소멸예정 UCD를 안내해드립니다.";
		$body = $HtmlSource;
		$this->email->push($to,$subject,$body);
		echo $this->email->print_debugger();
	} 

	#Temp
	public function send_mail_history()
	{
		$this->load->library('email');

		$Data = array();
		$HtmlSource = $this->load->view("v3/web/email_history",$Data, true);
		$to = array("kathy@yanadoocorp.com");
		$subject = "야나두 개인정보 이용내역 통지 안내";
		$body = $HtmlSource;
		$this->email->push2($to,$subject,$body);
		echo $this->email->print_debugger();
	}

}
