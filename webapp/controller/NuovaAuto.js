sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"    
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, MessageBox) {
        "use strict";
        return Controller.extend("carsharing.controller.NuovaAuto", {
        openDialog: function (oController, oView) {
                var oDialog = this._getDialog();
                oView.addDependent(oDialog);
                this.originView = oView;
                this.oController = oController;
                oDialog.open();
            },
            onClose: function() {
                this._getDialog().close();
                this._getDialog().destroy();
            },
            onSave: function() {
              var that = this;
              var targa = sap.ui.getCore().byId("targa").getValue();  
              var marca = sap.ui.getCore().byId("marca").getValue();   
              var modello = sap.ui.getCore().byId("modello").getValue();   
              var classe = sap.ui.getCore().byId("classe").getValue();   
              var note = sap.ui.getCore().byId("note").getValue();                                                                        
              var sURL = "REST/Auto";
                $.ajax({
                    type: "POST",
                    url: sURL,
                    contentType: "application/json",
                    datatype: "json",
                    data: JSON.stringify({ "targa": targa, 
                                           "marca": marca, 
                                           "modello": modello, 
                                           "classe": classe, 
                                           "note": note }),
                    contentType: 'application/JSON; charset=utf-8',   
                    success: function(oResults){
                        MessageBox.success("Auto Creata"); 
                        this.onClose();                         
                    },
                    error: function (){
                        MessageBox.error("Errore Creazione Auto"); 
                        this.onClose();                        
                    }                    
                });
                //this.originView.getModel("DatiAuto").refresh();
                //this.onClose();
            },            
            _getDialog: function() {
                if (!this._oDialog) {
                    // create dialog via fragment factory
                    this._oDialog = sap.ui.xmlfragment("carsharing.view.DatiAuto", this);                    
                }
                return this._oDialog;
            },
        });
    });  