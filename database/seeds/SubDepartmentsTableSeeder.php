<?php

use Illuminate\Database\Seeder;

class SubDepartmentsTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('sub_departments')->insert([
	        [
	            'name' => 'Vac Form',
	            'description' => 'Vac Form Description',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'name' => 'Lam 1',
	            'description' => 'Lam 1 Description',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'name' => 'Lam 2',
	            'description' => 'Lam 2 Description',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'name' => 'Lam 3',
	            'description' => 'Lam 3 Description',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'name' => 'Footwell Foam',
	            'description' => 'Footwell Foam Description',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'name' => 'Jetting/Plumbing',
	            'description' => 'Jetting/Plumbing Description',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'name' => 'Framing',
	            'description' => 'Framing Description',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'name' => 'Water Test',
	            'description' => 'Water Test Description',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'name' => 'STS',
	            'description' => 'STS Description',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'name' => 'Skirting',
	            'description' => 'Skirting Description',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'name' => 'Detail',
	            'description' => 'Detail Description',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ]
        ]);
    }
}
