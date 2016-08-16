<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', [
	'uses' => 'LoginController@index', 
	'as' => 'login'
]);

Route::get('/orders', [
	'uses' => 'OrdersController@index', 
	'as' => 'orders'
]);

Route::get('/departments', [
	'uses' => 'DepartmentsController@index', 
	'as' => 'departments'
]);

Route::get('/users', [
	'uses' => 'UsersController@index', 
	'as' => 'users'
]);
