sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("carsharing.controller.main", {
			onInit: function () {

            },            
            launchPrenotazioni: function (){
                this.getOwnerComponent().getRouter().navTo("RouteListaPrenotazioni"); //Navigazione pagina home
            },
            launchAuto: function (){
                this.getOwnerComponent().getRouter().navTo("RouteListaAuto"); //Navigazione pagina home
            },
		});
	});
