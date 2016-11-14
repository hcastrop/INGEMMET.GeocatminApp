define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'dijit/_WidgetsInTemplateMixin',
        'dojo/on',
        "dijit/registry",
        'dojo/domReady!'],
  function (declare,
            BaseWidget,
            _WidgetsInTemplateMixin,
            on,
            registry) {
    //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget, _WidgetsInTemplateMixin], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      name: 'CustomWidgetPreevaluacion',
      _graphicsLayer: null,      
      queryTask: null,
      geometryService: null,


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

        _thisPreEvaluacion.fnCrearControles();

        dijit.byId('lstDepartamento').on('change', function (event) { _thisPreEvaluacion.onSelectDepartamento(); });
        dijit.byId('lstProvincia').on('change', function (event) { _thisPreEvaluacion.onSelectProvincia(); });
        dijit.byId('lstDistrito').on('change', function (event) { _thisPreEvaluacion.onSelectDistrito(); });
        dijit.byId('lstCuadrangulo').on('change', function (event) { _thisPreEvaluacion.onSelectCuadrangulo(); });
       },

       openTab: function (evt, cityName) {
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
            document.getElementById(cityName).style.display = "block";
            evt.currentTarget.className += " active";
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

               var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([100, 100, 100]), 3), new Color([255, 0, 0, 0.20]));
               var lineSymbol = new SimpleLineSymbol();
               lineSymbol.setColor(new Color([255, 0, 0, 1]));
               var markerSymbol = new SimpleMarkerSymbol();
               markerSymbol.setOutline(lineSymbol);
               markerSymbol.setColor(new Color([255, 0, 0, 0]));
               markerSymbol.setStyle(SimpleMarkerSymbol.STYLE_CROSS);
               //_thisPreEvaluacion._graphicsLayer.clear();

               var _geometries = [];
               for (i = 0; i < evt.featureSet.features.length; i++) {
                   firstGraphic = evt.featureSet.features[i];
                   firstGraphic.setSymbol(symbol);
                   _geometries.push(firstGraphic.geometry);
                   ///firstGraphic.setInfoTemplate(infoTemplate);
                   _thisPreEvaluacion._graphicsLayer.add(firstGraphic);
               }


               var union = geometryEngine.union(_geometries);




               _viewerMap.graphics.add(_thisPreEvaluacion._graphicsLayer);

               _thisPreEvaluacion.geometryService.convexHull(_geometries, function (result) {
                   console.log(result);
                   marker2 = [];
                   // _viewerMap.graphics.clear();
                   for (i = 0; i < result.rings[0].length; i++) {
                       console.log(result.rings[0][i][0]);
                       console.log(result.rings[0][i][1]);

                       marker2 = new esri.Graphic({
                           "geometry": {
                               "x": result.rings[0][i][0], "y": result.rings[0][i][1],
                               "spatialReference": { "wkid": 102100 }
                           }
                       });
                       marker2.setSymbol(markerSymbol);


                       _viewerMap.graphics.add(marker2);

                   }
                   /*var symbol;
                   switch (result.type) {
                       case "point":
                           symbol = new esri.symbol.SimpleMarkerSymbol();
                           break;
                       case "polyline":
                           symbol = new esri.symbol.SimpleLineSymbol();
                           break;
                       case "polygon":
                           symbol = new esri.symbol.SimpleFillSymbol();
                           break;
                   }
                   map.graphics.add(new esri.Graphic(result, symbol));*/
               }, function (error) {
                   console.log("An error occured during convex hull calculation");
               });


           });

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
       lstDepartamento: function () {
           console.log("Departamento")
       },
       lstProvincia: function () {
           console.log("Provincia")
       },
       lstDistrito: function () {
           console.log("Distrito")
       },
       lstCuadrangulo: function () {
           console.log("Cuadrangulo")
       }
    });
  });