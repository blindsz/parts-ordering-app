<?php

use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('settings')->insert([
	        [
	            'credential_type' => 'sender_credentials',
	            'name' => str_random(10),
	            'email' => str_random(10).'@gmail.com',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ],
	        [
	            'credential_type' => 'recipient_credentials',
	            'name' => 'Jared Jan Taquiso',
	            'email' => 'jaredjan0803@gmail.com',
	            'created_at' => date("Y-m-d H:i:s"),
	        	'updated_at' => date("Y-m-d H:i:s")
	        ]
        ]);
    }
}
