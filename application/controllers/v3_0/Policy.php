<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class policy extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function web_privacy($Version="latest")
    {
        $Data['type']="web";
        $this->load->v3_web("v3/policy/privacy_".$Version ,$Data);
    }

    public function web_terms($Version="latest")
    {
		$Data['type']="web";
		$this->load->v3_web("v3/policy/terms_".$Version ,$Data);
	}

	public function app_privacy($Version="latest")
	{
		$Data['type']="webview";
		$Data['title']="개인정보처리방침";
		$this->load->v3_web("v3/policy/privacy_".$Version ,$Data);
	}

	public function app_terms($Version="latest")
	{
		$Data['type']="webview";
		$Data['title']="이용약관";
		$this->load->v3_web("v3/policy/terms_".$Version ,$Data);
	}

	public function view_privacy($Version="latest")
	{
		$Data['type']="view";
		$this->load->view("v3/layout/view_header" ,$Data);
		$this->load->view("v3/policy/privacy_".$Version ,$Data);
		$this->load->view("v3/layout/view_footer" ,$Data);
	}

	public function view_terms($Version="latest")
	{
		$Data['type']="view";
		$this->load->view("v3/layout/view_header" ,$Data);
		$this->load->view("v3/policy/terms_".$Version ,$Data);
		$this->load->view("v3/layout/view_footer" ,$Data);
	}

}
