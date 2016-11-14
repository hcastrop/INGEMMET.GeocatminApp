{
    "urlRegion": "http://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/WEBGIS_CARTOGRAFIA_DEMARCACION_WGS84/MapServer/0",
    "camposRegion": "CD_DEPA, NM_DEPA",
    "urlProvincia": "http://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/WEBGIS_CARTOGRAFIA_DEMARCACION_WGS84/MapServer/1",
    "camposProvincia": "CD_PROV, NM_PROV",
    "urlDistrito": "http://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/WEBGIS_CARTOGRAFIA_DEMARCACION_WGS84/MapServer/2",
    "camposDistrito": "CD_DIST, NM_DIST",
    "CapaBuscar": "Catastro Minero",
    "CapaCampoDF": "UBIGEO",
    "urlCatastro": "http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO/MapServer/0",
    "cells": [
              {
                  "field": "CODIGOU",
                  "name": "C&oacute;digo",
                  "width": "100px"
              },
              {
                  "field": "CODIGOU",
                  "name": "Ver Exp.",
                  "width": "100px",
                  "formatter": function (value) {
                      var url = "http://www.ingemmet.gob.pe/sidemcat?codDM=" + value + "&tipo=1";
                      return "<a href='" + url + "' target='_blank'>Vizualizar</a>";
                  }
              },
              {
                  "field": "DEMAGIS",
                  "name": "Demarcacion",
                  "width": "100px",
                  "editable": true
              },
              {
                  "field": "ZONA",
                  "name": "zona",
                  "width": "50px"
              },
              {
                  "field": "CARTA",
                  "name": "Carta",
                  "width": "50px"
              },
              {
                  "field": "CONCESION",
                  "name": "Nombres",
                  "width": "200px"
              }

    ]
}