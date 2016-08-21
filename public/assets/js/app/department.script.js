(function () {
    var model = {

        getSubDepartments: function (id){
            var deferred = $.Deferred();
            $.get(BASE_URL + "sub-departments" + "/sub_department_get_by_ids/" + id + " ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

    	getAll: function () {
            var deferred = $.Deferred();
            $.get(BASE_URL + CURRENT_ROUTE + "/departments_get", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        get: function (id) {
            var deferred = $.Deferred();
            $.get(BASE_URL + CURRENT_ROUTE + "/department_get/" + id + " ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        post: function (newData) {
            var deferred = $.Deferred();
            $.post(BASE_URL + CURRENT_ROUTE + "/department_post", {
                 newData: newData,
                _token:_token
            }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        put: function () {

        },

        delete: function() {

        }

    };

    var global= {
        DOM: {
            $btnNewDepartment: $("#btn_new_department"),
            $btnUpdateDepartment: $("#btn_update_sdepartment"),
            $btnDeleteDepartment: $("#btn_delete_department"),
            $btnRefreshDepartment: $("#btn_refresh_department"),
            $btnManageSubDepartments: $("#btn_manage_sub_departments"),
            $tableDepartment: $("#department_table"),
            $modal: $("div.modal")
        },

        table: {
            selectedRowPos: -1,
            currentRowPos: -1
        }
    };

    var controller = {
        init: function () {
            var self = this;
            
            indexView.init().render();
            newDepartmentView.init().render();

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
    }

    var indexView = {
    	init: function () {
    		
            this.$dtDepartment = global.DOM.$tableDepartment.DataTable({
                "columns": [
                    { "sClass": "text-left font-bold", "sWidth": "10%" },
                    { "sClass": "text-left font-bold", "sWidth": "25%" },
                    { "sClass": "text-left font-bold", "sWidth": "25%" },
                    { "sClass": "text-left font-bold", "sWidth": "40%" }
                ],
                "bLengthChange": true,
                responsive: true,
                "bPaginate" : true, 
                "bAutoWidth": false
            });
            this.noSubDepartmentMsg = "<span class='text-muted'>No Sub-Departments. Please assign Sub-Departments.</span>";
            this.$dtApi = global.DOM.$tableDepartment.dataTable();
            this.$kTDepartment = new $.fn.dataTable.KeyTable(global.DOM.$tableDepartment.dataTable());

    		return this;
    	},
    	render: function () {
    		var self = this;

            global.DOM.$modal.on("shown.bs.modal", function () {
                self.$kTDepartment.fnBlur();
                $(this).find("input:visible:first").focus();
            });

            overLayView.init().show();

            model.getAll().done(function (departmentData) {

                var asyncCounter = 0;
                var data = [];

                async.forEach(departmentData, function(department, callback) {
                        
                    var subDepartmentIds = (department.sub_department_ids == 0) ? JSON.parse("null") : JSON.parse(department.sub_department_ids);

                    model.getSubDepartments(subDepartmentIds).done(function(subDepartments){
                        data.push({
                            subDepartments: subDepartments,
                            id: department.id,
                            name: department.name,
                            description: department.description
                        });

                    callback();
                    });
                }, function (){
                    self.$dtDepartment.clear().draw();
                    for(var i=0; i<data.length; i++){

                        var subDepartmentNames = [];

                        for(var j=0; j<data[i].subDepartments.length; j++){
                            subDepartmentNames.push(data[i].subDepartments[j].name);
                        }

                        self.$dtDepartment.row.add([
                            data[i]['id'],
                            data[i]['name'],
                            data[i]['description'],
                            (subDepartmentNames.length === 0) ? self.noSubDepartmentMsg : subDepartmentNames

                        ]);


                        self.$dtDepartment.draw(false);
                    }
                    overLayView.init().hide();
                });
            });
            
    		return this;
    	}
    };

    newDepartmentView = {
        init: function (){

            this.$btnNewDepartment = global.DOM.$btnNewDepartment;
            this.$newDepartmentModal = $("#new_department_modal");
            this.$newDepartmentForm = $("#frm_new_department");
            this.$txtNewDepartmentName = $("#new_department_name");
            this.$txtNewDepartmentDescription = $("#new_department_description");

            return this;
        },

        render: function (){
            var self = this;

            this.$btnNewDepartment.click(function (){

                self.$newDepartmentModal.modal("show");
                self.$newDepartmentForm[0].reset();

                var validator = self.$newDepartmentForm.validate({
                    errorElement: "div",
                    errorPlacement: function (error, element){
                    error.appendTo("div#" + element.attr("name") + "_error")
                    },
                    rules:{
                        new_department_name: {
                            required: true
                        },
                        new_department_description: {
                            required: true,
                        }
                    },
                    messages: {
                        new_department_name: {
                            required: "Please enter a name."
                        },
                        new_department_description: {
                            required: "Please enter a description."
                        }
                    },
                    submitHandler: function(form){
                        var data = {
                            name: self.$txtNewDepartmentName.val(),
                            description: self.$txtNewDepartmentDescription.val()
                        }

                        model.post(data).done(function (insertedId){
                            model.get(insertedId).done(function (insertedData){
                                 indexView.$dtDepartment.row.add([
                                    insertedData.id,
                                    insertedData.name,
                                    insertedData.name,
                                    indexView.noSubDepartmentMsg
                                ]);

                                indexView.$dtDepartment.draw(false);
                            });
                        })
                    }
                });

                validator.resetForm();
            });

            return this;
        }
    };

    controller.init();
})();

        