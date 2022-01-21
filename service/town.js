var sql = require("mssql");

var config = {
    user: 'sa',
    password: 'abc12345',
    server: 'localhost', 
    database: 'GTI_DP_CAL' 
    };

async function selectAllFromSQL() {
    const query = "SELECT CODIGO_PROCESO, CONS_AGRUPA_TRANS,CONS_TRANSACCION, TOTAL_IMPORTE, FECHA_CREACION, FECHA_EJECUCION, CASE WHEN ESTADO='C' THEN 'CONFIRMADO' WHEN ESTADO='P' THEN 'PENDIENTE' WHEN ESTADO='E' THEN 'ERRONEO' END AS 'ESTADO', CANTIDAD_EJECUCIONES, DETALLE_EJECUCION, GUID_VALUE,SOCIEDAD_FINANCIERA,CANTIDAD_REG_INTEGRAR FROM SAPINT_INT_DATOS_CONTROL ";

    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch (err) {
        console.log(err);
        return "{"+ err +"}";
    }
}

async function selectAllEntradaPagos() {
    const query = "SELECT C.Num_Comp, C.Banco, C.Agencia, C.Fecha_Pago, C.Factura, C.Num_Cuenta, F.Monto, CASE WHEN C.Estado = 'TRUE' THEN 'ANULADO' ELSE ' ' END AS 'Estado', C.OBSERVACIONES , C.CuentaCliente, C.SOCIEDAD_FINANCIERA, C.CODIGO_PROCESO, C.CONS_AGRUPA_TRANS, C.CONS_TRANSACCION, C.USUARIO_INSERTA,C.FECHA_INSERCION,C.USUARIO_ACTUALIZA, C.FECHA_ACTUALIZACION FROM Comp_Pago C, Facturas F WHERE C.CODIGO_PROCESO IS NULL AND C.CONS_TRANSACCION IS NULL AND C.CONS_AGRUPA_TRANS IS NULL AND C.SOCIEDAD_FINANCIERA IS NULL AND F.Identificador= C.Factura";

    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch (err) {
        console.log(err);
        return "{"+ err +"}";
    }
}

async function selectBancosList() {
    const query = "SELECT COD,NOMBRE,TIPO FROM BANCOS_COMERCIALES";

    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch (err) {
        console.log(err);
        return "{"+ err +"}";
    }
}

async function ParametrosEntradaPagos(value3, fechaPago, FechaFin) {
   
    var test = value3;
    console.log(FechaFin);
    //const query = "SELECT C.Num_Comp, C.Banco, C.Agencia, C.Fecha_Pago, C.Factura, C.Num_Cuenta, F.Monto, CASE WHEN C.Estado = 'TRUE' THEN 'ANULADO' ELSE ' ' END AS 'Estado',C.OBSERVACIONES , C.CuentaCliente, C.SOCIEDAD_FINANCIERA, C.CODIGO_PROCESO, C.CONS_AGRUPA_TRANS, C.CONS_TRANSACCION,C.USUARIO_INSERTA, C.FECHA_INSERCION, C.USUARIO_ACTUALIZA,C.FECHA_ACTUALIZACION FROM Comp_Pago C, Facturas F WHERE (C.Fecha_Pago>=CONVERT(DATE,${yourVariable},105) AND C.Fecha_Pago<=CONVERT(DATETIME,'{1} 23:59:59')) AND (C.Factura LIKE '%{2}%') AND F.Identificador=C.Factura";
    const query = `SELECT C.Num_Comp, C.Banco, C.Agencia, C.Fecha_Pago, C.Factura, C.Num_Cuenta, F.Monto, CASE WHEN C.Estado = 'TRUE' THEN 'ANULADO' ELSE ' ' END AS 'Estado',C.OBSERVACIONES , C.CuentaCliente, C.SOCIEDAD_FINANCIERA, C.CODIGO_PROCESO, C.CONS_AGRUPA_TRANS, C.CONS_TRANSACCION,C.USUARIO_INSERTA, C.FECHA_INSERCION, C.USUARIO_ACTUALIZA,C.FECHA_ACTUALIZACION FROM Comp_Pago C, Facturas F WHERE C.Fecha_Pago>=CONVERT(DATETIME,'${fechaPago} 23:59:59') AND  C.Fecha_Pago<=CONVERT(DATETIME,'${FechaFin} 23:59:59') AND(C.Factura LIKE '%${test}%') AND F.Identificador=C.Factura`
    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch (err) {
        console.log(err);
        return "[{"+ err +"}]";
    }
}

