<section class="sidebar">
    <ul class="sidebar-menu">
    	<li class="header">NAVIGATION</li>
        <li @if(Route::current()->getName() == 'orders') {{" class=active "}} @endif><a href="{{ URL::to('orders') }}"><i class="fa fa-shopping-cart"></i> <span>ORDERS</span></a></li>
        <li class="treeview @if(Route::current()->getName() == 'departments' || Route::current()->getName() == 'sub_departments') {{' active '}} @endif">
          	<a href="#">
            	<i class="fa fa-dashboard"></i> <span>OFFICE</span> <i class="fa fa-angle-left pull-right"></i>
          	</a>
          	<ul class="treeview-menu">
            	<li @if(Route::current()->getName() == 'departments') {{" class=active "}} @endif><a href="{{ URL::to('departments') }}"><i class="fa fa-users"></i> <span>DEPARTMENTS</span></a></li>
            	<li @if(Route::current()->getName() == 'sub_departments') {{" class=active "}} @endif><a href="{{ URL::to('sub-departments') }}"><i class="fa fa-users"></i> <span>SUB-DEPARTMENTS</span></a></li>
          	</ul>
        </li>
        <li @if(Route::current()->getName() == 'users') {{" class=active "}} @endif><a href="{{ URL::to('users') }}"><i class="fa fa-user"></i> <span>USERS</span></a></li>
    </ul>
</section>