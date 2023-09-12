<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Company extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }


    // 사업자 정보
    public function index()
    {
        $this->load->view("web/company-info");
    }



}