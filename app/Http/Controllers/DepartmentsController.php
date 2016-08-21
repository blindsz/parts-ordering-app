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

    public function department_get(Request $request, $id) {
    	return Department::find($id);
    }

    public function department_post(Request $request) {
        $time_stamp = array(
            "created_at"=> date("Y-m-d H:i:s"), 
            "updated_at" => date("Y-m-d H:i:s")
        );
        $data = $request->input('newData');
        $data = array_merge($data, $time_stamp);

        return Department::add($data);
    }    
    
}
