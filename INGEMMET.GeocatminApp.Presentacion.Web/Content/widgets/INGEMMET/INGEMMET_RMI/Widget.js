define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'dijit/_WidgetsInTemplateMixin'],
  function (declare,
            BaseWidget,
            _WidgetsInTemplateMixin) {
    //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget, _WidgetsInTemplateMixin], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-RMI',

      //this property is set by the framework when widget is loaded.
      name: 'RMIWidget',


      //methods to communication with app container:

       postCreate: function() {
         this.inherited(arguments);
           //console.log('postCreate');

         this._this;


       },

       startup: function() {
        this.inherited(arguments);
        _this = this;
        console.log('startup');
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