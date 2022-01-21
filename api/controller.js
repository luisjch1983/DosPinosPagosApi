'use strict';

var properties = require('../package.json')
var town = require('../service/town');
// var town = require('../service/town-azure');
// var town = require('../service/town-pg');
// var town = require('../service/town-sql');
// var town = require('../service/town-dsql');
var cors = require('cors');
var country = require('../service/country');
var weather = require('../service/weather');
var currency = require('../service/currency');

var controllers = {

    findCURR: function(req, res) {
        currency.findCURR(req, res, function(err, curr) {
            if (err)
                res.send(err);
            res.send(curr);
        });
    },

    findALL: cors(),function(req, res) {
        currency.findALL(req, res, function(err, curr) {
            if (err)
                res.send(err);
            res.send(curr);
        });
    },

    townList: function(req, res) {
        town.list(req, res, function(err, towns) {
            if (err)
                res.send(err);
            res.send(towns);
        });
    },

    EntradaPagosList: function(req, res) {
        town.EntradaPlist(req, res, function(err, towns) {
            if (err)
                res.send(err);
            res.send(towns);
        });
    },
   
    BancosComercialesList: function(req, res) {
        town.Bancoslist(req, res, function(err, towns) {
            if (err)
                res.send(err);
            res.send(towns);
        });
    },

    Monitor: function(req, res) {
        town.Monitor(req, res, function(err, foundTown) {
            if (err)
                res.send(err);
            res.json(foundTown);
        });
    },


    EntradaPagosPendientes: function(req, res) {
        town.PagosPendientes(req, res, function(err, foundTown) {
            if (err)
                res.send(err);
            res.json(foundTown);
        });
    },
    
    HistorialPagosRecibidos: function(req, res) {
        town.HistorialPagosRecibidos(req, res, function(err, foundTown) {
            if (err)
                res.send(err);
            res.json(foundTown);
        });
    },

    ParametrosEstadoCuenta: function(req, res) {
        town.ParametrosEstadoCuenta(req, res, function(err, foundTown) {
            if (err)
                res.send(err);
            res.json(foundTown);
        });
    },

    Login: function(req, res) {
        town.Login(req, res, function(err, foundTown) {
            if (err)
                res.send(err);
            res.json(foundTown);
        });
    },

    Domiciliaciones: function(req, res) {
        town.Domiciliaciones(req, res, function(err, foundTown) {
            if (err)
                res.send(err);
            res.json(foundTown);
        });
    },


    ReprocesarMonitor: function(req, res) {
        town.reprocesarMon(req, res, function(err, towns) {
            if (err)
                res.send(err);
            res.send(towns);
        });
    },

    Anular: function(req, res) {
        town.Anular(req, res, function(err, towns) {
            if (err)
                res.send(err);
            res.send(towns);
        });
    },

    EditarDomiciliacion: function(req, res) {
        town.EditarDomiciliacion(req, res, function(err, towns) {
            if (err)
                res.send(err);
            res.send(towns);
        });
    },

    Reactivar: function(req, res) {
        town.Reactivar(req, res, function(err, towns) {
            if (err)
                res.send(err);
            res.send(towns);
        });
    },

    Procesar: function(req, res) {
        town.Procesar(req, res, function(err, towns) {
            if (err)
                res.send(err);
            res.send(towns);
        });
    },


    findTownName: function(req, res) {
        town.findName(req, res, function(err, foundTown) {
            if (err)
                res.send(err);
            res.json(foundTown);
        });
    },

    findTownId: function(req, res) {
        town.findId(req, res, function(err, foundTown) {
            if (err)
                res.send(err);
            res.json(foundTown);
        });
    },

    findTownCC: function(req, res) {
        town.findCC(req, res, function(err, foundTown) {
            if (err)
                res.send(err);
            res.json(foundTown);
        });
    },

    countryList: function(req, res) {
        country.list(req, res, function(err, countries) {
            if (err)
                res.send(err);
            res.send(countries);
        });
    },

    findCountryName: function(req, res) {
        country.findName(req, res, function(err, foundCountry) {
            if (err)
                res.send(err);
            res.json(foundCountry);
        });
    },

    findCountryId2: function(req, res) {
        country.findId2(req, res, function(err, foundCountry) {
            if (err)
                res.send(err);
            res.json(foundCountry);
        });
    },

    findWeatherName: function(req, res) {
        weather.findName(req, res, function(err, foundWeather) {
            if (err)
                res.send(err);
            res.json(foundWeather);
        });
    },

    findWeatherCondition: function(req, res) {
        weather.findCondition(req, res, function(err, foundCondition) {
            if (err)
                res.send(err);
            res.json(foundCondition);
        });
    },

    app: function(req, res) {
        res.sendFile(__dirname + '/index.html');
        // res.send('This is the TOWN-COUNTRY-WEATHER-CURRENCY API');
    },
    about: function(req, res) {
        var aboutInfo = {
            name: properties.name,
            version: properties.version
        }
        res.json(aboutInfo);
    },
};

module.exports = controllers;