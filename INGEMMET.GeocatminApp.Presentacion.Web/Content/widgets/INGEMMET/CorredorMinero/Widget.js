/// <reference path="../js/jsWidgetAMD.js" />
define(['dojo/_base/declare',
        'jimu/BaseWidget',
        "../js/jsWidgetAMD",
        'dijit/_WidgetsInTemplateMixin',
        "dojo/data/ItemFileReadStore",
        "dijit/registry",
        "dojox/grid/DataGrid",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "dojo/parser",
        "dijit/Dialog",
        "dijit/form/Button",
        "dijit/form/TextBox",
        "dijit/form/DateTextBox",
        "dijit/form/TimeTextBox"],
  function (declare,
            BaseWidget,
            _app,
            _WidgetsInTemplateMixin,
            ItemFileReadStore,
            registry,
            DataGrid,
            ArcGISDynamicMapServiceLayer,
            parser,
            Dialog,
            Button,
            TextBox,
            DateTextBox,
            TimeTextBox) {
    //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget, _WidgetsInTemplateMixin], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      name: 'CorredorMineroWidget',


      //methods to communication with app container:

       postCreate: function() {
         this.inherited(arguments);
           //console.log('postCreate');

         this._thisCorredor;

         this._url;
         this._urlMapa;
         this._layoutCorredor;
         this._loName
       },

       startup: function() {
        this.inherited(arguments);
        _thisCorredor = this;

        _url = this.config.urlCatastroCorredor;
        _urlMapa = this.config.urlCorredorMapa;
        _loName = this.config.urlCorredorNombreCapa;
        _layoutCorredor = this.config.layout;

        console.log('startup');

        dijit.byId("btnBuscarCM").on("click", function (event) { _thisCorredor.fnBuscar(); });
        




       },

       onOpen: function(){
           console.log('onOpen');
           _thisCorredor.onSearchCorredor();
           _thisCorredor.fnBuscar();
           _thisCorredor.onResumen("1=1");

           _thisCorredor.fnResize();

       },


       onSearchCorredor: function (_url) {

           items = [
                   { ESTADO: "Otros", DM: 0, IMAGEN: "OTROS" },
                   { ESTADO: "Tramite", DM: 0, IMAGEN: "TRAMITE" },
                   { ESTADO: "Extinguido", DM: 0, IMAGEN: "Extinguido" },
                   { ESTADO: "Titulado", DM: 0, IMAGEN: "Titulado" },
                   { ESTADO: "Total", DM: 0, IMAGEN: "Total" }
           ];


       },
       fnBuscar: function () {
           var _loStrWhere = "1=1";
          

           _app.fnAbrirWidgetResultados(_thisCorredor, _loStrWhere, _url, _layoutCorredor);
              
            
       },
       
       onResumen: function (loUbigeo)
       {
           console.log("onResumen ...." + loUbigeo);


           var statDef = new esri.tasks.StatisticDefinition();
           statDef.statisticType = "count";
           statDef.onStatisticField = "LEYENDA";
           statDef.outStatisticFieldName = "Denuncios";


           queryTaskUbigeo = new esri.tasks.QueryTask("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MADRE_DIOS/MapServer/0");
           //initialize query
           queryUbigeo = new esri.tasks.Query();
           queryUbigeo.returnGeometry = false;
           queryUbigeo.outStatistics = [statDef];
           queryUbigeo.outFields = [ "LEYENDA" ];
           queryUbigeo.orderByFields = [ "LEYENDA" ];
           queryUbigeo.groupByFieldsForStatistics = ["LEYENDA"];
           
           queryUbigeo.where = "1=1"// "estado <> 'Y' and (demagis like '" + loUbigeo + "%' or demagis like '%;" + loUbigeo + "%')";

           queryTaskUbigeo.execute(queryUbigeo, _thisCorredor.showResultsUbigeo);

           /**********Cargar Capa de Corre4dor Miero **********/
           var loEncontro = false;
           for (var j = 0, jl = _viewerMap.layerIds.length; j < jl; j++) {
               var currentLayer = _viewerMap.getLayer(_viewerMap.layerIds[j]);
               if (currentLayer.id == _loName) {
                   currentLayer.setVisibility(true);
                   loEncontro = true;
               }
           }

           if (!loEncontro)
           {
               
               var CorredorOptions = {
                   "id": _loName,
                   "Name": _loName,
                   "opacity": 0.8,
                   "showAttribution": false
               };
               var CorredorLayer = new ArcGISDynamicMapServiceLayer(_urlMapa, CorredorOptions);

               _viewerMap.addLayer(CorredorLayer);
           }

       },
       showResultsUbigeo: function (result) {
           console.log('QueryResultados...', result);
           var _itemsDenuncios = [];

           var _total = 0
           for (var i = 0, il = result.features.length; i < il; i++) {

               var _item = {};
               _item['ESTADO'] = result.features[i].attributes.LEYENDA;
               _item['DM'] = result.features[i].attributes.DENUNCIOS;
               _item['IMAGEN'] = ((result.features[i].attributes.LEYENDA) == null) ? 'Total' : (result.features[i].attributes.LEYENDA).toLowerCase();
               _itemsDenuncios.push(_item);
               _total = _total + result.features[i].attributes.DENUNCIOS;
           }

           var _item = {};
           _item['ESTADO'] = "TOTAL";
           _item['DM'] = _total;
           _item['IMAGEN'] = "TOTAL";
           _itemsDenuncios.push(_item);
              

           _thisCorredor.fnCrearGrilla(_itemsDenuncios);


       },

       fnCrearGrilla: function (items) {


           var layout = [[
               { 'name': 'Estado', 'field': 'ESTADO', 'width': '100px' },
               { 'name': 'N&ordm; DM', 'field': 'DM', 'width': '50px', "styles": "text-align:right;" },
               {
                   'name': ' ', 'field': 'IMAGEN', 'width': '40px', "styles": "text-align:center;", formatter: function (value) {
                       return "<img src='Content/widgets/INGEMMET/images/DM_" + value + ".png'/>";
                   }
               }
           ]]

           var ResumenGrid, store;

           var data = {
               items: items
           };

           store = new ItemFileReadStore({
               data: data
           });

           var ResumenGrid = registry.byId("ResumenGrid");
           ResumenGrid.attr("structure", layout);
           ResumenGrid.setStore(store);




           _thisCorredor.fnResize();
       },
       fnResize: function () {
           _app.wResize(_thisCorredor, "280px", "230px");
       },
       onClose: function(){
           console.log('onClose Corredor Minero');
           _app.fnAbrirWidgetResultados(this, "1=2", "", "");
       }

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });