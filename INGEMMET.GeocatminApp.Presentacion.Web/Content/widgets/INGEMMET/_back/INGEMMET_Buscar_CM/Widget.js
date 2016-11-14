define(['dojo/_base/declare', 'jimu/BaseWidget', 'dijit/form/TextBox', 'dojo/date/locale',"dojo/aspect", "dojo/parser", "dijit/form/DateTextBox"],
  function(declare, BaseWidget, TextBox, locale,aspect,parser,DateTextBox ) {
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

      // startup: function() {
      //  this.inherited(arguments);
      //  this.mapIdNode.innerHTML = 'map id:' + this.map.id;
      //  console.log('startup');
      // },

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
onSearch: function () {
        console.log("Buscar");
        console.log(nombre.value);

        console.log(this.config.url);

        var loStrWhere = "";

        if (codigo.value.length >0)
        {
             loStrWhere =  loStrWhere + "upper(CODIGOU) like upper('%"  + codigo.value +"%')" + " OR ";
        }

        if (nombre.value.length >0)
        {
             loStrWhere =  loStrWhere + "upper(CONCESION) like upper('%"  + nombre.value +"%')" + " OR ";
        }

      if (titular.value.length >0)
        {
             loStrWhere = loStrWhere + "upper(TIT_CONCES)  like upper('%"  + titular.value +"%')" + " OR ";
        }

      /*if (desde.value.length >0 )
        {
             loStrWhere = loStrWhere + "FEC_DENU like '%"  + titular.value +"%'" + " OR ";
        }
      */
        console.log (loStrWhere);

        loStrWhere = loStrWhere.substring(0, loStrWhere.length-3)

        
        this.fnBuscar(loStrWhere);

      },
onLimpiar: function () {
        console.log("Limpiar")

      },
      fnBuscar: function( loStrWhere)
      {
        console.log (loStrWhere);
        document.getElementById("divMensaje").innerHTML=loStrWhere;

      }
    });
  });


