<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
	@include("_shared/css")
</head>
<body class="login-page">
    <div class="login-box">
    	<div class="login-logo">
        	<a><b>Parts Ordering App</b></a>
      	</div>
      	<div class="login-box-body">
        	<p class="login-box-msg">Sign in to start your session</p>
        	<form id="frm_login" method="post">
	          	<div class="form-group has-feedback">
		            <input id="login_username" type="text" name="login_username" class="form-control" placeholder="Username"/>
		            <span class="fa fa-user form-control-feedback"></span>
		            <div id="login_username_error" class="error-alert"></div>
	          	</div>
	          	<div class="form-group has-feedback">
		            <input id="login_password" type="password" name="login_password"class="form-control" placeholder="Password"/>
		            <span class="fa fa-lock form-control-feedback"></span>
		            <div id="login_password_error" class="error-alert"></div>
	          	</div>
	          	<br>
	          	<div class="row">
		            <div class="col-xs-4">
		              	<button type="submit" id="btn_login" class="btn btn-default btn-block btn-flat">Sign In</button>
		            </div>
	          	</div>
        	</form>
      	</div>
      	<br>
      	<div class="alert alert-danger alert-dismissable" style="display:none;" id="error_message">
      	</div>
    </div>
    @include("_shared/js")
    <script src="{{{ asset('assets/js/app/login.script.js') }}}"></script>
</body>
</html>