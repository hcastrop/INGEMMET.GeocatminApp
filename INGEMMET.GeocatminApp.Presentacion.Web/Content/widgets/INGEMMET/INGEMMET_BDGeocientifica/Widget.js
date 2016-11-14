define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'dijit/_WidgetsInTemplateMixin',
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/ImageParameters",
        'esri/layers/GraphicsLayer',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/Color',
        'esri/graphicsUtils',
        "esri/dijit/BasemapToggle",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/symbols/SimpleMarkerSymbol", "esri/layers/FeatureLayer",
        "esri/InfoTemplate",
        "esri/dijit/Popup",
        "esri/dijit/PopupTemplate",
        "dijit/TooltipDialog",
        "esri/lang",
        "esri/graphic",
"dojo/dom-style",
"dijit/popup"],
  function (declare,
            BaseWidget,
            _WidgetsInTemplateMixin,
            ArcGISDynamicMapServiceLayer,
            ImageParameters,
            GraphicsLayer,
            SimpleFillSymbol,
            SimpleLineSymbol,
            Color,
            graphicsUtils,
            BasemapToggle,
            ArcGISTiledMapServiceLayer,
            SimpleMarkerSymbol,
            FeatureLayer,
            InfoTemplate,
            Popup,
            PopupTemplate,
            TooltipDialog,
            esriLang,
            Graphic,
            domStyle,
            dijitPopup) {

      var dynamicMapServiceLayer;
      //this.graphicsResultados = new GraphicsLayer();
      var _tipo;
      symbolDpto = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1), new Color([255, 0, 0, 0.25]));
      //symbolPto = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 20, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 197]), 3), new Color([204, 255, 255, 0]));
      symbolPto = new esri.symbol.PictureMarkerSymbol({ "angle": 0, "xoffset": 0, "yoffset": 0, "type": "esriPMS", "url": "widgets/INGEMMET/INGEMMET_BDGeocientifica/images/marker.gif", "contentType": "image/gif", "width": 24, "height": 24 });
      /*symbolPto = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND, 28,
                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([255, 255, 255]), 2),
                        new dojo.Color([255, 0, 0, 0.85]));*/

      //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget, _WidgetsInTemplateMixin], {

          // Custom widget code goes here

          baseClass: 'jimu-widget-customwidget',

          //this property is set by the framework when widget is loaded.
          name: 'CustomWidget',


          //methods to communication with app container:

          postCreate: function () {
              this.inherited(arguments);
              //console.log('postCreate');

              this._this;


          },

          startup: function () {
              this.inherited(arguments);
              _thisBDGeocientifica = this;

              _thisBDGeocientifica.graphicsResultados = new GraphicsLayer();
              console.log('------------------------startup -------  BDGECIENTIFICA');

              /*****************************************/
              /*  var baseMapLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
                _thisBDGeocientifica.map.addLayer(baseMapLayer);
  
                var baseMapLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer");
                _thisBDGeocientifica.map.addLayer(baseMapLayer);
  
                */
              /*****************************************/

              var _url, _name, _campo, _valor, _capa;

              var _loStrTipo = _thisBDGeocientifica.getParmUrl('capa');
              _loStrTipo = _loStrTipo.toLowerCase();

              _valor = _thisBDGeocientifica.getParmUrl('valor');

              for (i = 0; i < this.config.capas.length; i++) {
                  if ((this.config.capas[i].nombre).toLowerCase() == _loStrTipo) {
                      _url = this.config.capas[i].url;
                      _url_f = this.config.capas[i].url_f;
                      _name = this.config.capas[i].nombre;
                      _campo = this.config.capas[i].campo;
                      _capa = this.config.capas[i].capa;
                      _tipo = this.config.capas[i].tipo;
                      _tooltipTitulo = this.config.capas[i].tooltip_titulo;
                      _tooltipContenido = this.config.capas[i].tooltip_contenido;

                  }
              }

              //index.html?capa=lexico&valor=TsJi-p

              if (_tipo.toLowerCase() == 'punto') {
                  _thisBDGeocientifica.graphicsResultados.name = "gResultados"
                  _thisBDGeocientifica.map.addLayer(_thisBDGeocientifica.graphicsResultados);
              }

              _thisBDGeocientifica.OnDefinitosQuery(_url, _name, _campo, _valor, _capa, _tooltipTitulo, _tooltipContenido, _url_f);

          },
          getParmUrl: function (name) {
              var regexS = "[\\?&]" + name + "=([^&#]*)";
              var regex = new RegExp(regexS);
              var tmpURL = window.location.href;
              var results = regex.exec(tmpURL);
              if (results == null)
                  return "";
              else
                  return results[1];
          },


          OnDefinitosQuery: function (_url, _name, _campo, _valor, _capa, _tooltipTitulo, _tooltipContenido, _url_f) {

              imageParameters = new ImageParameters();
              imageParameters.format = "jpeg"; //set the image type to PNG24, note default is PNG8.

              dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer(_url);
              dynamicMapServiceLayer.name = _name
              dynamicMapServiceLayer.setOpacity(0.7);
              _thisBDGeocientifica.map.addLayer(dynamicMapServiceLayer);

              if (_tipo.toLowerCase() == 'poligono') {
                  

                  _thisBDGeocientifica.onDefinitionQuery(_campo, _valor);
              }
              else {


                  var tResultados = new PopupTemplate({
                      title: _tooltipTitulo,
                      description: _tooltipContenido                      
                  });

                  //var loCapa = _url + "/" + _capa;

                  var featureLayer = new FeatureLayer(_url_f, {
                      mode: FeatureLayer.MODE_ONDEMAND,
                      outFields: ["*"],
                      infoTemplate: tResultados,
                      opacity: 0
                  });
                  
                  _thisBDGeocientifica.map.addLayer(featureLayer);


                  /*
                      //_thisBDGeocientifica.map.graphics.enableMouseEvents();
                      //_thisBDGeocientifica.map.graphics.on("mouse-out", _thisBDGeocientifica.closeDialog);

                  

                  var template = new InfoTemplate();
                  template.setContent(_thisBDGeocientifica.getTextContent);
                  var loCapa = _url + "/" + _capa;
                  var featureLayer = new FeatureLayer(loCapa,
                        {
                            mode: FeatureLayer.MODE_ONDEMAND,
                            outFields: ["*"]

                        });


                  _thisBDGeocientifica.map.addLayer(featureLayer);

                  dialog = new TooltipDialog({
                      id: "tooltipDialog",
                      style: "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100"
                  });
                  dialog.startup();

                  featureLayer.on("mouse-over", function (evt) {
                      var t = _tooltip;//"<b>Object Id: ${OBJECTID}<br>Codigo: ${CD_DEPA}<br>Nmbre: ${NM_DEPA}<br>Capital: ${CAP_DEPA}</b>";

                      var content = esriLang.substitute(evt.graphic.attributes, t);
                      var highlightGraphic = new Graphic(evt.graphic.geometry, symbolPto);
                      _thisBDGeocientifica.map.graphics.add(highlightGraphic);

                      dialog.setContent(content);

                      domStyle.set(dialog.domNode, "opacity", 0.85);
                      dijitPopup.open({
                          popup: dialog,
                          x: evt.pageX,
                          y: evt.pageY
                      });
                  });

                  featureLayer.on("mouse-out", function (evt) {
                      _thisBDGeocientifica.closeDialog();

                  });
                  */
              }

              _thisBDGeocientifica.onQuery(_url + "/" + _capa, _campo + " ='" + _valor + "'", "*");
          },
          onDefinitionQuery: function (_campo, _criterio) {

              //NOMBRE_COMERCIAL='Baritina' capa:0

              var layerDefs = [];
              layerDefs[0] = _campo + " = '" + _criterio + "'"
              dynamicMapServiceLayer.setLayerDefinitions(layerDefs);


          },
          onQuery: function (lourl, lowhere, lofields) {


              queryTask = new esri.tasks.QueryTask(lourl);
              //initialize query
              query = new esri.tasks.Query();
              query.returnGeometry = true;
              query.outFields = [lofields];

              //set query based on what user typed in for population;
              query.where = lowhere;

              //execute query
              queryTask.execute(query, _thisBDGeocientifica.showResults);

          },
          showResults: function (featureSet) {
              _thisBDGeocientifica.graphicsResultados.clear();
              var resultFeatures = featureSet.features;
              var extent;
              var xMin, yMin, xMax, yMax;

              for (var i = 0, il = resultFeatures.length; i < il; i++) {
                  var graphic = resultFeatures[i];

                  geometry = graphic.geometry;

                  if (_tipo.toLowerCase() == 'punto') {
                      graphic.setSymbol(symbolPto);


                      xMin = geometry.x - 0.5;
                      yMin = geometry.y - 0.5;
                      xMax = geometry.x + 0.5;
                      yMax = geometry.y + 0.5;

                      ext = new esri.geometry.Extent();
                      ext.xmin = xMin;
                      ext.ymin = yMin;
                      ext.xmax = xMax;
                      ext.ymax = yMax;

                      ext.spatialReference = map.spatialReference;


                  }
                  else {
                      graphic.setSymbol(symbolDpto);
                      ext = geometry.getExtent();
                  }



                  if (extent) {
                      extent = extent.union(ext);
                  } else {
                      extent = new esri.geometry.Extent(ext);
                  }


                  _thisBDGeocientifica.graphicsResultados.add(graphic);

              }

              _thisBDGeocientifica.map.setExtent(extent, true);

              // _thisBDGeocientifica.map.reorderLayer(_thisBDGeocientifica.graphicsResultados, 0);
              //_thisBDGeocientifica.map.reorderLayer(dynamicMapServiceLayer, 1);
          },
          getTextContent: function (graphic) {
              console.log(graphic);
              /*var attributes = graphic.attributes;
              var scientificAndCommonName =
                attributes.qSpecies
                .replace('"', "")
                .split("::")
                .map(function (name) {
                    return lang.trim(name);
                });
              var scientificName = scientificAndCommonName[0];
              var commonName = scientificAndCommonName[1];
              var speciesName;

              if (commonName) {
                  speciesName = "<b>" + commonName + "</b><br/>" +
                                "<i>" + scientificName + "</i>";
              }
              else {
                  speciesName = "<i>" + scientificName + "</i>";
              }

              return speciesName + "<br>" +
                      attributes.qAddress + "<br/>" +
                      "Planted on " + formatDate(attributes.PlantDate);
          */
          },

          closeDialog: function () {
              _thisBDGeocientifica.map.graphics.clear();
              dijitPopup.close(dialog);
          },
          // onOpen: function(){
          //   console.log('onOpen');
          // },

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

      });
  });