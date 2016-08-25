<?php

use Illuminate\Database\Seeder;

class UserLevelsTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('user_levels')->insert([
	        [
	            'user_level' => 'Employee',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'user_level' => 'Administrator',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ]
        ]);
    }
}
