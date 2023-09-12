<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class policy extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    // 개인정보
    public function index()
    {
        $this->load->view("web/privacy");
    }


}