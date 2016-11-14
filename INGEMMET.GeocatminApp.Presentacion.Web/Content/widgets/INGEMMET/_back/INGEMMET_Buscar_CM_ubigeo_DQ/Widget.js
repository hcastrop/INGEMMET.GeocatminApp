
define(['dojo/_base/declare'
    , 'jimu/BaseWidget'
    , 'dijit/form/MultiSelect'
    , 'dijit/form/DateTextBox'    
    , "dojo/store/Memory"
    , "dijit/form/ComboBox"
    , 'dojox/form/CheckedMultiSelect'    
    , "dojo/dom"
    , "esri/tasks/QueryTask"
    , "esri/tasks/query"
    , 'esri/layers/GraphicsLayer'
    , 'esri/symbols/SimpleFillSymbol'
    , 'esri/symbols/SimpleLineSymbol'
    , 'esri/Color'
    , 'esri/graphicsUtils'
    , 'dijit/registry'
    , "esri/layers/ArcGISDynamicMapServiceLayer"
    , "esri/layers/ImageParameters" ],
  function (declare, BaseWidget, MultiSelect, DateTextBox, Memory, ComboBox, MultiSelect,dom, QueryTask, Query, GraphicsLayer, SimpleFillSymbol, SimpleLineSymbol, Color, graphicsUtils, registry, ArcGISDynamicMapServiceLayer, ImageParameters) {
      this.graphicsDpto = new GraphicsLayer();
      this.graphicsProv = new GraphicsLayer();
      this.graphicsDist = new GraphicsLayer();
      var imageParameters;
      var dynamicMapServiceLayer;


      symbolDpto = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]), 1),new Color([255,0,0,0.25])  );
      symbolProv = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]), 1),new Color([255,0,0,0.35])  );
      symbolDist = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]), 1),new Color([255,0,0,0.45])  );
      //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget], {
          // Custom widget code goes here

          baseClass: 'jimu-widget-customwidget',      
      
      
          //this property is set by the framework when widget is loaded.
          //name: 'CustomWidget',


          //methods to communication with app container:

          // postCreate: function() {
          //   this.inherited(arguments);
          //   console.log('postCreate');
          // },

           startup: function() {
            this.inherited(arguments);
            //this.mapIdNode.innerHTML = 'map id:' + this.map.id;
            //console.log('startup');
           },
      
          OnAddValueCombo: function(paStrCodigo,combo,name,value)
          {
              

              dojo.xhrGet({
                  url: "http://intranet2.ingemmet.gob.pe:85/contratosws/service.asmx/ws_p_sel_ubigeo",
                  handleAs: 'text',
                  content: { 'paStrCodigo': paStrCodigo },
                  headers: {
                      'X-Requested-With': null,
                      'Content-Type': 'text/plain'
                  },
                  load: function (res) {
                      var dr = JSON.parse(JSON.parse(res));
                      
                      var sel = dojo.byId(combo);
                      var n = 0;
                      
              /*            var c = dojo.doc.createElement('option');
                          c.innerHTML = '-- Seleccione --';//NM_DEMA
                          c.value = '';//CD_DEPA
                          sel.appendChild(c);
                */      
                      for (var i = 0; i < dr.length; i++) {
                          var c = dojo.doc.createElement('option');
                          c.innerHTML = dr[i][name];//NM_DEMA
                          c.value = dr[i][value];//CD_DEPA
                          sel.appendChild(c);
                      }


                  }
              });



          },
          onClearValueCombo: function (combo) {
              var sel = dojo.byId(combo);

              if(sel){
                  while(sel.firstChild){
                      sel.removeChild(sel.firstChild);
                  }
              }

              var c = dojo.doc.createElement('option');
              c.innerHTML = '-- Seleccione --';//NM_DEMA
              c.value = '';//CD_DEPA
              sel.appendChild(c);
          },

          
          onOpen: function ()
          {
              this.onClearValueCombo("lstDepartamento");
              this.OnAddValueCombo("", "lstDepartamento", "NM_DEPA", "CD_DEPA");


              this.OnDefinitosQuery();
            


          },
          OnDefinitosQuery: function()
          {
              imageParameters = new ImageParameters();
              imageParameters.format = "jpeg"; //set the image type to PNG24, note default is PNG8.

              dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_ROCAS_MINERALES_INDUSTRIALES/MapServer");
              dynamicMapServiceLayer.name = "Recursos Minerales"
              
              
              this.map.addLayer(dynamicMapServiceLayer);



          },

          onSelectDepartamento: function() 
          {
              var loUbigeo = lstDepartamento.value.substring(0, 2);

              this.onClearValueCombo("lstProvincia");
              this.onClearValueCombo("lstDistrito");
              if (loUbigeo.length > 0) this.OnAddValueCombo(loUbigeo, "lstProvincia", "NM_PROV", "CD_PROV");
              
              this.onDefinitionQuery(loUbigeo);

              this.onQueryTask("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_ROCAS_MINERALES_INDUSTRIALES/MapServer/0", 'NOMBRE_COMERCIAL');
          },
          onSelectProvincia: function()
          {        
              var loUbigeo = lstProvincia.value.substring(0, 4);


              this.onClearValueCombo("lstDistrito");
              if (loUbigeo.length > 0) this.OnAddValueCombo(loUbigeo, "lstDistrito", "NM_DIST", "CD_DIST");
              
          },
          onSelectDistrito:function()
          {
              console.log("1");
           
          },
          onDefinitionQuery: function (ubigeo) {
              
              //NOMBRE_COMERCIAL='Baritina' capa:0

              var layerDefs = [];
              layerDefs[0] = "CODIGO_UBIGEO like '" + ubigeo + "%'"//"NOMBRE_COMERCIAL = 'Baritina'";
              dynamicMapServiceLayer.setLayerDefinitions(layerDefs);


          },
          onQueryTask: function (url, campo) {
              queryTask = new esri.tasks.QueryTask(url);
              //initialize query
              query = new esri.tasks.Query();
              query.returnGeometry = false;
              query.outFields = [campo];
              query.orderByFields = [campo];
              query.returnDistinctValues = true;
              //set query based on what user typed in for population;
              query.where = "1=1";

              //execute query
              queryTask.execute(query, this.showResults);


          },
          showResults: function (featureSet) {
             
              var resultFeatures = featureSet.features;

              for (var i = 0, il = resultFeatures.length; i < il; i++) {

                  console.log(resultFeatures[i].attributes.NOMBRE_COMERCIAL);
                  var dataAttr = new Date(feature.attributes.date)
             /*     var graphic = resultFeatures[i];
                  graphic.setSymbol(symbolDpto);

                  this.graphicsDpto.add(graphic);
                  */

              }

              //Capturar el extente y hacer zoom
             


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

          onSearch: function () 
          {

   

              dojo.xhrGet({
                  //url: "http://intranet2.ingemmet.gob.pe:85/contratosws/service.asmx/ws_p_sel_oficinas",
                  url: "http://intranet2.ingemmet.gob.pe:85/contratosws/service.asmx/ws_p_sel_ubigeo",
                  handleAs: 'text',
                  content : { 'paStrCodigo' : '' },
                  headers: {
                      'X-Requested-With': null,
                      'Content-Type': 'text/plain'
                  },
                  load: function (res) {          
                      var dr=JSON.parse(JSON.parse(res)),
                          options=[];

                      /* COMBO
                        for(var i=0;i<dr.length;i++){            
                             options.push({id:dr[i].CD_DEPA,name:dr[i].NM_DEPA});                    
                         }
                       var stateStore = new Memory({
                       data: options
                   });
               
                   
                       var comboBox = new ComboBox({
                           id: "stateSelect",
                           name: "state",
                           value: "Seleccionar",
                           store: stateStore,
                           searchAttr: "name"
                       }, "stateSelect");*/


                      //multiselect
                      var sel = dojo.byId('dynamic');
                      var n = 0;
                      for(var i=0;i<dr.length;i++){ 
                          var c = dojo.doc.createElement('option');
                          c.innerHTML = dr[i].NM_DEPA;
                          c.value = dr[i].CD_DEPA;
                          sel.appendChild(c);
                      }
                      new MultiSelect({ name: 'dynamic' }, sel);


                  }
              });




          },


          onLimpiar: function () 
          {
              console.log("Limpiar")

          },




      });
  });


