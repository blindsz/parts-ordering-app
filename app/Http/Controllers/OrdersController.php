<?php

namespace App\Http\Controllers;

use DB;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Order;
use Auth;

class OrdersController extends Controller {
    
	public function index(){
        if(Auth::check()){
            return view('orders.index');
        }
        else{
            return redirect('/');
        }
    }

    public function order_post(Request $request){
        $time_stamp = array(
            "created_at"=> date("Y-m-d H:i:s"), 
            "updated_at" => date("Y-m-d H:i:s")
        );

        $data = $request->input('newData');
        $merged_data = array();
        
        for($i = 0; $i < count($data); $i++){
            $merged_data[] = array_merge($data[$i], $time_stamp);
        }
        
        Order::add($merged_data);

        return $merged_data;
        
    }
}
