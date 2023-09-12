<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Faq extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("web/faq_model");
    }

    public function lists()
    {
//        {"title": "", "type":""}
        $RequestBody = file_get_contents("php://input");
        $RequestBodyObject = json_decode($RequestBody);

        $PostData['title'] = $RequestBodyObject-> title;
        $PostData['type'] = $RequestBodyObject-> type;
        $this->load->model("web/faq_model");
        $Result['size'] = $this->faq_model->getFaqListCount();
        $Result['data'] = $this->faq_model->getFaqList($PostData);

        echo json_encode($Result);
    }

    public function faqTypeCount()
    {
//        {"title": "", "type":""}
        $RequestBody = file_get_contents("php://input");
        $RequestBodyObject = json_decode($RequestBody);
        $this->load->model("web/faq_model");
        $Result = $this->faq_model->getFaqTypeCount();
        echo json_encode($Result);
    }

}