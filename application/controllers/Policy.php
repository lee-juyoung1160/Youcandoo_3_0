<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class policy extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function website($FileName="privacy",$Version="latest"){
        $Data['type']="website";
        $this->load->layout("policy/".$FileName."_".$Version,$Data);
    }

    public function app($FileName="privacy",$Version="latest")
    {
        $Data['type']="app";
        $this->load->webview("policy/".$FileName."_".$Version,$Data);
    }

}
