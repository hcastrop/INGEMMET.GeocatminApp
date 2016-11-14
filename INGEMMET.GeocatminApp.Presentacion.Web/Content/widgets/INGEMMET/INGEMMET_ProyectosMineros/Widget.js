define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'dijit/_WidgetsInTemplateMixin',
        "dojo/parser",
        "dojox/grid/DataGrid",
        "dijit/form/ComboBox",
        "dijit/form/TextBox",
        "dijit/layout/ContentPane",
        'esri/layers/FeatureLayer',
        'dojo/data/ItemFileWriteStore',
        'esri/layers/GraphicsLayer',
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        'esri/Color',
        "dijit/Dialog",
        "dijit/form/Button", "dijit/form/DateTextBox", "dijit/form/TimeTextBox",'dojo/domReady!'
],
  function (declare,
            BaseWidget,
            _WidgetsInTemplateMixin,
            parser,
            DataGrid,
            ComboBox,
            TextBox,
            ContentPane,
            FeatureLayer,
            ItemFileWriteStore,
            GraphicsLayer,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            Color,
            Dialog, Button, DateTextBox, TimeTextBox, domReady
            ) {
      this.graphicsProyecto = new GraphicsLayer();

     
      marker = new PictureMarkerSymbol();
      marker.setHeight(26);
      marker.setWidth(17);
      marker.setUrl("http://img3.wikia.nocookie.net/__cb20140427224234/caramelangel714/images/7/72/Location_Icon.png");
      /*
      line = new SimpleLineSymbol();
      line.setColor(new Color([255, 0, 0, 1]));
      marker = new SimpleMarkerSymbol();
      marker.setColor(new Color([230, 0, 0, 0.25]));
      marker.setOutline(line);
      */


      //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget, _WidgetsInTemplateMixin], {
          // Custom widget code goes here
          
          baseClass: 'jimu-widget-ProyectosMineros',

          //this property is set by the framework when widget is loaded.
          name: 'ProyectosMinerosWidget',


          //methods to communication with app container:

          postCreate: function() {
              this.inherited(arguments);
              //console.log('postCreate');

              this._thisEmpresas;

              this._urlProy;
              this._layoutProy;
              var featureLayer, pageInfo, gridProy;
          },

          startup: function() {
              this.inherited(arguments);
              _urlProy = this.config.ulr;
              _layoutProy = this.config.layout;
              _thisEmpresas = this;

              gridProy = dijit.byId("myGridEmpresas");

              dijit.byId("myGridEmpresas").on("CellClick", function (evt) {
                  var idx = evt.rowIndex,
                     item = this.getItem(idx);
                  var value = this.store.getValue(item, "OBJECTID");
                  _thisEmpresas.onQuery(_urlProy, "objectid = " + value );

              });

              //Disabled
              dijit.byId('btnProyecto').set('disabled', true);
              dijit.byId('txtEmpresa').set('disabled', true);

              //Validacion de campos
              dijit.byId("cboFiltroEmpresa").on("change", function (event) { _thisEmpresas.fnCambioTF(); });
              dijit.byId("txtEmpresa").on("keyup", function (event) { _thisEmpresas.fnCambioCfiltro(); });

              dijit.byId("btnProyecto").on("click", function (event) { _thisEmpresas.fnBuscarProyecto(); });


              //console.log('startup');

      


          },

          onOpen: function(){
              console.log('onOpen');
              _thisEmpresas.fnBuscar("1=1")
          },

          onClose: function(){
              console.log('onClose');
          },

          fnCambioCfiltro: function(){              
              var loCriterio = dijit.byId("txtEmpresa").getValue();              
              dijit.byId('btnProyecto').set('disabled', loCriterio.length <3);             
      },

       fnCambioTF: function ()
       {
           console.log('Cambio');
           
           dijit.byId('txtEmpresa').set('disabled', (dijit.byId("cboFiltroEmpresa").value).length <= 0);
       },
       fnBuscarProyecto: function (){
           console.log("BuscarProyecto")
           var loStrCampo = dijit.byId("cboFiltroEmpresa").item.value
           var loStrFiltro = dijit.byId("txtEmpresa").value
           var loStrCriterio = "upper(" + loStrCampo + ") like upper('%" + loStrFiltro + "%')";

           console.log(loStrCriterio);

           _thisEmpresas.fnBuscar(loStrCriterio)



       },
       fnBuscar: function(loCriterio)
       {

           featureLayer = new esri.layers.FeatureLayer(_urlProy, {
               outFields: ["*"],
               mode: esri.layers.FeatureLayer.MODE_SELECTION
           });

           // this.map.addLayer(featureLayer);
           //dojo.connect(featureLayer, "onMouseOver", _thisResultados.showTooltip);
           //dojo.connect(featureLayer, "onMouseOut", _thisResultados.closeDialog);


           dojo.connect(featureLayer, "onLoad", function () {

               gridProy.attr("structure", _layoutProy);
               var query = new esri.tasks.Query();
               query.where = loCriterio;
               //query.timeExtent = new esri.TimeExtent(new Date("01/01/2007 UTC"));
               featureLayer.queryIds(query, function (objectIds) {
                   _thisEmpresas.fetchRecords(objectIds);
               });
           });
       },

       fetchRecords: function (objectIds) {

           if (objectIds.length > 0) {
               _thisEmpresas.updatePageInformation(objectIds);
               _thisEmpresas.queryRecordsByPage(1);
           }
           else {
               gridProy.showMessage("No matching records");
               gridProy.setStore(null);
           }
           //_thisResultados.resizeWidget()


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

           gridProy.showMessage("Fetching records...");

           var begin = pageInfo.recordsPerPage * (pageNumber - 1);
           var end = begin + pageInfo.recordsPerPage;

           // create the query
           var query = new esri.tasks.Query();
           query.objectIds = pageInfo.objectIds.slice(begin, end);
           query.outFields = ["*"];

           // Query for the records with the given object IDs and populate the grid
           featureLayer.selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (features) {
               _thisEmpresas.updateGrid(features, pageNumber);
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
           gridProy.setStore(store);
           gridProy.update();

           // update application state
           pageInfo.currentPage = pageNumber;
           dojo.byId("pageInfo").innerHTML = pageInfo.currentPage + " / " + pageInfo.totalPages;
       },
       onClickNext: function () {
           _thisEmpresas.queryRecordsByPage(pageInfo.currentPage + 1);
       },
       onClickPrev: function () {
           _thisEmpresas.queryRecordsByPage(pageInfo.currentPage - 1);
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
         //  console.log(featureSet);
           if (!this.graphicsProyecto.length) this.graphicsProyecto.clear();


           this.graphicsProyecto.name = "SearchQuery";
           this.graphicsProyecto.id = "glResultados";
           


           this.graphicsProyecto.add(featureSet.features[0].setSymbol(this.marker));
           //console.log("graphics");


           this._viewerMap.addLayer(this.graphicsProyecto);


           var mp = featureSet.features[0].geometry;
           var loNum = 5000;
           xMin = mp.x - loNum;
           yMin = mp.y - loNum;
           xMax = mp.x + loNum;
           yMax = mp.y + loNum;

           var newExtent = new esri.geometry.Extent();
           newExtent.xmin = xMin;
           newExtent.ymin = yMin;
           newExtent.xmax = xMax;
           newExtent.ymax = yMax;

           newExtent.spatialReference = this._viewerMap.spatialReference;

           this._viewerMap.setExtent(newExtent);

     
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

    });
  });