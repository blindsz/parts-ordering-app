<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use DB;

class Department extends Model {
    
	/**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'departments';

    public static function add($new_data){
    	return DB::table('departments')->insertGetId($new_data);
    }

}
