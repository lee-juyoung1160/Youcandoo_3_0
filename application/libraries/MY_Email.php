<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Email extends CI_Email {

    public function __construct()
    {
        parent::__construct();

    }
    protected function _prep_q_encoding($str, $from = FALSE)
    {
        $str = str_replace(array("\r", "\n"), array('', ''), $str);

        // Line length must not exceed 76 characters, so we adjust for
        // a space, 7 extra characters =??Q??=, and the charset that we will add to each line
        $limit = 75 - 7 - strlen($this->charset);

        // these special characters must be converted too
        $convert = array('_', '=', '?');

        if ($from === TRUE)
        {
            $convert[] = ',';
            $convert[] = ';';
        }

        $output = '';
        $temp = '';

        for ($i = 0, $length = strlen($str); $i < $length; $i++)
        {
            // Grab the next character
            $char = substr($str, $i, 1);
            $ascii = ord($char);

            // convert ALL non-printable ASCII characters and our specials
            if ($ascii < 32 OR $ascii > 126 OR in_array($char, $convert))
            {
                $char = '='.dechex($ascii);
            }

            // handle regular spaces a bit more compactly than =20
            if ($ascii == 32)
            {
                $char = '_';
            }

            // If we're at the character limit, add the line to the output,
            // reset our temp variable, and keep on chuggin'
            if ((strlen($temp) + strlen($char)) >= $limit)
            {
                $output .= $temp."\n";
                $temp = '';
            }

            // Add the character to our temporary line
            $temp .= $char;
        }

        $str = $output.$temp;

        // wrap each line with the shebang, charset, and transfer encoding
        // the preceding space on successive lines is required for header "folding"
        $str = trim(preg_replace('/^(.*)$/m', ' =?'.$this->charset.'?Q?$1?=', $str));

        return str_replace(array("\n"), array("\r\n"), $str);
    }

    function push($to,$subject,$body)
    {
        $CI =& get_instance();
        //아마존
		$config['protocol']    = 'smtp';
		$config['smtp_host']    = 'ssl://email-smtp.ap-northeast-2.amazonaws.com';
		$config['smtp_port']    = '465';
		$config['smtp_user']    = 'AKIAZCAM7GPKTJOPVPEC';
		$config['smtp_pass']    = 'BMfv3V246ScS/n7HgFJPtaMRUlt76Ku+ZXDVHPply3mh';
		$config['charset']    = 'utf-8';
		$config['crlf'] = "\r\n"; // 필수
		$config['newline']    = "\r\n"; // 필수
		$config['mailtype'] = 'html'; // text or html
		$config['validation'] = TRUE; // bool whether to validate email or not

        $CI->email->initialize($config);
        $CI->email->from('no-reply@youcandoo.co.kr', '유캔두');
        $CI->email->to($to);
        $CI->email->subject($subject);
        $CI->email->message($body);

        $CI->email->send();
    }

	function GetHtmlTemplate($FilePath="")
	{
		if($FilePath=="")
		{
			log_message("error", "Filepath is null");
			return false;
		}

		$FileExtension = pathinfo($FilePath, PATHINFO_EXTENSION);
		if($FileExtension != "html")
		{
			log_message("error", "File extension is not 'html'");
			return false;
		}

		$HtmlSource = file_get_contents($FilePath);
		return $HtmlSource;
	}
}
