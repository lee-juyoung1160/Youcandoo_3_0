<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Notice extends CI_Controller
{
    
    public function index()
    {
        $this->load->view("web/v1_0/notice-list");
    }
    public function detail($idx)
    {
        $data['idx'] = $idx;
        $this->load->view("web/v1_0/notice-detail", $data);
    }
}