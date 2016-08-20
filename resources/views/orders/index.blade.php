@extends('layout')


@section('css')

@stop

@section('content')
   <section class="content">
        <div class="row">
            <div class="col-xs-12">
            <div class="box with-no-border-top">
					<div class="box-header">
          				<div class="col-lg-2" style="padding-right: 0px; padding-left:5px;">
                            <input type="text" class="form-control" placeholder="Item Id.">
                        </div>
                        <div class="col-lg-6" style="padding-right: 0px;">
                            <input type="text" class="form-control" placeholder="..." disabled>
                        </div>
                        <div class="col-lg-2" style="padding-right: 0px;">
                            <input name="cashiering_quantity" type="number" class="form-control" placeholder="Quantity">
                        </div>
                        <div class="col-lg-1" style="padding-right: 0px;">
                            <button type="button" class="btn btn-default" title="Add Item" style="width:100%;"><span class="fa fa-check"></span> </button>
                        </div>
                        <div class="col-lg-1" style="padding-right: 0px; padding-left:6px;">
                            <button type="button" class="btn btn-default" title="Search Item" style="width:100%;"><span class="fa fa-search"></span></button>
                        </div>
        			</div>
      			</div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
            	<div class="box with-no-border-top" style="position: relative; min-height: 450px;">
        			<div class="box-header ui-sortable-handle">
	        			<div class="col-xs-9">
	          				<table id="sold_items_table" class="table" cellspacing="0" width="100%">
		                        <thead>
		                            <tr>
		                                <th>Item ID</th>
		                                <th>Description</th>
		                                <th>Quantity</th>
		                                <th>Price</th>
		                                <th>Total</th>
		                            </tr>
		                        </thead>
		                        <tbody>
		                      	</tbody>
	                  		</table>
	                  	</div>
	                  	<div class="col-lg-3">
							<div class="form-group">
								<label for="grand_total">Grand Total:</label>
								<input id="grand_total" name="grand_total" class="form-control text-right resettable" readonly="" type="number">
							</div>
							<div class="form-group">
								<label for="amount_to_pay">Amount To Pay:</label>
								<input disabled="disabled" id="amount_to_pay" name="amount_to_pay" class="form-control text-right resettable" type="number">
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-lg-6" style="padding-right: 4px;">
										<button id="btn_save_transaction" type="button" class="btn btn-default btn-block resettable"><span class="fa fa-inbox"></span></button>
									</div>
									<div class="col-lg-6" style="padding-left: 4px;">
										<button id="btn_close_transaction" type="button" class="btn btn-default btn-block resettable"><span class="fa fa-power-off"></span></button>
									</div>
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-lg-12">
										<button id="btn_save_transaction" type="button" class="btn btn-default btn-block resettable"><span class="fa fa-inbox"></span></button>
									</div>
								</div>
							</div>
						</div>
        			</div>
      			</div>
            </div>
            
        </div>
    </section>
@stop

@section('js')

@stop