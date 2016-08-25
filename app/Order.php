<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use DB;

class Order extends Model {

	/**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'orders';

    public static function add($new_data){
    	return DB::table('orders')->insert($new_data);
    }
}
