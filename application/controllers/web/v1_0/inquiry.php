<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Inquiry extends CI_Controller
{

    public function index()
    {
        $this->load->view("web/v1_0/inquiry-list");
    }
    public function create()
    {
        $this->load->view("web/v1_0/inquiry-create");
    }
    public function detail()
    {
        $this->load->view("web/v1_0/inquiry-detail");
    }
    public function update()
    {
        $this->load->view("web/v1_0/inquiry-detail");
    }
}