<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Event extends CI_Controller
{
    public function index()
    {
        $this->load->view("web/v1_0/event-list");
    }

    public function detail($idx)
    {
        $data['idx'] = $idx;
        $this->load->view("web/v1_0/event-detail", $data);
    }
}