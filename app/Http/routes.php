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
	'uses' => 'Auth\AuthController@index',
	'middleware' => 'validateBackHistory',
	'as' => 'login_view'
]);

Route::post('/login', [
	'uses' => 'Auth\AuthController@login',
	'middleware' => 'validateBackHistory',
	'as' => 'after_login'
]);

Route::get('/logout', [
	'uses' => 'Auth\AuthController@logout', 
	'middleware' => 'validateBackHistory',
	'as' => 'after_logout'
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
	'middleware' => 'auth',
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
	'middleware' => 'auth',
	'as' => 'get_all_departments'
]);

Route::get('/departments/department_get/{id}', [
	'uses' => 'DepartmentsController@department_get',
	'middleware' => 'auth',
	'as' => 'get_department_by_id'
]);

Route::post('/departments/department_post',[
	'uses' => 'DepartmentsController@department_post',
	'middleware' => 'auth',
	'as' => 'add_new_department'
]);

Route::put('/departments/department_put/{id}',[
	'uses' => 'DepartmentsController@department_put',
	'middleware' => 'auth',
	'as' => 'update_department'
]);

Route::put('/departments/department_put_sub_department_ids/{id}',[
	'uses' => 'DepartmentsController@department_put_sub_department_ids',
	'middleware' => 'auth',
	'as' => 'update_department_sub_department_ids'
]);

Route::delete('/departments/department_delete/{id}', [
	'uses' => 'DepartmentsController@department_delete',
	'middleware' => 'auth',
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
	'middleware' => 'auth',
	'as' => 'get_all_sub_departments'
]);

Route::get('/sub-departments/sub_department_get/{id}', [
	'uses' => 'SubDepartmentsController@sub_department_get',
	'middleware' => 'auth',
	'as' => 'get_sub_department_by_id'
]);

Route::get('/sub-departments/sub_department_get_by_ids/{id}', [
	'uses' => 'SubDepartmentsController@sub_department_get_by_ids',
	'middleware' => 'auth',
	'as' => 'get_sub_department_by_ids'
]);

Route::post('/sub-departments/sub_department_post', [
	'uses' => 'SubDepartmentsController@sub_department_post',
	'middleware' => 'auth',
	'as' => 'add_new_sub_department'
]);

Route::put('/sub-departments/sub_department_put/{id}', [
	'uses' => 'SubDepartmentsController@sub_department_put',
	'middleware' => 'auth',
	'as' => 'update_sub_department'
]);

Route::delete('/sub-departments/sub_department_delete/{id}', [
	'uses' => 'SubDepartmentsController@sub_department_delete',
	'middleware' => 'auth',
	'as' => 'delete_sub_department'
]);


/*
|--------------------------------------------------------------------------
| Items Routes
|--------------------------------------------------------------------------
*/
Route::get('/items/items_get', [
	'uses' => 'ItemsController@items_get',
	'middleware' => 'auth',
	'as' => 'get_all_items'
]);

Route::get('/items/item/{id}', [
	'uses' => 'ItemsController@item_get',
	'middleware' => 'auth',
	'as' => 'get_item_by_id'
]);

Route::get('/items/item_get_by_description/{description}', [
	'uses' => 'ItemsController@item_get_by_description',
	'middleware' => 'auth',
	'as' => 'get_item_by_description'
]);

Route::get('/items/item_get_by_item_no/{item_no}', [
	'uses' => 'ItemsController@item_get_by_item_no',
	'middleware' => 'auth',
	'as' => 'get_item_by_item_no'
]);


/*
|--------------------------------------------------------------------------
| User Levels
|--------------------------------------------------------------------------
*/

Route::get('/user_levels/user_levels_get', [
	'uses' => 'UserLevelsController@user_levels_get',
	'middleware' => 'auth',
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
	'middleware' => 'auth',
	'as' => 'get_all_users'
]);

Route::get('/users/user_get/{id}', [
	'uses' => 'UsersController@user_get',
	'middleware' => 'auth',
	'as' => 'get_user_by_id'
]);

Route::post('/users/user_post', [
	'uses' => 'UsersController@user_post',

	'as' => 'add_new_user'
]);

Route::put('/users/user_put/{id}', [
	'uses' => 'UsersController@user_put',
	'middleware' => 'auth',
	'as' => 'update_user'
]);


/*
|--------------------------------------------------------------------------
| Email Routes
|--------------------------------------------------------------------------
*/

Route::post('orders/send_email_post', [
	'uses' => 'EmailController@send_email_post',
	'middleware' => 'auth',
	'as' => 'send_email'
]);


/*
|--------------------------------------------------------------------------
| Settings Routes
|--------------------------------------------------------------------------
*/

Route::get('settings/settings_get', [
	'uses' => 'SettingsController@settings_get',
	'middleware' => 'auth',
	'as' => 'get_all_settings'
]);

Route::get('settings/setting_get/{credential_type}', [
	'uses' => 'SettingsController@setting_get',
	'middleware' => 'auth',
	'as' => 'get_setting_by_id'
]);

Route::put('settings/setting_put/{credential_type}', [
	'uses' => 'SettingsController@setting_put',
	'middleware' => 'auth',
	'as' => 'update_settings_by_id'
]);