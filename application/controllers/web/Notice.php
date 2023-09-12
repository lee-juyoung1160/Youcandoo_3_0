<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Notice extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function lists()
    {
        $RequestBody = file_get_contents("php://input");
        $RequestBodyObject = json_decode($RequestBody);

        $PostData['page'] = $RequestBodyObject-> page;
        $PostData['limit'] = $RequestBodyObject-> limit;
        $PostData['offset'] = $PostData['limit'] * ($PostData['page']-1);

        $this->load->model("web/notice_model");
        $Result['size'] = $this->notice_model->getNoticeListCount();
        $Result['data'] = $this->notice_model->getNoticeList($PostData);

        foreach ($Result['data'] as $Row)
        {
            $Row->created_datetime = date("Y-m-d",strtotime($Row->created_datetime));
        }

        echo json_encode($Result);
    }

    public function detail()
    {
        $RequestBody = file_get_contents("php://input");
        $RequestBodyObject = json_decode($RequestBody);

        if(!isset($RequestBodyObject-> idx))
        {
            return;
        }
        $this->load->model("web/notice_model");
        $Result = $this->notice_model->getNotice($RequestBodyObject->idx);
        $AllList = $this->notice_model->getNoticeAllList();
        $NoticeList = array();
        foreach ($AllList as $idx => $Row)
        {
            if(isset($AllList[$idx-1]))
            {
                $NoticeList[$Row->idx]["prev_idx"] = $AllList[$idx-1]->idx;
                $NoticeList[$Row->idx]["prev_title"] = $AllList[$idx-1]->title;
            }
            else
            {
                $NoticeList[$Row->idx]["prev_idx"] = 0;
                $NoticeList[$Row->idx]["prev_title"] = "";
            }
            if(isset($AllList[$idx+1]))
            {
                $NoticeList[$Row->idx]["next_idx"] = $AllList[$idx+1]->idx;
                $NoticeList[$Row->idx]["next_title"] = $AllList[$idx+1]->title;
            }
            else
            {
                $NoticeList[$Row->idx]["next_idx"] = 0;
                $NoticeList[$Row->idx]["next_title"] = "";
            }
        }

//        $NoticeList = $this->notice_model->getNoticeAllList();
        $Result->prev_idx = $NoticeList[$Result->idx]["prev_idx"];
        $Result->prev_title = $NoticeList[$Result->idx]["prev_title"];
        $Result->next_idx = $NoticeList[$Result->idx]["next_idx"];
        $Result->next_title = $NoticeList[$Result->idx]["next_title"];
        $Result->created_datetime = date("Y-m-d",strtotime($Result->created_datetime));
        echo json_encode($Result);
    }
}