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
              //var that = this;
              var path = originView.getSource().getParent().getBindingContext("DatiAuto").getObject();               
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
                        MessageBox.success(this.getView().getModel("i18n").getResourceBundle().getText("autocreata")); 
                        this.onClose();                         
                    },
                    error: function (){
                        MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorepostdb")); 
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