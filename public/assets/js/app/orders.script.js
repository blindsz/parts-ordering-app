(function () {
    var model = {
    	getAllItems: function(){
            var deferred = $.Deferred();
            $.get(BASE_URL + "items/items_get", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        getItem: function (id){
            var deferred = $.Deferred();
            $.get(BASE_URL + "items/item/" + id + " ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        getItemByItemNo: function (item_no){
            var deferred = $.Deferred();
            $.get(BASE_URL + "items/item_get_by_item_no/" + item_no + " ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        getItemByDescription: function (description){
            var deferred = $.Deferred();
            $.get(BASE_URL + "items/item_get_by_description/" + description + " ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        getAllDepartments: function(){
            var deferred = $.Deferred();
            $.get(BASE_URL + "departments/departments_get", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        getDepartment: function (id){
            var deferred = $.Deferred();
            $.get(BASE_URL + "departments/department_get/" + id + " ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        getSubDepartmentsByIds: function (id){
            var deferred = $.Deferred();
            $.get(BASE_URL + "sub-departments" + "/sub_department_get_by_ids/" + id + " ", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        getSettings: function (){
            var deferred = $.Deferred();
            $.get(BASE_URL + "settings/settings_get", { }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        sendEmail: function(orderedItems, orderInfos, emailSettings){
            var deferred = $.Deferred();
            $.post(BASE_URL + CURRENT_ROUTE + "/send_email_post",{
                 orderedItems: orderedItems,
                 orderInfos: orderInfos,
                 emailSettings: emailSettings,
                _token:_token
            }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        post: function(newData){
            var deferred = $.Deferred();
            $.post(BASE_URL + CURRENT_ROUTE + "/order_post",{
                 newData: newData,
                _token:_token
            }, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise();
        }
    };

    var global= {
        DOM: {
            $tableOrders: $("#orders_table"),
            $btnChooseItems: $("#choose_item"),
            $btnNewOrder: $("#btn_new_order"),
            $btnCloseOrder: $("#btn_close_order"),
            $btnCompleteOrder: $("#btn_complete_order"),
            $btnDeleteOrder: $("#btn_delete_orders"),
            $btnSearchOption: $("#btn_search_option"),
            $chooseItemsFormInputs: $("#frm_choose_items :input"),
            $chooseOrdersOptions: $("#frm_choose_options :input"),
            $chooseOrdersOptionsForm: $("#frm_choose_options"),
            $chooseItemForm: $("#frm_choose_items"),
            $selectDepartment: $("#select_department"),
            $selectSubDepartment: $("#select_sub_department"),
            $txtItemNo: $("#item_no"),
            $txtItemId: $("#item_id"),
            $txtItemDescription: $("#item_description"),
            $txtItemQuantity: $("#item_quantity"),
            $btnAddItem: $("#add_item")
        },

        table: {
            selectedRowPos: -1,
            currentRowPos: -1
        },

        orderStatus: 0,
        orderFinish: false
    };

    var controller = {
        init: function () {
            var self = this;

            global.DOM.$selectDepartment.chosen({no_results_text: "Oops, nothing found!"});
            global.DOM.$selectSubDepartment.chosen({no_results_text: "Oops, nothing found!"});
            global.DOM.$txtItemQuantity.numeric(false);

            indexView.init().render();
            addItemView.init().render();
            selectItemsView.init().render();
            completeOrderView.init().render();
            indexView.disableFormInputs();
            deleteOrdersView.init().render();

            overLayView.init().hide();
	    }
    };

    var indexView = {
    	init: function () {

            this.$renderBtnDelete = '<button type="button" class="btn btn-xs" id="btn_delete_orders"><i class="fa fa-trash-o"></i></button>';

            this.$dtOrders = global.DOM.$tableOrders.DataTable({
                "columns": [
                    { "sClass": "text-left font-bold", "sWidth": "0%" , "visible":false},
                    { "sClass": "text-left font-bold", "sWidth": "20%" },
                    { "sClass": "text-left font-bold", "sWidth": "60%" },
                    { "sClass": "text-left font-bold quantity editable", "sWidth": "12%" },
                    { "sClass": "text-left font-bold", "sWidth": "8%" },
                ],
                responsive: false,
                "bAutoWidth": false,
                "bLengthChange": false,
                "bPaginate" : false,
                "bFilter": false,
                "bInfo" : false,
                rowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    quantityColumnEditableView.init().render();
                }
            });

            this.$dtApi = global.DOM.$tableOrders.dataTable();
            this.$kTOrders = new $.fn.dataTable.KeyTable(global.DOM.$tableOrders.dataTable());

            this.$txtItemNo = global.DOM.$txtItemNo;
            this.$txtItemId = global.DOM.$txtItemId;
            this.$txtItemDescription = global.DOM.$txtItemDescription;
            this.$txtItemQuantity = global.DOM.$txtItemQuantity;
            this.$selectDepartment = global.DOM.$selectDepartment;
            this.$selectSubDepartment = global.DOM.$selectSubDepartment;

            this.$btnNewOrder = global.DOM.$btnNewOrder;
            this.$btnCloseOrder = global.DOM.$btnCloseOrder;

            this.$kTOrders.event.focus(null, null, function (node, x, y) {
                global.table.currentRowPos = y;
            });

            this.$kTOrders.event.blur(null, null, function (node, x, y) {
                global.table.selectedRowPos = -1;
            });

    		return this;
    	},
    	render: function () {
    		var self = this;

            model.getAllDepartments().done(function (departments){
                for(var i=0; i<departments.length; i++){
                    self.$selectDepartment.append(
                        '<option value="'+ departments[i].id +'">'+ departments[i].name +'</option>'
                    );
                }
                self.$selectDepartment.trigger("chosen:updated");
            });

            this.$selectDepartment.chosen().change(function() {
                model.getDepartment($(this).val()).done(function (department){
                    var subDepartmentIds = (department.sub_department_ids == 0) ? JSON.parse("null") : JSON.parse(department.sub_department_ids);
                    model.getSubDepartmentsByIds(subDepartmentIds).done(function(subDepartmentsData){
                        var subDepartMentNames = [];
                        self.$selectSubDepartment.empty();

                        for(var i=0; i<subDepartmentsData.length; i++){
                            subDepartMentNames.push({
                                name: subDepartmentsData[i].name,
                                id: subDepartmentsData[i].id
                            });
                        }
                        
                        for(var i=0; i<subDepartMentNames.length; i++){
                            self.$selectSubDepartment.append(
                                '<option value="'+ subDepartMentNames[i].id +'">'+ subDepartMentNames[i].name +'</option>'
                            );
                        }
                        self.$selectSubDepartment.trigger("chosen:updated");                        
                    });
                });
            });
            
            this.$btnNewOrder.click(function(){
                if(global.orderStatus >=1){
                    Alerts.showConfirm("", "Are you sure you want to cancel your current order and open a new order? ", "Yes", "#3c8dbc", function (isConfirm){
                        if (isConfirm) {
                            global.orderStatus = 1;
                            self.enableFormInputs();
                            self.clearAllForms();
                            addItemView.txtFocus();
                        }
                        else{
                            addItemView.txtFocus();
                        }
                    });
                }
                else{
                    global.orderStatus = 1;
                    self.enableFormInputs();
                    self.clearAllForms();
                    addItemView.txtFocus();
                }
            });

            this.$btnCloseOrder.click(function(){
                self.closeOrder();
            });

    		return this;
    	},

        enableFormInputs: function(){
            var self = this;

            global.DOM.$btnCompleteOrder.removeAttr("disabled");
            global.DOM.$chooseOrdersOptions.prop("disabled", false);
            self.$selectDepartment.trigger("chosen:updated");
            self.$selectSubDepartment.trigger("chosen:updated");

            if(addItemView.checkSearchOption())
                global.DOM.$chooseItemsFormInputs.not("#item_description").prop("disabled", false);
            else
                global.DOM.$chooseItemsFormInputs.not("#item_no").prop("disabled", false);
        },

        disableFormInputs: function(){
            var self = this;   
            
            global.DOM.$btnCompleteOrder.attr("disabled","disabled");
            global.DOM.$chooseItemsFormInputs.prop("disabled", true);
            global.DOM.$chooseOrdersOptions.prop("disabled", true);
            self.$selectDepartment.trigger("chosen:updated");
            self.$selectSubDepartment.trigger("chosen:updated");
        },

        orderExist: function(){
            var self = this;

            if(global.orderStatus >= 1){
                return true;
            }   
            else{
                self.$kTOrders.fnBlur();
                Alerts.showWarning("", "There is currently no order. Please start a new order.");
            }
        },

        closeOrder: function (){
            var self = this;

            if(global.orderStatus == 0){
                self.disableFormInputs();
                self.clearAllForms();
            }
            else if(global.orderFinish){
                Alerts.showConfirm("", "Are you sure you want to cancel this order? ", "Yes", "#3c8dbc", function (isConfirm){
                    if(isConfirm){
                        global.orderStatus = 0;
                        self.disableFormInputs();
                        self.clearAllForms();
                    }
                    else{
                        addItemView.txtFocus();
                    }
                });
            }
            else if(global.orderStatus == 1){
                Alerts.showConfirm("", "Are you sure you want to cancel this order? ", "Yes", "#3c8dbc", function (isConfirm){
                    if(isConfirm){
                        global.orderStatus = 0;
                        self.disableFormInputs();
                        self.clearAllForms();
                    }
                    else{
                        addItemView.txtFocus();
                    }
                });
            }
        },

        clearAllForms: function(){
            var self = this;

            self.$dtOrders.clear().draw(false);
            global.DOM.$chooseItemForm[0].reset();
            global.DOM.$chooseOrdersOptionsForm[0].reset();
            global.DOM.$selectSubDepartment.empty().trigger('chosen:updated');
            global.DOM.$selectDepartment.val('').trigger('chosen:updated');
        }
    };

    var quantityColumnEditableView = {
        init: function(){

            this.$ordersTableEditable = $("#orders_table tbody td.editable");

            return this;
        },

        render: function (){
            var self = this;
            this.$ordersTableEditable.each(function () {
                indexView.$kTOrders.event.remove.action(this);

                indexView.$kTOrders.event.action(this, function (nCell) {
                    indexView.$kTOrders.event.remove.focus(nCell);
                    indexView.$kTOrders.block = true;
                    if(indexView.orderExist()){

                        $(nCell).editable(function (sVal) {
                            indexView.$kTOrders.block = false;
                            sVal = numeral(sVal).format("0");

                            if($(this).hasClass("quantity")){
                                var ordersList = indexView.$dtOrders.row(global.DOM.currentRowPos);

                                ordersList.data([
                                    ordersList.data()[0],
                                    ordersList.data()[1],
                                    ordersList.data()[2],
                                    numeral(sVal).format("0"),
                                    indexView.$renderBtnDelete
                                ]);

                                indexView.$dtOrders.draw(false);
                            }

                            $(nCell).editable("destroy");

                            return sVal;
                        },{
                            "onblur": "submit",
                            cssclass : 'form-class',
                            height:($("span#edit").height() + 20) + "px",
                            "onreset": function () {
                                setTimeout(function () {
                                    indexView.$kTOrders.block = false;
                                }, 0);
                            }
                        });

                        setTimeout(function () {
                            $(nCell).click();
                        }, 0);
                    }
                });
            });
            return this;
        }
    };

    var addItemView = {
        init: function(){
            this.$btnAddItem = global.DOM.$btnAddItem;
            this.$chooseItemForm = global.DOM.$chooseItemForm;
            this.$btnSearchOption = global.DOM.$btnSearchOption;

            this.$txtSearchOption = $("#txt_search_option");

            return this;
        },

        render: function(){
            var self = this;

            model.getAllItems().done(function (items){
                var optionsTxtItemNo = {
                    data: items,
                    template: {
                        type: "description",
                        fields: {description: "description"}
                    },
                    getValue: "item_no",
                    list: {
                        match: { enabled: true },
                        onChooseEvent: function() {
                            model.getItemByItemNo(indexView.$txtItemNo.val()).done(function(item){
                                indexView.$txtItemId.val(item.id);
                                indexView.$txtItemNo.val(item.item_no);
                                indexView.$txtItemDescription.val(item.description);
                                indexView.$txtItemQuantity.focus();
                            });
                        }
                    }
                };

                var optionsTxtItemDescription = {
                    data: items,
                    template: {
                        type: "description",
                        fields: {description: "item_no"}
                    },
                    getValue: "description",
                    list: {
                        match: { enabled: true },
                        onChooseEvent: function() {
                            model.getItemByDescription(indexView.$txtItemDescription.val()).done(function(item){
                                indexView.$txtItemId.val(item.id);
                                indexView.$txtItemNo.val(item.item_no);
                                indexView.$txtItemDescription.val(item.description);
                                indexView.$txtItemQuantity.focus();
                            });
                        }
                    }
                };

                indexView.$txtItemNo.easyAutocomplete(optionsTxtItemNo);
                indexView.$txtItemDescription.easyAutocomplete(optionsTxtItemDescription);
            });

            this.$btnSearchOption.click(function (){
                if(self.checkSearchOption()){
                    self.$txtSearchOption.removeClass("item_no").addClass("item_description").text("Description");
                    indexView.$txtItemNo.attr("disabled","disabled");
                    indexView.$txtItemDescription.removeAttr("disabled").focus();
                }
                else{
                    self.$txtSearchOption.removeClass("item_description").addClass("item_no").text("Item No");
                    indexView.$txtItemDescription.attr("disabled","disabled");
                    indexView.$txtItemNo.removeAttr("disabled").focus();
                }
            });

            this.$btnAddItem.click(function (){
                var itemId = indexView.$txtItemId.val();
                var itemNo = indexView.$txtItemNo.val();
                var quantity = indexView.$txtItemQuantity.val();
                var description = indexView.$txtItemDescription.val();
                var searchOption = (self.checkSearchOption() === true) ? "itemId" : "description";
                var searchQuery = (self.checkSearchOption() === true) ? model.getItemByItemNo(itemNo) : model.getItemByDescription(description);

                if(searchOption){
                    if(quantity){
                        if(quantity >= 1){
                            searchQuery.done(function (item){
                                if(item.status == undefined){
                                    var itemExistInTheList = false;
                                    var ordersList = [];
                                    var orders = indexView.$dtOrders.rows().data();

                                    for(var i=0; i<orders.length; i++){
                                        if(indexView.$dtOrders.row(i).data()[0] == item.id){
                                            ordersList = indexView.$dtOrders.row(i);
                                            itemExistInTheList = true;
                                            break;
                                        }
                                    }

                                    if(itemExistInTheList){
                                        quantity = parseInt(quantity) + parseInt(ordersList.data()[3])
                                        ordersList.data([
                                            item.id,
                                            item.item_no,
                                            item.description,
                                            numeral(quantity).format("0"),
                                            indexView.$renderBtnDelete
                                        ]);
                                        indexView.$dtOrders.draw(false);
                                    }
                                    else{
                                        indexView.$dtOrders.row.add([
                                            item.id,
                                            item.item_no,
                                            item.description,
                                            numeral(quantity).format("0"),
                                            indexView.$renderBtnDelete
                                        ]);
                                        indexView.$dtOrders.draw(false);
                                    }

                                    self.$chooseItemForm[0].reset();
                                    addItemView.txtFocus();
                                }
                                else{
                                    toastr.info('Item not found. Please select another item.');
                                    addItemView.txtFocus();
                                    global.DOM.$chooseItemForm[0].reset();
                                }
                            }); 
                        }
                        else{
                            toastr.info('Please enter a valid quantity.');
                            indexView.$txtItemQuantity.focus();
                        }
                    }
                    else{
                        toastr.info('Please enter a quantity.');
                        indexView.$txtItemQuantity.focus();
                    }
                }
                else{
                    toastr.info('Please select an item.');
                    addItemView.txtFocus();
                }
            });

            return this;
        },

        checkSearchOption: function(){
            var self = this;

            if(self.$txtSearchOption.hasClass("item_no")){
                return true
            }
            else {
                return false;
            }
        },

        txtFocus: function(){
            var self = this;

            if(self.checkSearchOption()){
                setTimeout(function(){
                    indexView.$txtItemNo.focus(); 
                },400);
            }
            else{
                setTimeout(function(){
                    indexView.$txtItemDescription.focus();
                },400);
            }
        }
    };

    var completeOrderView = {
        init: function(){

            this.$btnCompleteOrder = global.DOM.$btnCompleteOrder;

            return this;
        },

        render: function(){
            var self = this;

            this.$btnCompleteOrder.click(function(){
                if(indexView.orderExist()){
                    if(indexView.$dtOrders.rows().data().length >= 1){
                        if(global.DOM.$selectDepartment.val() !== null && global.DOM.$selectSubDepartment.val() !== null){
                            var ordersList = indexView.$dtOrders.rows().data();
                            var orderDetails = [];
                            var orderedItems = [];
                            var orderInfos = [];
                            var emailSettings = [];
                            var orderReferenceNo = chance.hash({length: 15, casing: 'upper'});

                            for(var i=0; i<ordersList.length; i++){
                                orderDetails.push({
                                    order_reference_no: orderReferenceNo,
                                    item_id: ordersList[i][0],
                                    department_id: parseInt(indexView.$selectDepartment.val()),
                                    sub_department_id: parseInt(indexView.$selectSubDepartment.val()),
                                    quantity: parseInt(ordersList[i][3]),
                                })
                            }

                            for(var i=0; i<ordersList.length; i++){
                                orderedItems.push({
                                    item_no: ordersList[i][1],
                                    item_description: ordersList[i][2],
                                    quantity: parseInt(ordersList[i][3])
                                })
                            }

                            orderInfos.push({
                                order_reference_no: orderReferenceNo,
                                department: $("#select_department option:selected").text(),
                                sub_department: $("#select_sub_department option:selected").text()
                            });                            
                            
                            Alerts.showConfirm("", "Are you sure you want to complete this order? ", "Yes", "#3c8dbc", function (isConfirm){
                                if (isConfirm) {
                                    model.post(orderDetails).done(function(orders){
                                        indexView.disableFormInputs();
                                        global.orderStatus = 0;
                                        global.orderFinish = true;
                                        overLayView.init().show();

                                        model.getSettings().done(function(settings){
                                            for(var i=0; i<settings.length; i++){
                                                emailSettings.push({
                                                   name:settings[i].name,
                                                   credentialType: settings[i].credential_type,
                                                   email: settings[i].email
                                                })
                                            }
                                            
                                            model.sendEmail(orderedItems, orderInfos, emailSettings).done(function(orders){
                                                Alerts.showSuccess("", "Order Completed!. <br>Your Order Reference # is <strong>"+ orderReferenceNo + "</strong>");
                                                overLayView.init().hide();
                                            });
                                        });
                                    });
                                }
                                else{
                                    addItemView.txtFocus();
                                }
                            }); 
                        }
                        else{
                            Alerts.showWarning("", "Please select your department and sub department.");                            
                        }
                    }
                    else{
                        Alerts.showWarning("", "You don't have orders. Please add some item to the orders list.", function(isConfirm){
                            if(isConfirm){
                                addItemView.txtFocus();
                            }
                        });                        
                    }
                }
            });

            return this;
        }
    };

    var deleteOrdersView = {
        init: function(){
            this.$btnDeleteOrder = global.DOM.$btnDeleteOrder;
            this.$tableBody = $('#orders_table tbody');
            this.btnDeleteElementId = "#btn_delete_orders";

            return this;
        },

        render: function(){
            var self = this;

            this.$tableBody.on('click', self.btnDeleteElementId, function () {
                if(indexView.orderExist()){
                    indexView.$dtOrders.row($(this).parents('tr')).remove().draw();
                }
            });

            return this;
        }
    }

    var selectItemsView = {
        init: function(){
            this.$selectItemsTable = $("#select_items_table");
            this.$tableBody = $("#select_items_table tbody");
            this.$dtItems = this.$selectItemsTable.DataTable({
                "columns": [
                    { "sClass": "text-left font-bold", "sWidth": "0%" , visible: false},
                    { "sClass": "text-left font-bold", "sWidth": "30%" },
                    { "sClass": "text-left font-bold", "sWidth": "70%" }
                ],
                responsive: false,
                "bAutoWidth": false,
                "bLengthChange": false,
                "iDisplayLength": 7,
            });

            this.$btnChooseItems = global.DOM.$btnChooseItems;
            this.$btnSelectItems = $("#btn_select_items");
            this.$selectItemsModal = $("#select_items_modal");

            return this;
        },

        render: function (){
            var self = this;

            self.$selectItemsModal.on('hide.bs.modal', function () {
                addItemView.txtFocus();
            });

            this.$btnChooseItems.click(function (){
                self.$selectItemsModal.modal("show");
                model.getAllItems().done(function (item){
                    self.$dtItems.clear().draw();
                    for(var i=0; i<item.length; i++){
                        self.$dtItems.row.add([
                            item[i].id,
                            item[i].item_no,
                            item[i].description
                        ]);
                        self.$dtItems.draw(false);
                    }
                });
            });

            this.$tableBody.on('click', 'tr', function () {
                if ($(this).hasClass('default') ) {
                    $(this).removeClass('default');
                }
                else {
                    self.$dtItems.$('tr.default').removeClass('default');
                    $(this).addClass('default');
                }
            });

            this.$btnSelectItems.click(function (){
                var itemId = self.$dtItems.row('.default').data()[0];

                model.getItem(itemId).done(function (item){
                    indexView.$txtItemId.val(item.id);
                    indexView.$txtItemNo.val(item.item_no);
                    indexView.$txtItemDescription.val(item.description);
                    self.$selectItemsModal.modal("hide");
                });

                setTimeout(function(){
                    indexView.$txtItemQuantity.focus();
                }, 1000);
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