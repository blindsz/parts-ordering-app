<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class DepartmentsController extends Controller {
    
	public function index(){
    	return view('departments.index');
    }
    
}
