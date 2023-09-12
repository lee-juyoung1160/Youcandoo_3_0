<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Webview extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

	# FAQ
    public function faq()
	{
		$this->load->v3_webview("v3/webview/faq");
	}

	# 1:1문의
	public function inquiry()
	{
		$this->load->v3_webview("v3/webview/inquiry");
	}
	public function inquiry_detail($idx)
	{
		$data['idx'] = $idx;
		$this->load->v3_webview("v3/webview/inquiry_detail", $data);
	}

	# 공지사항
	public function notice()
	{
		$this->load->v3_webview("v3/webview/notice");
	}
	public function notice_detail($idx)
	{
		$data['idx'] = $idx;
		$this->load->v3_webview("v3/webview/notice_detail", $data);
	}

	# 이벤트
	public function event()
	{
		$this->load->v3_webview("v3/webview/event");
	}
	public function event_detail($idx)
	{
		$data['idx'] = $idx;
		$this->load->v3_webview("v3/webview/event_detail", $data);
	}

	# 상품교환
	public function gift()
	{
		$this->load->v3_webview("v3/webview/gift");
	}
	public function gift_complete()
	{
		$this->load->v3_webview("v3/webview/gift_complete");
	}

	# 스토리
	public function story($Story)
	{
		$this->load->v3_webview("v3/webview/story_".$Story);
	}

	# 레벨
	public function level_guide()
	{

		$Header=getallheaders();
		if(isset($Header['User-Agent']) && $Header['User-Agent']=="Amazon CloudFront" || $_SERVER['SERVER_ADDR']=="10.7.102.209" || SERVER == 'local') {
			$this->load->v3_webview("v3/webview/level_guide");
			return;
		}
		header('Location: https://dlgd3wzqheqob.cloudfront.net/webview/v3.0/level_guide?'.$_SERVER['QUERY_STRING']);
		exit;


//		if($_SERVER['SERVER_ADDR']!="10.0.18.200"){
//			header('Location: https://dlgd3wzqheqob.cloudfront.net/webview/v3.0/level_guide?'.$_SERVER['QUERY_STRING']);
//			exit;
//		}
//		$this->load->v3_webview("v3/webview/level_guide");
	}

	# 미션
	public function mission_guide()
	{
		$this->load->v3_webview("v3/webview/mission_guide");
	}

	# 두잇 가이드
	public function doit_guide()
	{
		$this->load->v3_webview("v3/webview/doit_guide");
	}

	# 유캔두 사용 가이드
	public function ycd_guide()
	{
		$this->load->v3_webview("v3/webview/ycd_guide_v2");
	}

	# 오류
	public function error()
	{
		$this->load->v3_webview("v3/webview/error");
	}

	# 친구초대
	public function referral()
	{
		$this->load->v3_webview("v3/webview/referral");
	}

}
