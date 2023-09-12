<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function kakao()
	{
		$RequestBody = file_get_contents("php://input");
		var_dump($RequestBody);
	}

}
