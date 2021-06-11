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
            
            successREST: function (data){
                /*var myData = data.value;

                var oModel = new JSONModel();
                oModel.setData({
                    "Prenotazioni": myData
                });
                var oList = this.getView().byID("idPrenotazioni");
                oList.setModel(oModel);*/

                that.getView().setModel(new JSONModel(data.value), "Prenotazioni");//Modello, nome Modello 
            },

            errorREST: function (){
                        MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("searcherror"));
            },


            onRESTCall: function() {
              
                $.ajax({
                    method: "GET",
                    url: "REST/Prenotazioni",
                    dataType: "JSON"
                    }).done(function(data){console.log(data)});
/*
                var sURL = "https://685563a6trial-dev-srv-carshare.cfapps.eu10.hana.ondemand.com/Prenotazioni";
                $.ajax({
                    type: "GET",
                    url: sURL,
                    contentType: "application/json",
                    datatype: "json",
                    success: this.successREST.bind(this),
                    error: [this.errorREST, this] 
                });*/
            }   
		});
	});
