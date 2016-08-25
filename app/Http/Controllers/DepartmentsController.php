<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Department;

use Auth;

class DepartmentsController extends Controller {
    
	public function index(){
        if(Auth::check()){
            return view('departments.index');
        }
        else{
            return redirect('/');
        }
    }
    
    public function departments_get() {
    	return Department::all();
    }

    public function department_get(Request $request, $id) {
    	if(Department::find($id)){
            return Department::find($id);
        }
        else{
            return array('status'=> '0');
        }
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

    public function department_put(Request $request, $id){
        $time_stamp = array(
            "updated_at" => date("Y-m-d H:i:s")
        );
        $data = $request->input('updatedData');
        $data = array_merge($data, $time_stamp);

        Department::where('id', $id)->update($data);

        return $id;
    }

    public function department_put_sub_department_ids(Request $request, $id){
        $time_stamp = array(
            "updated_at" => date("Y-m-d H:i:s")
        );

        $data = $request->input('updatedData');

        if(!$data){
            $data = array('sub_department_ids' =>  $data);
            $data = array_merge($data, $time_stamp);

            Department::where('id', $id)->update($data);

            return $id;
        }
        else{
            $data = implode(",",$data);
            $data = array('sub_department_ids' => '['. $data .']');
            $data = array_merge($data, $time_stamp);

            Department::where('id', $id)->update($data);

            return $id;
        }
    }

    public function department_delete(Request $request, $id){
        Department::destroy($id);
    }
}
