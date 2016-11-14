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
        "dojo/data/ItemFileReadStore",
        'dojo/data/ItemFileWriteStore',
        "dojo/_base/array",
        'dojox/grid/cells/dijit',
         'dojo/dom',
         "dijit/form/RadioButton",
 "dojo/store/Memory",
"dojo/data/ObjectStore",
"dijit/form/Select",

  "esri/toolbars/draw",
  "esri/symbols/SimpleMarkerSymbol",
          "esri/symbols/PictureFillSymbol",
        "esri/symbols/CartographicLineSymbol",
        "esri/graphic",
        "esri/Color",
         "dojo/on",
         "esri/tasks/GeometryService", "esri/tasks/ProjectParameters", "esri/tasks/geometry",
         'dijit/form/Button',
        "dojo/domReady!", "dojo/on"],
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
            ItemFileReadStore, ItemFileWriteStore,
            arrayUtils, cells, dom, RadioButton, Memory, ObjectStore, Select,
       Draw, SimpleMarkerSymbol, PictureFillSymbol, CartographicLineSymbol, Graphic, Color, on
      , GeometryService, ProjectParameters, geometry,
      Button, domReady, on) {

      var markerSymbol = new SimpleMarkerSymbol({
          "color": [255, 0, 0, 64],
          "size": 12,
          "angle": -30,
          "xoffset": 0,
          "yoffset": 0,
          "type": "esriSMS",
          "style": "esriSMSCross",
          "outline": {
              "color": [255, 0, 0, 255],
              "width": 1,
              "type": "esriSLS",
              "style": "esriSLSSolid"
          }
      });

      // lineSymbol used for freehand polyline, polyline and line. 
      var lineSymbol = new CartographicLineSymbol(
        CartographicLineSymbol.STYLE_SOLID,
        new Color([255, 0, 0]), 5,
        CartographicLineSymbol.CAP_ROUND,
        CartographicLineSymbol.JOIN_MITER, 5
      );

      // fill symbol used for extent, polygon and freehand polygon, use a picture fill symbol
      // the images folder contains additional fill images, other options: sand.png, swamp.png or stiple.png
      var fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
    new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25])
  );
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
              this._thisCoordenada;
              this._wkid
              this._Accion;
              this._items
              // this.wManager = WidgetManager.getInstance();

          },

          startup: function () {
              this.inherited(arguments);
              _thisCoordenada = this;
              console.log('startup');
              //console.log(this.config.urlRegion);




              dojo.connect(dijit.byId("btnGraficar"), "onclick", function (event) {
                  _thisCoordenada.onClickGraficar();
              });


              dojo.connect(dijit.byId("geo"), "onChange", function (isChecked) {
                  if (isChecked) {
                      _thisCoordenada.onChangeRB("geo");
                  }
              });
              dojo.connect(dijit.byId("utm"), "onChange", function (isChecked) {
                  if (isChecked) {
                      _thisCoordenada.onChangeRB("utm");
                  }
              });


              _items = [
                     { NUM: '1', ESTE: '', NORTE: '', LATITUD: '', LONGITUD: '', GRADOS: '', MINUTOS: '', SEGUNDOS: '', GRADOS_LAT: '', MINUTOS_LAT: '', SEGUNDOS_LAT: '' },
                     { NUM: '2', ESTE: '', NORTE: '', LATITUD: '', LONGITUD: '', GRADOS: '', MINUTOS: '', SEGUNDOS: '', GRADOS_LAT: '', MINUTOS_LAT: '', SEGUNDOS_LAT: '' },
                     { NUM: '3', ESTE: '', NORTE: '', LATITUD: '', LONGITUD: '', GRADOS: '', MINUTOS: '', SEGUNDOS: '', GRADOS_LAT: '', MINUTOS_LAT: '', SEGUNDOS_LAT: '' },
                     { NUM: '4', ESTE: '', NORTE: '', LATITUD: '', LONGITUD: '', GRADOS: '', MINUTOS: '', SEGUNDOS: '', GRADOS_LAT: '', MINUTOS_LAT: '', SEGUNDOS_LAT: '' },
                     { NUM: '5', ESTE: '', NORTE: '', LATITUD: '', LONGITUD: '', GRADOS: '', MINUTOS: '', SEGUNDOS: '', GRADOS_LAT: '', MINUTOS_LAT: '', SEGUNDOS_LAT: '' },
                     { NUM: '6', ESTE: '', NORTE: '', LATITUD: '', LONGITUD: '', GRADOS: '', MINUTOS: '', SEGUNDOS: '', GRADOS_LAT: '', MINUTOS_LAT: '', SEGUNDOS_LAT: '' },
                     { NUM: '7', ESTE: '', NORTE: '', LATITUD: '', LONGITUD: '', GRADOS: '', MINUTOS: '', SEGUNDOS: '', GRADOS_LAT: '', MINUTOS_LAT: '', SEGUNDOS_LAT: '' },
                     { NUM: '8', ESTE: '', NORTE: '', LATITUD: '', LONGITUD: '', GRADOS: '', MINUTOS: '', SEGUNDOS: '' },
                     { NUM: '9', ESTE: '', NORTE: '', LATITUD: '', LONGITUD: '', GRADOS: '', MINUTOS: '', SEGUNDOS: '', GRADOS_LAT: '', MINUTOS_LAT: '', SEGUNDOS_LAT: '' },
                     { NUM: '10', ESTE: '', NORTE: '', LATITUD: '', LONGITUD: '', GRADOS: '', MINUTOS: '', SEGUNDOS: '', GRADOS_LAT: '', MINUTOS_LAT: '', SEGUNDOS_LAT: '' }
              ];

              _thisCoordenada.onChangeRB("geo")
              _thisCoordenada.fnCrearGrilla('4326', _items);
              _thisCoordenada.initToolbar();
          },

          onOpen: function () {
              console.log('onOpen');

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

          onChangeRB: function (value) {
              console.log(value);

              var storeGeo = new Memory({
                  data: [
                    { id: "geoD", label: "Decimal" },
                    { id: "geoG", label: "D-M-S" }
                  ]
              });

              var storeUTM = new Memory({
                  data: [
                    { id: "32717", label: "Zona 17", tipo: 'utm' },
                    { id: "32718", label: "Zona 18", tipo: 'utm' },
                    { id: "32719", label: "Zona 19", tipo: 'utm' },
                  { id: "4326", label: "Decimal", tipo: 'geo' },
                    { id: "99999", label: "D-M-S", tipo: 'geo' }
                  ]
              });


              var sel = dojo.byId('lstTipo');
              if (sel.length > 0) {
                  dojo.empty(sel);
              }


              for (var i = 0, il = storeUTM.data.length; i < il; i++) {
                  if (storeUTM.data[i].tipo == value) {
                      var c = dojo.doc.createElement('option');
                      c.innerHTML = storeUTM.data[i].label;
                      c.value = storeUTM.data[i].id;
                      sel.appendChild(c);
                  }
              }
              sel.selectedIndex = 0;
              dijit.byId('lstTipo').on('change', function (event) { _thisCoordenada.onSelectTipo(event); });
              _thisCoordenada.onSelectTipo(sel[0].value);


          },

          onSelectTipo: function (value) {
              console.log("Select tipo");
              console.log(value);
              _wkid = value;
              _thisCoordenada.fnCrearGrilla(value, _items);
          },

          fnCrearGrilla: function (tipo, items) {


              var layoutUTM = [[
                            { 'name': 'N.', 'field': 'NUM', 'width': '25px', "styles": "text-align:right;", editable: false },
                            { 'name': 'Este', 'field': 'ESTE', 'width': '90px', "styles": "text-align:right;", editable: true },
                            { 'name': 'Norte', 'field': 'NORTE', 'width': '90px', "styles": "text-align:right;", editable: true }

              ]]

              var layoutGeoDec = [[
                            { 'name': 'N.', 'field': 'NUM', 'width': '25px', "styles": "text-align:right;", editable: false },
                            { 'name': 'Longitud', 'field': 'LONGITUD', 'width': '70px', "styles": "text-align:right;", editable: true },
                            { 'name': 'Latitud', 'field': 'LATITUD', 'width': '70px', "styles": "text-align:right;", editable: true }

              ]]

              var layoutGEOGMS = [[
                            { 'name': 'N.', 'field': 'NUM', 'width': '25px', "styles": "text-align:right;", editable: false },
                            {
                                'name': 'Grd', 'field': 'GRADOS', 'width': '40px', "styles": "text-align:right;", editable: true, cellFormatter: {

                                    selector: "number",
                                    parse: {
                                        //No need to declare selector, it is already stated in cellFormatter.
                                        pattern: "##"
                                    },
                                    format: {
                                        //Explicitly declare the format type.
                                        selector: "number",
                                        pattern: "##"
                                    }


                                }
                            },
                            { 'name': 'Min', 'field': 'MINUTOS', 'width': '40px', "styles": "text-align:right;", editable: true },
                            { 'name': 'Seg', 'field': 'SEGUNDOS', 'width': '60px', "styles": "text-align:right;", editable: true },
                            { 'name': 'Grd', 'field': 'GRADOS_LAT', 'width': '40px', "styles": "text-align:right;", editable: true },
                            { 'name': 'Min', 'field': 'MINUTOS_LAT', 'width': '40px', "styles": "text-align:right;", editable: true },
                            { 'name': 'Seg', 'field': 'SEGUNDOS_LAT', 'width': '60px', "styles": "text-align:right;", editable: true },
                            { 'name': 'Longitud', 'field': 'LONGITUD', 'width': '70px', "styles": "text-align:right;", editable: true },
                            { 'name': 'Latitud', 'field': 'LATITUD', 'width': '70px', "styles": "text-align:right;", editable: true }

              ]]


              var UbigeoGrid, store;

              var data = {
                  items: items
              };

              store = new ItemFileWriteStore({ data: data });

              var UbigeoGrid = registry.byId("UbigeoGrid");
              UbigeoGrid.attr("structure", layoutUTM);
              if (tipo == '4326') { UbigeoGrid.attr("structure", layoutGeoDec); }
              if (tipo == '99999') { UbigeoGrid.attr("structure", layoutGEOGMS); }
              UbigeoGrid.setStore(store);

              dojo.byId([_thisCoordenada.getPanel()][0].id).style.height = '800px';

              var grid = dijit.byId('UbigeoGrid');
              dojo.connect(grid, "onKeyPress", function (e) {
                  tecla = (document.all) ? e.keyCode : e.which;
                  patron = /\d/;
                  te = String.fromCharCode(tecla);
                  return patron.test(te);

                  //if (evt.keyCode === dojo.keys.ENTER) {
                  //    console.log('ENTER!');
                  //}
              });

          },

          initToolbar: function () {


              tb = new Draw(_viewerMap);
              tb.on("draw-end", _thisCoordenada.addGraphic);

              // event delegation so a click handler is not
              // needed for each individual button
              on(dom.byId("info"), "click", function (evt) {
                  if (evt.target.id === "info") {
                      return;
                  }
                  _viewerMap.graphics.clear();
                  var tool = evt.target.id.toLowerCase();
                  _viewerMap.disableMapNavigation();
                  tb.activate(tool);
              });
          },

          addGraphic: function (evt) {

              //deactivate the toolbar and clear existing graphics 
              tb.deactivate();
              _viewerMap.enableMapNavigation();

              // figure out which symbol to use
              var symbol;
              if (evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
                  symbol = markerSymbol;
              } else if (evt.geometry.type === "line" || evt.geometry.type === "polyline") {
                  symbol = lineSymbol;
              }
              else {
                  symbol = fillSymbol;
              }

              _viewerMap.graphics.add(new Graphic(evt.geometry, symbol));
              _thisCoordenada.onProject(evt.geometry);
          }
       ,

          onProject: function (_logeometry) {
              var _geometry = _logeometry;

              outSR = _wkid;
              if (_wkid == 99999) {
                  outSR = 4326;
              }

              var gsvc = new esri.tasks.GeometryService("http://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/Utilities/Geometry/GeometryServer");
              var params = new ProjectParameters();
              params.geometries = [_geometry];
              params.outSR = new esri.SpatialReference({ wkid: outSR });
              gsvc.project(params, _thisCoordenada.onProjectComplete);
          },
          onProjectComplete: function (geometries) {
              //project function never gets this far.  
              var mp = geometries[0];
              console.log(mp);
              var extGraphics = mp.getExtent();//graphicsUtils.graphicsExtent(mp);

              //_thisDMUbigeo.map.setExtent(extGraphics.expand(1.5));

              var _itemsCoords = [];
              var _NumReg = 1

              var _x = 0;
              var _y = 0;

              if (mp.type == 'point') {
                  _x = mp.x;
                  _y = mp.y;
              }
              if (mp.type == 'polygon') {
                  _NumReg = mp.rings[0].length;
              }



              for (i = 0; i < _NumReg ; i++) {


                  //if (mp.type == 'point') {

                  //}
                  if (mp.type == 'polygon') {
                      _x = mp.rings[0][i][1];
                      _y = mp.rings[0][i][0];

                  }

                  var _ESTE = '';
                  var _NORTE = '';
                  var _LATITUD = '';
                  var _LONGITUD = '';
                  var _GRADOS = '';
                  var _MINUTOS = '';
                  var _SEGUNDOS = '';
                  var _GRADOS_LAT = '';
                  var _MINUTOS_LAT = '';
                  var _SEGUNDOS_LAT = '';

                  if (_wkid == '4326' || _wkid == '99999') {
                      var grados = parseInt(_x);
                      var decimal = Math.abs(_x - grados);
                      var minutos = parseInt((decimal * 60));
                      var segundos = Math.abs(((decimal * 60) - minutos) * 60);

                      var grados_lat = parseInt(_y);
                      var decimal_lat = Math.abs(_y - grados_lat);
                      var minutos_lat = parseInt((decimal_lat * 60));
                      var segundos_lat = Math.abs(((decimal_lat * 60) - minutos_lat) * 60);
                      _LATITUD = (_x).toFixed(6);
                      _LONGITUD = (_y).toFixed(6);
                      _GRADOS = grados;
                      _MINUTOS = minutos;
                      _SEGUNDOS = segundos.toFixed(6);
                      _GRADOS_LAT = grados_lat;
                      _MINUTOS_LAT = minutos_lat;
                      _SEGUNDOS_LAT = segundos_lat.toFixed(6);
                  }
                  else {
                      _ESTE = (_x).toFixed(4);;
                      _NORTE = (_y).toFixed(4);
                  }







                  var _item = {};
                  _item['NUM'] = i + 1;
                  _item['ESTE'] = _ESTE;
                  _item['NORTE'] = _NORTE;
                  _item['LATITUD'] = _LATITUD;
                  _item['LONGITUD'] = _LONGITUD;
                  _item['GRADOS'] = _GRADOS;
                  _item['MINUTOS'] = _MINUTOS;
                  _item['SEGUNDOS'] = _SEGUNDOS;
                  _item['GRADOS_LAT'] = _GRADOS_LAT;
                  _item['MINUTOS_LAT'] = _MINUTOS_LAT;
                  _item['SEGUNDOS_LAT'] = _SEGUNDOS_LAT;
                  _itemsCoords.push(_item);
                  

              }
              for (i = _NumReg - 1; i < 10; i++) {
                  var _item = {};
                  _item['NUM'] = i + 1;

                  _item['ESTE'] = ''
                  _item['NORTE'] = ''
                  _item['LATITUD'] = '';
                  _item['LONGITUD'] = '';
                  _item['GRADOS'] = '';
                  _item['MINUTOS'] = '';
                  _item['SEGUNDOS'] = '';
                  _item['GRADOS_LAT'] = '';
                  _item['MINUTOS_LAT'] = '';
                  _item['SEGUNDOS_LAT'] = '';
                  _itemsCoords.push(_item);

              }



              _thisCoordenada.fnCrearGrilla(_wkid, _itemsCoords)

          },
          onClickGraficar: function () {
              console.log("Click")
          }



      });
  });