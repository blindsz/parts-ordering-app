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


/*
|--------------------------------------------------------------------------
| Login Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [
	'uses' => 'LoginController@index', 
	'as' => 'login'
]);

/*
|--------------------------------------------------------------------------
| Orders Routes
|--------------------------------------------------------------------------
*/

Route::get('/orders', [
	'uses' => 'OrdersController@index', 
	'as' => 'orders'
]);

/*
|--------------------------------------------------------------------------
| Departments Routes
|--------------------------------------------------------------------------
*/

Route::get('/departments', [
	'uses' => 'DepartmentsController@index', 
	'as' => 'departments'
]);

Route::get('/departments/departments_get', [
	'uses' => 'DepartmentsController@departments_get', 
	'as' => 'get_all_departments'
]);

Route::get('/departments/department_get/{id}', [
	'uses' => 'DepartmentsController@department_get', 
	'as' => 'get_department_by_id'
]);

Route::post('/departments/department_post',[
	'uses' => 'DepartmentsController@department_post', 
	'as' => 'add_new_department'
]);

Route::put('/departments/department_put/{id}',[
	'uses' => 'DepartmentsController@department_put', 
	'as' => 'update_department'
]);

Route::put('/departments/department_put_sub_department_ids/{id}',[
	'uses' => 'DepartmentsController@department_put_sub_department_ids', 
	'as' => 'update_department_sub_department_ids'
]);

Route::delete('/departments/department_delete/{id}', [
	'uses' => 'DepartmentsController@department_delete', 
	'as' => 'delete_department'
]);

/*
|--------------------------------------------------------------------------
| Sub-Departments Routes
|--------------------------------------------------------------------------
*/

Route::get('/sub-departments', [
	'uses' => 'SubDepartmentsController@index', 
	'as' => 'sub_departments'
]);

Route::get('/sub-departments/sub_departments_get', [
	'uses' => 'SubDepartmentsController@sub_departments_get', 
	'as' => 'get_all_sub_departments'
]);

Route::get('/sub-departments/sub_department_get/{id}', [
	'uses' => 'SubDepartmentsController@sub_department_get', 
	'as' => 'get_sub_department_by_id'
]);

Route::get('/sub-departments/sub_department_get_by_ids/{id}', [
	'uses' => 'SubDepartmentsController@sub_department_get_by_ids', 
	'as' => 'get_sub_department_by_ids'
]);

Route::post('/sub-departments/sub_department_post', [
	'uses' => 'SubDepartmentsController@sub_department_post', 
	'as' => 'add_new_sub_department'
]);

Route::put('/sub-departments/sub_department_put/{id}', [
	'uses' => 'SubDepartmentsController@sub_department_put', 
	'as' => 'update_sub_department'
]);

Route::delete('/sub-departments/sub_department_delete/{id}', [
	'uses' => 'SubDepartmentsController@sub_department_delete', 
	'as' => 'delete_sub_department'
]);


/*
|--------------------------------------------------------------------------
| Items Routes
|--------------------------------------------------------------------------
*/
Route::get('/items/items_get', [
	'uses' => 'ItemsController@items_get', 
	'as' => 'get_all_items'
]);

Route::get('/items/item/{id}', [
	'uses' => 'ItemsController@item_get', 
	'as' => 'get_item_by_id'
]);



/*
|--------------------------------------------------------------------------
| Users Routes
|--------------------------------------------------------------------------
*/

Route::get('/users', [
	'uses' => 'UsersController@index', 
	'as' => 'users'
]);
