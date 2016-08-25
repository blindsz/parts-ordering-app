(function () {
    var model = {
    	post: function (data) {
            var deferred = $.Deferred();
            $.post(BASE_URL + "login",{
                username: data.username,
                password: data.password
            },function (data) { deferred.resolve(data) });

            return deferred.promise();
        }
    };

    var global= {
        DOM: {
            $btnLogin: $("#btn_login")
        }
    };

    var controller = {
        init: function () {
            var self = this;

            indexView.init().render();
            toastr.options = {"positionClass": "toast-bottom-center"}
	    }
    };

    var indexView = {
    	init: function () {
    		
            this.$loginForm = $("#frm_login");
            this.$btnLogin = global.DOM.$btnLogin;
            this.$txtLoginUsername = $("#login_username");
            this.$txtLoginPassword = $("#login_password");

    		return this;
    	},
    	render: function () {
    		var self = this;

    		this.$btnLogin.click(function(){
                var validator = self.$loginForm.validate({
                    errorElement: "div",
                    errorPlacement: function (error, element){
                    error.appendTo("div#" + element.attr("name") + "_error")
                    },
                    rules:{
                        login_username: {required: true},
                        login_password: {required: true}
                    },
                    messages: {
                        login_username: {required: "Please enter a username."},
                        login_password: {required: "Please enter a password."}
                    },
                    submitHandler: function(form){
                        var data = {
                            username: self.$txtLoginUsername.val(),
                            password: self.$txtLoginPassword.val()
                        };

                        model.post(data).done(function(isCorrect){
                            if(isCorrect.status === 0){
                                toastr.info('Your username and password is incorrect or you have a inactive credentials.');
                            }
                            else{
                                window.location.replace(BASE_URL + "orders");
                            }
                        });
                    }
                });
            });

    		return this;
    	}
    };

    controller.init();
})();