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
            $btnNewTransaction: $("#btn_new_transaction"),
            $btnCloseTransaction: $("#btn_close_transaction"),
            $btnCompleteTransaction: $("#btn_complete_transaction"),
            $btnDeleteOrder: $("#btn_delete_orders"),
            $chooseItemsFormInputs: $("#frm_choose_items :input"),
            $chooseOrdersOptions: $("#frm_choose_options :input"),
            $chooseOrdersOptionsForm: $("#frm_choose_options"),
            $chooseItemForm: $("#frm_choose_items"),
            $selectDepartment: $("#select_department"),
            $selectSubDepartment: $("#select_sub_department"),
            $txtItemId: $("#item_id"),
            $txtItemDescription: $("#item_description"),
            $txtItemQuantity: $("#item_quantity"),
            $txtOrdersGrandTotal: $("#order_grand_total"),
            $btnAddItem: $("#add_item")
        },

        table: {
            selectedRowPos: -1,
            currentRowPos: -1
        },

        transactionStatus: 0,
        transactionFinish: false
    };

    var controller = {
        init: function () {
            var self = this;

            global.DOM.$selectDepartment.chosen({no_results_text: "Oops, nothing found!"});
            global.DOM.$selectSubDepartment.chosen({no_results_text: "Oops, nothing found!"});

            indexView.init().render();
            addItemView.init().render();
            selectItemsView.init().render();
            completeTransactionView.init().render();
            indexView.disableFormInputs();
            deleteOrdersView.init().render();
	    }
    };

    var indexView = {
    	init: function () {

            this.$renderBtnDelete = '<button type="button" class="btn btn-xs" id="btn_delete_orders"><i class="fa fa-trash-o"></i></button>';

            this.$dtOrders = global.DOM.$tableOrders.DataTable({
                "columns": [
                    { "sClass": "text-left font-bold", "sWidth": "15%" },
                    { "sClass": "text-left font-bold", "sWidth": "39%" },
                    { "sClass": "text-left font-bold quantity editable", "sWidth": "10%" },
                    { "sClass": "text-left font-bold", "sWidth": "15%" },
                    { "sClass": "text-left font-bold", "sWidth": "15%" },
                    { "sClass": "text-left font-bold", "sWidth": "6%" },
                ],
                responsive: true,
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

            this.$txtItemId = global.DOM.$txtItemId;
            this.$txtItemDescription = global.DOM.$txtItemDescription;
            this.$txtItemQuantity = global.DOM.$txtItemQuantity;
            this.$txtOrdersGrandTotal = global.DOM.$txtOrdersGrandTotal;
            this.$selectDepartment = global.DOM.$selectDepartment;
            this.$selectSubDepartment = global.DOM.$selectSubDepartment;

            this.$btnNewTransaction = global.DOM.$btnNewTransaction;
            this.$btnCloseTransaction = global.DOM.$btnCloseTransaction;

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

            this.$txtItemId.on('input', function() { 
                model.getItem($(this).val()).done(function(item){
                    if(item.status === undefined){
                        self.$txtItemId.val(item.id);
                        self.$txtItemDescription.val(item.description);
                    }
                    else{
                        self.$txtItemDescription.val('');
                    }
                });
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
            
            this.$btnNewTransaction.click(function(){
                if(global.transactionStatus >=1){
                    Alerts.showConfirm("", "Are you sure you want to cancel your current transaction and open a new transaction? ", "Yes, Please", "#3c8dbc", function (isConfirm){
                        if (isConfirm) {
                            global.transactionStatus = 1;
                            self.enableFormInputs();
                            self.clearAllForms();
                            setTimeout(function(){
                                self.$txtItemId.focus() 
                            },400);
                        }
                    });
                }
                else{
                    Alerts.showConfirm("", "Are you sure you want to open a new transaction? ", "Yes, Please", "#3c8dbc", function (isConfirm){
                        if (isConfirm) {
                            global.transactionStatus = 1;
                            self.enableFormInputs();
                            self.clearAllForms();
                            setTimeout(function(){
                                self.$txtItemId.focus() 
                            },400);
                        }
                    });
                }
            });

            this.$btnCloseTransaction.click(function(){
                self.closeTransaction();
            });

    		return this;
    	},

        getGrandTotal: function(){
            var self = this;
            var grandTotal = 0;
            var orders = self.$dtOrders.rows().data();

            for(var i=0; i<orders.length; i++){
                grandTotal = parseFloat(numeral(grandTotal).format("0.00")) + parseFloat(numeral(self.$dtOrders.row(i).data()[4]).format("0.00"));
            }

            return numeral(grandTotal).format("0.00");
        },

        enableFormInputs: function(){
            var self = this;

            global.DOM.$btnCompleteTransaction.removeAttr("disabled");
            global.DOM.$chooseItemsFormInputs.not("#item_description").prop("disabled", false);
            global.DOM.$chooseOrdersOptions.not("#order_grand_total").prop("disabled", false);
            self.$selectDepartment.trigger("chosen:updated");
            self.$selectSubDepartment.trigger("chosen:updated");
        },

        disableFormInputs: function(){
            var self = this;   
            
            global.DOM.$btnCompleteTransaction.attr("disabled","disabled");
            global.DOM.$chooseItemsFormInputs.prop("disabled", true);
            global.DOM.$chooseOrdersOptions.prop("disabled", true);
            self.$selectDepartment.trigger("chosen:updated");
            self.$selectSubDepartment.trigger("chosen:updated");
        },

        transactionExist: function(){
            var self = this;

            if(global.transactionStatus >= 1){
                return true;
            }   
            else{
                self.$kTOrders.fnBlur();
                Alerts.showWarning("", "There is currently no transaction. Please start a new transaction.");
            }
        },

        closeTransaction: function (){
            var self = this;

            if(global.transactionStatus == 0){
                self.disableFormInputs();
                self.clearAllForms();
            }
            else if(global.transactionFinish){
                self.disableFormInputs();
            }
            else if(global.transactionStatus == 1){
                Alerts.showConfirm("", "Are you sure you want to cancel this transaction? ", "Yes, Please", "#3c8dbc", function (isConfirm){
                    if(isConfirm){
                        global.transactionStatus = 0;
                        self.disableFormInputs();
                        self.clearAllForms();
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
                    if(indexView.transactionExist()){

                        $(nCell).editable(function (sVal) {
                            indexView.$kTOrders.block = false;
                            sVal = numeral(sVal).format("0");

                            if($(this).hasClass("quantity")){
                                var ordersList = indexView.$dtOrders.row(global.DOM.currentRowPos);

                                ordersList.data([
                                    ordersList.data()[0],
                                    ordersList.data()[1],
                                    numeral(sVal).format("0"),
                                    numeral(ordersList.data()[3]).format("0.00"),
                                    numeral(parseFloat(ordersList.data()[3]) * parseFloat(sVal)).format("0.00"),
                                    indexView.$renderBtnDelete
                                ]);

                                indexView.$dtOrders.draw(false);
                                indexView.$txtOrdersGrandTotal.val(indexView.getGrandTotal());
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
    }

    var addItemView = {
        init: function(){
            this.$btnAddItem = global.DOM.$btnAddItem;
            this.$chooseItemForm = global.DOM.$chooseItemForm;

            return this;
        },

        render: function(){
            var self = this;

            this.$btnAddItem.click(function (){
                var itemId = indexView.$txtItemId.val();
                var quantity = indexView.$txtItemQuantity.val();
                if(itemId){
                    if(quantity){
                        model.getItem(itemId).done(function (item){
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
                                    quantity = parseInt(quantity) + parseInt(ordersList.data()[2])
                                    ordersList.data([
                                        item.id,
                                        item.description,
                                        numeral(quantity).format("0"),
                                        numeral(item.price).format("0.00"),
                                        numeral(item.price * quantity).format("0.00"),
                                        indexView.$renderBtnDelete
                                    ]);
                                    indexView.$dtOrders.draw(false);
                                }
                                else{
                                    indexView.$dtOrders.row.add([
                                        item.id,
                                        item.description,
                                        numeral(quantity).format("0"),
                                        numeral(item.price).format("0.00"),
                                        numeral(item.price * quantity).format("0.00"),
                                        indexView.$renderBtnDelete
                                    ]);
                                    indexView.$dtOrders.draw(false);
                                }

                                indexView.$txtOrdersGrandTotal.val(indexView.getGrandTotal());
                                self.$chooseItemForm[0].reset();
                                indexView.$txtItemId.focus();
                            }
                            else{
                                toastr.info('Item not found. Please select another item.');
                                indexView.$txtItemId.focus();
                                global.DOM.$chooseItemForm[0].reset();
                            }
                        });
                    }
                    else{
                        toastr.info('Please enter a quantity.');
                        indexView.$txtItemQuantity.focus();
                    }
                }
                else{
                    toastr.info('Please select an item.');
                    indexView.$txtItemId.focus();
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
                if(indexView.transactionExist()){
                    indexView.$dtOrders.row($(this).parents('tr')).remove().draw();
                }
            });

            return this;
        }
    }

    var completeTransactionView = {
        init: function(){

            this.$btnCompleteTransaction = global.DOM.$btnCompleteTransaction;

            return this;
        },

        render: function(){
            var self = this;

            this.$btnCompleteTransaction.click(function(){
                if(indexView.transactionExist()){
                    if(indexView.$dtOrders.rows().data().length >= 1){
                        if(global.DOM.$selectDepartment.val() !== null && global.DOM.$selectSubDepartment.val() !== null){
                            var ordersList = indexView.$dtOrders.rows().data();
                            var orderDetails = [];
                            var orderedItems = [];
                            var orderInfos = [];
                            var emailSettings = [];
                            var orderReferenceNO = chance.hash({length: 15, casing: 'upper'});

                            for(var i=0; i<ordersList.length; i++){
                                orderDetails.push({
                                    order_reference_no: orderReferenceNO,
                                    item_id: ordersList[i][0],
                                    department_id: parseInt(indexView.$selectDepartment.val()),
                                    sub_department_id: parseInt(indexView.$selectSubDepartment.val()),
                                    quantity: parseInt(ordersList[i][2]),
                                })
                            }

                            for(var i=0; i<ordersList.length; i++){
                                orderedItems.push({
                                    item_id: ordersList[i][0],
                                    item_description: ordersList[i][1],
                                    item_price: ordersList[i][3],
                                    item_total_price: ordersList[i][4],
                                    quantity: parseInt(ordersList[i][2])
                                })
                            }

                            orderInfos.push({
                                order_reference_no: orderReferenceNO,
                                grand_total: indexView.$txtOrdersGrandTotal.val(),
                                department: $("#select_department option:selected").text(),
                                sub_department: $("#select_sub_department option:selected").text()
                            });                            
                        
                            Alerts.showConfirm("", "Are you sure you want to complete this transaction? ", "Yes, Please", "#3c8dbc", function (isConfirm){
                                if (isConfirm) {
                                    model.post(orderDetails).done(function(orders){
                                        indexView.disableFormInputs();
                                        Alerts.showSuccess("", "Transaction Completed!. <br>Your Order Reference # is <strong>"+ orderReferenceNO + "</strong>");
                                        global.transactionStatus = 0;
                                        global.transactionFinish = true;

                                        model.getSettings().done(function(settings){
                                            for(var i=0; i<settings.length; i++){
                                                emailSettings.push({
                                                   name:settings[i].name,
                                                   credentialType: settings[i].credential_type,
                                                   email: settings[i].email
                                                })
                                            }
                                            
                                            model.sendEmail(orderedItems, orderInfos, emailSettings).done(function(orders){
                                                console.log(orders);
                                            });
                                        });
                                    });
                                }
                            }); 
                        }
                        else{
                            Alerts.showWarning("", "Please select your desire department and sub-departments.");
                        }
                    }
                    else{
                        Alerts.showWarning("", "You don't have orders. Please add your desire item to the orders list.", function(isConfirm){
                            if(isConfirm){
                                setTimeout(function(){
                                    indexView.$txtItemId.focus() 
                                }, 400);
                            }
                        });                        
                    }
                }
            });

            return this;
        }
    };

    var selectItemsView = {
        init: function(){
            this.$selectItemsTable = $("#select_items_table");
            this.$tableBody = $("#select_items_table tbody");
            this.$dtItems = this.$selectItemsTable.DataTable({
                "columns": [
                    { "sClass": "text-left font-bold", "sWidth": "20%" },
                    { "sClass": "text-left font-bold", "sWidth": "60%" },
                    { "sClass": "text-left font-bold", "sWidth": "20%" }
                ],
                // responsive: true,
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

            this.$btnChooseItems.click(function (){
                self.$selectItemsModal.modal("show");
                model.getAllItems().done(function (item){
                    self.$dtItems.clear().draw();
                    for(var i=0; i<item.length; i++){
                        self.$dtItems.row.add([
                            item[i].id,
                            item[i].description,
                            item[i].price
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
                    indexView.$txtItemDescription.val(item.description);
                    self.$selectItemsModal.modal("hide");
                });

                setTimeout(function(){
                    indexView.$txtItemQuantity.focus();
                }, 1000);
            });

            return this;
        }
    }

    controller.init();
})();