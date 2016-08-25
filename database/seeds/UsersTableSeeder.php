<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        DB::table('users')->insert([
            'user_level_id' => 2,
            'username' => 'administrator',
            'password' => Hash::make('administrator'),
            'first_name' => 'Jared',
            'middle_name' => 'Cordero',
            'last_name' => 'Taquio',
            'remember_token' => null,
            'status' => 1,
            'created_at' => date("Y-m-d H:i:s"),
        	'updated_at' => date("Y-m-d H:i:s")
        ]);
    }
}
