define(['dojo/_base/declare'
        , 'jimu/BaseWidget'
        , "dijit/form/ComboBox"
        , "dojo/dom"
        , "dojo/store/Memory"],
  function (declare, BaseWidget, ComboBox, dom, Memory) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      postCreate: function () {
          this.inherited(arguments);
          console.log('postCreate');
      },

      // startup: function() {
      //  this.inherited(arguments);
      //  this.mapIdNode.innerHTML = 'map id:' + this.map.id;
      //  console.log('startup');
      // },

       onOpen: function(){
           console.log('onOpen');
           dojo.xhrGet({
               url: "http://intranet2.ingemmet.gob.pe:85/contratosws/service.asmx/ws_p_sel_ubigeo",
               handleAs: 'text',
               content: { 'paStrCodigo': '' },
               headers: {
                   'X-Requested-With': null,
                   'Content-Type': 'text/plain'
               },
               load: function (res) {
                   var dr = JSON.parse(JSON.parse(res)),
                     options = [];

                   /*********Cargar valores de  la lista **********************/
                   var sel = dojo.byId('lstDepartamento');
                   var n = 0;
                   for (var i = 0; i < dr.length; i++) {
                       var c = dojo.doc.createElement('option');
                       c.innerHTML = dr[i].NM_DEPA;
                       c.value = dr[i].CD_DEPA;
                       sel.appendChild(c);
                   }
                   new MultiSelect({
                       name: 'lstDepartamento',
                       onChange: onSelectDepartamento(),
                       style: "with:500px"
                   }, sel);

               }
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

        onSelectDepartamento: function() 
        {
            console.log('postCreate');
        
        },
    });
  });