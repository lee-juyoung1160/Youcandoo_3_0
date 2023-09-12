<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class View extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    // 공지사항
    public function notice()
    {
        $this->load->view("web/notice-list");
    }
    // 공지사항 상세
    public function notice_detail($idx)
    {
        $data['idx'] = $idx;
        $this->load->view("web/notice-detail", $data);
    }

    // 이벤트
    public function event()
    {
        $this->load->view("web/event-list");
    }
    // 이벤트 상세
    public function event_detail($idx)
    {
        $data['idx'] = $idx;
        $this->load->view("web/event-detail", $data);
    }

    // FAQ
    public function faq()
    {
        $this->load->view("web/faq-list");
    }

    // 1:1 문의
    public function inquiry()
    {
        $this->load->view("web/inquiry-list");
    }

    // 1:1 문의 상세
    public function inquiry_detail($idx)
    {
        $data['idx'] = $idx;
        $this->load->view("web/inquiry-detail", $data);
    }

    // 1:1 문의 생성
    public function inquiry_create()
    {
        $this->load->view("web/inquiry-create");
    }

    // 1:1 문의 수정
    public function inquiry_update()
    {
        $this->load->view("web/inquiry-update");
    }

    // 사업자 정보
    public function company()
    {
        $this->load->view("policy/company-info");
    }

    // 개인정보
    public function privacy()
    {
        $this->load->view("policy/privacy");
    }

    // 이용약관
    public function terms()
    {
        $this->load->view("policy/terms");
    }

    // 상품권 교환
    public function giftcard()
    {
        $this->load->view("web/gift-card");
    }

}