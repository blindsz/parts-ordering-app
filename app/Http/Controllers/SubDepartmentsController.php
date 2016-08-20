<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests;
use App\SubDepartment;

class SubDepartmentsController extends Controller {

    public function index() {
    	return view('sub-departments.index');
    }

    public function sub_departments_get() {
    	return SubDepartment::all();
    }

    public function sub_department_get(Request $request, $id){
        if(SubDepartment::find($id)){
            return SubDepartment::find($id);
        }
        else{
            return array('status'=> '0');

        }
    	
    }

    public function sub_department_post(Request $request){
        $time_stamp = array(
            "created_at"=> date("Y-m-d H:i:s"), 
            "updated_at" => date("Y-m-d H:i:s")
        );
        $data = $request->input('newData');
        $data = array_merge($data, $time_stamp);

        return SubDepartment::add($data);
    }

    public function sub_department_put(Request $request, $id){
        $time_stamp = array(
            "updated_at" => date("Y-m-d H:i:s")
        );
        $data = $request->input('updatedData');
        $data = array_merge($data, $time_stamp);
        
        SubDepartment::where('id', $id)->update($data);

        return $id;
    }

    public function sub_department_delete(Request $request, $id){
        SubDepartment::destroy($id);
    }
}
