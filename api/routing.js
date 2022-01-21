"use strict";

const controller = require("./controller");

module.exports = function (app) {
  app.route("/").get(controller.app);
  app.route("/about").get(controller.about);
  app.route("/DatosControl/:CodigoProceso/:Estado?/:Fecha_Pago/:Fecha_Fin").get(controller.Monitor);
  app.route("/EntradaPagos").get(controller.EntradaPagosList);
  app.route("/EntradaPagosPendientes/:Factura/:Fecha_Pago/:Fecha_Fin").get(controller.EntradaPagosPendientes);
  app.route("/HistorialPagos/:Factura/:Fecha_Pago/:Fecha_Fin").get(controller.HistorialPagosRecibidos);
  app.route("/EstadoCuenta/:Factura/:Fecha_Pago/:Fecha_Fin").get(controller.ParametrosEstadoCuenta);
  app.route("/Anular/:identificacion/:observaciones").post(controller.Anular);
  app.route("/Reactivar/:identificacion/:observaciones").post(controller.Reactivar);
  app.route("/Procesar").post(controller.Procesar);
  app.route("/ObtenerDomiciliaciones/:txt_SAPID/:txt_Propietario/:txt_NumCuenta").get(controller.Domiciliaciones);
  app.route("/Reprocesar/:SOCIEDAD_FINANCIERA/:CODIGO_PROCESO/:CONS_AGRUPA_TRANS/:CONS_TRANSACCION").post(controller.ReprocesarMonitor);
  app.route("/Login/:Usuario/:Password").get(controller.Login);
  app.route("/BancosComercialesList").get(controller.BancosComercialesList);
  app.route("/EditarDomiciliacion/:NUM_CUENTA/:BANCO/:MONEDA/:NOM_PROPIETARIO/:CED_PROP/:EMAIL/:SMS/:PROV_PROP/:CANTON_PROP/:SAP_ID/:DIR_PROP/:ESTADO_DOMI").post(controller.EditarDomiciliacion);


 
};
