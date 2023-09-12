<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Loader extends CI_Loader {

	public function view($view, $vars = array(), $return = FALSE) {
		if (method_exists($this, '_ci_object_to_array'))
		{
			$Arr = $this->_ci_object_to_array($vars);
			$CI =& get_instance();
			$Arr['resource_version'] = $CI->config->item('resource_version');
			return $this->_ci_load(array('_ci_view' => $view.'.html', '_ci_vars' => $this->_ci_object_to_array($Arr), '_ci_return' => $return));
		} else {
			$Arr = $this->_ci_prepare_view_vars($vars);
			$CI =& get_instance();
			$Arr['resource_version'] = $CI->config->item('resource_version');
			return $this->_ci_load(array('_ci_view' => $view.'.html', '_ci_vars' => $this->_ci_prepare_view_vars($Arr), '_ci_return' => $return));
		}
	}

    public function layout($template_name, $vars = array())
    {
        $this->view('layout/header',$vars);
        $this->view($template_name,$vars);
        $this->view('layout/footer',$vars);
    }

    public function webview($template_name, $vars = array())
    {
        $this->view('layout/app_header',$vars);
        $this->view($template_name,$vars);
        $this->view('layout/app_footer',$vars);
    }

	// v3.0 Homepage
	public function v3_web($template_name, $vars = array())
	{
		if(!isset($vars['title'])) 
			$vars['title']= "유캔두";
		$this->view("v3/layout/web_header",$vars);
		$this->view($template_name,$vars);
		$this->view("v3/layout/web_footer",$vars);
	}

    // v3.0 Webview
	public function v3_webview($template_name, $vars = array())
	{
		$this->view("v3/layout/app_header",$vars);
		$this->view($template_name,$vars);
		$this->view("v3/layout/app_footer",$vars);
	}
}