async function BuscarDomicialiaciones(txt_SAPID, txt_Propietario, txt_NumCuenta) {
   
   
    //const query = "SELECT C.Num_Comp, C.Banco, C.Agencia, C.Fecha_Pago, C.Factura, C.Num_Cuenta, F.Monto, CASE WHEN C.Estado = 'TRUE' THEN 'ANULADO' ELSE ' ' END AS 'Estado',C.OBSERVACIONES , C.CuentaCliente, C.SOCIEDAD_FINANCIERA, C.CODIGO_PROCESO, C.CONS_AGRUPA_TRANS, C.CONS_TRANSACCION,C.USUARIO_INSERTA, C.FECHA_INSERCION, C.USUARIO_ACTUALIZA,C.FECHA_ACTUALIZACION FROM Comp_Pago C, Facturas F WHERE (C.Fecha_Pago>=CONVERT(DATE,${yourVariable},105) AND C.Fecha_Pago<=CONVERT(DATETIME,'{1} 23:59:59')) AND (C.Factura LIKE '%{2}%') AND F.Identificador=C.Factura";
    const query = `SELECT IdDomiciliacion ,numero_CuentaCliente, banco_CuentaCliente, moneda_CuentaCliente, NomDueño_CuentaCliente, cedula_CuentaCliente, correoNotificaciones_Representante, telSMS_Representante, dirProvincia_Cliente, dirCanton_Cliente, dirOtrasSenas_Cliente, SAP_ID, EstadoDomiciliacion, CASE EstadoDomiciliacion WHEN 1 THEN 'DOMICILIACIÓN PENDIENTE DE PROCESAR' WHEN 2 THEN 'DOMICILIACIÓN PROCESADA' WHEN 3 THEN 'DOMICILIACIÓN DESACTIVADA' WHEN 4 THEN 'DOMICILIACIÓN RECHAZADA' WHEN 5 THEN 'DOMICILIACIÓN ENVIADA (A BAC PARA SER PROCESADA)' ELSE 'ESTADO INCORRECTO' END [Descripción de domiliciación], FECHA_INSERCION, USUARIO_INSERTA, FECHA_ACTUALIZACION, USUARIO_ACTUALIZA FROM DomiciliacionGTI WHERE SAP_ID LIKE '%${txt_SAPID}%' AND NomDueño_CuentaCliente LIKE '%${txt_Propietario}%' AND numero_CuentaCliente LIKE '%${txt_NumCuenta}%'`
 
    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch (err) {
        console.log(err);
        return "[{"+ err +"}]";
    }
}

async function ParametrosMonitor(CodigoProceso,Estado, fechaPago, FechaFin) {
   
    var codEstado ;
    var codProceso ;
    if(CodigoProceso === 'Cualquiera'){
        CodigoProceso = '%';
      }

      if(Estado === 'Cualquiera'){
        Estado = '%';
      } 
  
    //const query = "SELECT C.Num_Comp, C.Banco, C.Agencia, C.Fecha_Pago, C.Factura, C.Num_Cuenta, F.Monto, CASE WHEN C.Estado = 'TRUE' THEN 'ANULADO' ELSE ' ' END AS 'Estado',C.OBSERVACIONES , C.CuentaCliente, C.SOCIEDAD_FINANCIERA, C.CODIGO_PROCESO, C.CONS_AGRUPA_TRANS, C.CONS_TRANSACCION,C.USUARIO_INSERTA, C.FECHA_INSERCION, C.USUARIO_ACTUALIZA,C.FECHA_ACTUALIZACION FROM Comp_Pago C, Facturas F WHERE (C.Fecha_Pago>=CONVERT(DATE,${yourVariable},105) AND C.Fecha_Pago<=CONVERT(DATETIME,'{1} 23:59:59')) AND (C.Factura LIKE '%{2}%') AND F.Identificador=C.Factura";
    const query = `SELECT CODIGO_PROCESO, CONS_AGRUPA_TRANS, CONS_TRANSACCION, TOTAL_IMPORTE, FECHA_CREACION, FECHA_EJECUCION, CASE WHEN ESTADO='C' THEN 'CONFIRMADO' WHEN ESTADO='P' THEN 'PENDIENTE' WHEN ESTADO='E' THEN 'ERRONEO' END AS 'ESTADO', CANTIDAD_EJECUCIONES, DETALLE_EJECUCION, GUID_VALUE,SOCIEDAD_FINANCIERA,CANTIDAD_REG_INTEGRAR FROM SAPINT_INT_DATOS_CONTROL WHERE (FECHA_CREACION>=CONVERT(DATETIME,'${fechaPago} ') AND  FECHA_CREACION<=CONVERT(DATETIME,'${FechaFin}')) AND CODIGO_PROCESO LIKE '%${CodigoProceso}%' AND Estado LIKE '%${Estado}%'`
    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch (err) {
        console.log(err);
        return "[{"+ err +"}]";
    }
}

