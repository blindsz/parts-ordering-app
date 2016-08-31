<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Item;

class ItemsController extends Controller {
    
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

    public function item_get_by_description($description){
        if(Item::where('description', $description)->first()){
            return Item::where('description', $description)->first();
        }
        else{
            return array('status'=> '0');
        }
    }

    public function item_get_by_item_no($description){
        if(Item::where('item_no', $description)->first()){
            return Item::where('item_no', $description)->first();
        }
        else{
            return array('status'=> '0');
        }
    }
}
