<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Applink extends CI_Controller {

    function __construct()
    {
        parent::__construct();
    }

    public function index(){
        $this->load->helper('url');
        redirect('https://www.youcandoo.co.kr/', 'location', 301);
    }


}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */