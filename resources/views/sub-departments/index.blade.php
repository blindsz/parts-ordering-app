@extends('layout')

@section('css')

@stop

@section('content')
	<section class="content">
        <div class="row">
    		<div class="col-xs-12">
                <div class="box with-no-border-top">
                	<div class="box-header with-border">
                		<h3 class="box-title"><i class="fa fa-th-list"></i>  Sub-Departments List</h3>
	                	<div class="box-tools pull-right">
	                    	<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
	                  	</div>
	                </div>
                    <div class="box-body">
                        <table id="sub_department_table" class="table" cellspacing="0" width="100%">
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
                        <button type="button" class="btn btn-success pull-right" id="btn_new_sub_department"><span class="glyphicon glyphicon-plus"></span> New Sub-Department</button>
                        <button type="button" class="btn btn-danger" id="btn_delete_sub_department"><span class="fa fa-trash-o"></span></button>
                        <button type="button" class="btn btn-primary" id="btn_update_sub_department"><span class="fa fa-pencil"></span></button>
						<button type="button" class="btn btn-default" id="btn_refresh_sub_department_list"><span class="glyphicon glyphicon-refresh"></span></button>
                    </div>
                </div>
            </div>
    	</div>
    </section>

    <!-- modal new -->
    <div class="modal fade" id="new_sub_department_modal" tabindex="-1" role="dialog" aria-labelledby="new_sub_department_modal_label" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <form id="frm_new_sub_department" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="new_sub_department_modal_label">Add New Sub-Department</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="new_sub_department_name">Sub-Department Name <span class="text-danger">*</span></label>
                                    <input name="new_sub_department_name" id="new_sub_department_name" type="text" class="form-control" />
                                    <div id="new_sub_department_name_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="new_sub_department_description">Description <span class="text-danger">*</span></label>
                                    <input name="new_sub_department_description" id="new_sub_department_description" type="text" class="form-control" />
                                    <div id="new_sub_department_description_error" class="error-alert"></div>
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

    <!-- moddal update -->
    <div class="modal fade" id="update_sub_department_modal" tabindex="-1" role="dialog" aria-labelledby="update_sub_department_modal_label" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <form id="frm_update_sub_department" method="put">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="update_sub_department_modal_label">Update Sub-Department Details</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="update_sub_department_name">Sub-Department Name <span class="text-danger">*</span></label>
                                    <input name="update_sub_department_name" id="update_sub_department_name" type="text" class="form-control" />
                                    <div id="update_sub_department_name_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="update_sub_department_description">Description <span class="text-danger">*</span></label>
                                    <input name="update_sub_department_description" id="update_sub_department_description" type="text" class="form-control" />
                                    <div id="update_sub_department_description_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-plus"></span> Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

@stop

@section('js')
    <script src="{{{ asset('assets/js/app/sub_department.script.js') }}}"></script>
@stop