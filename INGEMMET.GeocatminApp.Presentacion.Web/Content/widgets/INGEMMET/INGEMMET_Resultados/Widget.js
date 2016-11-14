define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'dijit/_WidgetsInTemplateMixin',
        'dojo/number',
        'dijit/TooltipDialog',
        'dojo/data/ItemFileWriteStore',
        'dijit/layout/ContentPane',
        'dojox/grid/DataGrid',
        'dijit/form/Button',
        'esri/layers/FeatureLayer',
        'dojox/grid/cells/dijit',
        'dojo/domReady!',
        'dojo/on',
        'dijit/TooltipDialog',
        'dijit/dijit',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/Color',
        'esri/graphicsUtils',
        'esri/layers/GraphicsLayer',
        'esri/tasks/geometry',
        'esri/SpatialReference',
        'esri/geometry/webMercatorUtils',
        'dojo/dom',
        'dojo/dom-class',
        'dojo/dom-style',
        'dojo/on',
        "jimu/PanelManager",
        "../js/jsWidgetAMD",
        "dijit/layout/TabContainer",
        "dijit/layout/ContentPane",
        "dijit/registry",
        "../js/jsWidgetControles",
],
  function (declare,
            BaseWidget,
            _WidgetsInTemplateMixin,
            number,
            TooltipDialog,
            ItemFileWriteStore,
            ContentPane,
            DataGrid,
            Button,
            FeatureLayer, cells, domReady, on,
            TooltipDialog,
            dijit,
            SimpleFillSymbol,
            SimpleLineSymbol,
            SimpleMarkerSymbol,
            Color,
            graphicsUtils,
            GraphicsLayer,
            geometry,
            SpatialReference,
            webMercatorUtils,
             dom, domClass, domStyle, on,
            PanelManager,
            _app,
            TabContainer,
            ContentPane,
            registry,
            _appControl
            ) {
      //To create a widget, you need to derive from BaseWidget.
      this.graphicsResultado = new GraphicsLayer();

      line = new SimpleLineSymbol();
      line.setColor(new Color([115, 223, 255, 1]));

      fill = new SimpleFillSymbol();
      fill.setColor(new Color([115, 223, 255, 0.5]));
      fill.setOutline(line);

      marker = new SimpleMarkerSymbol();
      marker.setOutline(line);
      marker.setColor(new Color([115, 223, 255, 0.5]));

      symbolDpto = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 0.5), new Color([255, 0, 0, 0.5]));

      return declare([BaseWidget, _WidgetsInTemplateMixin], {
          // Custom widget code goes here

          baseClass: 'jimu-widget-Resultados',

          //this property is set by the framework when widget is loaded.
          name: 'INGEMMET_Resultados',


          //methods to communication with app container:

          postCreate: function () {
              this.inherited(arguments);

              this._urlCatastro;
              this._layout;
              this._TabContaimer;
              //console.log('postCreate');
              var featureLayer, pageInfo, grid;
              var gsvc;
              this._array;
              this._orden

              _thisResultados = this;

              this.graphicsResultado = new GraphicsLayer();

              /* this.layout = {
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
                           formatter: function (value) {return '<a href="http://www.ingemmet.gob.pe/sidemcat?CodDM=' + value + '&TipoDoc=0" target="_blank">Vizualizar</a>';}
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
                         editable: 'true'
                     }
 
                   ]
               };*/


          },

          startup: function () {
              this.inherited(arguments);
              //this.mapIdNode.innerHTML = 'map id:' + this.map.id;
              console.log('startup');

              this.fetchDataByName('widgets_BuscarDM');

              // _urlCatastro = this.config.urlCatastro;
              //_layout = this.config.layout;

              grid = dijit.byId("myGrid");
              _thisResultados = this;
              _ordern = -1;
              //dijit.byId("btnPrev").on("click", function (event) { _thisResultados.queryRecordsByPage(pageInfo.currentPage - 1); });
              //dijit.byId("btnNext").on("click", function (event) { _thisResultados.queryRecordsByPage(pageInfo.currentPage + 1); });
              _TabContaimer = dijit.byId('divTabContaimer');

              dojo.connect(_TabContaimer, "selectChild", _thisResultados.onCambioTab);

              

              
              //domClass.add(dijit.byId("btnPrev"), 'btnNextPrev');
              //domClass.add(dijit.byId("btnNext"), 'btnNextPrev');
              _array = [];

              //_thisResultados.onResizeTab();

          },
          /************  on Click ***************/
        
          onClickNext: function () {
              _thisResultados.queryRecordsByPage(pageInfo.currentPage + 1);
          },
          onClickPrev: function () {
              _thisResultados.queryRecordsByPage(pageInfo.currentPage - 1);
          },
          onOpen: function () {
              console.log('onOpen');
              // _thisResultados.onBuscar("1=2");

              //_thisResultados.fnBuscarCapa("Catastro Minero", "0")
          },
          fnBuscarCapa: function (nombre, orden) {

              console.log('BuscarCapa');
          },
          onClose: function () {
              console.log('onClose');

              this.graphicsResultado.clear;

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

          resizeWidget: function () {
              console.log('resizeWidget');
              //dojo.byId([_thisResultadosUbigeo.getPanel()][0].id).style.height = '500px';
              //var h = domStyle.get(_thisResultados.id, "height");
              //dojo.byId([_thisResultados.getPanel()][0].id).style.height = h + 17 + 'px'
              dojo.byId([_thisResultados.getPanel()][0].id).style.height = '310px';
              dojo.byId([_thisResultados.getPanel()][0].id).style.width = '800px';
              dojo.byId([_thisResultados.getPanel()][0].id).style.right = '30px';
              dojo.byId([_thisResultados.getPanel()][0].id).style.left = 'auto';
              dojo.byId([_thisResultados.getPanel()][0].id).style.bottom = '30px';
              dojo.byId([_thisResultados.getPanel()][0].id).style.top = 'auto';
              _thisResultados.onResizeTab();


          },


          onReceiveData: function (name, widgetId, data, historyData) {
              //filter out messages
              if (name !== 'Buscar_DM' && name !== 'BuscarDMUbigeo_INGEMMET' && name !== 'CorredorMineroWidget' && name !== 'INGEMMET_AnalisisRecursos') {
                  return;
              }

              //console.log(data._where, data._url, data._layout);
              _array = data._array;

              if (_array.length > 1) {
                  _appControl.fnMostrar('divTabContaimer');
                  _thisResultados.createContentPane();                  
              }
              else if (_array.length = 1) {
                  
                  _appControl.fnOcultar('divTabContaimer');

                  _orden = 0;
                  _thisResultados.fnLlenarGrilla(_orden);

              }
              else {
                  _app.fnCerrarWidget(this.id);

              }
              dijit.byId("myGrid").on("CellClick",_thisResultados.OnClickGrid);

          },
          //methods to communication between widgets:
          OnClickGrid: function (evt) {
              var idx = evt.rowIndex,
                     item = this.getItem(idx);
              var value = this.store.getValue(item, "OBJECTID");
              var loStrUrl = _array[_orden].url
              _thisResultados.onQuery(loStrUrl, "OBJECTID = " + value);
          },

          onBuscarParametros: function (_where, _url, _layout, _geom) {
              console.log("onBuscar");
              var loStrUrl = "";
              try {
                  loStrUrl = featureLayer.url;
              }
              catch (err) {
                  loStrUrl = "";
              };


              if (loStrUrl == _url) {
                  _thisResultados.fnConsultarFeature(_layout, _where, _geom);
              }
              else {
                  featureLayer = new esri.layers.FeatureLayer(_url, {
                      outFields: ["*"],
                      mode: esri.layers.FeatureLayer.MODE_SELECTION
                  });
                  dojo.connect(featureLayer, "onLoad", function () {
                      _thisResultados.fnConsultarFeature(_layout, _where, _geom);

                  });
              }



          },
          fnConsultarFeature: function (_layout, _where, _geom) {
              grid = dijit.byId("myGrid");

              grid.attr("structure", _layout);
              var query = new esri.tasks.Query();

              if (_geom) {
                  query.geometry = _geom;
              }
              else {
                  query.where = _where;
              }

              featureLayer.queryIds(query, function (objectIds) {
                  _thisResultados.fetchRecords(objectIds);
              });

              dojo.connect(featureLayer, "onMouseOver", _thisResultados.showTooltip);
              dojo.connect(featureLayer, "onMouseOut", _thisResultados.closeDialog);

              featureLayer.setSelectionSymbol(symbolDpto);
              //              _viewerMap.addLayer(featureLayer);

          },

          onBuscar: function (_where) {
              console.log("onBuscar");
              featureLayer = new esri.layers.FeatureLayer("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO/MapServer/0", {
                  outFields: ["*"],
                  mode: esri.layers.FeatureLayer.MODE_SELECTION
              });

              // this.map.addLayer(featureLayer);
              dojo.connect(featureLayer, "onMouseOver", _thisResultados.showTooltip);
              dojo.connect(featureLayer, "onMouseOut", _thisResultados.closeDialog);


              dojo.connect(featureLayer, "onLoad", function () {

                  grid.attr("structure", _thisResultados.layout);
                  var query = new esri.tasks.Query();
                  query.where = _where;
                  //query.timeExtent = new esri.TimeExtent(new Date("01/01/2007 UTC"));
                  featureLayer.queryIds(query, function (objectIds) {
                      _thisResultados.fetchRecords(objectIds);
                  });
              });

          },

          fetchRecords: function (objectIds) {

              if (objectIds.length > 0) {
                  _thisResultados.updatePageInformation(objectIds);
                  _thisResultados.queryRecordsByPage(1);
              }
              else {
                  grid.showMessage("No matching records");
                  grid.setStore(null);
              }
              _thisResultados.resizeWidget()


          },

          updatePageInformation: function (objectIds, page) {
              pageInfo = {
                  objectIds: objectIds,
                  totalRecords: objectIds.length,
                  totalPages: Math.ceil(objectIds.length / 10),
                  currentPage: page || 0,
                  recordsPerPage: 10
              };

              dojo.byId("pageInfo").innerHTML = pageInfo.currentPage + " / " + pageInfo.totalPages;
              dojo.byId("recordsInfo").innerHTML = pageInfo.totalRecords;

              if (pageInfo.currentPage > pageInfo.totalPages) {
                  _thisResultados.queryRecordsByPage(pageInfo.currentPage - 1);
              }
          },

          queryRecordsByPage: function (pageNumber) {

              // check if the page number is valid
              if (pageNumber < 1 || pageNumber > pageInfo.totalPages) {
                  return;
              }

              grid.showMessage("Fetching records...");

              var begin = pageInfo.recordsPerPage * (pageNumber - 1);
              var end = begin + pageInfo.recordsPerPage;

              // create the query
              var query = new esri.tasks.Query();
              query.objectIds = pageInfo.objectIds.slice(begin, end);
              query.outFields = ["*"];

              // Query for the records with the given object IDs and populate the grid
              featureLayer.selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (features) {
                  _thisResultados.updateGrid(features, pageNumber);
              });


          },

          updateGrid: function (features, pageNumber) {

              // create the data store and add it to the grid
              var items = [];
              dojo.forEach(features, function (feature) {
                  items.push(feature.attributes);
              });

              var store = new dojo.data.ItemFileWriteStore({
                  data: {
                      items: items
                  }
              });
              grid.setStore(store);
              grid.update();

              // update application state
              pageInfo.currentPage = pageNumber;
              dojo.byId("pageInfo").innerHTML = pageInfo.currentPage + " / " + pageInfo.totalPages;
          },

          closeDialog: function () {
              var widget = dijit.byId("tooltipDialog");
              if (widget) {
                  widget.destroy();
              }
          },

          showTooltip: function (evt) {
              _thisResultados.closeDialog;
              var dialog = new dijit.TooltipDialog({
                  id: "tooltipDialog",
                  content: evt.graphic.attributes.CODIGOU + "<br />" + evt.graphic.attributes.CONCESION,
                  style: "position: absolute; width: 200px; font: normal normal bold 6pt Tahoma;z-index:100"
              });
              dialog.startup();

              dojo.style(dialog.domNode, "opacity", 0.85);
              dijit.placeOnScreen(dialog.domNode, { x: evt.pageX, y: evt.pageY }, ["TL", "BL"], { x: 10, y: 10 });
          },

          onQuery: function (url, lowhere) {


              queryTask = new esri.tasks.QueryTask(url);
              //initialize query
              query = new esri.tasks.Query();
              query.returnGeometry = true;
              query.outFields = ["*"];
              query.outSpatialReference = _viewerMap.spatialReference;
              
              query.where = lowhere;

              //execute query
              queryTask.execute(query, this.showResults);

          },
          showResults: function (featureSet) {
              console.log(featureSet);
              if (!this.graphicsResultado.length) this.graphicsResultado.clear();
              /*************  Symbologia *****************/
              var _symbol = "";
              _geometry = featureSet.features[0].geometry;
              switch (_geometry.type) {
                  case 'polygon':
                      
                      _symbol = this.fill;
                      break;
                  case 'line':
                      _symbol = this.line;
                      break;
                  case 'point':
                     
                      _symbol = this.marker;
                      break;
                  default:
                      _symbol = this.fill;
              }
              



              this.graphicsResultado.name = "SearchQuery";
              this.graphicsResultado.id = "glResultados";
              this.graphicsResultado.add(featureSet.features[0].setSymbol(_symbol));
              console.log("graphics");

              this._viewerMap.addLayer(this.graphicsResultado);

              /****************   Zooom ***********/
              if (_geometry.type === 'point') {
                  
                  maxZoom = this._viewerMap.getMaxZoom();
                  this._viewerMap.centerAndZoom(_geometry, maxZoom - 5);
              } else {
                  var extGraphics = _geometry.getExtent();
                  this._viewerMap.setExtent(extGraphics.expand(5));
              }


              //var _geometry = featureSet.features[0].geometry;

              //outSR = this._viewerMap.spatialReference;


              //var gsvc = new esri.tasks.GeometryService("http://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/Utilities/Geometry/GeometryServer");
              //var params = new esri.tasks.ProjectParameters();
              //params.geometries = [_geometry];
              //params.outSR = new esri.SpatialReference({ wkid: 102100 });
              //gsvc.project(params, _thisResultados.onProjectComplete);

          },
          onProjectComplete: function (geometries) {
              //project function never gets this far.  
              var mp = geometries[0];
              console.log(mp);
              var extGraphics = mp.getExtent();//graphicsUtils.graphicsExtent(mp);
              this._viewerMap.setExtent(extGraphics.expand(10));

          },
          onResizeTab: function () {
              console.log("onResizeTab");
              var _ww = _thisResultados.position.width - 20;
                _TabContaimer.style = "width: " + _ww + "px; height: 20px;";



          },

          onCambioTab: function (selectedTab) {
              console.log("cambiotab--" + selectedTab)
              _orden = selectedTab.params.content;
              _thisResultados.fnLlenarGrilla(_orden);
              //              _thisResultados.onBuscarParametros(_array[_orden].criterio, _array[_orden].url, _array[_orden].layout, _array[_orden].geom)
          },
          createContentPane: function () {

              /*dojo.byId("divTab").innerHTML = "";

              var _html = "<div id='divTabContaimer' data-dojo-type='dijit/layout/TabContainer' style='padding-left: 8px; width: 100%; height: 25px; ' tabstrip='true'>";
              for (var i = 0; i < _array.length; i++) {
                  if (_array[i].registros > 0) {
                      var  loStrId= "'_" + i.toString() +"'"
                      _html = _html + "<div data-dojo-type='dijit/layout/ContentPane' title='" + _array[i].capa + " (" + _array[i].registros + ")'  id=" + loStrId + " class='tabchildResultados' >";
                      _html = _html + _array[i].capa;
                      _html = _html + "</div>";
                  }
              }
              _html = _html + "</div>"

              dojo.byId("divTab").innerHTML = _html;
              */

              //innerHTML

              //try {
              //    if (_TabContaimer)
              //    {

              //       _TabContaimer.destroy();
              //       _TabContaimer = new TabContainer({
              //           style: "padding-left: 8px; width: 100%; height: 25px;",
              //           tabstrip: "true"
              //       }, "divTabContaimer");
              //       _TabContaimer.startup();
              //    }

              //}
              //catch (err)
              //{
              //    console.log(err);
              //    _TabContaimer = new TabContainer({
              //        style: "padding-left: 8px; width: 100%; height: 25px;",
              //        tabstrip: "true"

              //    }, "divTabContaimer");
              //}


              try {
                  _tabs = _TabContaimer.getChildren();
                  for (var i = _tabs.length - 1; i > -1; i--) {
                      var _tab = dijit.byId(_tabs[i].id);
                      registry.remove(dijit.byId(_tabs[i].id));
                      _TabContaimer.removeChild(_tab);
                  }

                  //for (var i = _tabs.length - 1; i > -1; i--) {
                  //    var _tab = dijit.byId("_" + i.toString());
                  //    registry.remove(dijit.byId("_" + i.toString()));
                  //    _TabContaimer.removeChild(_tab);


                  //}

              }
              catch (err) {
                  console.log(err);
              }

              for (var i = 0; i < _array.length; i++) {

                  if (_array[i].registros > 0) {
                      try {
                          var _titulo = _array[i].capa + " (" + _array[i].registros + ")";
                          var cp = new dijit.layout.ContentPane({
                              title: _titulo,
                              id: guid(),
                              content: i.toString(),
                              style: "display: none;"
                          });
                          domClass.add(cp.domNode, "tabchildResultados");

                          //var tc = dijit.byId("tabContainer");
                          _TabContaimer.addChild(cp);
                          if (i == 0) {
                              _TabContaimer.selectChild(cp);

                          }
                      }
                      catch (err) {
                          console.log(err)
                      }
                  }
              }

              /*if (_array[0].registros > 0) {
                  _thisResultados.fnLlenarGrilla(0);
              }*/






          },
          fnLlenarGrilla: function (_id) {

              try {
                  _thisResultados.onBuscarParametros(_array[_id].criterio, _array[_id].url, _array[_id].layout, _array[_id].geom)
              }
              catch (err) {
                  console.log(err);
              }
          }


      });
  });