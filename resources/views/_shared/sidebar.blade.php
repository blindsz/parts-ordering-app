<section class="sidebar">
    <ul class="sidebar-menu">
        <li @if(Route::current()->getName() == 'orders') {{" class=active "}} @endif><a href="{{ URL::to('orders') }}"><i class="fa fa-shopping-cart"></i> <span>ORDERS</span></a></li>
        <li @if(Route::current()->getName() == 'departments') {{" class=active "}} @endif><a href="{{ URL::to('departments') }}"><i class="fa fa-users"></i> <span>DEPARTMENTS</span></a></li>
        <li @if(Route::current()->getName() == 'users') {{" class=active "}} @endif><a href="{{ URL::to('users') }}"><i class="fa fa-user"></i> <span>USERS</span></a></li>
    </ul>
</section>