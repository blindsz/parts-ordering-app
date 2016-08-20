@extends('layout')


@section('css')

@stop

@section('content')
	<section class="content">
        <div class="row">
   			<div class="col-xs-12">
                <div class="box">
                	<div class="box-header with-border">
                		<h3 class="box-title"><i class="fa fa-th-list"></i>  Users List</h3>
	                	<div class="box-tools pull-right">
	                    	<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
	                  	</div>
	                </div>
                    <div class="box-body">
                        <table id="items_table" class="table" cellspacing="0" width="100%">
                          	<thead>
                            	<tr>
	                                <th>Item ID</th>
	                                <th>Description</th>
	                                <th>Quantity</th>
	                                <th>Price</th>
                              	</tr>
                        	</thead>
                    		<tbody>
                    			
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-success pull-right" id="btn_new_item"><span class="glyphicon glyphicon-plus"></span> New Item</button>
                        <button type="button" class="btn btn-danger" id="btn_delete_item"><span class="fa fa-trash-o"></span></button>
                        <button type="button" class="btn btn-primary" id="btn_update_item"><span class="fa fa-pencil"></span></button>
                        <button type="button" class="btn btn-info" id="btn_view_item"><span class="glyphicon glyphicon-eye-open"></span></button>
                    	<div class="btn-group dropup">
							<button type="button" class="btn btn-warning dropdown-toggle" id="btn_choose_quantity_action" data-toggle="dropdown" aria-expanded="false">Quantity <span class="caret"></span></button>
					  		<ul class="dropdown-menu" role="menu">
					    		<li><a id="add_quantity">Add</a></li>
					    		<li><a id="deduct_quantity">Deduct</a></li>
					  		</ul>
						</div>
						<button type="button" class="btn btn-default" id="btn_refresh_item"><span class="glyphicon glyphicon-refresh"></span></button>
                    </div>
                </div>
            </div>
   		</div>
   	</section>
@stop

@section('js')

@stop