async function ParametrosHistorialPagos(value3, fechaPago, FechaFin) {
   
    var test = value3;
    console.log(FechaFin);
    console.log(fechaPago);
    console.log(test);
    //const query = "SELECT C.Num_Comp, C.Banco, C.Agencia, C.Fecha_Pago, C.Factura, C.Num_Cuenta, F.Monto, CASE WHEN C.Estado = 'TRUE' THEN 'ANULADO' ELSE ' ' END AS 'Estado',C.OBSERVACIONES , C.CuentaCliente, C.SOCIEDAD_FINANCIERA, C.CODIGO_PROCESO, C.CONS_AGRUPA_TRANS, C.CONS_TRANSACCION,C.USUARIO_INSERTA, C.FECHA_INSERCION, C.USUARIO_ACTUALIZA,C.FECHA_ACTUALIZACION FROM Comp_Pago C, Facturas F WHERE (C.Fecha_Pago>=CONVERT(DATE,${yourVariable},105) AND C.Fecha_Pago<=CONVERT(DATETIME,'{1} 23:59:59')) AND (C.Factura LIKE '%{2}%') AND F.Identificador=C.Factura";
    const query = `SELECT * FROM Comp_Pago_Bita WHERE (Fecha_Pago>='${fechaPago}' AND Fecha_Pago<='${FechaFin}') OR (Factura=${test})`
  
    
    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch (err) {
        console.log(err);
        return "[{"+ err +"}]";
    }
}

async function ParametrosEstadoCuenta(value3, fechaPago, FechaFin) {
   
    var test = value3;
    console.log(FechaFin);
    console.log(fechaPago);
    console.log(test);
    var cuentaValor;

    if(value3 === 'Null')
    {
        cuentaValor = '%';
      }
      else{
        cuentaValor = value3;
      }


    //const query = "SELECT C.Num_Comp, C.Banco, C.Agencia, C.Fecha_Pago, C.Factura, C.Num_Cuenta, F.Monto, CASE WHEN C.Estado = 'TRUE' THEN 'ANULADO' ELSE ' ' END AS 'Estado',C.OBSERVACIONES , C.CuentaCliente, C.SOCIEDAD_FINANCIERA, C.CODIGO_PROCESO, C.CONS_AGRUPA_TRANS, C.CONS_TRANSACCION,C.USUARIO_INSERTA, C.FECHA_INSERCION, C.USUARIO_ACTUALIZA,C.FECHA_ACTUALIZACION FROM Comp_Pago C, Facturas F WHERE (C.Fecha_Pago>=CONVERT(DATE,${yourVariable},105) AND C.Fecha_Pago<=CONVERT(DATETIME,'{1} 23:59:59')) AND (C.Factura LIKE '%{2}%') AND F.Identificador=C.Factura";
    const query = `SELECT * FROM EstadoDeCuentaGTI E WHERE (E.FECHAESTADOCUENTA >=CONVERT(DATETIME,'${fechaPago}') AND E.FECHAESTADOCUENTA <=CONVERT(DATETIME,'${FechaFin}'))  AND E.NUMEROESTADOCUENTA LIKE '%${cuentaValor}%'`;
               
    
    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch (err) {
        console.log(err);
        return "[{"+ err +"}]";
    }
}

