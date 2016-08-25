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
            <li class="dropdown messages-menu" id="btn_email_settings">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-cogs"></i>
                </a>
                <ul class="dropdown-menu">
                    <li class="header">Please set your email credentials</li>
                    <li>
                        <ul class="menu" id="menu_settings_list">
                           
                        </ul>
                    </li>
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

<div class="modal fade" id="set_sender_credentials_modal" tabindex="-1" role="dialog" aria-labelledby="set_sender_credentials_modal_label" data-backdrop="false">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <form id="frm_set_sender_credentials" method="put">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Change Sender Credentials</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="sender_credentials_name">Sender Name <span class="text-danger">*</span></label>
                                <input name="sender_credentials_name" id="sender_credentials_name" type="text" class="form-control" />
                                <div id="sender_credentials_name_error" class="error-alert"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="sender_credentials_email">Sender Email <span class="text-danger">*</span></label>
                                <input name="sender_credentials_email" id="sender_credentials_email" type="text" class="form-control" />
                                <div id="sender_credentials_email_error" class="error-alert"></div>
                            </div>
                        </div>
                    </div>
                </div>                
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="btn_set_sender_credentials"><span class="glyphicon glyphicon-plus"></span> Update</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="set_recipient_credentials_modal" tabindex="-1" role="dialog" aria-labelledby="set_recipient_credentials_modal_label" data-backdrop="false">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <form id="frm_set_recipient_credentials" method="put">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Change Recipient Credentials</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="recipient_credentials_name">Recipient Name <span class="text-danger">*</span></label>
                                <input name="recipient_credentials_name" id="recipient_credentials_name" type="text" class="form-control" />
                                <div id="recipient_credentials_name_error" class="error-alert"></div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="recipient_credentials_email">Recipient Email <span class="text-danger">*</span></label>
                                <input name="recipient_credentials_email" id="recipient_credentials_email" type="text" class="form-control" />
                                <div id="recipient_credentials_email_error" class="error-alert"></div>
                            </div>
                        </div>
                    </div>
                </div>                
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="btn_set_sender_credentials"><span class="glyphicon glyphicon-plus"></span> Update</button>
                </div>
            </form>
        </div>
    </div>
</div>