define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'dijit/_WidgetsInTemplateMixin',
        'dijit/form/TextBox',
        'dijit/form/Button',
        'dijit/form/DateTextBox',
        "../js/jsWidgetAMD",
        
        'dojo/domReady!'],
  function (declare,
            BaseWidget,
            _WidgetsInTemplateMixin,
            TextBox,
            Button,
            DateTextBox,
            _app,
            domReady) {
    //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget, _WidgetsInTemplateMixin], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-BuscarDM',

      //this property is set by the framework when widget is loaded.
      name: 'Buscar_DM',


      //methods to communication with app container:

       postCreate: function() {
         this.inherited(arguments);           
         this._urlCatastro;
         this._layout;
         this._this;
         this._array;
         this._Catastro;
       },

       startup: function() {
        this.inherited(arguments);
           
        

        _this = this;
        //_array = [];
        //_urlCatastro = this.config.urlCatastro;
        //_layout = this.config.layout;
        _Catastro = this.config.Catastro;

        dijit.byId("txtCodigo").on("keydown", function (e) { _this.fnEnter(e);});
        dijit.byId("txtNombre").on("keydown", function (e) { _this.fnEnter(e);});
        dijit.byId("txtTitular").on("keydown", function (e) { _this.fnEnter(e);});


        dijit.byId("btnBuscar").on("click", function (event) { _this.btnBuscar(); });
        dijit.byId("btnLimpiar").on("click", function (event) { _this.btnLimpiar(); });


           /*Fechas*/
        var date = new Date();

        //console.log(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());

        dijit.byId('myToDate').set('disabled', true);
        //var loFecha = (date.getDate()+1) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()           
        //dijit.byId('myFromDate').constraints.min = '08/03/1771';
        //myFromDate.constraints.max = Date();

        dojo.connect(dijit.byId("myFromDate"), "onChange", function (value) {
            try
            {
                dijit.byId('myToDate').set('disabled', true);
                
                if (myFromDate.value.toString().length > 0) {
                    dijit.byId('myToDate').set('disabled', false);

                }
                
            }
            catch (err) {
            }

        });


       },

       fnEnter: function (e)
       {
           var code = (e.keyCode ? e.keyCode : e.which);
           if (code == 13) { 
               _this.btnBuscar();
           }
       },
       onOpen: function(){
           console.log('onOpen');
           //_this.onDefinitionQuery("");
       },

       onClose: function(){           
           console.log('onClose Busqueda DM');
           _app.fnAbrirWidgetResultados(this, "1=2", "", "");
       },

       onMinimize: function(){
           console.log('onMinimize');
           _app.fnAbrirWidgetResultados(this, "1=2", "", "");
       },

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
       btnBuscar: function () {
           //console.log("Buscar");
          // console.log(nombre.value);

           console.log(this.config.url);
           if ((txtCodigo.value.length + txtNombre.value.length + txtTitular.value.length + myFromDate.getDisplayedValue().toString().length + myFromDate.getDisplayedValue().toString().length) > 0)
           {
               var loStrWhere = "";

               if (txtCodigo.value.length > 0) {
                   loStrWhere = loStrWhere + "upper(CODIGOU) like upper('%" + txtCodigo.value + "%')" + " AND ";
               }

               if (txtNombre.value.length > 0) {
                   loStrWhere = loStrWhere + "upper(CONCESION) like upper('%" + txtNombre.value + "%')" + " AND ";
               }

               if (txtTitular.value.length > 0) {
                   loStrWhere = loStrWhere + "upper(TIT_CONCES)  like upper('%" + txtTitular.value + "%')" + " AND ";
               }
               /* Fechas */
               try {
                   var loFecha = "";
                   if (myFromDate.getDisplayedValue().toString().length > 0) {
                       loFecha = " FEC_DENU like TO_DATE('" + myFromDate.getDisplayedValue().toString() + "','DD/MM/YYYY') AND "
                   }
                   if (myFromDate.getDisplayedValue().toString().length > 0 && myToDate.getDisplayedValue().toString().length > 0) {
                       loFecha = " FEC_DENU between TO_DATE('" + myFromDate.getDisplayedValue().toString() + "','DD/MM/YYYY') AND  TO_DATE('" + myToDate.getDisplayedValue().toString() + "','DD/MM/YYYY') AND"
                   }
                   loStrWhere = loStrWhere + loFecha;
               }
               catch (err) {
                   //document.getElementById("demo").innerHTML = err.message;
               }               
               loStrWhere = loStrWhere.substring(0, loStrWhere.length - 4)
               _this.fnBuscar(loStrWhere);
           }
           else {
               //alert("Ingrese criterio de busqueda...!");

               _app.fnAlerta("Ingrese criterio de busqueda...!")
           }
            
       },
       fnBuscar: function( loStrWhere)
       {
           
           _Catastro[0].criterio = loStrWhere;
           _app.fnAbrirWidgetResultados(_this, loStrWhere, _Catastro, "");
           //_app.fnAbrirWidgetResultados(_this, loStrWhere, _urlCatastro, _layout);

          // _this.onDefinitionQuery(loStrWhere);

       },
      btnLimpiar: function () {
          //  console.log('Limpiar');
          txtCodigo.value = "";
          txtTitular.value = "";
          txtNombre.value = "";
          myFromDate.value = "";
          myToDate.value = "";
          _app.fnAbrirWidgetResultados(this, "1=2", "", "");

      },
      onDefinitionQuery: function (loWhere)
      {

          for (var j = 0, jl = _viewerMap.layerIds.length; j < jl; j++) {
              var currentLayer = _viewerMap.getLayer(_viewerMap.layerIds[j]);
              if (currentLayer.id == 'Catastro Minero')
              {
                  //console.log("id: " + currentLayer.id);
                  //console.log(currentLayer);
                  //console.log(j);
                  //currentLayer.setVisibleLayers([0],true);
                  //currentLayer.visible = true;                  
                  currentLayer.setVisibility(true)
                  console.log("-----");

                  var layerDefinitions = [];
                  layerDefinitions[0] = "DEMAGIS like '06%'";
                  //layerDefinitions[1] = "AREA > 100000";
                  currentLayer.setLayerDefinitions(layerDefinitions);
              }
              
          }


      }
    });
  });