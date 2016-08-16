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

Route::get('/', array('as' => 'login', function(){
    return View::make('login.index');
}));


Route::get('/orders', array('as' => 'orders', function(){
    return View::make('orders.index');
}));

Route::get('/departments', array('as' => 'departments', function(){
    return View::make('departments/index');
}));

Route::get('/users', array('as' => 'users', function(){
    return View::make('users/index');
}));
