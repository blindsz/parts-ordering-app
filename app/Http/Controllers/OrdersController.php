<?php

namespace App\Http\Controllers;

use DB;

use Illuminate\Http\Request;

use App\Http\Requests;

class OrdersController extends Controller {
    
	public function index(){

		// DB::connection('sqlsrv')->table('items')->insert([
  //   		['description' => 'parts_1'],
  //   		['description' => 'parts_2'],
  //   		['description' => 'parts_3'],
  //   		['description' => 'parts_4'],
  //   		['description' => 'parts_5'],
  //   		['description' => 'parts_6'],
  //   		['description' => 'parts_7'],
  //   		['description' => 'parts_8'],
  //   		['description' => 'parts_9']
		// ]);
		// $asd = [
  //   		['description' => 'parts_1'],
  //   		['description' => 'parts_2'],
  //   		['description' => 'parts_3'],
  //   		['description' => 'parts_4'],
  //   		['description' => 'parts_5'],
  //   		['description' => 'parts_6'],
  //   		['description' => 'parts_7'],
  //   		['description' => 'parts_8'],
  //   		['description' => 'parts_9']
		// ];

		// print_r($asd);

    	return view('orders.index');
    }

}
