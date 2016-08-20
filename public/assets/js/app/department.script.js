(function () {
    var model = {
    	

    };

    var global= {
        DOM: {
            $btnNewDepartment: $("#btn_new_department"),
            $btnUpdateDepartment: $("#btn_update_sdepartment"),
            $btnDeleteDepartment: $("#btn_delete_department"),
            $btnRefreshDepartment: $("#btn_refresh_department"),
            $btnAssignSubDepartments: $("#btn_assign_sub_departments"),
            $tableDepartment: $("#department_table")
        },

        table: {
            
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
    		
            this.$dtSubDepartment = global.DOM.$tableDepartment.DataTable({
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

            this.$dtApi = global.DOM.$tableDepartment.dataTable();

            this.$kTSubDepartment = new $.fn.dataTable.KeyTable(global.DOM.$tableDepartment.dataTable());

    		return this;
    	},
    	render: function () {
    		var self = this;
    		
            
    		return this;
    	}
    };

    controller.init();
})();