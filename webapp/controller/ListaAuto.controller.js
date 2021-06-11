sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator, ODataModel, JSONModel, MessageBox) {
		"use strict";

		return Controller.extend("carsharing.controller.ListaAuto", {
			onInit: function () {

            },
            
            onSelectionChange: function (oEvent) {
                var row = oEvent.getSource().getSelectedItem().getBindingContext("Customers").getObject();
                this.getOwnerComponent().getRouter().navTo("Dettaglio", { "ClientID": row.CustomerID });
            },

            onSearch: function() {
                var ClientID = this.getView().byId("ClientID").getValue();
                var filters = [];
                if (ClientID !== ""){
                    filters.push(new Filter("CustomerID", FilterOperator.EQ, ClientID));
                }

                var clientiModel = new ODataModel("NW/V2/Northwind/Northwind.svc/");
                var that = this;

                clientiModel.read("/Customers", {
                    async: true,
                    filters: filters,
                    success: function (oResults) {
                        that.getView().setModel(new JSONModel(oResults.results), "Customers");//Modello, nome Modello        
                    }, 
                    error: function (oError) { 
                        MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("searcherror"));
                    }
                });
            }
		});
	});
