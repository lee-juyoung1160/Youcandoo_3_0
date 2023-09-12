<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class D extends CI_Controller {

    private function b64uuid_to_uuid( $b64uuid ) {
        $b64uuid = str_replace('-','+',$b64uuid);
        $b64uuid = str_replace('_','/',$b64uuid);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split( bin2hex( base64_decode( $b64uuid.'==' ) ) , 4));
    }

    public function AppleTest(){
//        $B32UUID="12345";
//        echo $this->base36_encode($B32UUID);
        $this->load->view("detect_app_install");
//        redirect("youcandoo1496745851://urllink?pageType=doit_detail&pageValue=DOIT-123123123123123");
    }

	public function get($B32UUID)
	{
//        echo "DID-".$this->base36_decode($B64UUID);

        echo $this->base36_decode($B32UUID);
	}


	public function test(){

//        echo base64_encode(1123412312);

        echo $this->base36_encode("54321")."\n";

//        echo $this->base36_decode("79");

//        echo $this->base62encode("1123412312");
    }

    private function base36_encode($base10){
        return base_convert($base10,10,36);
    }

    private function base36_decode($base36){
        return base_convert($base36,36,10);
    }

    private function base62encode($data) {
        $outstring = '';
        $l = strlen($data);
        for ($i = 0; $i < $l; $i += 8) {
            $chunk = substr($data, $i, 8);
            $outlen = ceil((strlen($chunk) * 8)/6); //8bit/char in, 6bits/char out, round up
            $x = bin2hex($chunk);  //gmp won't convert from binary, so go via hex
            $w = gmp_strval(gmp_init(ltrim($x, '0'), 16), 62); //gmp doesn't like leading 0s
            $pad = str_pad($w, $outlen, '0', STR_PAD_LEFT);
            $outstring .= $pad;
        }
        return $outstring;
    }

    private function base62decode($data) {
        $outstring = '';
        $l = strlen($data);
        for ($i = 0; $i < $l; $i += 11) {
            $chunk = substr($data, $i, 11);
            $outlen = floor((strlen($chunk) * 6)/8); //6bit/char in, 8bits/char out, round down
            $y = gmp_strval(gmp_init(ltrim($chunk, '0'), 62), 16); //gmp doesn't like leading 0s
            $pad = str_pad($y, $outlen * 2, '0', STR_PAD_LEFT); //double output length as as we're going via hex (4bits/char)
            $outstring .= pack('H*', $pad); //same as hex2bin
        }
        return $outstring;
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
