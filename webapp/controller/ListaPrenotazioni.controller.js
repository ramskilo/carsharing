sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "../controller/DatiPrenotazione"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator, ODataModel, JSONModel, MessageBox, DatiPrenotazione) {
		"use strict";

		return Controller.extend("carsharing.controller.ListaPrenotazioni", {
			onInit: function () {

                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({
                dateValue: new Date()
                });

                this.getView().setModel(oModel);

            },
            
            onBack: function (){
                this.getOwnerComponent().getRouter().navTo("Routemain"); //Navigazione pagina home
            },

            onNewPrenotazione: function (oEvent){
                var path;// = oEvent.getSource().getParent().getBindingContext("Prenotazioni").getObject();
                var model = new JSONModel(path);
                this.getView().setModel(model, "Prenotazioni"); //modello, nome modello

                var MyPrenotazione = new DatiPrenotazione();
                MyPrenotazione.openDialog(this, this.getView());  
            },

            onEditPrenotazione: function (oEvent){

                //l'oEvent in questo caso contiene il pulsante 
                var path = oEvent.getSource().getParent().getBindingContext("Prenotazioni").getObject();
                var model = new JSONModel(path);
                this.getView().setModel(model, "Prenotazioni"); //modello, nome modello
                //{Order>/Campo}
                var MyPrenotazione = new DatiPrenotazione();
                MyPrenotazione.openDialog(this,this.getView());        
            },
            onDeletePrenotazione: function (){

            },

            onApprovePrenotazione: function (oEvent){
                var that = this;

                var path = oEvent.getSource().getParent().getBindingContext("Prenotazioni").getObject();

                var sURL = "REST/Prenotazione/" + path.id;
                

                $.ajax({
                    type: "PUT",
                    url: sURL,
                    data: JSON.stringify({"stato": "Approvata"}),                  
                    dataType: "json",
                    async: false,
                    contentType: 'application/json; charset=utf-8',
                    success: function (oResults) {
                        //that.getView().setModel(new JSONModel(oResults), "Prenotazioni");//Modello, nome Modello
                        //this.originView.getModel("Prenotazioni").refresh();
                        MessageBox.success(this.getView().getModel("i18n").getResourceBundle().getText("prenotazioneApprovata"));
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

                var sURL = "REST/Prenotazioni?";

                var inTarga = this.getView().byId("inTarga").getValue();
                if (inTarga !== ""){
                    sURL = sURL + "targa=" + inTarga;
                }                
/*
                var inDatacrea = this.getView().byId("inDatacrea");

                if (inDatacrea !== ""){
                    var oDate = inDatacrea;             
                    //var outData = oDate.getFullYear() + oDate.getMonth() + oDate.getDay();
                    sURL = sURL + "data_crea=" + outData;
                }*/
                
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
