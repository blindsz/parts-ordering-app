@extends('layout')


@section('css')

@stop

@section('content')
	<section class="content">
        <div class="row">
   			<div class="col-xs-12">
                <div class="box with-no-border-top">
                	<div class="box-header with-border">
                		<h3 class="box-title"><i class="fa fa-th-list"></i>  Users List</h3>
	                	<div class="box-tools pull-right">
	                    	<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
	                  	</div>
	                </div>
                    <div class="box-body">
                        <table id="users_table" class="table" cellspacing="0" width="100%">
                          	<thead>
                            	<tr>
                                    <th>ID</th>
	                                <th>Username</th>
	                                <th>Name</th>
	                                <th>Level</th>
                                    <th>Status</th>
                              	</tr>
                        	</thead>
                    		<tbody>
                    			
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-success pull-right" id="btn_new_user"><span class="glyphicon glyphicon-plus"></span> New User</button>
                        <button type="button" class="btn btn-primary" id="btn_update_user" disabled="disabled"><span class="fa fa-pencil"></span></button>
						<button type="button" class="btn btn-default" id="btn_refresh_users"><span class="glyphicon glyphicon-refresh"></span></button>
                    </div>
                    <div class="overlay" id="overlay">
                        <i class="fa fa-refresh fa-spin"></i>
                    </div>
                </div>
            </div>
   		</div>
   	</section>

    <!-- modal new user -->
    <div class="modal fade" id="new_user_modal" tabindex="-1" role="dialog" aria-labelledby="new_user_modal_label" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <form id="frm_new_user" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="new_user_modal_label">Add New User</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="new_user_first_name">First Name <span class="text-danger">*</span></label>
                                    <input name="new_user_first_name" id="new_user_first_name" type="text" class="form-control" />
                                    <div id="new_user_first_name_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="new_user_middle_name">Middle Name <span class="text-danger">*</span></label>
                                    <input name="new_user_middle_name" id="new_user_middle_name" type="text" class="form-control" />
                                    <div id="new_user_middle_name_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="new_user_last_name">Last Name <span class="text-danger">*</span></label>
                                    <input name="new_user_last_name" id="new_user_last_name" type="text" class="form-control" />
                                    <div id="new_user_last_name_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="new_user_level">User Level <span class="text-danger">*</span></label>
                                    <select aria-invalid="false" name="new_user_level" id="new_user_level" class="form-control">
                                        <!--  -->
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="new_username">Username <span class="text-danger">*</span></label>
                                    <input name="new_username" id="new_username" type="text" class="form-control" />
                                    <div id="new_username_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="new_password">Password <span class="text-danger">*</span></label>
                                    <input name="new_password" id="new_password" type="password" class="form-control" />
                                    <div id="new_password_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="new_confirm_password">Confirm Password <span class="text-danger">*</span></label>
                                    <input name="new_confirm_password" id="new_confirm_password" type="password" class="form-control" />
                                    <div id="new_confirm_password_error" class="error-alert"></div>
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

    <!-- modal update user -->
    <div class="modal fade" id="update_user_modal" tabindex="-1" role="dialog" aria-labelledby="update_user_modal_label" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <form id="frm_update_user" method="put">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="update_user_modal_label">Update User</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="update_user_first_name">First Name <span class="text-danger">*</span></label>
                                    <input name="update_user_first_name" id="update_user_first_name" type="text" class="form-control" />
                                    <div id="update_user_first_name_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="update_user_middle_name">Middle Name <span class="text-danger">*</span></label>
                                    <input name="update_user_middle_name" id="update_user_middle_name" type="text" class="form-control" />
                                    <div id="update_user_middle_name_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="update_user_last_name">Last Name <span class="text-danger">*</span></label>
                                    <input name="update_user_last_name" id="update_user_last_name" type="text" class="form-control" />
                                    <div id="update_user_last_name_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="update_username">Username <span class="text-danger">*</span></label>
                                    <input name="update_username" id="update_username" type="text" class="form-control" />
                                    <div id="update_username_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="update_user_level">User Level <span class="text-danger">*</span></label>
                                    <select aria-invalid="false" name="update_user_level" id="update_user_level" class="form-control">
                                        <!--  -->
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="update_user_status">User Status <span class="text-danger">*</span></label>
                                    <select aria-invalid="false" name="update_user_status" id="update_user_status" class="form-control">
                                        <option value="1">ACTIVE</option>
                                        <option value="0">INACTIVE</option>
                                    </select>
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
    <script src="{{{ asset('assets/js/app/users.script.js') }}}"></script>
@stop