define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'dijit/_WidgetsInTemplateMixin',
        'dojox/grid/DataGrid',
        'dojo/store/Memory',
        'dijit/form/ComboBox',
        'dojo/data/ItemFileWriteStore',
        "dijit/registry",
        "dojo/number",
        "jimu/dijit/DrawBox", 'dojo/on',
        'dojo/_base/lang',
        'esri/layers/GraphicsLayer',
        "esri/Color",
        "esri/tasks/QueryTask",
        "esri/tasks/query",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/geometry/geometryEngine",
        "esri/symbols/SimpleMarkerSymbol",
        'dijit/form/MultiSelect',
        "../js/jsWidgetAMD",
        "../js/jsWidgetLayer",
        "../js/jsWidgetMensajes",
        "../js/jsWidgetControles",
        'dojo/_base/lang',
        'dojo/dom',
        'dojo/dom-class',
        'dojo/dom-style',
        'dojo/on',
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "dojo/domReady!"],
  function (declare,
            BaseWidget,
            _WidgetsInTemplateMixin,
            dojoxDataGrid,
            Memory, ComboBox,
            ItemFileWriteStore, registry,
            number,
            DrawBox, on, lang,
            GraphicsLayer,
            Color,
            QueryTask,
            Query,
            SimpleLineSymbol,
            SimpleFillSymbol,
            geometryEngine,
            SimpleMarkerSymbol,
            MultiSelect,
            _app,
            _appLayer,
            _appMensaje,
            _appControl,
            lang,dom, domClass, domStyle, on,
            ArcGISDynamicMapServiceLayer) {
    //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget, _WidgetsInTemplateMixin], {
      // Custom widget code goes here

          baseClass: 'jimu-widget-PreevaluacionTabs',

      //this property is set by the framework when widget is loaded.
      name: 'CustomWidgetPreevaluacion',
      _graphicsLayer: null,      
      queryTask: null,
      geometryService: null,
      layerGrid17: null,
      layerGrid18: null,
      layerGrid19: null,


      //methods to communication with app container:

       postCreate: function() {
         this.inherited(arguments);
           //console.log('postCreate');

         this._thisTabsPreevaluacion;

         this.queryTask = new QueryTask("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/WGS84_18/WEBGIS_CUADRICULAS_WGS84_18/MapServer/0");

         this.geometryService = new esri.tasks.GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
         this.drawBox.setMap(this.map);
         this._bindEvents();
         this._graphicsLayer = new GraphicsLayer();
       },

       startup: function() {
        this.inherited(arguments);
        _thisTabsPreevaluacion = this;
        console.log('startup');

       // dijit.byId("tab1").on("click", function (e) { _thisTabs.openTab(e, 'tab1'); });
        //dijit.byId("tab2").on("click", function (e) { _thisTabs.openTab(e, 'tab2'); });
        _thisTabsPreevaluacion.openTab(null, 'coordenadas');

        _thisTabsPreevaluacion.fnCrearControles();
        _thisTabsPreevaluacion.fnLoadGrillas();

        dijit.byId('lstDepartamento').on('change', function (event) { _thisTabsPreevaluacion.onSelectDepartamento(); });
        dijit.byId('lstProvincia').on('change', function (event) { _thisTabsPreevaluacion.onSelectProvincia(); });
        dijit.byId('lstDistrito').on('change', function (event) { _thisTabsPreevaluacion.onSelectDistrito(); });
        dijit.byId('lstCuadrangulo').on('change', function (event) { _thisTabsPreevaluacion.onSelectCuadrangulo(); });
       },

       openTab: function (evt, tabName) {
           try{
               // Declare all variables
               var i, tabcontent, tablinks;

               // Get all elements with class="tabcontent" and hide them
               tabcontent = document.getElementsByClassName("tabcontent");
               for (i = 0; i < tabcontent.length; i++) {
                   tabcontent[i].style.display = "none";
               }

               // Get all elements with class="tablinks" and remove the class "active"
               tablinks = document.getElementsByClassName("tablinks");
               for (i = 0; i < tablinks.length; i++) {
                   tablinks[i].className = tablinks[i].className.replace(" active", "");
               }

               // Show the current tab, and add an "active" class to the link that opened the tab
               document.getElementById(tabName).style.display = "block";
               evt.currentTarget.className += " active";
               //document.getElementById(tabName).className += " active";
               if (tabName == 'ubigeo')
               {
                   _app.wResize(_thisTabsPreevaluacion, 500, 330)
                   _thisTabsPreevaluacion.fnUbigeo('lstDepartamento', " ")
                   _thisTabsPreevaluacion.fnHoja('lstCuadrangulo', " ")
               }
               if (tabName == 'coordenadas')
               {
                   _appLayer.fnLimpiarGraphics()
                   _app.wResize(_thisTabsPreevaluacion, 350, 380)
               }
               
           }
           catch(e)
           {
               console.log("Error... evt")
           }
            
    },
      // onOpen: function(){
      //   console.log('onOpen');
      // },
       _bindEvents: function () {
           //bind DrawBox
           //this.own(on(this.drawBox, 'icon-selected', lang.hitch(this, this._onIconSelected)));
           this.own(on(this.drawBox, 'DrawEnd', lang.hitch(this, this._onDrawEnd)));

           //bind symbol change events
           /* this.own(on(this.pointSymChooser, 'change', lang.hitch(this, function () {
                this._setDrawDefaultSymbols();
            })));
            this.own(on(this.lineSymChooser, 'change', lang.hitch(this, function () {
                this._setDrawDefaultSymbols();
            })));
            this.own(on(this.fillSymChooser, 'change', lang.hitch(this, function () {
                this._setDrawDefaultSymbols();
            })));
            this.own(on(this.textSymChooser, 'change', lang.hitch(this, function (symbol) {
                this.drawBox.setTextSymbol(symbol);
            })));
            */
           //bind unit events
           //this.own(on(this.showMeasure, 'click', lang.hitch(this, this._setMeasureVisibility)));

           //bind UndoManager events
           //this.own(on(this._undoManager, 'change', lang.hitch(this, this._onUndoManagerChanged)));
       },
       _onDrawEnd: function (graphic, geotype, commontype) {
           /*jshint unused: false*/
           this.drawBox.clear();
           this._graphicsLayer.clear();
           var geometry = graphic.geometry;
           if (geometry.type === 'extent') {
               var a = geometry;
               var polygon = new Polygon(a.spatialReference);
               var r = [
                 [a.xmin, a.ymin],
                 [a.xmin, a.ymax],
                 [a.xmax, a.ymax],
                 [a.xmax, a.ymin],
                 [a.xmin, a.ymin]
               ];
               polygon.addRing(r);
               geometry = polygon;
               commontype = 'polygon';
           }


           this._graphicsLayer.add(graphic);
           _viewerMap.addLayer(this._graphicsLayer);

           this._onIntersect(graphic.geometry)

       },
       _onIntersect: function (geom) {


           var query = new Query();

           var firstGraphic = null;


           query.returnGeometry = true;
           query.outFields = ["*"];
           query.outSpatialReference = _viewerMap.spatialReference;
           query.geometry = geom;
           query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
           this.queryTask.execute(query);

           this.queryTask.on("complete", function (evt) {


               if (evt.featureSet.features.length < 10)
               {
                   var loCodigos =""
                   for (i = 0; i < evt.featureSet.features.length; i++) {
                       loCodigos = loCodigos + ",'" + evt.featureSet.features[i].attributes["CD_CUAD"] + "'";                       
                       
                   }
                   console.log(loCodigos);
                     
                

               }
               else {
                   _appMensaje.fnAlerta("Número de cuadriculas no permitido")
               }
              

           });

       },





       onClose: function(){
           console.log('onClose');
           _appLayer.fnLimpiarGraphics()
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
       fnClearGrillas: function () {
           console.log('Clear Grilla');
       },
       fnLoadGrillas: function()
       {
           console.log('Load Grilla');

           layerGrid17 = new ArcGISDynamicMapServiceLayer("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/WGS84_17/WEBGIS_CUADRICULAS_WGS84_17/MapServer");
           layerGrid18 = new ArcGISDynamicMapServiceLayer("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/WGS84_18/WEBGIS_CUADRICULAS_WGS84_18/MapServer");
           layerGrid19 = new ArcGISDynamicMapServiceLayer("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/WGS84_19/WEBGIS_CUADRICULAS_WGS84_19/MapServer");

           _viewerMap.addLayer(layerGrid17);
           _viewerMap.addLayer(layerGrid18);
           _viewerMap.addLayer(layerGrid19);


       },
       fnCrearControles: function () {
           /*********** Zona **********/
           var ZonaStore = new Memory({
               data: [
                   { name: "WGS 84 Zona 17", id: "z17" },
                   { name: "WGS 84 Zona 18", id: "z18" },
                   { name: "WGS 84 Zona 19", id: "z19" }

               ]
           });

           var comboBox = new ComboBox({
               id: "cboZona",
               name: "Zona",
               value: "WGS 84 Zona 18",
               store: ZonaStore,
               searchAttr: "name"
           }, "cboZona").startup();

           /*********** Grilla Ingreso de Coordenadas*********/
           _items = [
                     { NUM: '1', ESTE: '', NORTE: '' },
                     { NUM: '2', ESTE: '', NORTE: '' },
                     { NUM: '3', ESTE: '', NORTE: '' },
                     { NUM: '4', ESTE: '', NORTE: '' },
                     { NUM: '5', ESTE: '', NORTE: '' },
                     { NUM: '6', ESTE: '', NORTE: '' },
                     { NUM: '7', ESTE: '', NORTE: '' },
                     { NUM: '8', ESTE: '', NORTE: '' },
                     { NUM: '9', ESTE: '', NORTE: '' },
                     { NUM: '10', ESTE: '', NORTE: '' }
           ];

           //
           var layoutUTM = [[
                            {
                                'name': 'N.', 'field': 'NUM', 'width': '25px', "styles": "text-align:center;", editable: false
                            },
                            {
                                'name': 'Este', 'field': 'ESTE', 'width': '90px', "styles": "text-align:right;", editable: true,
                                formatter: function (inEste) {
                                    return isNaN(inEste) ? '...' : dojo.number.format(inEste, { pattern: "#,##0.##" });
                                }
                            },
                            {
                                'name': 'Norte', 'field': 'NORTE', 'width': '90px', "styles": "text-align:right;", editable: true,
                                formatter: function (inNorte) {
                                    return isNaN(inNorte) ? '...' : dojo.number.format(inNorte, { pattern: "#,##0.##" });
                                }
                            }

           ]]



           var data = {
               items: _items
           };

           var store = new ItemFileWriteStore({ data: data });

           var PreEvalGridEdit = registry.byId("PreEvalGridEdit");
           PreEvalGridEdit.attr("structure", layoutUTM);
           PreEvalGridEdit.setStore(store);


           var grid = dijit.byId('PreEvalGridEdit');
           /*dojo.connect(grid, "onKeyPress", function (evt) {
               tecla = (document.all) ? e.keyCode : e.which;
               patron = /\d/;
               te = String.fromCharCode(tecla);
               
               patron.test(te);
           });*/


           /*dojo.connect(grid, "onKeyPress", function (e) {
               var oldValue = e.srcElement.value;
               tecla = (document.all) ? e.keyCode : e.which;
               patron = /\d/;
               te = String.fromCharCode(tecla);

               if (patron.test(te))
                   e.srcElement = oldValue;
               return (false);
           });
           */


       },
       formatCurrency: function (inDatum) {
           return isNaN(inDatum) ? '...' : dojo.currency.format(inDatum, this.constraint);
       },
       onSelectDepartamento: function () {
           console.log("Departamento")
           _appControl.removeAllOptions('lstDistrito');
           _thisTabsPreevaluacion.fnUbigeo('lstProvincia', lstDepartamento.value);
           _thisTabsPreevaluacion.fnHoja('lstCuadrangulo', lstDepartamento.value);


           _appLayer.onSelectZoom("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_DEMARCACION_WGS84/MapServer/0", "CD_DEPA = '" + lstDepartamento.value + "'", 1);

       },
       onSelectProvincia: function () {
           console.log("Provincia")
           _thisTabsPreevaluacion.fnUbigeo('lstDistrito', lstProvincia.value)
           _thisTabsPreevaluacion.fnHoja('lstCuadrangulo', lstProvincia.value)
           _appLayer.onSelectZoom("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_DEMARCACION_WGS84/MapServer/1", "CD_PROV = '" + lstProvincia.value + "'", 2);
       },
       onSelectDistrito: function () {
           console.log("Distrito")
           _thisTabsPreevaluacion.fnHoja('lstCuadrangulo', lstDistrito.value)
           _appLayer.onSelectZoom("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_DEMARCACION_WGS84/MapServer/2", "CD_DIST = '" + lstDistrito.value + "'", 3);
       },
       onSelectCuadrangulo: function () {
           console.log("Cuadrangulo")
           _appLayer.onSelectZoom("http://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/WEBGIS_BOLETINES/MapServer/11", "upper(QDR_CODIGO_ALFANUMERICO) = upper('" + lstCuadrangulo.value + "')", 4);
       },


       fnHoja: function (_select, _Criterio) {

           _appControl.removeAllOptions(_select);
           var sel = dom.byId(_select);


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


                   var n = 0;

                   for (var i = 0; i < res.length; i++) {
                       var c = dojo.doc.createElement('option');
                       c.innerHTML = res[i].name;
                       c.value = res[i].value;
                       sel.appendChild(c);
                       // console.log(i);
                   }

                   // var myMultiSelect = new MultiSelect({ name: _select }, sel).startup();

               },
               error: function (error) {
                   // We'll 404 in the demo, but that's okay.  We don't have a 'postIt' service on the
                   // docs server.
                   //   dojo.byId("response2").innerHTML = "Message posted.";
                   console.log(error);
               }
           });


       },
       fnUbigeo: function (_select, _Criterio) {

           _appControl.removeAllOptions(_select);
           var sel = dom.byId(_select);
           

           var param = dojo.toJson({ Parametro: _Criterio });
           dojo.xhrPost({
               url: "/Combos/SelListarUbigeo",
               postData: param,
               //Con parametros
               //postData: dojo.toJson({ Parametro: "010000" }), 
               handleAs: "json",
               contentType: "application/json",
               handle: function (res) {
                   console.log(res);


                   var n = 0;

                   for (var i = 0; i < res.length; i++) {
                       var c = dojo.doc.createElement('option');
                       c.innerHTML = res[i].name;
                       c.value = res[i].value;
                       sel.appendChild(c);
                     // console.log(i);
                   }

                  // var myMultiSelect = new MultiSelect({ name: _select }, sel).startup();

               },
               error: function (error) {
                   // We'll 404 in the demo, but that's okay.  We don't have a 'postIt' service on the
                   // docs server.
                   //   dojo.byId("response2").innerHTML = "Message posted.";
                   console.log(error);
               }
           });


       }
       
    });
  });