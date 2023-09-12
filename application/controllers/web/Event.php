<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Event extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function lists()
    {
        // {"page": 1, "limit": 6}

        $RequestBody = file_get_contents("php://input");
        $RequestBodyObject = json_decode($RequestBody);

        $PostData['page'] = $RequestBodyObject-> page;
        $PostData['limit'] = $RequestBodyObject-> limit;
        $PostData['offset'] = $PostData['limit'] * ($PostData['page']-1);

        $this->load->model("web/event_model");
        $Result['size'] = $this->event_model->getEventListCount();
        $Result['data'] = $this->event_model->getEventList($PostData);

        $now = date("Y-m-d");
        foreach ($Result['data'] as $Row)
        {
            $startDate = date("Y-m-d",strtotime($Row->start_date));
            $endDate = date("Y-m-d",strtotime($Row->end_date));
            if($now < $startDate){    # 미진행 0
                $Row -> status = 0;
            }
            else{                    # 진행 1, 종료 2
                $Row -> status = ($now > $endDate) ? 2:1;
            }

            $Row-> start_date = date("Y-m-d",strtotime($startDate));
            $Row-> end_date = date("Y-m-d",strtotime($endDate));
        }

        echo json_encode($Result);
    }

    public function detail()
    {
    //        {"idx":1}
        $RequestBody = file_get_contents("php://input");
        $RequestBodyObject = json_decode($RequestBody);

        if(!isset($RequestBodyObject-> idx))
        {
            return;
        }

        $this->load->model("web/event_model");
        $EventIdx = $RequestBodyObject-> idx;
        $EventData = $this->event_model-> getEvenDetail($EventIdx);

        $AllList = $this->event_model->getEventAllList();
        $EventList = array();
        foreach ($AllList as $idx => $Row)
        {
            if(isset($AllList[$idx-1]))
            {
                $EventList[$Row->idx]["prev_idx"] = $AllList[$idx-1]->idx;
                $EventList[$Row->idx]["prev_title"] = $AllList[$idx-1]->title;
            }
            else
            {
                $EventList[$Row->idx]["prev_idx"] = 0;
                $EventList[$Row->idx]["prev_title"] = "";
            }
            if(isset($AllList[$idx+1]))
            {
                $EventList[$Row->idx]["next_idx"] = $AllList[$idx+1]->idx;
                $EventList[$Row->idx]["next_title"] = $AllList[$idx+1]->title;
            }
            else
            {
                $EventList[$Row->idx]["next_idx"] = 0;
                $EventList[$Row->idx]["next_title"] = "";
            }
        }


        $EventData->prev_idx = $EventList[$EventData->idx]["prev_idx"];
        $EventData->prev_title = $EventList[$EventData->idx]["prev_title"];
        $EventData->next_idx = $EventList[$EventData->idx]["next_idx"];
        $EventData->next_title = $EventList[$EventData->idx]["next_title"];

        $EventData->created_datetime = date("Y-m-d", strtotime($EventData->created_datetime));
        $EventData->start_date = date("Y-m-d", strtotime($EventData->start_date));
        $EventData->end_date = date("Y-m-d", strtotime($EventData->end_date));

        $Result['data'] = $EventData;

        echo json_encode($Result);
    }
}