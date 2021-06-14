sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller) {
        "use strict";
        return Controller.extend("carsharing.controller.DatiPrenotazione", {
            openDialog: function (oController, oView) {
                var oDialog = this._getDialog();
                oView.addDependent(oDialog);
                this.originView = oView;
                this.oController = oController;
                oDialog.open();
            },
            onClose: function () {
                this._getDialog().close();
                this._getDialog().destroy();
            },
            onSave: function (oEvent) {

                //this.originView.getModel("Customers").refresh();
                //this.onClose();                

                //var that = this;
                //var path = originView.getSource().getParent().getBindingContext("Prenotazioni").getObject();     
                //var path = this.originView.getModel("Prenotazioni");
                //var path = oEvent.getSource().getParent().getBindingContext("Prenotazioni").getObject();
                //this.originView.getModel("Prenotazioni").refresh();
                //var utente = this.getView().getModel("Prenotazioni").getProperty("/utente");          

                var view = this.getView();

                var inUtente = sap.ui.getCore().byId("inUtente").getValue();
                var inTarga = sap.ui.getCore().byId("inTarga").getValue();    
                var inData_inizio = sap.ui.getCore().byId("inData_inizio").getValue();
                var inOra_inizio = sap.ui.getCore().byId("inOra_inizio").getValue();
                var inData_fine = sap.ui.getCore().byId("inData_fine").getValue();
                var inOra_fine = sap.ui.getCore().byId("inOra_fine").getValue();
                var inNote = sap.ui.getCore().byId("inNote").getValue();

                var path = originView.getSource().getParent().getBindingContext("Prenotazioni").getObject(); 

                var sURL = "REST/Prenotazione";
                $.ajax({
                    type: "POST",
                    url: sURL,
                    contentType: "application/json",
                    datatype: "json",
                    data: {
                        "utente": inUtente,
                        "targa": inTarga,
                        "data_inizio": inData_inizio,
                        "ora_inizio": inOra_inizio,
                        "data_fine": inData_fine,
                        "ora_fine": inOra_fine,
                        "note": inNote
                    },
                    success: function (oResults) {
                        MessageBox.success(this.getView().getModel("i18n").getResourceBundle().getText("prenotazionecreata"));
                        this.onClose();
                    },
                    error: function () {
                        MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("errorepostdb"));
                        this.onClose();
                    }
                });


                //this.originView.getModel("DatiAuto").refresh();
                //this.onClose();
            },
            _getDialog: function () {
                if (!this._oDialog) {
                    // create dialog via fragment factory
                    this._oDialog = sap.ui.xmlfragment("carsharing.view.DatiPrenotazione", this);
                }
                return this._oDialog;
            },
        });
    });  