async function selectFromSQL(column, value, column2, value2) {
    const query = "SELECT * FROM Bancos WHERE " + column + "='" + value + "' and "+ column2 + "='" + value2 + "'";

    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch (err) {
        console.log(err);
        return "[{"+ err +"}]";
    }
}





var town = {

    Anular: async function (req, res) {
        try {
            

            let pool = await sql.connect(config);
            let results = await pool.request()
                .input('identificacion', sql.VarChar(4), req.params.identificacion)
                .input('observaciones', sql.NVarChar(6), req.params.observaciones)
                .output('resultado', sql.NVarChar(14), req.params.resultado)               
                .execute('PA_AnularFacturas')
    
            console.dir(results);
    
        } catch (err) {
            res.json({
                "error": true,
                "message": "Error executing query"
            })
        }
    },

    EditarDomiciliacion: async function (req, res) {
        try {
            

            let pool = await sql.connect(config);
            let results = await pool.request()
                .input('identificacion', sql.VarChar(4), req.params.identificacion)
                .input('observaciones', sql.NVarChar(6), req.params.observaciones)
                .output('resultado', sql.NVarChar(14), req.params.resultado)               
                .execute('PA_AnularFacturas')
    
            console.dir(results);
    
        } catch (err) {
            res.json({
                "error": true,
                "message": "Error executing query"
            })
        }
    },

    Reactivar: async function (req, res) {
        try {
            

            let pool = await sql.connect(config);
            let results = await pool.request()
                .input('identificacion', sql.VarChar(4), req.params.identificacion)
                .input('observaciones', sql.NVarChar(6), req.params.observaciones)
                .output('resultado', sql.NVarChar(14), req.params.resultado)               
                .execute('PA_ReActivarFacturas')
    
            console.dir(results);
    
        } catch (err) {
            res.json({
                "error": true,
                "message": "Error executing query"
            })
        }
    },

    Procesar: async function (req, res) {
        try {
            

            let pool = await sql.connect(config);
            let results = await pool.request()                           
                .execute('PA_ProcesarEstadosCuenta')
    
            console.dir(results);
    
        } catch (err) {
            res.json({
                "error": true,
                "message": "Error executing query"
            })
        }
    },


    reprocesarMon: async function (req, res) {
        try {
            

            let pool = await sql.connect(config);
            let results = await pool.request()
                .input('SOCIEDAD_FINANCIERA', sql.VarChar(4), req.params.SOCIEDAD_FINANCIERA)
                .input('CODIGO_PROCESO', sql.NVarChar(6), req.params.CODIGO_PROCESO)
                .input('CONS_AGRUPA_TRANS', sql.NVarChar(14), req.params.CONS_AGRUPA_TRANS)
                .input('CODIGO_PROCESO', sql.Decimal(14), req.params.CODIGO_PROCESO)
                // .output('output_parameter', sql.VarChar(50))
                .execute('PA_ReprocesaCompFI40')
    
            console.dir(results);
    
        } catch (err) {
            res.json({
                "error": true,
                "message": "Error executing query"
            })
        }
    },

    list: async function (req, res) {
        const found = await selectAllFromSQL();
        if (found) {
            console.log("All Towns found");
            res.send(found);
        } else {
            console.log("Towns not found");
            res.status(404).send("Towns not found");
        }
    },

    EntradaPlist: async function (req, res) {
        const found = await selectAllEntradaPagos();
        if (found) {
            console.log("All Towns found");
            res.send(found);
        } else {
            console.log("Towns not found");
            res.status(404).send("Towns not found");
        }
    },

    Bancoslist: async function (req, res) {
        const found = await selectBancosList();
        if (found) {
            console.log("All Towns found");
            res.send(found);
        } else {
            console.log("Towns not found");
            res.status(404).send("Towns not found");
        }
    },

    Reprocesar: async function (req, res) {
        const townId = req.params.id;
        const Name = req.params.Name;
        const found = await selectFromSQL("id_banco", townId,"nombre", Name);
        if (found) {
            console.log("Town found by ID: " + townId);
            res.send(found);
        } else {
            console.log("Town not found by ID: " + townId);
            res.status(404).send("Town not found by ID: " + townId);
        }
    },

    findId: async function (req, res) {
        const townId = req.params.id;
        const Name = req.params.Name;
        const found = await selectFromSQL("id_banco", townId,"nombre", Name);
        if (found) {
            console.log("Town found by ID: " + townId);
            res.send(found);
        } else {
            console.log("Town not found by ID: " + townId);
            res.status(404).send("Town not found by ID: " + townId);
        }
    },
    
    Monitor: async function (req, res) {
        const Fecha_Pago = req.params.Fecha_Pago;
        const Fecha_Fin = req.params.Fecha_Fin;
        const CodigoProceso = req.params.CodigoProceso;
        const Estado = req.params.Estado ;
        const found = await ParametrosMonitor(req.params.CodigoProceso,req.params.Estado,req.params.Fecha_Pago,req.params.Fecha_Fin);
        if (found) {
            //console.log("Town found by ID: " + townId);
            res.send(found);
        } else {
            //console.log("Town not found by ID: " + townId);
            res.status(404).send("Town not found by ID: " + townId);
        }
    },

    

    Domiciliaciones: async function (req, res) {
  
        const found = await BuscarDomicialiaciones(req.params.txt_SAPID,req.params.txt_Propietario,req.params.txt_NumCuenta);
        if (found) {
            //console.log("Town found by ID: " + townId);
            res.send(found);
        } else {
            //console.log("Town not found by ID: " + townId);
            res.status(404).send("Town not found by ID: " + townId);
        }
    },

    PagosPendientes: async function (req, res) {
        const Fecha_Pago = req.params.Fecha_Pago;
        const Fecha_Fin = req.params.Fecha_Fin;
        const Factura = req.params.Factura;
        const found = await ParametrosEntradaPagos(req.params.Factura,req.params.Fecha_Pago,req.params.Fecha_Fin);
        if (found) {
            //console.log("Town found by ID: " + townId);
            res.send(found);
        } else {
            //console.log("Town not found by ID: " + townId);
            res.status(404).send("Town not found by ID: " + townId);
        }
    },

    HistorialPagosRecibidos: async function (req, res) {
        const Fecha_Pago = req.params.Fecha_Pago;
        const Fecha_Fin = req.params.Fecha_Fin;
        const Factura = req.params.Factura;
        const found = await ParametrosHistorialPagos(req.params.Factura,req.params.Fecha_Pago,req.params.Fecha_Fin);
        if (found) {
            //console.log("Town found by ID: " + townId);
            res.send(found);
        } else {
            //console.log("Town not found by ID: " + townId);
            res.status(404).send("Town not found by ID: " + townId);
        }
    },

    ParametrosEstadoCuenta: async function (req, res) {
        const Fecha_Pago = req.params.Fecha_Pago;
        const Fecha_Fin = req.params.Fecha_Fin;
        const Factura = req.params.Factura;
        const found = await ParametrosEstadoCuenta(req.params.Factura,req.params.Fecha_Pago,req.params.Fecha_Fin);
        if (found) {
            //console.log("Town found by ID: " + townId);
            res.send(found);
        } else {
            //console.log("Town not found by ID: " + townId);
            res.status(404).send("Town not found by ID: " + townId);
        }
    },

    Login: async function (req, res) {       
        var ActiveDirectory = require('activedirectory');
var ad = new ActiveDirectory('ldap://dospinos.com', 'dc=dospinos,dc=com', 'ex_aestrada@dospinos.com', 'Dpinos2021');
var username = 'ex_aestrada@dospinos.com';
ad.findUser(username, function(err, user) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  if (! user) console.log('User: ' + username + ' not found.');
  else console.log(JSON.stringify(user));
});

    },



    findName: async function (req, res) {
        const townName = req.params.name;
        const found = await selectFromSQL("name", townName);
        // console.log(found);

        if (found) {
            console.log("Town found by name: " + townName);
            res.send(found);
        } else {
            console.log("Town not found by name: " + townName);
            res.status(404).send("Town not found by name: " + townName);
        }
    },

    findCC: async function (req, res) {
        const townCC = req.params.cc;
        const found = await selectFromSQL("country_code", townCC);
        // console.log(found);

        if (found) {
            console.log("Town found by country code: " + townCC);
            res.send(found);
        } else {
            console.log("Town not found by country code: " + townCC);
            res.status(404).send("Town not found by country code: " + townCC);
        }[]
    },
};

module.exports = town;
