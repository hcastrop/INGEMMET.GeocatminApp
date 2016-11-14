define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'dijit/_WidgetsInTemplateMixin'],
  function (declare,
            BaseWidget,
            _WidgetsInTemplateMixin) {
    //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget, _WidgetsInTemplateMixin], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      name: 'CustomWidget',


      //methods to communication with app container:

       postCreate: function() {
         this.inherited(arguments);
           //console.log('postCreate');

         this._this;


       },

       startup: function() {
        this.inherited(arguments);
        _thisTablaResultados = this;
        console.log('startup');
       },

       onReceiveData: function (name, widgetId, data, historyData) {
           //filter out messages
           if (name !== 'widgets_BuscarDM' && name !== 'INGEMMET_BuscarDMUbigeo') {
               return;
           }

           //var msg = '<div style="margin:10px;">' +
           //  '<b>Receive data from</b>:' + name +
           //  '<br><b>widgetId:</b>' + widgetId +
           //  '<br><b>data:</b>' + data._where+"<br>"+data._url+"<br>"+data._layout;
           console.log(data._where, data._url, data._layout);
           //this.onBuscar(data.message);


           //this.onBuscarParametros(data._where, data._url, data._layout)



           //handle history data
           /*if(historyData === true){
               //want to fetch history data.
               msg += '<br><b>historyData:</b>' + historyData + '. Fetch again.</div>';
               this.messageNode.innerHTML = this.messageNode.innerHTML + msg;
               this.fetchDataByName('WidgetA');
           }else{
               msg += '<br><b>historyData:</b><br>' +
                 array.map(historyData, function(data, i){
                     return i + ':' + data.message;
                 }).join('<br>') + '</div>';
               this.messageNode.innerHTML = this.messageNode.innerHTML + msg;
           }
           */

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