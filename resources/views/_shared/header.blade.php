<a href="#" class="logo" style="font-size:15px;"><b>PARTS ORDERING SYSTEM</b></a>
<nav class="navbar navbar-static-top" role="navigation">
    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
    </a>
    <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
            <li class="dropdown messages-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-envelope-o"></i>
                    <span class="label label-success">4</span>
                </a>
                <ul class="dropdown-menu">
                    <li class="header">You have 4 messages</li>
                    <li>
                        <ul class="menu">
                            <li>
                                <a href="#">
                                    <h4>
                                        Sender Name
                                        <small><i class="fa fa-clock-o"></i> 5 mins</small>
                                    </h4>
                                    <p>Message Excerpt</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="footer"><a href="#">See All Messages</a></li>
                </ul>
            </li>
            <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <span class="hidden-xs">{{ strtoupper(Auth::user()['first_name']." ".Auth::user()['last_name']." ".Auth::user()['middle_name'][0]) ."."}}</span>
                    <i class="fa fa-user fa-fw"></i>
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li class="user-footer">
                        <div class="pull-right">
                            <i class="fa fa-sign-out fa-fw"></i>
                            <a class="btn btn-default btn-flat" href="{{ URL::to('logout') }}">Sign out</a>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
