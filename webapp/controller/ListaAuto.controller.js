sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "../controller/DatiAuto"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator, ODataModel, JSONModel, MessageBox, DatiAuto) {
		"use strict";

		return Controller.extend("carsharing.controller.ListaAuto", {
			onInit: function () {

            },         
            onBack: function (oEvent) {
                var that = this;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(that);                
                oRouter.navTo("Routemain"); //navigazione pagina home
            },              
            onRESTCall: function() {
              var that = this;

              var sURL = "REST/Auto";
                $.ajax({
                    type: "GET",
                    url: sURL,
                    contentType: "application/json",
                    datatype: "json",
                    success: function(oResults){
                         that.getView().setModel(new JSONModel(oResults), "ListaAuto");
                    },
                    error: function (){
                        MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("searcherror")); 
                    }
                });
            },             
            onCreate: function() {
              /* 
              var that = this;
              var sURL = "REST/Auto";
                $.ajax({
                    type: "POST",
                    url: sURL,
                    contentType: "application/json",
                    datatype: "json",
                    data: { "targa": path.targa, 
                            "marca": path.marca, 
                            "modello": path.modello, 
                            "classe": path.classe, 
                            "note": path.note },
                    success: function(oResults){
                         that.getView().setModel(new JSONModel(oResults), "ListaAuto");
                    },
                    error: function (){
                        MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("searcherror")); 
                    }                    
                });
               */
                // L'oEvent in questo caso contiene l'evento di pressione del pulsante
                // var path = oEvent.getSource().getParent().getBindingContext("ListaAuto").getObject();    
                // var model = new JSONModel(path);
                // this.getView().setModel(model, "DatiAuto"); 
                //var that = this;
                var MyDatiAuto = new DatiAuto();
                MyDatiAuto.openDialog(this, this.getView());              
            },            
            onEdit: function(oEvent) {
                // L'oEvent in questo caso contiene l'evento di pressione del pulsante
                var path = oEvent.getSource().getParent().getBindingContext("ListaAuto").getObject();    
                var model = new JSONModel(path);
                this.getView().setModel(model, "DatiAuto"); 
                var MyDatiAuto = new DatiAuto();
                MyDatiAuto.openDialog(this, this.getView());                     
            },   
		});
	});
