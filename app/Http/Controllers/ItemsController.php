<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Item;

class ItemsController extends Controller {
    //
   	public function items_get(){
   		return Item::all();
   	}

   	public function item_get($id){
   		if(Item::find($id)){
            return Item::find($id);
        }
        else{
            return array('status'=> '0');
        }
   	}
}
