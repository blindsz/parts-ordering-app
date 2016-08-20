@extends('layout')


@section('css')

@stop

@section('content')
	<section class="content">
        <div class="row">
    		<div class="col-xs-12">
                <div class="box with-no-border-top">
                	<div class="box-header with-border">
                		<h3 class="box-title"><i class="fa fa-th-list"></i> Departments List</h3>
	                	<div class="box-tools pull-right">
	                    	<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
	                  	</div>
	                </div>
                    <div class="box-body">
                        <table id="department_table" class="table" cellspacing="0" width="100%">
                          	<thead>
                            	<tr>
	                                <th>ID</th>
	                                <th>Name</th>
	                                <th>Description</th>
                              	</tr>
                        	</thead>
                    		<tbody>
                    			
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-success pull-right" id="btn_new_department"><span class="glyphicon glyphicon-plus"></span> New Department</button>
                        <button type="button" class="btn btn-danger" id="btn_delete_department"><span class="fa fa-trash-o"></span></button>
                        <button type="button" class="btn btn-primary" id="btn_update_sdepartment"><span class="fa fa-pencil"></span></button>
						<button type="button" class="btn btn-default" id="btn_refresh_department_list"><span class="glyphicon glyphicon-refresh"></span></button>
                        <button type="button" class="btn btn-primary" id="btn_assign_sub_departments"><span class="glyphicon glyphicon-list-alt"></span> Assign Sub-Departments</button>
                    </div>
                    <!-- <div class="overlay">
                        <i class="fa fa-refresh fa-spin"></i>
                    </div> -->
                </div>
                
            </div>
    	</div>
    </section>
@stop

@section('js')
    <script src="{{{ asset('assets/js/app/department.script.js') }}}"></script>
@stop