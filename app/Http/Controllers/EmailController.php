<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Mail;

class EmailController extends Controller {
    
	public function index(){
		return view('email.index');
	}

    public function send_email_post(Request $request){

    	$email_data = array(
			"orderedItems" => $request->input('orderedItems'),
			"orderInfos" => $request->input('orderInfos')
		);

    	$email_settings = $request->input('emailSettings');

    	Mail::send("email.index", $email_data, function ($message)

    		use ($email_settings) {

            $message->to($email_settings[0]['email'], $email_settings[0]['name'])
            		->subject('You have a new order!');
        });
    }
}

