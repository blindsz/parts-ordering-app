(function () {
    var model = {

        getSubDepartmentsByIds: function (id){
            var deferred = $.Deferred();
            $.get(BASE_URL + "sub-departments" + "/sub_department_get_by_ids/" + id + " ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        getSubDepartments: function (){
            var deferred = $.Deferred();
            $.get(BASE_URL + "sub-departments" + "/sub_departments_get", { }, function (data) {
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
            $.post(BASE_URL + CURRENT_ROUTE + "/department_post",{
                 newData: newData,
                _token:_token
            }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        put: function (updatedData, id) {
            var deferred = $.Deferred();
            $.put(BASE_URL + CURRENT_ROUTE + "/department_put/"+ id + " ",{
                 updatedData: updatedData,
                _token:_token
            }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
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
            manageSubDepartmentsView.init().render();
            selectSubDepartmentsView.init().render();

	    }
    };

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

            this.$kTDepartment.event.focus(null, null, function (node, x, y) {
                global.table.currentRowPos = y;
            });

            this.$kTDepartment.event.blur(null, null, function (node, x, y) {
                global.table.selectedRowPos = -1;
            });

    		return this;
    	},
    	render: function () {
    		var self = this;

            global.DOM.$modal.on("shown.bs.modal", function () {
                self.$kTDepartment.fnBlur();
                $(this).find("input:visible:first").focus();
            });

            $(document).on('hidden.bs.modal', '.modal', function () {
                $('.modal:visible').length && $(document.body).addClass('modal-open');
            });

            overLayView.init().show();

            model.getAll().done(function (departmentData) {
                var asyncCounter = 0;
                var data = [];

                async.forEach(departmentData, function(department, callback) {    
                    var subDepartmentIds = (department.sub_department_ids == 0) ? JSON.parse("null") : JSON.parse(department.sub_department_ids);

                    model.getSubDepartmentsByIds(subDepartmentIds).done(function(subDepartments){
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
                            Alerts.showSuccess("Success", "Succesfully added a Department");
                            self.$newDepartmentModal.modal("hide");
                        })
                    }
                });

                validator.resetForm();
            });

            return this;
        }
    };

    manageSubDepartmentsView = {
        init: function(){

            this.$tableSelectedSubDepartments = $("#selected_sub_departments_table");
            this.$dtSelectedSubDepartments = this.$tableSelectedSubDepartments.DataTable({
                "columns": [
                    { "sClass": "text-left font-bold", "sWidth": "0%", "targets": [ 0 ], "visible": false},
                    { "sClass": "text-left font-bold", "sWidth": "35%" },
                    { "sClass": "text-left font-bold", "sWidth": "55%" },
                    { "sClass": "text-left font-bold hide-text", "sWidth": "10%" }
                ],
                "bLengthChange": false,
                responsive: false,
                "bPaginate" : true, 
                "bAutoWidth": false,
                "bFilter": false,
                "iDisplayLength": 5,
                "language": {
                    "emptyTable": "No Sub-Departments"
                }
            });
            this.$btnManageSubDepartments = global.DOM.$btnManageSubDepartments;
            this.btnDeleteElementId = "#btn_delete_sub_department";
            this.$btnDeleteSubDepartments = '<button type="button" class="btn btn-xs" id="btn_delete_sub_department"><i class="fa fa-trash-o"></i></button>';
            this.$tableBody = $('#selected_sub_departments_table tbody');
            this.$btnAddNewSubDepartments = $("#btn_add_new_sub_departments");
            this.$btnAssignSubDepartments = $("#btn_assign_sub_departments");
            this.$manageSubDepartmentsModal = $("#manage_sub_departments_modal");
            this.$txtDepartmentId = $("#manage_sub_departments_id_txt");
            this.$txtDepartmentName = $("#manage_sub_departments_name_txt");
            this.$txtDepartmentsDescription = $("#manage_sub_departments_description_txt");

            return this;
        },

        render: function(){
            var self = this;

            this.$btnManageSubDepartments.click( function (){
                if(global.table.currentRowPos >= 0){
                    var departmentId = indexView.$dtApi._('tr', {"filter":"applied"})[global.table.currentRowPos][0];
                    model.get(departmentId).done(function (department){
                        var subDepartmentIds = (department.sub_department_ids == 0) ? JSON.parse("null") : JSON.parse(department.sub_department_ids);

                        model.getSubDepartmentsByIds(subDepartmentIds).done(function (selectedSubDepartments){
                            self.$dtSelectedSubDepartments.clear().draw();
                            self.$txtDepartmentId.text(department.id);
                            self.$txtDepartmentName.text(department.name);
                            self.$txtDepartmentsDescription.text(department.description);

                            for(var i=0; i<selectedSubDepartments.length; i++){
                                self.$dtSelectedSubDepartments.row.add([
                                    selectedSubDepartments[i]['id'],
                                    selectedSubDepartments[i]['name'],
                                    selectedSubDepartments[i]['description'],
                                    self.$btnDeleteSubDepartments
                                ]);
                                self.$dtSelectedSubDepartments.draw(false);
                            }
                        });
                    });
                    self.$manageSubDepartmentsModal.modal("show");
                }
            });

            this.$tableBody.on('click', self.btnDeleteElementId, function () {
                self.$dtSelectedSubDepartments.row($(this).parents('tr')).remove().draw();
            });

            this.$btnAssignSubDepartments.click(function (){
                var departmentId = indexView.$dtApi._('tr', {"filter":"applied"})[global.table.currentRowPos][0];
                var subDepartments = self.$dtSelectedSubDepartments.rows().data();
                var selectedSubDepartements = [];

                for(var i=0; i<subDepartments.length; i++){
                    selectedSubDepartements.push(subDepartments[i][0]);
                }  

                model.put(selectedSubDepartements, departmentId).done(function (updatedId){
                    model.get(updatedId).done(function(updatedData){
                        var subDepartmentIds = (updatedData.sub_department_ids == 0) ? JSON.parse("null") : JSON.parse(updatedData.sub_department_ids);
                        
                        model.getSubDepartmentsByIds(subDepartmentIds).done(function(subDepartmentsData){
                            var subDepartMentNames = [];

                            for(var i=0; i<subDepartmentsData.length; i++){
                                subDepartMentNames.push(subDepartmentsData[i].name);
                            }

                            indexView.$dtApi.fnUpdate([
                                updatedData.id,
                                updatedData.name,
                                updatedData.description,
                                (subDepartMentNames.length === 0) ? indexView.noSubDepartmentMsg : subDepartMentNames
                            ], indexView.$dtApi.$("tr", { "filter": "applied" })[global.table.currentRowPos]);

                            self.$manageSubDepartmentsModal.modal("hide");
                        });
                    });
                });
            });

            return this;
        }
    };


    var selectSubDepartmentsView = {
        init: function (){

            this.$tableSubDepartments = $("#sub_departments_table");
            this.$toggleSelectSubDepartments = $("#sub_departments_table tbody");
            this.$tableBody = $('#sub_departments_table tbody');
            this.$btnSelectSubDepartments = $("#btn_select_sub_departments");
            this.$dtSubDepartments = this.$tableSubDepartments.DataTable({
                "columns": [
                    { "sClass": "text-left font-bold", "sWidth": "0%", "targets": [ 0 ], "visible": false},
                    { "sClass": "text-left font-bold", "sWidth": "35%" },
                    { "sClass": "text-left font-bold", "sWidth": "65%" }
                ],
                "bLengthChange": false,
                responsive: false,
                "bPaginate" : true, 
                "bAutoWidth": false,
                "bFilter": false,
                "iDisplayLength": 8,
                "language": {
                    "emptyTable": "No Sub-Departments"
                }
            });
            
            this.$selectSubDepartmentsModal = $("#select_sub_departments_modal");
            this.$btnAddNewSubDepartments = manageSubDepartmentsView.$btnAddNewSubDepartments;

            return this;
        },

        render: function (){
            var self = this;

            this.$btnAddNewSubDepartments.click(function (){
                self.$selectSubDepartmentsModal.modal("show");

                model.getSubDepartments().done(function (subDepartments){
                    self.$dtSubDepartments.clear().draw();

                    for(var i=0; i<subDepartments.length; i++){
                        self.$dtSubDepartments.row.add([
                            subDepartments[i]['id'],
                            subDepartments[i]['name'],
                            subDepartments[i]['description'],
                            self.$btnDeleteSubDepartments
                        ]);
                        self.$dtSubDepartments.draw(false);
                    }
                });
            });

            this.$toggleSelectSubDepartments.on("click", "tr", function () {
                $(this).toggleClass("default");
            });

            this.$btnSelectSubDepartments.click(function(){
                var validSubDepartments = [];
                var subDepartmentsToBeSelected = self.$dtSubDepartments.rows('.default').data();
                var subDepartmentsSelected = manageSubDepartmentsView.$dtSelectedSubDepartments.rows().data();

                for(var i=0; i<subDepartmentsToBeSelected.length; i++){
                    var isEqual = false;
                    for(var j=0; j<subDepartmentsSelected.length; j++){
                        if(subDepartmentsSelected[j][0] == subDepartmentsToBeSelected[i][0]){
                            isEqual = true;
                        }
                    }
                    if(!isEqual){
                        validSubDepartments.push(subDepartmentsToBeSelected[i][0])
                    }
                }

                if(validSubDepartments.length <= 0){
                    self.$selectSubDepartmentsModal.modal("hide");
                }
                else{
                    model.getSubDepartmentsByIds(validSubDepartments).done(function(selectedSubDepartments){

                        for(var i=0; i<selectedSubDepartments.length; i++){
                            manageSubDepartmentsView.$dtSelectedSubDepartments.row.add([
                                selectedSubDepartments[i]['id'],
                                selectedSubDepartments[i]['name'],
                                selectedSubDepartments[i]['description'],
                                manageSubDepartmentsView.$btnDeleteSubDepartments
                            ]);
                            manageSubDepartmentsView.$dtSelectedSubDepartments.draw(false);
                            self.$selectSubDepartmentsModal.modal("hide");
                        }
                    });
                }
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

        