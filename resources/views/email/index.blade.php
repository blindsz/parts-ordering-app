
<div class="wrapper" style="max-width:100%; margin:0px auto; font-family: arial, sans-serif; background: #f5f5f5; padding: 2px;">
	<section class="invoice" style="position: relative; background: #fff; border: 1px solid #f4f4f4; padding: 20px; margin: 25px 25px;">
			<div class="row invoice-info">
		        <div class="col-sm-4 invoice-col" style="float:left; margin-bottom: 20px;">
		        @foreach($orderInfos as $orderInfo)
		          	<b>Order Reference No:</b> {{ $orderInfo['order_reference_no'] }}<br>
		          	<br>
		          	<b style="line-height: 2;">Department: </b> {{ $orderInfo['department'] }}<br>
		          	<b style="line-height: 2;">Sub-Department:</b> {{ $orderInfo['sub_department'] }}<br>
		       
		        </div>
		        <div class="col-sm-4 invoice-col" style="float:right;">
		          	<b>Grand Total:</b> {{ $orderInfo['grand_total'] }}<br>
		        </div>
		         @endforeach
				</div>
			</br>
			<div class="row">
			<div class="col-xs-12 table-responsive">
  				<table class="table table-striped" style="font-family: arial, sans-serif; border-collapse: collapse; min-width: 200px; margin: 0px auto; width: 100%;"> 
    				<thead>
    					<tr>
			              	<th style="border: 1px solid #dddddd; text-align: left; padding: 8px; width: 15%;">Qty</th>
			              	<th style="border: 1px solid #dddddd; text-align: left; padding: 8px; width: 15%;">Item ID</th>
			              	<th style="border: 1px solid #dddddd; text-align: left; padding: 8px; width: 40%;">Description</th>
			              	<th style="border: 1px solid #dddddd; text-align: left; padding: 8px; width: 15%;">Price</th>
			              	<th style="border: 1px solid #dddddd; text-align: left; padding: 8px; width: 15%;">Total Price</th>
    					</tr>
    				</thead>
    				<tbody>
					@foreach($orderedItems as $orderedItem)
        				<tr>
      						<td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">{{ $orderedItem['quantity'] }}</td> 	              						
      						<td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">{{ $orderedItem['item_id'] }}</td>
              				<td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">{{ $orderedItem['item_description'] }}</td>
              				<td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">{{ $orderedItem['item_price'] }}</td>
              				<td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">{{ $orderedItem['item_total_price'] }}</td>
        				</tr>
					@endforeach
    				</tbody>
  				</table>
			</div>
			</div>
	</section>
</div>
