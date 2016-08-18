<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\SubDepartment;

class SubDepartmentsController extends Controller {

    public function index() {
    	return view('sub-departments.index');
    }

    public function sub_departments_get() {
    	return SubDepartment::all();
    }

    public function sub_department_get($id){
    	return $id;
    }

    public function sub_department_post(){
    	
    }
}
