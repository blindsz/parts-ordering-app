<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Mail;

class EmailController extends Controller {

	public function index(){

	}

    public function send_email_post(){

    	Mail::send("email.index", ['name'=>'Novica'], function ($message) {

            $message->to('jaredjan0803@gmail.com', 'gwapo jared')->from('otheremail@some.com')->subject('hello world');

        });
    }
}
