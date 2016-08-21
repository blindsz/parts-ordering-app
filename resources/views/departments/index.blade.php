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
                                    <th>Sub-Departments</th>
                              	</tr>
                        	</thead>
                    		<tbody>
                    			
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-success pull-right" id="btn_new_department"><span class="glyphicon glyphicon-plus"></span> New Department</button>
                        <button type="button" class="btn btn-danger" id="btn_delete_department"><span class="fa fa-trash-o"></span></button>
                        <button type="button" class="btn btn-primary" id="btn_update_sdepartment"><span class="fa fa-pencil"></span></button>
						<button type="button" class="btn btn-default" id="btn_refresh_department_list"><span class="glyphicon glyphicon-refresh"></span></button>
                        <button type="button" class="btn btn-primary" id="btn_manage_sub_departments"><span class="glyphicon glyphicon-list-alt"></span> Manage Sub-Departments</button>
                    </div>
                    <div class="overlay" id="overlay">
                        <i class="fa fa-refresh fa-spin"></i>
                    </div>
                </div>
            </div>
    	</div>
    </section>

    <!-- modal new -->
    <div class="modal fade" id="new_department_modal" tabindex="-1" role="dialog" aria-labelledby="new_department_modal_label" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <form id="frm_new_department" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="new_department_modal_label">Add New Department</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="new_department_name">Department Name <span class="text-danger">*</span></label>
                                    <input name="new_department_name" id="new_department_name" type="text" class="form-control" />
                                    <div id="new_department_name_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="new_department_description">Description <span class="text-danger">*</span></label>
                                    <input name="new_department_description" id="new_department_description" type="text" class="form-control" />
                                    <div id="new_department_description_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span> Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@stop

@section('js')
    <script src="{{{ asset('assets/js/app/department.script.js') }}}"></script>
@stop