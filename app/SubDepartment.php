<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use DB;

class SubDepartment extends Model {

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'sub_departments';

    public static function add($new_data){
    	return DB::table('sub_departments')->insertGetId($new_data);
    }

}
