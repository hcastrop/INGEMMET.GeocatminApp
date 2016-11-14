define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'dijit/_WidgetsInTemplateMixin',
        'dojo/_base/lang',
        'dojo/dom',
        'dojo/dom-class',
        'dojo/dom-style',
        'dojo/on',
        "dijit/registry",
        "jimu/WidgetManager",
        'jimu/PanelManager',
        'jimu/utils',
        'dijit/form/MultiSelect',
        'esri/layers/GraphicsLayer',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/Color',
        'esri/graphicsUtils',
        'dojo/domReady!',
        'esri/layers/ImageParameters',
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "dojox/grid/DataGrid",
        "dojo/data/ItemFileReadStore",
        "dojo/_base/array",
        "../js/jsWidgetAMD",
        "../js/jsWidgetControles",
        "../js/jsWidgetLayer",
         "dojo/parser",
         "dojo/store/Memory",
         "dijit/form/ComboBox",
        "dojo/domReady!"
],
  function (declare,
            BaseWidget,
            _WidgetsInTemplateMixin,
            lang, dom, domClass, domStyle, on,
            registry,
            WidgetManager,
            PanelManager,
            utils,
            MultiSelect,
            GraphicsLayer,
            SimpleFillSymbol,
            SimpleLineSymbol,
            Color,
            graphicsUtils,
            domReady,
            ImageParameters,
            ArcGISDynamicMapServiceLayer,
            DataGrid,
            ItemFileReadStore, arrayUtils,
            _app,
            _appControl,
            _appLayer,
            parser,
            Memory, ComboBox
            ) {
      this.graphicsDpto = new GraphicsLayer();
      this.graphicsProv = new GraphicsLayer();
      this.graphicsDist = new GraphicsLayer();

      symbolDpto = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1), new Color([255, 0, 0, 0.25]));
      symbolProv = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1), new Color([255, 0, 0, 0.35]));
      symbolDist = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1), new Color([255, 0, 0, 0.45]));


      var imageParameters;
      var dynamicMapServiceLayer;

      //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget, _WidgetsInTemplateMixin], {
          // Custom widget code goes here

          baseClass: 'jimu-widget-customwidget',

          //this property is set by the framework when widget is loaded.
          name: 'BuscarDMUbigeo_INGEMMET',


          //methods to communication with app container:

          postCreate: function () {
              //console.log('postCreate');
              this.inherited(arguments);
              this._thisDMUbigeo;
              this._urlRegion;
              this._urlCuadrangulo
              this._camposRegion;
              this._camposProvincia;
              this._camposDistrito;
              this._Accion;
              this._urlCatastro;
              this._urlCatastroCorredor;
              this._layout;
              this._arrayCatastro;
              this._arrayCatastroCorredor;
              this._height;
              this._width;

              this._loWhereResumen;
              // this.wManager = WidgetManager.getInstance();
              _viewerMap.addLayer(this.graphicsDpto);
          },

          startup: function () {
              this.inherited(arguments);
              _thisDMUbigeo = this;
              console.log('startup');

              //console.log(this.config.urlRegion);
              _urlRegion = this.config.urlRegion;
              _urlProvincia = this.config.urlProvincia;
              _urlDistrito = this.config.urlDistrito;
              _urlCatastro = this.config.urlCatastro;
              _urlCatastroCorredor = this.config.urlCatastroCorredor;
              _urlCuadrangulo = this.config.urlCuadrangulo;
              _arrayCatastro = this.config.Catastro;
              _arrayCatastroCorredor = this.config.CatastroCorredor;

              _camposRegion = this.config.camposRegion;
              _camposProvincia = this.config.camposProvincia;
              _camposDistrito = this.config.camposDistrito;

              _loWhereResumen = "";
              _Accion = "Region";
              _thisDMUbigeo.onSearchRegion(_urlRegion);

              _thisDMUbigeo.fnGrillaOff();

              _height = 300;
              _width = 140;
              //Cambio de valores en los combos
              dijit.byId("lstRegion_CMUbigeo").on("change", function (event) { _thisDMUbigeo.onSelectDepartamento(); });
              dijit.byId("lstProvincia_CMUbigeo").on("change", function (event) { _thisDMUbigeo.onSelectProvincia(); });
              dijit.byId("lstDistrito_CMUbigeo").on("change", function (event) { _thisDMUbigeo.onSelectDistrito(); });
              dijit.byId("lstCuadrangulo_CMUbigeo").on("change", function (event) { _thisDMUbigeo.onSelectCuadrangulo(); });
          },

          onOpen: function () {
              console.log('onOpen');
              this.OnDefinitosQuery();
              _thisDMUbigeo.fnUbigeo('lstRegion_CMUbigeo', "")
              _thisDMUbigeo.fnHoja('lstCuadrangulo', " ")


               
          },

          onClose: function () {
              console.log('onClose');
              this._graphicsLayer.clear();
              _appLayer.fnLimpiarGraphics()
          },

          
          fnUbigeo: function (_select, _Criterio) {

             // _appControl.removeAllOptionsCombo(_select);            

              /**** Carga combo de Region por ubigeo ****/
              _appControl.fnCargarCombos(_select, _Criterio, "/Combos/SelListarUbigeo");


          },
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
          onSearchRegion: function (_url) {

              _thisDMUbigeo.onQuery(_url, "1=1  and CD_DEPA <>99", _camposRegion);

          },
          onSelectDepartamento: function () {

              _thisDMUbigeo.fnUbigeo('lstProvincia_CMUbigeo', dijit.byId("lstRegion_CMUbigeo").item.value);
              _thisDMUbigeo.fnHoja('lstCuadrangulo_CMUbigeo', dijit.byId("lstRegion_CMUbigeo").item.value);
              _appLayer.onSelectZoom(_urlRegion, "CD_DEPA"+ " = '" + dijit.byId("lstRegion_CMUbigeo").item.value + "'", 1);
              

              _appControl.fnMostrar('_lblProvincia_CMUbigeo');
              _appControl.fnMostrar('_lstProvincia_CMUbigeo');

              _appControl.fnOcultar('_lblDistrito_CMUbigeo');
              _appControl.fnOcultar('_lstDistrito_CMUbigeo');
               
              _app.wResize(_thisDMUbigeo, 430, 250)

              //resumen
              _loStrWhere ="DEMAGIS like '" + dijit.byId("lstRegion_CMUbigeo").item.value + "%' ";
              _thisDMUbigeo.onResumen(_urlCatastro, _loStrWhere);
              
              //Resultados Grilla Externa
              // _thisDMUbigeo.fnBuscar(_loStrWhere, _urlCatastro, _layout);
              _arrayCatastro[0].criterio = _loStrWhere;
              _app.fnAbrirWidgetResultados(_thisDMUbigeo, _loStrWhere, _arrayCatastro, "");

          },
          onSelectProvincia: function () {
              

              //
              _thisDMUbigeo.fnUbigeo('lstDistrito_CMUbigeo', dijit.byId("lstProvincia_CMUbigeo").item.value);
              _thisDMUbigeo.fnHoja('lstCuadrangulo_CMUbigeo', dijit.byId("lstProvincia_CMUbigeo").item.value);
              _appLayer.onSelectZoom(_urlProvincia, "CD_PROV" + " = '" + dijit.byId("lstProvincia_CMUbigeo").item.value + "'", 2);

              _app.wResize(_thisDMUbigeo, 565, 250)

              _appControl.fnMostrar('_lblDistrito_CMUbigeo');
              _appControl.fnMostrar('_lstDistrito_CMUbigeo');
 
          },
          onSelectDistrito: function () {
              
              _thisDMUbigeo.fnHoja('lstCuadrangulo_CMUbigeo', dijit.byId("lstDistrito_CMUbigeo").item.value);
              _appLayer.onSelectZoom(_urlDistrito, "CD_DIST" + " = '" + dijit.byId("lstDistrito_CMUbigeo").item.value + "'", 3);

              //console.log("Distrito")
              //_thisAnalisisRecursos.fnHoja('lstCuadrangulo', lstDistrito.value)
              //_appLayer.onSelectZoom(_urlDistrito, _camposDistrito + " = '" + lstDistrito.value + "'", 3);
          },
          onSelectCuadrangulo: function () {
              //console.log("Cuadrangulo")
              _appLayer.onSelectZoom(_urlCuadrangulo, "upper(QDR_CODIGO_ALFANUMERICO ) = upper('" + dijit.byId("lstCuadrangulo_CMUbigeo").item.value + "')", 4);
          },


          fnHoja: function (_select, _Criterio) {

              _appControl.removeAllOptions(_select);
              
              var param = dojo.toJson({ Parametro: _Criterio });
              dojo.xhrPost({
                  url: "/Combos/SelListarHojas",
                  postData: param,
                  //Con parametros
                  //postData: dojo.toJson({ Parametro: "010000" }), 
                  handleAs: "json",
                  contentType: "application/json",
                  handle: function (res) {
                      console.log(res);

                      var values = [];
                      for (var i = 0; i < res.length; i++) {
                          values.push({ name: res[i].name, value: res[i].value });
                      }
                      var dataItems = {
                          identifier: 'value',
                          id:'value',
                          label: 'name',
                          items: values,
                          maxHeight: 300
                      };
                      var datos = new Memory({ data: dataItems });
                      dijit.byId(_select).store = datos;
                  },
                  error: function (error) {
                      // We'll 404 in the demo, but that's okay.  We don't have a 'postIt' service on the
                      // docs server.
                      //   dojo.byId("response2").innerHTML = "Message posted.";
                      console.log(error);
                  }
              });


          },

          /*Buscar por Query*/
          onQuery: function (lourl, lowhere, lofields) {

              //queryTask = new esri.tasks.QueryTask(lourl);
              //query = new esri.tasks.Query();
              //query.returnGeometry = true;
              //query.outFields = [lofields];
              //query.where = lowhere;
              //queryTask.execute(query, _thisDMUbigeo.showResults);
              // **************** Resumen de DM x UBIGEO ********

          },
          showResults: function (featureSet) {
              console.log(featureSet);
              /** VISUALIZA RESULTADO***/


              /* llena Control de Region*/
              if (_Accion == "Region") {
                  options = [];
                  var sel = dojo.byId('lstRegion_CMUbigeo');
                  for (var i = 0, il = featureSet.features.length; i < il; i++) {

                      var c = dojo.doc.createElement('option');
                      c.innerHTML = featureSet.features[i].attributes.NM_DEPA;
                      c.value = featureSet.features[i].attributes.CD_DEPA;
                      sel.appendChild(c);
                  }
                  dijit.byId('lstRegion_CMUbigeo').on('change', function (event) { _thisDMUbigeo.onSelectDepartamento(); });
              }
              /* Grafica Region Seleccionada*/
              if (_Accion == "RegionG") {
                  if (!this.graphicsDpto.length) this.graphicsDpto.clear();
                  if (!this.graphicsProv.length) this.graphicsProv.clear();
                  if (!this.graphicsDist.length) this.graphicsDist.clear();

                  //var selDistrito = dojo.byId('lstDistrito');
                  //_thisDMUbigeo.fnLimpiarLista(selDistrito);

                  //var resultFeatures = featureSet.features;

                  //for (var i = 0, il = featureSet.features.length; i < il; i++) {
                  //    this.graphicsDpto.add(featureSet.features[i].setSymbol(this.symbolDpto));
                  //}
                  this.graphicsDpto.add(featureSet.features[0].setSymbol(this.symbolDpto));
                  console.log("graphics");
                  //});
                  this._viewerMap.addLayer(this.graphicsDpto);




                  // dojo.byId([_thisDMUbigeo.getPanel()][0].id).style.height = '500px';

                  _Accion = "Provincia";
                  _thisDMUbigeo.onQuery(_urlProvincia, "CD_PROV like '" + lstRegion_CMUbigeo.value + "%'", _camposProvincia);


                  _thisDMUbigeo.onProject(featureSet.features[0].geometry);
              }

              /* llena Control de Provincia*/
              if (_Accion == "Provincia") {
                  options = [];


                  var selProvincia = dojo.byId('lstProvincia');
                  _thisDMUbigeo.fnLimpiarLista('lstProvincia');

                  for (var i = 0, il = featureSet.features.length; i < il; i++) {

                      var c = dojo.doc.createElement('option');
                      c.innerHTML = featureSet.features[i].attributes.NM_PROV;
                      c.value = featureSet.features[i].attributes.CD_PROV;
                      selProvincia.appendChild(c);
                  }
                  dijit.byId('lstProvincia').on('change', function (event) { _thisDMUbigeo.onSelectProvincia(); });
              }
              /* Grafica Provincia Seleccionada*/
              if (_Accion == "ProvinciaG") {
                  if (!this.graphicsProv.length) this.graphicsProv.clear();
                  if (!this.graphicsDist.length) this.graphicsDist.clear();

                  this.graphicsProv.name = "SearchQueryProv";

                  this._viewerMap.addLayer(this.graphicsProv, 1);

                  var resultFeatures = featureSet.features;

                  for (var i = 0, il = resultFeatures.length; i < il; i++) {
                      var graphic = resultFeatures[i];
                      graphic.setSymbol(this.symbolProv);

                      this.graphicsProv.add(graphic);
                  }


                  _Accion = "Distrito";
                  _thisDMUbigeo.onQuery(_urlDistrito, "CD_DIST like '" + lstProvincia.value + "%'", _camposDistrito);

                  _thisDMUbigeo.onProject(featureSet.features[0].geometry);
              }


              /* llena Control de Dsitrito*/
              if (_Accion == "Distrito") {
                  options = [];
                  var selDistrito = dojo.byId('lstDistrito');

                  _thisDMUbigeo.fnLimpiarLista('lstDistrito');

                  for (var i = 0, il = featureSet.features.length; i < il; i++) {

                      var c = dojo.doc.createElement('option');
                      c.innerHTML = featureSet.features[i].attributes.NM_DIST;
                      c.value = featureSet.features[i].attributes.CD_DIST;
                      selDistrito.appendChild(c);
                  }
                  dijit.byId('lstDistrito').on('change', function (event) { _thisDMUbigeo.onSelectDistrito(); });
              }
              /* Grafica Provincia Seleccionada*/
              if (_Accion == "DistritoG") {
                  if (!this.graphicsDist.length) this.graphicsDist.clear();
                  this.graphicsProv.name = "SearchQueryDist";

                  this._viewerMap.addLayer(this.graphicsDist);

                  var resultFeatures = featureSet.features;

                  for (var i = 0, il = resultFeatures.length; i < il; i++) {
                      var graphic = resultFeatures[i];
                      graphic.setSymbol(this.symbolDist);

                      this.graphicsDist.add(graphic);
                  }
                  _thisDMUbigeo.onProject(featureSet.features[0].geometry);

                  //dojo.byId([_thisDMUbigeo.getPanel()][0].id).style.height = '500px';

                  //_Accion = "Distrito";
                  //_thisDMUbigeo.onQuery(_urlProvincia, "CD_DIST like '" + lstProvincia.value + "%'", _camposDistrito);
              }






          },

          onProject: function (_logeometry) {
              //var _geometry = _logeometry;

              //outSR = _thisDMUbigeo.map.spatialReference;

              //var gsvc = new esri.tasks.GeometryService("http://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/Utilities/Geometry/GeometryServer");
              //var params = new esri.tasks.ProjectParameters();
              //params.geometries = [_geometry];
              //params.outSR = new esri.SpatialReference({ wkid: 102100 });
              //gsvc.project(params, _thisDMUbigeo.onProjectComplete);

              ////************ invoca el resumen **********
              //_thisDMUbigeo.onQueryResumen(_urlCatastro, _loWhereResumen);
              //_thisDMUbigeo.fnGrillaOff();
              ////************ invoca el tabla de Resultados **********
              //_thisDMUbigeo.fnBuscar(_loWhereResumen);
          },
          onProjectComplete: function (geometries) {
              ////project function never gets this far.  
              //var mp = geometries[0];
              //console.log(mp);
              //var extGraphics = mp.getExtent();//graphicsUtils.graphicsExtent(mp);

              //_thisDMUbigeo.map.setExtent(extGraphics.expand(1.5));



          },
          fnLimpiarLista: function (lstLista) {
              //try {
              //    var selLista = dojo.byId(lstLista);
              //    dojo.empty(selLista);
              //}
              //catch (err) {
              //    console.log("limpiar lista")
              //}

          },
          OnDefinitosQuery: function () {
              /*   imageParameters = new ImageParameters();
                 imageParameters.format = "jpeg"; //set the image type to PNG24, note default is PNG8.
      
                 dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/TGP/mmgg/MapServer");
                 dynamicMapServiceLayer.name = "Madres"
           
                 
                 
                 _thisDMUbigeo.map.addLayer(dynamicMapServiceLayer);
      
                 graphicsDpto.name = "SearchQuery";
                 _thisDMUbigeo.map.addLayer(graphicsDpto);
      
                 */
          },
          onDefinitionQuery: function (ubigeo) {

              //NOMBRE_COMERCIAL='Baritina' capa:0

              /*var layerDefs = [];
              layerDefs[0] = "UBIGEO_RESIENCIA like '" + ubigeo + "%'"
              dynamicMapServiceLayer.setLayerDefinitions(layerDefs);
              */

          },



          _resizePanel: function (w, h) {
              if (h > 0) {
                  dojo.byId([_thisDMUbigeo.getPanel()][0].id).style.height = h + 'px';
              }
              if (w > 0) {
                  dojo.byId([_thisDMUbigeo.getPanel()][0].id).style.width = w + 'px';
              }

          },

          onQueryResumen: function (lourl, loWhere) {
              var ResumenQueryTask = new esri.tasks.QueryTask(lourl);
              var ResumenQuery = new esri.tasks.Query();
              var statDef = new esri.tasks.StatisticDefinition();

              statDef.statisticType = "count";
              statDef.onStatisticField = "LEYENDA";
              statDef.outStatisticFieldName = "TOTAL";

              ResumenQuery.returnGeometry = false;
              ResumenQuery.where = loWhere;//"demagis like '06%'";
              ResumenQuery.outFields = ["LEYENDA"];
              ResumenQuery.groupByFieldsForStatistics = ["LEYENDA"];
              ResumenQuery.outStatistics = [statDef];
              ResumenQueryTask.execute(ResumenQuery, _thisDMUbigeo.handleResumenQuery);
          },
          handleResumenQuery: function (result) {
              console.log('pop query...', result);
              //app.maxPop = result.features[0].attributes.maxPop;


              _thisDMUbigeo.fnCrearGrilla(result.features)


          },
          fnCrearGrilla: function (itemsResult) {
              var items = [];
              var loNumTotal = 0;

              dojo.forEach(itemsResult, function (feature) {
                  items.push(feature.attributes);
                  loNumTotal = loNumTotal + feature.attributes.TOTAL;
              });

              console.log("grilla ", items);
              attributes = {
                  LEYENDA: "TOTAL",
                  TOTAL: loNumTotal
              }

              items.push(attributes);

              var layout = [[
                  { 'name': 'Estado', 'field': 'LEYENDA', 'width': '100px' },
                  { 'name': 'N&ordm; DM', 'field': 'TOTAL', 'width': '50px', "styles": "text-align:right;" },
                  {
                      'name': ' ', 'field': 'LEYENDA', 'width': '40px', "styles": "text-align:center;", formatter: function (value) {
                          return "<img src=widgets/INGEMMET/images/DM_" + value + ".png />";
                      }
                  }
              ]]

              var UbigeoGrid, store;

              var data = {
                  items: items
              };

              store = new ItemFileReadStore({
                  data: data
              });

              var UbigeoGrid = registry.byId("UbigeoGrid");
              UbigeoGrid.attr("structure", layout);
              UbigeoGrid.setStore(store);

              _thisDMUbigeo.fnGrillaOn();



          },
          fnGrillaOn: function () {

              //domClass.add("ContenUbigeoGrid", 'UbigeoGridOn');
              //domClass.remove("ContenUbigeoGrid", 'UbigeoGridOff');
              //_thisDMUbigeo._resizePanel(0, 380);
          },
          fnGrillaOff: function () {
              //domClass.remove("ContenUbigeoGrid", 'UbigeoGridOn');
              //domClass.add("ContenUbigeoGrid", 'UbigeoGridOff');
              //_thisDMUbigeo._resizePanel(370, 250);
          },
          //***** Tabla de Resultados ************/

          fnBuscar: function (_loStrWhere, _urlCatastro, _layout) {
              
              _app.fnAbrirWidgetResultados(_thisDMUbigeo, _loStrWhere, _urlCatastro, _layout);


          },
          onClose: function () {
              console.log('onClose DM Ubigeop');

          },


          //fnBuscar: function (loStrWhere) {
          //    _thisDMUbigeo.fnAbrirWidget();


          //    this.publishData({
          //        _where: loStrWhere,
          //        _url: "http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO/MapServer/0",
          //        _layout: {
          //            cells: [
          //                {
          //                    field: "CODIGOU",
          //                    name: "C&oacute;digo",
          //                    width: '100px'
          //                },
          //                {
          //                    field: "CODIGOU",
          //                    name: "Ver Exp.",
          //                    width: '100px',
          //                    formatter: function (value) {
          //                        return '<a href="http://www.ingemmet.gob.pe/sidemcat?CodDM=' + value + '&TipoDoc=0" target="_blank">Vizualizar</a>';
          //                    }
          //                },

          //            {
          //                field: "DEMAGIS",
          //                name: "Demarcacion",
          //                width: "100px",
          //                editable: true
          //            },
          //              {
          //                  field: "ZONA",
          //                  name: "zona",
          //                  width: "50px"
          //              },
          //              {
          //                  field: "CARTA",
          //                  name: "carta",
          //                  width: '50px',
          //              },
          //              {
          //                  field: "CONCESION",
          //                  name: "nombres",
          //                  width: '200px',
          //              }

          //            ]
          //        }
          //    });


          //},
          fnAbrirWidget: function () {
              ////var widgetManager;
              ////widgetManager = WidgetManager.getInstance();

              ////var wm = this.widgetManager.getInstance();
              //var myWidget = null;


              //arrayUtils.some(this.widgetManager.appConfig.widgetPool.widgets, function (aWidget) {
              //    if (aWidget.id == 'INGEMMET_Resultados') {
              //        myWidget = aWidget;
              //        return true;
              //    }
              //    return false;
              //});


              //for (i = 0; i < this.widgetManager.appConfig.widgetPool.groups.length; i++) {
              //    arrayUtils.some(this.widgetManager.appConfig.widgetOnScreen.widgets, function (aWidget) {
              //        if (aWidget.id == 'INGEMMET_Resultados') {
              //            myWidget = aWidget;
              //            return true;
              //        }
              //        return false;
              //    });
              //}

              //this.widgetManager.loadWidget(myWidget);
              //this.widgetManager.openWidget(myWidget);
              //var pm = PanelManager.getInstance();
              //pm.showPanel(myWidget);
              ////this.widgetManager.activeWidget.onActive = myWidget;



              ////var sbc = this.appConfig.getConfigElementsByName('AnchorBarController');
              ////sbc.setOpenedIds([myWidget]);



              ////var widgets = this.appConfig.getConfigElementsByName('INGEMMET_TablaResultados');
              ////var widgetId = widgets[0].id;
              ////      this.openWidgetById(widgetId);
              ////    var widgetAtributeTable = this.widgetManager.getWidgetById(widgetId);
              ////    //this.closeWidget(widgetAtributeTable);

              ////    //widgetAtributeTable.doFind();
              ////    if (widgetAtributeTable) {
              ////        widgetAtributeTable.startup();
              ////        //this.openWidget(widgetAtributeTable);
              ////        return;
              ////    }
              ////    this.openWidgetById(widgetId);


              ////var widgets = this.appConfig.getConfigElementsByName('INGEMMET_TablaResultados');
              ////var widgetId = widgets[0].id;
              ////var widgetAtributeTable = this.widgetManager.getWidgetById(widgetId);

              ////this.widgetManager.loadWidget(widgetAtributeTable);
              ////this.widgetManager.openWidget(widgetAtributeTable);
              ////var pm = PanelManager.getInstance();
              ////pm.showPanel(widgetAtributeTable);

          },
          fnShowCorredorMinero: function () {
              console.log("Listar Corredor Minero");
              //inicializar combos

             
              //console.log(chkCorredorMinero.ch

              if (chkCorredorMinero.checked)
              {
                  _app.wResize(_thisDMUbigeo, 280, 200);
                  _appControl.fnOcultar('divCMUbigeo');

                  _thisDMUbigeo.onResumen(_urlCatastroCorredor, "1=1");

                  _arrayCatastroCorredor[0].criterio = "1=1";
                  _app.fnAbrirWidgetResultados(_thisDMUbigeo, "1=1", _arrayCatastroCorredor, "");
              }
              else
              {
                  _app.wResize(_thisDMUbigeo, 300, 200);

                  dijit.byId("lstRegion_CMUbigeo").set("value", "")
                  dijit.byId("lstCuadrangulo_CMUbigeo").set("value", "")

                  _appControl.fnMostrar('divCMUbigeo');
                  _appControl.fnOcultar('divResumen_CMUbigeo');
                  _appControl.fnOcultar('_lblProvincia_CMUbigeo');
                  _appControl.fnOcultar('_lstProvincia_CMUbigeo');

                  _appControl.fnOcultar('_lblDistrito_CMUbigeo');
                  _appControl.fnOcultar('_lstDistrito_CMUbigeo');
              }
                           

          },
          onResumen: function (_url, _criterio) {
              console.log("onResumen ...." + _criterio);
              _appControl.fnMostrar('divResumen_CMUbigeo');

              var statDef = new esri.tasks.StatisticDefinition();
              statDef.statisticType = "count";
              statDef.onStatisticField = "LEYENDA";
              statDef.outStatisticFieldName = "Denuncios";


              queryTaskUbigeo = new esri.tasks.QueryTask(_url);
              //initialize query
              queryUbigeo = new esri.tasks.Query();
              queryUbigeo.returnGeometry = false;
              queryUbigeo.outStatistics = [statDef];
              queryUbigeo.outFields = ["LEYENDA"];
              queryUbigeo.orderByFields = ["LEYENDA"];
              queryUbigeo.groupByFieldsForStatistics = ["LEYENDA"];

              queryUbigeo.where = _criterio     //"1=1"// "estado <> 'Y' and (demagis like '" + loUbigeo + "%' or demagis like '%;" + loUbigeo + "%')";

              queryTaskUbigeo.execute(queryUbigeo, _thisDMUbigeo.showResultsUbigeo);

              /**********Cargar Capa de Corre4dor Miero **********/
              //var loEncontro = false;
              //for (var j = 0, jl = _viewerMap.layerIds.length; j < jl; j++) {
              //    var currentLayer = _viewerMap.getLayer(_viewerMap.layerIds[j]);
              //    if (currentLayer.id == _loName) {
              //        currentLayer.setVisibility(true);
              //        loEncontro = true;
              //    }
              //}

              //if (!loEncontro) {

              //    var CorredorOptions = {
              //        "id": _loName,
              //        "Name": _loName,
              //        "opacity": 0.8,
              //        "showAttribution": false
              //    };
              //    var CorredorLayer = new ArcGISDynamicMapServiceLayer(_urlMapa, CorredorOptions);

              //    _viewerMap.addLayer(CorredorLayer);
              //}

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


              _thisDMUbigeo.fnCrearGrilla(_itemsDenuncios);


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

              var ResumenGrid = registry.byId("ResumenGridUbigeo");
              ResumenGrid.attr("structure", layout);
              ResumenGrid.setStore(store);



             // _thisCorredor.fnResize();
          },

      });
  });


