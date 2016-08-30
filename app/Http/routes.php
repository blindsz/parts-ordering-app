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
	'middleware' => 'validateBackHistory',
	'as' => 'login'
]);

Route::post('/login', [
	'uses' => 'LoginController@login',
	'middleware' => 'validateBackHistory',
	'as' => 'enter_login'
]);

Route::get('/logout', [
	'uses' => 'LoginController@logout', 
	'middleware' => 'validateBackHistory',
	'as' => 'log_out'
]);

/*
|--------------------------------------------------------------------------
| Orders Routes
|--------------------------------------------------------------------------
*/

Route::get('/orders', [
	'uses' => 'OrdersController@index',
	'middleware' => 'validateBackHistory',
	'as' => 'orders',
]);

Route::post('/orders/order_post', [
	'uses' => 'OrdersController@order_post', 
	'as' => 'add_new_orders'
]);
/*
|--------------------------------------------------------------------------
| Departments Routes
|--------------------------------------------------------------------------
*/

Route::get('/departments', [
	'uses' => 'DepartmentsController@index',
	'middleware' => 'validateBackHistory',
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
	'middleware' => 'validateBackHistory',
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
| User Levels
|--------------------------------------------------------------------------
*/

Route::get('/user_levels/user_levels_get', [
	'uses' => 'UserLevelsController@user_levels_get',
	'as' => 'get_all_user_levels'
]);

/*
|--------------------------------------------------------------------------
| Users Routes
|--------------------------------------------------------------------------
*/

Route::get('/users', [
	'uses' => 'UsersController@index',
	'middleware' => 'validateBackHistory',
	'as' => 'users'
]);

Route::get('/users/users_get', [
	'uses' => 'UsersController@users_get',
	'as' => 'get_all_users'
]);

Route::get('/users/user_get/{id}', [
	'uses' => 'UsersController@user_get',
	'as' => 'get_user_by_id'
]);

Route::post('/users/user_post', [
	'uses' => 'UsersController@user_post',
	'as' => 'add_new_user'
]);

Route::put('/users/user_put/{id}', [
	'uses' => 'UsersController@user_put',
	'as' => 'update_user'
]);


/*
|--------------------------------------------------------------------------
| Email Routes
|--------------------------------------------------------------------------
*/

Route::post('orders/send_email_post', [
	'uses' => 'EmailController@send_email_post',
	'as' => 'send_email'
]);

Route::get('/email', [
	'uses' => 'EmailController@index'
]);


/*
|--------------------------------------------------------------------------
| Settings Routes
|--------------------------------------------------------------------------
*/

Route::get('settings/settings_get', [
	'uses' => 'SettingsController@settings_get',
	'as' => 'get_all_settings'
]);

Route::get('settings/setting_get/{credential_type}', [
	'uses' => 'SettingsController@setting_get',
	'as' => 'get_setting_by_id'
]);

Route::put('settings/setting_put/{credential_type}', [
	'uses' => 'SettingsController@setting_put',
	'as' => 'update_settings_by_id'
]);