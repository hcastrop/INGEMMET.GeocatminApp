define(['dojo/_base/declare',
        'jimu/BaseWidget',
        "dijit/registry",
        'dijit/_WidgetsInTemplateMixin',
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
        "dojo/data/ItemFileReadStore", "dojo/_base/array",
        "dojo/domReady!"],
  function (declare,
            BaseWidget,
            registry,
            _WidgetsInTemplateMixin,
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
            ItemFileReadStore, arrayUtils
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
          name: 'INGEMMET_BuscarDMUbigeo',


          //methods to communication with app container:

          postCreate: function () {
              //console.log('postCreate');
              this.inherited(arguments);
              this._thisDMUbigeo;
              this._urlRegion;
              this._camposRegion;
              this._camposProvincia;
              this._camposDistrito;
              this._Accion;
             // this.wManager = WidgetManager.getInstance();

          },

          startup: function () {
              this.inherited(arguments);
              _thisDMUbigeo = this;
              console.log('startup');
              //console.log(this.config.urlRegion);
              _urlRegion = this.config.urlRegion;
              _urlProvincia = this.config.urlProvincia;
              _urlDistrito = this.config.urlDistrito;

              _camposRegion = this.config.camposRegion;
              _camposProvincia = this.config.camposProvincia;
              _camposDistrito = this.config.camposDistrito;


              _Accion = "Region";
              _thisDMUbigeo.onSearchRegion(_urlRegion);



              _thisDMUbigeo.fnCrearGrilla();

          },

          onOpen: function () {
              console.log('onOpen');
              this.OnDefinitosQuery();
          },



          // onClose: function(){
          //   console.log('onClose');
          // },

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

              _thisDMUbigeo.onQuery(_url, "1=1", _camposRegion);

          },
          onSelectDepartamento: function () {
              console.log("onSelectDepartamento");

              _Accion = "RegionG";
              _thisDMUbigeo.onQuery(_urlRegion, "CD_DEPA='" + lstDepartamento.value + "'", _camposRegion)


              _thisDMUbigeo.fnBuscar("DEMAGIS like '" + lstDepartamento.value + "%'");

              _thisDMUbigeo.onDefinitionQuery(lstDepartamento.value);
          },
          onSelectProvincia: function () {
              _Accion = "ProvinciaG";
              _thisDMUbigeo.onQuery(_urlProvincia, "CD_PROV='" + lstProvincia.value + "'", _camposProvincia)

              _thisDMUbigeo.onDefinitionQuery(lstProvincia.value);

              _thisDMUbigeo.fnBuscar("DEMAGIS like '" + lstProvincia.value + "%'");
          },
          onSelectDistrito: function () {
              _Accion = "DistritoG";
              _thisDMUbigeo.onQuery(_urlDistrito, "CD_DIST='" + lstDistrito.value + "'", _camposDistrito)

              _thisDMUbigeo.onDefinitionQuery(lstDistrito.value);
              _thisDMUbigeo.fnBuscar("DEMAGIS like '" + lstDistrito.value + "%'");
          },
          /*Buscar por Query*/
          onQuery: function (lourl, lowhere, lofields) {


              queryTask = new esri.tasks.QueryTask(lourl);
              //initialize query
              query = new esri.tasks.Query();
              query.returnGeometry = true;
              query.outFields = [lofields];

              //set query based on what user typed in for population;
              query.where = lowhere;

              //execute query
              queryTask.execute(query, _thisDMUbigeo.showResults);

          },
          showResults: function (featureSet) {
              console.log(featureSet);
              /* llena Control de Region*/
              if (_Accion == "Region") {
                  options = [];
                  var sel = dojo.byId('lstDepartamento');
                  for (var i = 0, il = featureSet.features.length; i < il; i++) {

                      var c = dojo.doc.createElement('option');
                      c.innerHTML = featureSet.features[i].attributes.NM_DEPA;
                      c.value = featureSet.features[i].attributes.CD_DEPA;
                      sel.appendChild(c);
                  }
                  dijit.byId('lstDepartamento').on('change', function (event) { _thisDMUbigeo.onSelectDepartamento(); });
              }
              /* Grafica Region Seleccionada*/
              if (_Accion == "RegionG") {
                  if (!this.graphicsDpto.length) this.graphicsDpto.clear();
                  if (!this.graphicsProv.length) this.graphicsProv.clear();
                  if (!this.graphicsDist.length) this.graphicsDist.clear();

                  //var selDistrito = dojo.byId('lstDistrito');
                  //_thisDMUbigeo.fnLimpiarLista(selDistrito);




                  var resultFeatures = featureSet.features;

                  for (var i = 0, il = resultFeatures.length; i < il; i++) {
                      var graphic = resultFeatures[i];
                      graphic.setSymbol(this.symbolDpto);

                      this.graphicsDpto.add(graphic);
                  }
                  _thisDMUbigeo.onProject(featureSet.features[0].geometry);

                  // dojo.byId([_thisDMUbigeo.getPanel()][0].id).style.height = '500px';

                  _Accion = "Provincia";
                  _thisDMUbigeo.onQuery(_urlProvincia, "CD_PROV like '" + lstDepartamento.value + "%'", _camposProvincia);
              }

              /* llena Control de Provincia*/
              if (_Accion == "Provincia") {
                  options = [];


                  var selProvincia = dojo.byId('lstProvincia');
                  _thisDMUbigeo.fnLimpiarLista(selProvincia);

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
                  _thisDMUbigeo.onProject(featureSet.features[0].geometry);

                  // dojo.byId([_thisDMUbigeo.getPanel()][0].id).style.height = '500px';

                  _Accion = "Distrito";
                  _thisDMUbigeo.onQuery(_urlDistrito, "CD_DIST like '" + lstProvincia.value + "%'", _camposDistrito);
              }


              /* llena Control de Dsitrito*/
              if (_Accion == "Distrito") {
                  options = [];
                  var selDistrito = dojo.byId('lstDistrito');

                  _thisDMUbigeo.fnLimpiarLista(selDistrito);

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
              var _geometry = _logeometry;

              outSR = _thisDMUbigeo.map.spatialReference;

              var gsvc = new esri.tasks.GeometryService("http://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/Utilities/Geometry/GeometryServer");
              var params = new esri.tasks.ProjectParameters();
              params.geometries = [_geometry];
              params.outSR = new esri.SpatialReference({ wkid: 102100 });
              gsvc.project(params, _thisDMUbigeo.onProjectComplete);
          },
          onProjectComplete: function (geometries) {
              //project function never gets this far.  
              var mp = geometries[0];
              console.log(mp);
              var extGraphics = mp.getExtent();//graphicsUtils.graphicsExtent(mp);

              _thisDMUbigeo.map.setExtent(extGraphics.expand(1.5));



          },
          fnBuscar: function (loStrWhere) {
              _thisDMUbigeo.fnAbrirWidget();


              this.publishData({
                  _where: loStrWhere,
                  _url: "http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO/MapServer/0",
                  _layout: {
                      cells: [
                          {
                              field: "CODIGOU",
                              name: "C&oacute;digo",
                              width: '100px'
                          },
                          {
                              field: "CODIGOU",
                              name: "Ver Exp.",
                              width: '100px',
                              formatter: function (value) {
                                  return '<a href="http://www.ingemmet.gob.pe/sidemcat?CodDM=' + value + '&TipoDoc=0" target="_blank">Vizualizar</a>';
                              }
                          },
                          
                      {
                          field: "DEMAGIS",
                          name: "Demarcacion",
                          width: "100px",
                          editable: true
                      },
                        {
                            field: "ZONA",
                            name: "zona",
                            width: "50px"
                        },
                        {
                            field: "CARTA",
                            name: "carta",
                            width: '50px',
                        },
                        {
                            field: "CONCESION",
                            name: "nombres",
                            width: '200px',
                        }

                      ]
                  }
              });

              //console.log (loStrWhere);
              //document.getElementById("divMensaje").innerHTML=loStrWhere;

          },
          fnLimpiarLista: function (lstLista) {
              //var wdg = dijit.byId('lstProvincia'); 
              if (lstLista.length > 0) {


                  dojo.empty(lstLista);
                  //dojo.query('option', lstLista.domNode).forEach(function (opt, idx, arr) {
                  //    //dojo.destroy(opt);
                  //    lstLista.removeChild(opt);

                  //});
              }

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
          fnAbrirWidget: function (){
              //var widgetManager;
              //widgetManager = WidgetManager.getInstance();

              //var wm = this.widgetManager.getInstance();
              var myWidget = null;


              arrayUtils.some(this.widgetManager.appConfig.widgetPool.widgets, function (aWidget) {
                  if (aWidget.id == 'INGEMMET_TablaResultados') {
                      myWidget = aWidget;
                      return true;
                  }
                  return false;
              });


              for (i = 0; i < this.widgetManager.appConfig.widgetPool.groups.length; i++) {
                  arrayUtils.some(this.widgetManager.appConfig.widgetPool.groups[i].widgets, function (aWidget) {
                      if (aWidget.id == 'INGEMMET_TablaResultados') {
                          myWidget = aWidget;
                          return true;
                      }
                      return false;
                  });
              }

              this.widgetManager.loadWidget(myWidget);
              this.widgetManager.openWidget(myWidget);
              var pm = PanelManager.getInstance();
              pm.showPanel(myWidget);
              this.widgetManager.activeWidget.onActive = myWidget;



              var sbc = this.appConfig.getConfigElementsByName('AnchorBarController');
              sbc.setOpenedIds([myWidget]);


              
              //var widgets = this.appConfig.getConfigElementsByName('INGEMMET_TablaResultados');
              //var widgetId = widgets[0].id;
              //      this.openWidgetById(widgetId);
              //    var widgetAtributeTable = this.widgetManager.getWidgetById(widgetId);
              //    //this.closeWidget(widgetAtributeTable);
                  
              //    //widgetAtributeTable.doFind();
              //    if (widgetAtributeTable) {
              //        widgetAtributeTable.startup();
              //        //this.openWidget(widgetAtributeTable);
              //        return;
              //    }
              //    this.openWidgetById(widgetId);
              

              //var widgets = this.appConfig.getConfigElementsByName('INGEMMET_TablaResultados');
              //var widgetId = widgets[0].id;
              //var widgetAtributeTable = this.widgetManager.getWidgetById(widgetId);

              //this.widgetManager.loadWidget(widgetAtributeTable);
              //this.widgetManager.openWidget(widgetAtributeTable);
              //var pm = PanelManager.getInstance();
              //pm.showPanel(widgetAtributeTable);

          },


          fnCrearGrilla: function () {
              var items = [
                      { ESTADO: "Otros", DM: 10, IMAGEN: "OTROS" },
                      { ESTADO: "Tramite", DM: 10, IMAGEN: "TRAMITE" },
                      { ESTADO: "Extinguido", DM: 10, IMAGEN: "Extinguido" },
                      { ESTADO: "Titulado", DM: 10, IMAGEN: "Titulado" },
                      { ESTADO: "Total", DM: 50, IMAGEN: "Total" }
              ];

              var layout = [[
                  { 'name': 'Estado', 'field': 'ESTADO', 'width': '100px' },
                  { 'name': 'N&ordm; DM', 'field': 'DM', 'width': '50px', "styles": "text-align:right;" },
                  {'name': ' ', 'field': 'IMAGEN', 'width': '40px', "styles": "text-align:center;", formatter: function (value) {
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

              dojo.byId([_thisDMUbigeo.getPanel()][0].id).style.height = '800px';
          }


      });
  });