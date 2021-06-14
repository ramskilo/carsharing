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

		return Controller.extend("carsharing.controller.ListaPrenotazioni", {
			onInit: function () {

            },
            
            onBack: function (){
                this.getOwnerComponent().getRouter().navTo("Routemain"); //Navigazione pagina home
            },

            onNewPrenotazione: function (){

            },

            onEditPrenotazione: function (){

            },
            onDeletePrenotazione: function (){

            },

            onApprovePrenotazione: function (oEvent){
                var that = this;

                var path = oEvent.getSource().getParent().getBindingContext("Prenotazioni").getObject();

                var sURL = "REST/Prenotazione/" + path.id;

                $.ajax({
                    url: sURL,
                    type: "PATCH",
                    data: {"stato": "Approvata"},
                    processData: false,
                    //datatype: "json",
                    //async: false,
                    success: function (oResults) {
                        //that.getView().setModel(new JSONModel(oResults), "Prenotazioni");//Modello, nome Modello
                        this.originView.getModel("Prenotazioni").refresh();
                    },
                    error: function (oError) { 
                        MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("approveError"));
                    }
                });

            },

            onRESTCall: function() {
/*              
                $.ajax({
                    method: "GET",
                    url: "REST/Prenotazioni",
                    dataType: "JSON"
                    }).done(function(data){console.log(data)});*/
                
                var that = this;

                var sURL = "REST/Prenotazioni";
                $.ajax({
                    type: "GET",
                    url: sURL,
                    contentType: "application/json",
                    datatype: "json",
                    async: false,
                    success: function (oResults) {
                        that.getView().setModel(new JSONModel(oResults), "Prenotazioni");//Modello, nome Modello
                    },
                    error: function (oError) { 
                        MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("searcherror"));
                    }
                });
            }   
		});
	});