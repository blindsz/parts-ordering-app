(function () {

    var model = {
    	getAll: function () {
            var deferred = $.Deferred();
            $.get(BASE_URL + CURRENT_ROUTE + "/sub_departments_get", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        get: function (id){
            var deferred = $.Deferred();
            $.get(BASE_URL + CURRENT_ROUTE + "/sub_department_get/" + id + " ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        post: function (newData) {
            var deferred = $.Deferred();
            $.post(BASE_URL + CURRENT_ROUTE + "/sub_department_post",{
                newData: newData,
                _token:_token
            },function (data) { deferred.resolve(data) });

            return deferred.promise();
        },

        put: function (updatedData, id){
            var deferred = $.Deferred();
            $.put(BASE_URL + CURRENT_ROUTE + "/sub_department_put/" + id + " ",{
                updatedData: updatedData,
                _token:_token
            },function (data) { deferred.resolve(data) });

            return deferred.promise();
        },

        delete: function (id) {
            var deferred = $.Deferred();
            $.delete(BASE_URL + CURRENT_ROUTE + "/sub_department_delete/" + id + " ",{
                _token:_token
            },function (data) { deferred.resolve(data) });

            return deferred.promise();
        }
    };

    var global= {
        DOM: {
            $btnDeleteSubDepartment: $("#btn_delete_sub_department"),
            $btnUpdateSubDepartment: $("#btn_update_sub_department"),
            $btnRefreshSubDepartment: $("#btn_refresh_sub_department_list"),
            $btnNewSubDepartment: $("#btn_new_sub_department"),
            $tableSubDepartment: $("#sub_department_table"),
            $modal: $("div.modal")
        },

        table: {
            currentRowPos: -1,
            selectedRowPos: -1
        }
    };

    var controller = {
        init: function () {
            var self = this;

            indexView.init().render();
            newSubDepartmentView.init().render();
            updateSubDepartmentView.init().render();
            deleteSubDepartmentView.init().render();
            refreshSubDepartmentView.init().render();
	    }
    };

    var indexView = {
    	init: function () {
            this.$dtSubDepartment = global.DOM.$tableSubDepartment.DataTable({
                "columns": [
                    { "sClass": "text-left font-bold", "sWidth": "10%" },
                    { "sClass": "text-left font-bold", "sWidth": "40%" },
                    { "sClass": "text-left font-bold", "sWidth": "40%" }
                ],
                "bLengthChange": true,
                responsive: true,
                "bPaginate" : true, 
                "bAutoWidth": false
            });
            this.$dtApi = global.DOM.$tableSubDepartment.dataTable();
            this.$kTSubDepartment = new $.fn.dataTable.KeyTable(global.DOM.$tableSubDepartment.dataTable());

            this.$kTSubDepartment.event.focus(null, null, function (node, x, y) {
                global.table.currentRowPos = y;
            });

            this.$kTSubDepartment.event.blur(null, null, function (node, x, y) {
                global.table.selectedRowPos = -1;
            })

    		return this;
    	},
    	render: function () {
    		var self = this;

            global.DOM.$modal.on("shown.bs.modal", function () {
                self.$kTSubDepartment.fnBlur();
                $(this).find("input:visible:first").focus();
            });

            model.getAll().done(function (subDepartment) {
                self.$dtSubDepartment.clear().draw();

                for(var i=0; i<subDepartment.length; i++){
                    self.$dtSubDepartment.row.add([
                        subDepartment[i]['id'],
                        subDepartment[i]['name'],
                        subDepartment[i]['description']
                    ]);
                    self.$dtSubDepartment.draw(false);
                }
            });

    		return this;
    	}
    };

    var newSubDepartmentView = {
        init: function () {
            this.$btnNewSubDepartment = global.DOM.$btnNewSubDepartment;
            this.$txtNewSubDepartmentName = $("#new_sub_department_name");
            this.$txtNewSubDepartmentDescription = $("#new_sub_department_description");
            this.$newSubDepartmentModal = $("#new_sub_department_modal");
            this.$newSubDepartmentForm = $("#frm_new_sub_department");

            return this;
        },
        render: function () {
            var self = this;
    
            this.$btnNewSubDepartment.click(function (){

                self.$newSubDepartmentForm[0].reset();
                self.$newSubDepartmentModal.modal("show");

                var validator = self.$newSubDepartmentForm.validate({
                    errorElement: "div",
                    errorPlacement: function (error, element){
                    error.appendTo("div#" + element.attr("name") + "_error")
                    },
                    rules:{
                        new_sub_department_name: {
                            required: true
                        },
                        new_sub_department_description: {
                            required: true,
                        }
                    },
                    messages: {
                        new_sub_department_name: {
                            required: "Please enter a name."
                        },
                        new_sub_department_description: {
                            required: "Please enter a description."
                        }
                    },
                    submitHandler: function(form){
                        var data = {
                            name: self.$txtNewSubDepartmentName.val(),
                            description: self.$txtNewSubDepartmentDescription.val()
                        };

                        model.post(data).done(function (insertedId) {
                            model.get(insertedId).done(function (insertedData){
                                indexView.$dtSubDepartment.row.add([
                                    insertedData.id,
                                    insertedData.name,
                                    insertedData.description,
                                ]);
                                indexView.$dtSubDepartment.draw(false);
                                self.$newSubDepartmentModal.modal("hide");
                                alert("Sub-Department "+ insertedData.name + " has been successfully added");
                            });
                        });
                    }
                });

                validator.resetForm();
            });

            return this;
        }
    };

    var updateSubDepartmentView = {
        init: function () {
            this.$btnUpdateSubDepartment = global.DOM.$btnUpdateSubDepartment;
            this.$txtUpdateSubDepartmentName = $("#update_sub_department_name");
            this.$txtUpdateSubDepartmentDescription = $("#update_sub_department_description");
            this.$updateSubDepartmentModal = $("#update_sub_department_modal");
            this.$updateSubDepartmentForm = $("#frm_update_sub_department");

            return this;
        },
        render: function () {
            var self = this;

            this.$btnUpdateSubDepartment.click(function (){
                if(global.table.currentRowPos >= 0){

                    var subDepartmentId = indexView.$dtApi._('tr', {"filter":"applied"})[global.table.currentRowPos][0];

                    model.get(subDepartmentId).done(function (subDepartment){
                        if(subDepartment.status == 0){
                            self.$updateSubDepartmentModal.modal("hide");
                            Alerts.showError("Error", "The data you are trying to update was not found.");
                            indexView.$dtApi.fnDeleteRow(indexView.$dtApi.$('tr', {"filter":"applied"})[global.table.currentRowPos]);
                        }
                        else{
                            self.$txtUpdateSubDepartmentName.val(subDepartment.name);
                            self.$txtUpdateSubDepartmentDescription.val(subDepartment.description);
                            self.$updateSubDepartmentModal.modal("show");
                        }
                    });

                    var validator = self.$updateSubDepartmentForm.validate({
                        errorElement: "div",
                        errorPlacement: function (error, element){
                        error.appendTo("div#" + element.attr("name") + "_error")
                        },
                        rules:{
                            update_sub_department_name: {
                                required: true
                            },
                            update_sub_department_description: {
                                required: true,
                            }
                        },
                        messages: {
                            update_sub_department_name: {
                                required: "Please enter a name."
                            },
                            update_sub_department_description: {
                                required: "Please enter a description."
                            }
                        },
                        submitHandler: function(form){

                            var data = {
                                name: self.$txtUpdateSubDepartmentName.val(),
                                description: self.$txtUpdateSubDepartmentDescription.val()
                            };

                            subDepartmentId = indexView.$dtApi._('tr', {"filter":"applied"})[global.table.currentRowPos][0];

                            model.put(data, subDepartmentId).done(function (updatedId) {
                                model.get(updatedId).done(function (updatedData){
                                
                                    indexView.$dtApi.fnUpdate([
                                        updatedData.id,
                                        updatedData.name,
                                        updatedData.description,
                                    ], indexView.$dtApi.$("tr", { "filter": "applied" })[global.table.currentRowPos]);

                                    self.$updateSubDepartmentForm[0].reset();
                                    self.$updateSubDepartmentModal.modal("hide");
                                    alert("Sub-Department "+ updatedData.name + " has been successfully added");

                                });
                            });
                        }
                    });

                    validator.resetForm();
                }
            })

            return this;
        }
    };

    var refreshSubDepartmentView = {
        init: function () {
            this.$btnRefreshSubDepartment = global.DOM.$btnRefreshSubDepartment;

            return this;
        },
        render: function () {
            var self = this;

            this.$btnRefreshSubDepartment.click(function (){
                
                 model.getAll().done(function (subDepartment) {
                    indexView.$dtSubDepartment.clear().draw();

                    for(var i=0; i<subDepartment.length; i++){
                        indexView.$dtSubDepartment.row.add([
                            subDepartment[i]['id'],
                            subDepartment[i]['name'],
                            subDepartment[i]['description']
                        ]);
                        indexView.$dtSubDepartment.draw(false);
                    }

                });
            });

            return this;
        }
    };

    var deleteSubDepartmentView = {
        init: function () {
            this.$btnDeleteSubDepartment = global.DOM.$btnDeleteSubDepartment;

            return this;
        },
        render: function () {
            var self = this;

            this.$btnDeleteSubDepartment.click(function (){
                 if(global.table.currentRowPos >= 0){
                    var subDepartmentId = indexView.$dtApi._('tr', {"filter":"applied"})[global.table.currentRowPos][0];
                    Alerts.showConfirm("Warning!", "Are you sure you want to delete this item?", "Yes, delete it!", "#d73925",
                        function () {
                            model.delete(subDepartmentId).done(function (){
                                indexView.$dtApi.fnDeleteRow(indexView.$dtApi.$('tr', {"filter":"applied"})[global.table.currentRowPos]);
                            });
                            Alerts.showSuccess("Success", "Succesfully deleted a sub-department");
                        }
                    );
                }
            });
            return this;
        }
    };

    controller.init();
})();