(function () {
    var model = {
    	getAll: function (){
            var deferred = $.Deferred();
            $.get(BASE_URL + "settings/settings_get ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        put: function(updatedData, credentialType){
            var deferred = $.Deferred();

            $.put(BASE_URL + "settings/setting_put/" + credentialType + " ",{
                updatedData: updatedData,
                _token:_token
            },function (data) { deferred.resolve(data) });

            return deferred.promise();
        },

        get: function(credentialType){
            var deferred = $.Deferred();
            $.get(BASE_URL + "settings/setting_get/"+ credentialType +" ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        }
    };

    var global= {
        DOM: {
            $btnEmailSettings: $("#btn_email_settings"),
            $menuSettingsList: $("#menu_settings_list"),
            $btnChangeRecipientCredentials: "#recipient_credentials"
        }
    };

    var controller = {
        init: function () {
            var self = this;
            
            indexView.init().render();
	    }
    };

    var indexView = {
    	init: function () {
    		
            this.$btnEmailSettings = global.DOM.$btnEmailSettings;
            this.$menuSettingsList = global.DOM.$menuSettingsList;
            this.$btnChangeRecipientCredentials = global.DOM.$btnChangeRecipientCredentials;
            this.$changeRecipientCredentialsModal = $("#set_recipient_credentials_modal");
            this.$changeRecipientCredentialsForm = $("#frm_set_recipient_credentials");

            this.$txtRecipientCredentialsName = $("#recipient_credentials_name");
            this.$txtRecipientCredentialsEmail = $("#recipient_credentials_email");

    		return this;
    	},
    	render: function () {
    		var self = this;
    		
            this.$btnEmailSettings.click(function(){
                model.getAll().done(function(settings){
                    self.$menuSettingsList.empty();
                    for(var i=0; i<settings.length; i++){
                        self.$menuSettingsList.append(
                        '<li id='+ settings[i].credential_type +'>'+
                            '<a>'+
                                '<div class="pull-left">'+
                                    '<i class="fa fa-smile-o img-circle"></i>'+
                                '</div>'+
                                '<h4 style="text-transform: capitalize;">'+ 
                                    settings[i].credential_type.replace(/[_-]/g, " ") +
                                '</h4>'+
                                '<p>'+ settings[i].name + '< ' + settings[i].email +' ></p>'+
                            '</a>'+
                        '</li>'
                        );
                    }
                });
            });

            this.$menuSettingsList.on('click', self.$btnChangeRecipientCredentials , function(){
                model.get("recipient_credentials").done(function(settings){
                    var credentialType = settings.credential_type
                    self.$txtRecipientCredentialsName.val(settings.name);
                    self.$txtRecipientCredentialsEmail.val(settings.email);
    
                    self.$changeRecipientCredentialsModal.modal("show");

                    var validator = self.$changeRecipientCredentialsForm.validate({
                        errorElement: "div",
                        errorPlacement: function (error, element){
                        error.appendTo("div#" + element.attr("name") + "_error")
                        },
                        rules:{
                            recipient_credentials_name: {required: true},
                            recipient_credentials_email: {
                                required: true,
                                email: true
                            }
                        },
                        messages: {
                            recipient_credentials_name: {required: "Please enter a username."},
                            recipient_credentials_email: {
                                required: "Please enter a password.",
                                email: "Please enter a valid email."
                            }
                        },
                        submitHandler: function(form){
                            var data = {
                                name: self.$txtRecipientCredentialsName.val(),
                                email: self.$txtRecipientCredentialsEmail.val()
                            }

                            model.put(data, credentialType).done(function(updatedData){
                                $("li#"+ credentialType).empty();
                                self.$changeRecipientCredentialsModal.modal("hide");
                            });
                        }
                    });
                    validator.resetForm();
                });
            });
    		return this;
    	}
    };

    controller.init();
})();