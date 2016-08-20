<?php

// Home
Breadcrumbs::register('home', function($breadcrumbs) {
    $breadcrumbs->push('Home', route('sub_departments'));
});

Breadcrumbs::register('sub-departments', function($breadcrumbs) {
	$breadcrumbs->parent('home');
    $breadcrumbs->push('Sub-Departments', route('get_all_sub_departments'));
});

