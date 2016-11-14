
define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'dijit/_WidgetsInTemplateMixin',
        'dijit/form/MultiSelect',
        "jimu/dijit/DrawBox",
        "../js/jsWidgetAMD",
        "../js/jsWidgetLayer",
        "../js/jsWidgetMensajes",
        "../js/jsWidgetControles",
        'dojo/_base/lang',
        'dojo/dom',
        'dojo/dom-class',
        'dojo/dom-style',
        'dojo/on',
        "dojo/dom-class",
        'esri/layers/GraphicsLayer',
        "esri/tasks/QueryTask",
        "esri/tasks/query", ],
  function (declare,
            BaseWidget,
            _WidgetsInTemplateMixin,
            MultiSelect,
            DrawBox,
            _app,
            _appLayer,
            _appMensaje,
            _appControl,
            lang, dom, domClass, domStyle, on, domClass, GraphicsLayer,
            QueryTask,
            Query) {
    //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget, _WidgetsInTemplateMixin], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-AnalisisRecursos',

      //this property is set by the framework when widget is loaded.
      name: 'AnalisisRecursosWidget',
      _graphicsLayer: null,
      _capaAnalizar:0,

      //methods to communication with app container:

       postCreate: function() {
         this.inherited(arguments);
           console.log('postCreate');

        
         this.inherited(arguments);
         this._thisAnalisisRecursos;
         this._urlRegion;
         this._camposRegion;
         this._camposProvincia;
         this._camposDistrito;
         this._camposCuadrangulo
         this._Accion;
         this._Analisis;

         this._height;
         this._width;       



         //this.queryTask = new QueryTask("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/WGS84_18/WEBGIS_CUADRICULAS_WGS84_18/MapServer/0");

         this.geometryService = new esri.tasks.GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
         this.drawBox.setMap(this.map);
         this._bindEvents();
         this._graphicsLayer = new GraphicsLayer();

       },

       startup: function() {
        this.inherited(arguments);
        _thisAnalisisRecursos = this;
        
        console.log('startup');
           //console.log(this.config.urlRegion);
        _urlRegion = this.config.urlRegion;
        _urlProvincia = this.config.urlProvincia;
        _urlDistrito = this.config.urlDistrito;
        _urlCuadrangulo = this.config.urlCuadrangulo;

        _camposRegion = this.config.camposRegion;
        _camposProvincia = this.config.camposProvincia;
        _camposDistrito = this.config.camposDistrito;
        _camposCuadrangulo = this.config.camposCuadrangulo;
        

        _height = 320;
        _width = 255;

        _Analisis = this.config.Analisis;

           /****************************/


        dijit.byId('lstDepartamento').on('change', function (event) { _thisAnalisisRecursos.onSelectDepartamento(); });
        dijit.byId('lstProvincia').on('change', function (event) { _thisAnalisisRecursos.onSelectProvincia(); });
        dijit.byId('lstDistrito').on('change', function (event) { _thisAnalisisRecursos.onSelectDistrito(); });
        dijit.byId('lstCuadrangulo').on('change', function (event) { _thisAnalisisRecursos.onSelectCuadrangulo(); });


        //_Accion = "Region";
        //_thisAnalisisRecursos.onSearchRegion(_urlRegion);

       },

       onOpen: function(){
           console.log('onOpen');

           _thisAnalisisRecursos.fnUbigeo('lstDepartamento', " ")
           _thisAnalisisRecursos.fnHoja('lstCuadrangulo', " ")
       },

       onClose: function(){
           console.log('onClose');
           this.drawBox.clear();
           this._graphicsLayer.clear();
           
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
       /*onSearchRegion: function (_url) {

           _thisAnalisisRecursos.onQuery(_url, "1=1", _camposRegion);

       },*/
          /*Buscar por Query*/
       /*onQuery: function (lourl, lowhere, lofields) {


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
       */
       onSelectDepartamento: function () {
           console.log("Departamento")
           _appControl.removeAllOptions('lstDistrito');
           _thisAnalisisRecursos.fnUbigeo('lstProvincia', lstDepartamento.value);
           _thisAnalisisRecursos.fnHoja('lstCuadrangulo', lstDepartamento.value);
           _appLayer.onSelectZoom(_urlRegion, _camposRegion + " = '" + lstDepartamento.value + "'", 1);

           _appControl.fnMostrar('lblProvincia');
           _appControl.fnMostrar('lblLstProvincia');

           _appControl.fnOcultar('lblDistrito');
           _appControl.fnOcultar('lblLstDistrito');

           _app.wResize(_thisAnalisisRecursos, _height + 60, 320)
           
          

       },
       onSelectProvincia: function () {
           console.log("Provincia")
           _thisAnalisisRecursos.fnUbigeo('lstDistrito', lstProvincia.value)
           _thisAnalisisRecursos.fnHoja('lstCuadrangulo', lstProvincia.value)
           _appLayer.onSelectZoom(_urlProvincia, _camposProvincia + " = '" + lstProvincia.value + "'", 2);

           _appControl.fnMostrar('lblDistrito');
           _appControl.fnMostrar('lblLstDistrito');

           _app.wResize(_thisAnalisisRecursos, _height + (60 + 110), 280)
       },
       onSelectDistrito: function () {
           console.log("Distrito")
           _thisAnalisisRecursos.fnHoja('lstCuadrangulo', lstDistrito.value)
           _appLayer.onSelectZoom(_urlDistrito, _camposDistrito+" = '" + lstDistrito.value + "'", 3);
       },
       onSelectCuadrangulo: function () {
           console.log("Cuadrangulo")
           _appLayer.onSelectZoom(_urlCuadrangulo, "upper("+_camposCuadrangulo+") = upper('" + lstCuadrangulo.value + "')", 4);
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

           _appControl.removeAllOptionsCombo(_select);
           var sel = dom.byId(_select);

           /**** Carga combo de Region por ubigeo ****/
           _appControl.fnCargarLista(_select, _Criterio, "/Combos/SelListarUbigeo");


       },
          /************** Analisis de Recursos *******************/
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
           

           this._graphicsLayer.add(graphic);
           _viewerMap.addLayer(this._graphicsLayer);

           _capaAnalizar = -1
           _thisAnalisisRecursos._onIntersect(graphic.geometry)


       },

       _onIntersect: function (geom) {
           
           if (_capaAnalizar < _Analisis.length)
           {
               _capaAnalizar++;
               _thisAnalisisRecursos.onBuscarIntersect(geom, _Analisis[_capaAnalizar].url);
               
           }
           else
           {
               _app.fnAbrirWidgetResultados(_thisAnalisisRecursos, "", _Analisis, geom);
               console.log(_Analisis);
           }
           
           

       },
       onBuscarIntersect: function(geom, url)
       {

           var query = new Query();
           var queryTask = new QueryTask(url);
           query.geometry = geom;
           query.returnGeometry = true;

           queryTask.executeForCount(query, function (count) {
               console.log("Locality --" + count + "-- points");
               _Analisis[_capaAnalizar].registros = count;
               _Analisis[_capaAnalizar].geom = geom;
               _thisAnalisisRecursos._onIntersect(geom);
           }, function (error) {
               console.log(error);
               _thisAnalisisRecursos._onIntersect(geom);
           });
       }



      });
  });