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
    			'name' => 'Swim Spa',
    			'description' => 'example description', 
    			'created_at' => date('Y-m-d H:i:s'), 
    			'updated_at' => date('Y-m-d H:i:s') 
    		],
    		[
    			'name' => 'Spa Line 1',
    			'description' => 'example description', 
    			'created_at' => date('Y-m-d H:i:s'), 
    			'updated_at' => date('Y-m-d H:i:s')
    		],
    		[
    			'name' => 'Spa Line 2',
    			'description' => 'example description', 
    			'created_at' => date('Y-m-d H:i:s'), 
    			'updated_at' => date('Y-m-d H:i:s')
    		],
		]);
    }
}
