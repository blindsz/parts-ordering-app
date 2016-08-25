<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;
use App\User;
use Hash;

class UsersController extends Controller {
    
	public function index(){
    	if(Auth::check()){
            return view('users.index');
        }
        else{
            return redirect('/');
        }
    }

    public function users_get(){
    	return User::all();
    }

    public function user_get(Request $request, $id){
        return User::find($id);
    }

    public function user_post(Request $request){
        $time_stamp = array(
            "created_at"=> date("Y-m-d H:i:s"), 
            "updated_at" => date("Y-m-d H:i:s")
        );

        $data = $request->input('newData');
        $data = array_merge($data, $time_stamp);
        $data['password'] = Hash::make($data['password']);

        return User::add($data);
    }

    public function user_put(Request $request, $id){
        $time_stamp = array(
            "updated_at" => date("Y-m-d H:i:s")
        );
        $data = $request->input('updatedData');
        $data = array_merge($data, $time_stamp);
        
        User::where('id', $id)->update($data);

        return $id;
    }
}
