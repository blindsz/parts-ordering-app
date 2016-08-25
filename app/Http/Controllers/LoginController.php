<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Auth;
use URL;
use Redirect;

class LoginController extends Controller {
    
    public function index(){
        if(Auth::check()){
            return redirect('orders');
        }
        else{
            return view('login.index');
        }
    }

    public function login(Request $request){

        $userdata = array(
            'username' => $request->input('username'),
            'password' => $request->input('password'),
            'status' => 1
        );

        if (Auth::attempt($userdata)) {
            return Redirect::intended('orders');
        } 
        else {   
            return array('status'=> 0);
        }
    }

    public function logout(Request $request){
        Auth::logout();
        return redirect('/');
    }
}
