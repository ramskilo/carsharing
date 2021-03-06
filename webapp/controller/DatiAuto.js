sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller) {
        "use strict";
        return Controller.extend("carsharing.controller.DatiAuto", {
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
              var targa = that.getView().byId("targa").getValue();  
              var marca = that.getView().byId("marca").getValue();   
              var modello = that.getView().byId("modello").getValue();   
              var classe = that.getView().byId("classe").getValue();   
              var note = that.getView().byId("note").getValue();                                                                        
              var sURL = "REST/Auto/" + targa;
                $.ajax({
                    type: "PUT",
                    url: sURL,
                    contentType: "application/json",
                    datatype: "json",
                    data: JSON.stringify({ "marca": marca, 
                                           "modello": modello, 
                                           "classe": classe, 
                                           "note": note }),
                    success: function(oResults){
                        MessageBox.success("Auto modificata"); 
                        this.onClose();                         
                    },
                    error: function (){
                        MessageBox.error("Errore modifica"); 
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