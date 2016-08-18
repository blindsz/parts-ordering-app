<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\SubDepartment;

class SubDepartmentsController extends Controller {

    public function index() {
    	return view('sub-departments.index');
    }

    public function sub_departments_get(Request $request) {
    	return SubDepartment::all();
    }

    public function sub_department_get(Request $request, $id){
    	return $id;
    }

    public function sub_department_post(Request $request){
    	
    }
}
