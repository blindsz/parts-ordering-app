<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\UserLevel;

class UserLevelsController extends Controller {
	
    public function user_levels_get(){
    	return UserLevel::all();
    }
}
