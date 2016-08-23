@extends('layout')


@section('css')

@stop

@section('content')
   <section class="content">
        <div class="row">
            <div class="col-xs-12">
            	<div class="box with-no-border-top">
            		 <form id="frm_choose_items">
						<div class="box-header">
	          				<div class="col-lg-2" style="padding-right: 0px; padding-left:5px;">
	                            <input type="text" id="item_id" class="form-control" placeholder="Item ID.">
	                        </div>
	                        <div class="col-lg-6" style="padding-right: 0px;">
	                            <input type="text" id="item_description" class="form-control" placeholder="..." disabled>
	                        </div>
	                        <div class="col-lg-2" style="padding-right: 0px;">
	                            <input type="number" id="item_quantity" class="form-control" placeholder="Quantity">
	                        </div>
	                        <div class="col-lg-1" style="padding-right: 0px;">
	                            <button type="button" class="btn btn-default" id="add_item" title="Add Item" style="width:100%;"><span class="fa fa-check"></span> </button>
	                        </div>
	                        <div class="col-lg-1" style="padding-right: 0px; padding-left:6px;">
	                            <button type="button" class="btn btn-default" id="choose_item" title="Search Item" style="width:100%;"><span class="fa fa-search"></span></button>
	                        </div>
	        			</div>
	        		</form>
      			</div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
            	<div class="box with-no-border-top" style="position: relative;">
        			<div class="box-header ui-sortable-handle">
	        			<div class="col-xs-9">
	          				<table id="orders_table" class="table" cellspacing="0" width="100%">
		                        <thead>
		                            <tr>
		                                <th>Item ID</th>
		                                <th>Description</th>
		                                <th>Qty</th>
		                                <th>Price</th>
		                                <th>Total</th>
		                            </tr>
		                        </thead>
		                        <tbody>
		                      	</tbody>
	                  		</table>
	                  	</div>
	                  	<div class="col-lg-3">
	                  		<br></br>
	                  		<form id="frm_choose_options">
								<div class="form-group">
									<label for="choose_department_pay">Choose Department:</label>
									<select data-placeholder="Select Department..." class="chosen-select" id="select_department">
										<option value="0"></option>
										<!-- select content -->
									</select>
								</div>
								<div class="form-group">
									<label for="choose_sub_department">Choose Sub-Department:</label>
									<select data-placeholder="Select Sub-Department..." class="chosen-select" id="select_sub_department">
										<option value="0"></option>
										<!-- select content -->
									</select>
								</div>
								<div class="form-group">
									<label for="grand_total">Grand Total:</label>
									<input id="order_grand_total" type="text" name="order_grand_total" class="form-control text-right resettable">
								</div>
							</form>
							<div class="form-group">
								<div class="row">
									<div class="col-lg-12">
										<button id="btn_new_transaction" type="button" class="btn btn-default btn-block resettable"><span class="fa fa-folder-open"></span> New Transaction</button>
									</div>
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-lg-12">
										<button id="btn_close_transaction" type="button" class="btn btn-default btn-block resettable"><span class="fa fa-times"></span> Close Transaction</button>
									</div>
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-lg-12">
										<button id="btn_complete_transaction" type="button" class="btn btn-default btn-block resettable"><span class="fa fa-inbox"></span> Complete Transaction</button>
									</div>
								</div>
							</div>
							<br></br>
						</div>
        			</div>
      			</div>
            </div>
            
        </div>
    </section>

    <!-- modal choose -->
    <div class="modal fade" id="select_items_modal" tabindex="-1" role="dialog" aria-labelledby="select_items_modal_label" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <form>
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="select_items_modal_label">Select Items</h4>
                    </div>
                    <div class="modal-body">
                        <span>Note: Please click on the list to select a item.</span>
                        <br></br>
                        <table id="select_items_table" class="table" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="btn_select_items"><span class="glyphicon glyphicon-plus"></span> Select</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@stop



@section('js')
	<script src="{{{ asset('assets/js/app/orders.script.js') }}}"></script>
@stop