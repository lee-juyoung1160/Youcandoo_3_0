<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Terms extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    // 이용약관
    public function index()
    {
        $this->load->view("web/terms");
    }

}