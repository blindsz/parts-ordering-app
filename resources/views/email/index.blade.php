

 <div style="width:100%">
	<div style="padding:30px;background:rgb(230,230,230) none repeat scroll 0% 0%">
		<div style="height:auto;font-family:Arial,Helvetica,sans-serif;font-size:14px;background:rgb(255,255,255) none repeat scroll 0% 0%;width:90%;margin:15px auto 0px;padding:20px">
			<div style="padding:30px 10px 0px">
				@foreach($orderInfos as $orderInfo)
					<div class="row invoice-info">
				        <div class="col-sm-4 invoice-col" style="width:49%; display:inline-block;">
				          	<b style="line-height: 2; font-weight:normal;">Order Reference No:</b><b> {{ $orderInfo['order_reference_no'] }} </b><br>
				          	<b style="line-height: 2; font-weight:normal;">Department: </b><b>  {{ $orderInfo['department'] }} </b><br>
				          	<b style="line-height: 2; font-weight:normal;">Sub-Department:</b><b> {{ $orderInfo['sub_department'] }} </b><br>
				        </div>
				        <div class="col-sm-4 invoice-col" style="width:49%; display:inline-block; text-align:right;">
				          	<b style="font-size:20px; font-weight:normal;">Grand Total:</b><b style="font-size:20px;"> {{ $orderInfo['grand_total'] }}  </b><br>
				        </div>
					</div>
				@endforeach
			</div>
		</div>
		<div style="color:rgb(121,121,121);font-size:12px;line-height:24px;text-align:center;font-family:Arial,Helvetica,sans-serif;margin:0px auto;background-color:rgb(243,243,243);padding:20px;width:90%">
			<div class="row">
				<div class="col-xs-12 table-responsive">
	  				<table class="table table-striped" style="background-color:#fff; font-family: arial, sans-serif; border-collapse: collapse; min-width: 200px; margin: 0px auto; width: 100%;"> 
	    				<thead>
	    					<tr>
				              	<th style="border: 1px solid #dddddd; text-align: center; padding: 8px; width: 8%;">Qty</th>
				              	<th style="border: 1px solid #dddddd; text-align: center; padding: 8px; width: 15%;">Item ID</th>
				              	<th style="border: 1px solid #dddddd; text-align: center; padding: 8px; width: 47%;">Description</th>
				              	<th style="border: 1px solid #dddddd; text-align: center; padding: 8px; width: 15%;">Price</th>
				              	<th style="border: 1px solid #dddddd; text-align: center; padding: 8px; width: 15%;">Total Price</th>
	    					</tr>
	    				</thead>
	    				<tbody>
	        			@foreach($orderedItems as $orderedItem)
	        				<tr>
	      						<td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">{{ $orderedItem['quantity'] }}</td> 	              						
	      						<td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">{{ $orderedItem['item_id'] }}</td>
	              				<td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">{{ $orderedItem['item_description'] }}</td>
	              				<td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">{{ $orderedItem['item_price'] }}</td>
	              				<td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">{{ $orderedItem['item_total_price'] }}</td>
	        				</tr>
						@endforeach
	    				</tbody>
	  				</table>
				</div>
			</div>
			<div>
				<br><br>
				<div> 6927 Lincoln Parkway Fort Wayne, IN 46804 260-436-9100<br></div>
			</div>
		</div>
	</div>
</div>