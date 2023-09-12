<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class GiftCard extends CI_Controller
{
    
    public function index()
    {
        $this->load->view("web/v1_0/gift-card");
    }
}