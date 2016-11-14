define(['dojo/_base/declare'
    , 'jimu/BaseWidget'
    , 'dijit/form/MultiSelect'
    , 'dijit/form/DateTextBox'
    , "dojo/store/Memory"
    , "dijit/form/ComboBox"
    , "dojo/dom"
    , "esri/tasks/QueryTask"
    , "esri/tasks/query"
    , 'esri/layers/GraphicsLayer'
    , 'esri/symbols/SimpleFillSymbol'
    , 'esri/symbols/SimpleLineSymbol'
    , 'esri/Color'
    , 'esri/graphicsUtils'],
  function(declare, BaseWidget, MultiSelect, DateTextBox,Memory, ComboBox,dom, QueryTask, Query,GraphicsLayer,SimpleFillSymbol,SimpleLineSymbol,Color,graphicsUtils) {
    this.graphicsDpto = new GraphicsLayer();
    this.graphicsProv = new GraphicsLayer();
    this.graphicsDist = new GraphicsLayer();

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

       postCreate: function() {
         this.inherited(arguments);
         console.log('postCreate');
       },

      // startup: function() {
      //  this.inherited(arguments);
      //  this.mapIdNode.innerHTML = 'map id:' + this.map.id;
      //  console.log('startup');
      // },

       onOpen: function()
       {

        //this.widgets_BuscarDM_ubigeo_panel.style.height="270px"
        //this.widgets_BuscarDM_ubigeo_panel.style.width="390px"

         //console.log('onOpen');
         dojo.xhrGet({
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

            /*********Cargar valores de  la lista **********************/
            var sel = dojo.byId('lstDepartamento');
            var n = 0;
            for(var i=0;i<dr.length;i++){ 
              var c = dojo.doc.createElement('option');
              c.innerHTML = dr[i].NM_DEPA;
              c.value = dr[i].CD_DEPA;
              sel.appendChild(c);
            }
            new MultiSelect({ name: 'lstDepartamento',
                              onChange: onSelectDepartamento() ,
                              style:"with:500px"
                            }, sel);

          }
        });


       



        this.widgets_BuscarDM_ubigeo_panel.style.height="270px"
        this.widgets_BuscarDM_ubigeo_panel.style.width="390px"


      
        



       },
       onSelectDepartamento: function() 
       {

          console.log(lstDepartamento.value);

          var loUbigeo = lstDepartamento.value.substring(0,2);
          console.log(loUbigeo);

          
          dojo.xhrGet({
          url: "http://intranet2.ingemmet.gob.pe:85/contratosws/service.asmx/ws_p_sel_ubigeo",
          handleAs: 'text',
          content : { 'paStrCodigo' : loUbigeo },
          headers: {
            'X-Requested-With': null,
            'Content-Type': 'text/plain'
          },          

          load: function (res) {          
            var dr=JSON.parse(JSON.parse(res)),
              options=[];

            /*********Cargar valores de  la lista **********************/
            var selDist = dojo.byId('lstDistrito');
            selDist.innerHTML = '';

            var sel = dojo.byId('lstProvincia');            
            sel.innerHTML = '';


            var n = 0;
            for(var i=0;i<dr.length;i++){ 
              var c = dojo.doc.createElement('option');
              c.innerHTML = dr[i].NM_PROV;
              c.value = dr[i].CD_PROV;
              sel.appendChild(c);
            }
            new MultiSelect({ name: 'lstProvincia',
                              onChange: onSelectProvincia() 
                            }, sel);

          }
        });

          // llama funcion para el querytask
          this.onQueryTaskDpto("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_DEMARCACION_WGS84/MapServer/0",loUbigeo);
          this.position.height = 300;
       },
       onSelectProvincia: function()
       {
          console.log(lstProvincia.value);

          var loUbigeo = lstProvincia.value.substring(0,4);


          dojo.xhrGet({
          url: "http://intranet2.ingemmet.gob.pe:85/contratosws/service.asmx/ws_p_sel_ubigeo",
          handleAs: 'text',
          content : { 'paStrCodigo' : loUbigeo },
          headers: {
            'X-Requested-With': null,
            'Content-Type': 'text/plain'
          },
          load: function (res) {          
            var dr=JSON.parse(JSON.parse(res)),
              options=[];

            /*********Cargar valores de  la lista **********************/
            var sel = dojo.byId('lstDistrito');            
            
            sel.innerHTML = '';

            var n = 0;
            for(var i=0;i<dr.length;i++){ 
              var c = dojo.doc.createElement('option');
              c.innerHTML = dr[i].NM_DIST;
              c.value = dr[i].CD_DIST;
              sel.appendChild(c);
            }
            new MultiSelect({ name: 'lstDistrito',
                              onChange: onSelectProvincia() 
                            }, sel);

          }
        });

          // llama funcion para el querytask
          this.onQueryTaskProv("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_DEMARCACION_WGS84/MapServer/1",loUbigeo);
        

       },
       onSelectDistrito:function()
       {
          
          var loUbigeo = lstDistrito.value.substring(0,6);
          this.onQueryTaskDist("http://geocatmin.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_DEMARCACION_WGS84/MapServer/2",loUbigeo);
       },

      onQueryTaskDpto: function(url,ubigeo)
      {        
        queryTask = new esri.tasks.QueryTask(url);
        //initialize query
        query = new esri.tasks.Query();
        query.returnGeometry = true;
        query.outFields = [ "*" ];

        //set query based on what user typed in for population;
        query.where = "CD_DEPA ='" + ubigeo +"'";

        //execute query
        queryTask.execute(query,this.showResultsDpto);
        

      },
      onQueryTaskProv: function(url,ubigeo)
      {        
        queryTask = new esri.tasks.QueryTask(url);
        //initialize query
        query = new esri.tasks.Query();
        query.returnGeometry = true;
        query.outFields = [ "*" ];

        //set query based on what user typed in for population;
        query.where = "CD_PROV ='" + ubigeo +"'";

        //execute query
        queryTask.execute(query,this.showResultsProv);
        

      },
      onQueryTaskDist: function(url,ubigeo)
      {        
        queryTask = new esri.tasks.QueryTask(url);
        //initialize query
        query = new esri.tasks.Query();
        query.returnGeometry = true;
        query.outFields = [ "*" ];

        //set query based on what user typed in for population;
        query.where = "CD_DIST ='" + ubigeo +"'";

        //execute query
        queryTask.execute(query,this.showResultsDist);
        

      },
      showResultsDpto: function(featureSet) {
        if (!this.graphicsDpto.length) this.graphicsDpto.clear();
        if (!this.graphicsProv.length) this.graphicsProv.clear();
        if (!this.graphicsDist.length) this.graphicsDist.clear();

        this.graphicsDpto.name = "SearchDpto";
        this._viewerMap.addLayer(this.graphicsDpto);

        var resultFeatures = featureSet.features;

        for (var i=0, il=resultFeatures.length; i<il; i++) 
        {

          var graphic = resultFeatures[i];
          graphic.setSymbol(symbolDpto);

          this.graphicsDpto.add(graphic);




        }

        //Capturar el extente y hacer zoom
        var extGraphics = graphicsUtils.graphicsExtent(this.graphicsDpto.graphics);  
        this._viewerMap.setExtent(extGraphics.expand(1.5)); 


      },
      showResultsProv: function(featureSet) {
        if (!this.graphicsProv.length) this.graphicsProv.clear();
        if (!this.graphicsDist.length) this.graphicsDist.clear();

        this.graphicsProv.name = "SearchProv";
        this._viewerMap.addLayer(this.graphicsProv);

        var resultFeatures = featureSet.features;

        for (var i=0, il=resultFeatures.length; i<il; i++) 
        {

          var graphic = resultFeatures[i];
          graphic.setSymbol(symbolProv);

          this.graphicsProv.add(graphic);

        }
      },
       showResultsDist: function(featureSet) {
        
        if (!this.graphicsDist.length) this.graphicsDist.clear();

        this.graphicsDist.name = "SearchDist";
        this._viewerMap.addLayer(this.graphicsDist);

        var resultFeatures = featureSet.features;

        for (var i=0, il=resultFeatures.length; i<il; i++) 
        {

          var graphic = resultFeatures[i];
          graphic.setSymbol(symbolDist);

          this.graphicsDist.add(graphic);

        }
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


