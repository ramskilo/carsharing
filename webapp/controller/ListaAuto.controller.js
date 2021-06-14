sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "../controller/DatiAuto",
    "../controller/NuovaAuto"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, Filter, FilterOperator, ODataModel, JSONModel, MessageBox, DatiAuto, NuovaAuto) {
        "use strict";

        return Controller.extend("carsharing.controller.ListaAuto", {
            onInit: function () {

            },
            onBack: function (oEvent) {
                var that = this;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                oRouter.navTo("Routemain"); //navigazione pagina home
            },
            onRESTCall: function () {
                var that = this;
                var sURL = "REST/Auto?";
                var addFilters = "";
                var targa = this.getView().byId("targaFilterID").getValue();
                if (targa) { 
                    if (addFilters) { addFilters = "targa=" + targa } else 
                      { addFilters = addFilters + '&' + "targa=" + targa };
                };               
                var marca = this.getView().byId("marcaFilterID").getValue();
                if (marca) { 
                    if (addFilters) { addFilters = "marca=" + marca } else 
                      { addFilters = addFilters + `&` + "marca=" + marca };
                }; 
                var modello = this.getView().byId("modelloFilterID").getValue();                
                if (modello) { 
                    if (addFilters) { addFilters = "modello=" + modello } else 
                      { addFilters = addFilters + `&` + "modello=" + modello };
                }; 
                var classe = this.getView().byId("classeFilterID").getValue();  
                if (classe) { 
                    if (addFilters) { addFilters = "classe=" + classe } else 
                      { addFilters = addFilters + "&" + "classe=" + classe };
                };     
                if (addFilters) {
                    sURL = sURL + addFilters;
                };                                                        
                $.ajax({
                    type: "GET",
                    url: sURL,
                    contentType: "application/json",
                    //  datatype: "json",
                    success: function (oResults) {
                        that.getView().setModel(new JSONModel(oResults), "ListaAuto");
                    },
                    error: function () {
                        MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("searcherror"));
                    }
                });
            },
            onCreate: function () {
                var MyNuovaAuto = new NuovaAuto();
                MyNuovaAuto.openDialog(this, this.getView());
            },
            onEdit: function (oEvent) {
                // L'oEvent in questo caso contiene l'evento di pressione del pulsante
                var path = oEvent.getSource().getParent().getBindingContext("ListaAuto").getObject();
                var model = new JSONModel(path);
                this.getView().setModel(model, "DatiAuto");
                var MyDatiAuto = new DatiAuto();
                MyDatiAuto.openDialog(this, this.getView());
            },
            onDelete: function (oEvent) {
                var that = this;                
                // L'oEvent in questo caso contiene l'evento di pressione del pulsante
                var path = oEvent.getSource().getParent().getBindingContext("ListaAuto").getObject();
                var sURL = "REST/Auto/" + path.targa;
                $.ajax({
                    type: "DELETE",
                    url: sURL,
                    contentType: "application/json",
                    //  datatype: "json",
                    success: function (oResults) {
                        MessageBox.success("Auto cancellata");
                    },
                    error: function () {
                        MessageBox.error("Errore cancellazione auto");
                    }
                });                
                // var model = new JSONModel(path);
                // this.getView().setModel(model, "DatiAuto"); 
                // var MyDatiAuto = new DatiAuto();
                // MyDatiAuto.openDialog(this, this.getView());                     
            },
        });
    });
