<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Department;

class DepartmentsController extends Controller {
    
	public function index(){
    	return view('departments.index');
    }
    
    public function departments_get() {
    	return Department::all();
    }

    public function department_get($id) {
    	return $id;
    }

    public function department_post() {

    }    
    
}
