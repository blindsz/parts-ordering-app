<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Setting;

class SettingsController extends Controller {

    public function settings_get(){
    	return Setting::all();
    }

    public function setting_put(Request $request, $credential_type){
    	$time_stamp = array(
            "updated_at" => date("Y-m-d H:i:s")
        );
        $data = $request->input('updatedData');
        $data = array_merge($data, $time_stamp);
        
        Setting::where('credential_type', $credential_type)->update($data);

        return $credential_type;
    }

    public function setting_get($credential_type){
    	if(Setting::where('credential_type', $credential_type)->first()){
            return Setting::where('credential_type', $credential_type)->first();
        }
        else{
            return array('status'=> '0');
        }
    }

}
