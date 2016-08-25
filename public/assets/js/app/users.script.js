(function () {
    var model = {
    	getAll: function () {
            var deferred = $.Deferred();
            $.get(BASE_URL + CURRENT_ROUTE + "/users_get", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        getAllUserLevels: function(){
            var deferred = $.Deferred();
            $.get(BASE_URL + "user_levels/user_levels_get", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        get: function (id){
            var deferred = $.Deferred();
            $.get(BASE_URL + CURRENT_ROUTE + "/user_get/" + id + " ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        post: function (newData) {
            var deferred = $.Deferred();
            $.post(BASE_URL + CURRENT_ROUTE + "/user_post",{
                newData: newData,
                _token:_token
            },function (data) { deferred.resolve(data) });

            return deferred.promise();
        },

        put: function (updatedData, id){
            var deferred = $.Deferred();
            $.put(BASE_URL + CURRENT_ROUTE + "/user_put/" + id + " ",{
                updatedData: updatedData,
                _token:_token
            },function (data) { deferred.resolve(data) });

            return deferred.promise();
        }        
    };

    var global= {
        DOM: {
            $tableUsers: $("#users_table"),
            $btnNewUser: $("#btn_new_user"),
            $btnUpdateUser: $("#btn_update_user"),
            $btnRefreshUser: $("#btn_refresh_users"),
            $modal: $("div.modal")
        },

        table: {
            selectedRowPos: -1,
            currentRowPos: -1
        },

        defaults: {
            userLevel :{
                ADMIN: 2,
                EMPLOYEE: 1,
            },
            userStatus :{
                INACTIVE: 0,
                ACTIVE: 1
            }
        }
    };

    var controller = {
        init: function () {
            var self = this;
                
            indexView.init().render();
            newUserView.init().render();
            updateUserView.init().render();
            refreshUsersView.init().render();

            return this;
	    }
    };

    var indexView = {
    	init: function () {
    		
            this.$dtUsers = global.DOM.$tableUsers.DataTable({
                "columns": [
                    { "sClass": "text-left font-bold", "sWidth": "0%", "targets": [0], "visible": false},
                    { "sClass": "text-left font-bold", "sWidth": "35%" },
                    { "sClass": "text-left font-bold", "sWidth": "27%" },
                    { "sClass": "text-left font-bold", "sWidth": "26%" },
                    { "sClass": "text-left font-bold", "sWidth": "12%" }
                ],
                "bLengthChange": true,
                responsive: false,
                "bPaginate" : true, 
                "bAutoWidth": false
            });

            this.$dtApi = global.DOM.$tableUsers.dataTable();
            this.$kTUsers = new $.fn.dataTable.KeyTable(global.DOM.$tableUsers.dataTable());

            this.renderActiveMsg = "<span class='label label-primary'>Active Account</span>";
            this.renderInactiveMsg = "<span class='label label-danger'>Inactive Account</span>";

            this.$kTUsers.event.focus(null, null, function (node, x, y) {
                global.table.currentRowPos = y;
            });

            this.$kTUsers.event.blur(null, null, function (node, x, y) {
                global.table.selectedRowPos = -1;
            });

    		return this;
    	},
    	render: function () {
    		var self = this;
    		
            global.DOM.$modal.on("shown.bs.modal", function () {
                self.$kTUsers.fnBlur();
                $(this).find("input:visible:first").focus();
            });

            overLayView.init().show();

            model.getAll().done(function(users){
                self.$dtUsers.clear().draw();

                for(var i=0; i<users.length; i++){
                    self.$dtUsers.row.add([
                        users[i]['id'],
                        users[i]['username'],
                        users[i]['first_name']+" "+users[i]['middle_name']+" "+users[i]['last_name'],
                        (users[i]['user_level_id'] === global.defaults.userLevel.ADMIN) ? "ADMINISTRATOR" : "EMPLOYEE",
                        (users[i]['status'] === global.defaults.userStatus.ACTIVE) ? self.renderActiveMsg : self.renderInactiveMsg
                    ]);
                    self.$dtUsers.draw(false);
                }
                overLayView.init().hide();
            });

    		return this;
    	}
    };

    newUserView = {
        init: function(){

            this.$newUserModal = $('#new_user_modal');
            this.$btnNewUser = global.DOM.$btnNewUser;
            this.$newUserForm = $("#frm_new_user");

            this.$txtNewUserFirstName = $("#new_user_first_name");
            this.$txtNewUserMiddleName = $("#new_user_middle_name");
            this.$txtNewUserLastName = $("#new_user_last_name");
            this.$txtNewUserLevel = $("#new_user_level");
            this.$txtNewUsername = $("#new_username");
            this.$txtNewConfirmedPassword = $("#new_confirm_password");

            return this;
        },

        render: function(){
            var self = this;

            model.getAllUserLevels().done(function(userLevels){
                self.$txtNewUserLevel.empty();
                for(var i=0; i<userLevels.length; i++){
                    self.$txtNewUserLevel.append(
                        '<option value="' + userLevels[i].id + '">'+
                            ((userLevels[i].id == global.defaults.userLevel.ADMIN) ? "ADMINISTRATOR" : "EMPLOYEE") +
                        '</option>'
                    );
                }
            });

            this.$btnNewUser.click(function(){

                self.$newUserForm[0].reset();
                self.$newUserModal.modal("show");

                var validator = self.$newUserForm.validate({
                    errorElement: "div",
                    errorPlacement: function (error, element){
                    error.appendTo("div#" + element.attr("name") + "_error")
                    },
                    rules:{
                        new_user_first_name: {required: true},
                        new_user_middle_name: {required: true},
                        new_user_last_name: {required: true},
                        new_user_level: {required: true},
                        new_username: {required: true},
                        new_password: {required: true},
                        new_confirm_password: {
                            required: true,
                            equalTo: "#new_password"
                        }
                    },
                    messages: {
                        new_user_first_name: {required: "Please enter users first name"},
                        new_user_middle_name: {required: "Please enter users middle name"},
                        new_user_last_name: {required: "Please enter users last name"},
                        new_user_level: {required: "Please enter users level"},
                        new_username: {required: "Please enter users username"},
                        new_password: {required: "Please enter users password"},
                        new_confirm_password: {
                            required: "Please re-enter users password",
                            equalTo: "Password did not match"
                        }
                    },
                    submitHandler: function(form){
                        var data = {
                            user_level_id: self.$txtNewUserLevel.val(),
                            username: self.$txtNewUsername.val(),
                            password: self.$txtNewConfirmedPassword.val(),
                            first_name: self.$txtNewUserFirstName.val(),
                            middle_name: self.$txtNewUserMiddleName.val(),
                            last_name: self.$txtNewUserLastName.val(),
                            status: global.defaults.userStatus.ACTIVE
                        };

                        model.post(data).done(function(insertedId){
                            model.get(insertedId).done(function(insertedData){
                                indexView.$dtUsers.row.add([
                                    insertedData.id,
                                    insertedData.username,
                                    insertedData.first_name+" "+insertedData.middle_name+" "+insertedData.last_name,
                                    ((insertedData.user_level_id === global.defaults.userLevel.ADMIN) ? "ADMINISTRATOR" : "EMPLOYEE"),
                                    (insertedData.status === global.defaults.userStatus.ACTIVE) ? indexView.renderActiveMsg : indexView.renderInactiveMsg
                                ]);
                                indexView.$dtUsers.draw(false);
                            });
                        });
                        Alerts.showSuccess("", "Succesfully added a new user.");
                        self.$newUserModal.modal("hide");
                    }
                });
                validator.resetForm();
            });

            return this;
        }

    };

    var updateUserView = {
        init: function(){
            this.$updateUserModal = $('#update_user_modal');
            this.$btnUpdateUser = global.DOM.$btnUpdateUser;
            this.$updateUserForm = $("#frm_update_user");

            this.$txtUpdateUserFirstName = $("#update_user_first_name");
            this.$txtUpdateUserMiddleName = $("#update_user_middle_name");
            this.$txtUpdateUserLastName = $("#update_user_last_name");
            this.$txtUpdateUserLevel = $("#update_user_level");
            this.$txtUpdateUsername = $("#update_username");
            this.$txtUpdateUserStatus = $("#update_user_status");

            return this;
        },

        render: function(){
            var self = this;

            this.$btnUpdateUser.click(function (){
                if(global.table.currentRowPos >= 0){
                    var userId = indexView.$dtApi._('tr', {"filter":"applied"})[global.table.currentRowPos][0];
                    self.$updateUserForm[0].reset();

                    model.getAllUserLevels().done(function(userLevels){
                        self.$txtUpdateUserLevel.empty();
                        for(var i=0; i<userLevels.length; i++){
                            self.$txtUpdateUserLevel.append(
                                '<option value="' + userLevels[i].id + '">'+
                                    ((userLevels[i].id == global.defaults.userLevel.ADMIN) ? "ADMINISTRATOR" : "EMPLOYEE") +
                                '</option>'
                            );
                        }
                        


                    });

                    model.get(userId).done(function (user){
                        if(user.status == 0){
                            self.$updateUserModal.modal("hide");
                            Alerts.showError("", "The data you are trying to update was not found.");
                            indexView.$dtApi.fnDeleteRow(indexView.$dtApi.$('tr', {"filter":"applied"})[global.table.currentRowPos]);
                        }
                        else{
                            self.$txtUpdateUserFirstName.val(user.first_name);
                            self.$txtUpdateUserMiddleName.val(user.middle_name);
                            self.$txtUpdateUserLastName.val(user.last_name);
                            self.$txtUpdateUserLevel.val(user.user_level_id);
                            self.$txtUpdateUsername.val(user.username);
                            self.$txtUpdateUserStatus.val(user.status);

                            self.$updateUserModal.modal("show");
                        }
                    });
                    
                    var validator = self.$updateUserForm.validate({
                        errorElement: "div",
                        errorPlacement: function (error, element){
                        error.appendTo("div#" + element.attr("name") + "_error")
                        },
                        rules:{
                            update_user_first_name: {required: true},
                            update_user_middle_name: {required: true},
                            update_user_last_name: {required: true},
                            update_user_level: {required: true},
                            update_username: {required: true}
                        },
                        messages: {
                            update_user_first_name: {required: "Please enter users first name"},
                            update_user_middle_name: {required: "Please enter users middle name"},
                            update_user_last_name: {required: "Please enter users last name"},
                            update_user_level: {required: "Please enter users level"},
                            update_username: {required: "Please enter users username"}
                        },
                        submitHandler: function(form){
                            userId = indexView.$dtApi._('tr', {"filter":"applied"})[global.table.currentRowPos][0];
                            var data = {
                                user_level_id: self.$txtUpdateUserLevel.val(),
                                username: self.$txtUpdateUsername.val(),
                                first_name: self.$txtUpdateUserFirstName.val(),
                                middle_name: self.$txtUpdateUserMiddleName.val(),
                                last_name: self.$txtUpdateUserLastName.val(),
                                status: self.$txtUpdateUserStatus.val()
                            };

                            model.put(data, userId).done(function(updatedId){
                                model.get(updatedId).done(function(updatedData){
                                    indexView.$dtApi.fnUpdate([
                                        updatedData.id,
                                        updatedData.username,
                                        updatedData.first_name+" "+updatedData.middle_name+" "+updatedData.last_name,
                                        ((updatedData.user_level_id === global.defaults.userLevel.ADMIN) ? "ADMINISTRATOR" : "EMPLOYEE"),
                                        (updatedData.status === global.defaults.userStatus.ACTIVE) ? indexView.renderActiveMsg : indexView.renderInactiveMsg
                                    ], indexView.$dtApi.$("tr", { "filter": "applied" })[global.table.currentRowPos]);

                                    Alerts.showSuccess("", "Succesfully update a user.");
                                    self.$updateUserModal.modal("hide");
                                });
                            });
                        }
                    });
                    validator.resetForm();
                }
            });

            return this;
        }
    };

    var refreshUsersView = {
        init: function(){
            this.$btnRefreshUser = global.DOM.$btnRefreshUser;

            return this;
        },

        render: function(){
            var self = this;

            this.$btnRefreshUser.click(function(){
                overLayView.init().show();
                model.getAll().done(function(users){
                    indexView.$dtUsers.clear().draw();

                    for(var i=0; i<users.length; i++){
                        indexView.$dtUsers.row.add([
                            users[i]['id'],
                            users[i]['username'],
                            users[i]['first_name']+" "+users[i]['middle_name']+" "+users[i]['last_name'],
                            (users[i]['user_level_id'] === global.defaults.userLevel.ADMIN) ? "ADMINISTRATOR" : "EMPLOYEE",
                            (users[i]['status'] === global.defaults.userStatus.ACTIVE) ? indexView.renderActiveMsg : indexView.renderInactiveMsg
                        ]);
                        indexView.$dtUsers.draw(false);
                    }
                    overLayView.init().hide();
                });
            });

            return this;
        }
    };

    overLayView = {
        init: function (){
            this.$overlay = $("#overlay");

            return this;
        },

        show: function(){
            var self = this;

            self.$overlay.fadeIn();

            return this;
        },
        hide: function(){
            var self = this;

            self.$overlay.fadeOut();
        }
    };

    controller.init();
})();