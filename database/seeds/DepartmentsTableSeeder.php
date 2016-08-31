<?php

use Illuminate\Database\Seeder;

class DepartmentsTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('departments')->insert([
	        [
	            'sub_department_ids' => '[1,2,3,4,5,6,7,8,9,10,11]',
	            'name' => 'Swim Spas',
	        	'description' => 'Swim Spa Description',
	        	'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'sub_department_ids' => '[1,2,3,5,6,7,8]',
	            'name' => 'Spa Line 1',
	        	'description' => 'Spa Line 1 Description',
	        	'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'sub_department_ids' => '[1,2,3,5,8,9,10,11]',
	            'name' => 'Spa Line 2',
	        	'description' => 'Spa Line 2 Description',
	        	'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ]
        ]);
    }
}
