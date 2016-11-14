define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'dijit/_WidgetsInTemplateMixin',
        "dojox/charting/Chart2D",
        "dojox/charting/themes/MiamiNice",
        "dijit/form/ComboBox",
        "../js/jsWidgetControles",
        "../js/jsWidgetLayer",
        "dijit/form/RadioButton",
        "dojox/charting/plot2d/StackedColumns",
        "dojox/charting/plot2d/Lines",
        "dojox/charting/action2d/Tooltip",
        "dojox/charting/widget/Legend",
        "dojox/charting/plot2d/ClusteredColumns",
        "dojo/dom",
        "dojo/html"
],
  function (declare,
            BaseWidget,
            _WidgetsInTemplateMixin,
            Chart2D, MiamiNice,
            ComboBox,
            _appControl,
            _appLayer,
            RadioButton,
            StackedColumns,
            Lines,
            Tooltip, Legend,
            ClusteredColumns,
            dom,
            html) {
      //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget, _WidgetsInTemplateMixin], {
          // Custom widget code goes here

          baseClass: 'jimu-widget-customwidget',

          //this property is set by the framework when widget is loaded.
          name: 'CustomWidgetDistribucion',


          //methods to communication with app container:

          postCreate: function () {
              this.inherited(arguments);
              //console.log('postCreate');
              this._urlRegion;
              this._urlProvincia;
              this._urlDistrito;

              this._thisDistribucion;


          },

          startup: function () {
              this.inherited(arguments);
              _urlRegion = this.config.urlRegion;
              _urlProvincia = this.config.urlProvincia;
              _urlDistrito = this.config.urlDistrito;

              _thisDistribucion = this;
              console.log('startup');


              dijit.byId("lstRegion_Distribucion").on("change", function (event) { _thisDistribucion.onSelectDepartamento(); });
              dijit.byId("lstProvincia_Distribucion").on("change", function (event) { _thisDistribucion.onSelectProvincia(); });
              dijit.byId("lstDistrito_Distribucion").on("change", function (event) { _thisDistribucion.onSelectDistrito(); });


              _thisDistribucion.fnChart("");

          },

          fnChart: function (_Criterio) {

              var _meses = [];
              var _valoresAnio_1 = [];
              var _valoresAnio_2 = [];
              var _valoresAnio_3 = [];

              var param = dojo.toJson({ sTipo: _Criterio });
              dojo.xhrPost({
                  url: "/PagoVigencia/ListarPagoVigencia",
                  postData: param,
                  //Con parametros
                  //postData: dojo.toJson({ Parametro: "010000" }), 
                  handleAs: "json",
                  contentType: "application/json",
                  handle: function (res) {
                      console.log(res);
                      var values = [];
                      for (var i = 0; i < res.length; i++) {
                          _valoresAnio_1.push(parseFloat(res[i].sDAnio1));
                          _valoresAnio_2.push(parseFloat(res[i].sDAnio2));
                          _valoresAnio_3.push(parseFloat(res[i].sDAnio3));

                          _meses.push({ text: res[i].sNombre, value: i + 1 });
                      }

                      /*                      var dataItems = {
                                                identifier: 'value',
                                                id: 'value',
                                                label: 'name',
                                                items: values,
                                                maxHeight: 300
                                            };
                                            var datos = new Memory({ data: dataItems });
                                            dijit.byId(_select).store = datos;*/

                      // When the DOM is ready and resources are loaded...

                      html.set(dom.byId("chartNode"), "");


                  

                          //****************************************/
                          //definir años
                          var fecha = new Date();
                          var _Anio_1 = fecha.getFullYear();
                          var _Anio_2 = _Anio_1 - 1;
                          var _Anio_3 = _Anio_2 - 1;
                          /**************************************/
                          // Define tipo de datos
                          var _tipoGraph = "ClusteredColumns";
                          var _tipoGraphSeries = "stackedColumnsPlot";
                          var _rotacion = 0;
                          if (_Criterio.length == 0) {
                              _tipoGraph = "StackedColumns";
                              _tipoGraphSeries = "stackedColumnsPlot";
                              _rotacion = -90;
                          }

                          /******************************/
                          // Define the data

                          // Create the chart within it's "holding" node




                          var chart1 = new dojox.charting.Chart2D("chartNode");

                          chart1.addPlot("stackedColumnsPlot", {
                              type: _tipoGraph,
                              lines: false,
                              gap: 5,
                              areas: true,
                              markers: false,
                              labels: true,
                              labelStyle: "inside",
                              tension: "S", animate: { duration: 500 }
                          });


                          if (_Criterio.length == 0) {

                              chart1.addPlot("linesPlot", {
                                  type: Lines,
                                  markers: true,
                                  stroke: { width: 2 },
                                  tension: 2
                              });
                          }

                          chart1.addAxis("x", {
                              labels: _meses,
                              rotation: _rotacion,
                              majorTicks: true,
                              majorTickStep: 1,                              
                              minorTicks: false,
                          });

                          if (_Criterio.length == 0) {
                              chart1.addAxis("y", {
                                  vertical: true
                              });
                          }
                          else {
                              chart1.addAxis("y", {
                                  //title: "Cost",
                                  fixLower: "major",
                                  fixUpper: "major",
                                  includeZero: true,
                                 // majorTickStep: 500,
                                //  max: 1500,
                                  //from:1000,
                                  //to:6000,
                                  vertical: true
                              });
                          }


                          chart1.addSeries(_Anio_1, _valoresAnio_1, { plot: "stackedColumnsPlot", stroke: { color: "#e48701" }, fill: "#e48701" });
                          chart1.addSeries(_Anio_2, _valoresAnio_2, { plot: "stackedColumnsPlot", stroke: { color: "#a5bc4e" }, fill: "#a5bc4e" });
                          chart1.addSeries(_Anio_3, _valoresAnio_3, { plot: "stackedColumnsPlot", stroke: { color: "#1b95d9" }, fill: "#1b95d9" });

                          //  chart1.movePlotToFront("linesPlot");

                          new Tooltip(chart1, "stackedColumnsPlot", {
                              text: function (chartItem) {
                                  // console.debug(chartItem);
                                  //return "US $: " + chartItem.run.data[chartItem.index] + "; Total US $: " + chartItem.y;
                                  return "<b>" + chartItem.chart.axes.x.labels[chartItem.index].text + "(" + chartItem.run.name + ")</b><br>US $: " + chartItem.run.data[chartItem.index];
                              }
                          });

                        // new Tooltip(chart1, "linesPlot");

                          chart1.render();
                          var legend = new Legend({ chart: chart1 }, "legend1");
                          //new SelectableLegend({ chart: chart1, horizontal: true }, "chart1SelectableLegend");


                    

                  },
                  error: function (error) {
                      // We'll 404 in the demo, but that's okay.  We don't have a 'postIt' service on the
                      // docs server.
                      //   dojo.byId("response2").innerHTML = "Message posted.";
                      console.log(error);
                  }
              });




          },

          onOpen: function () {
              console.log('onOpenDistribucion');
              _thisDistribucion.fnUbigeo('lstRegion_Distribucion', "")
          },

          onClose: function () {
              console.log('onClose');
              this._graphicsLayer.clear();
              _appLayer.fnLimpiarGraphics()
          },


          fnUbigeo: function (_select, _Criterio) {
              _appControl.fnCargarCombos(_select, _Criterio, "/Combos/SelListarUbigeo");
          },
          onSelectDepartamento: function () {

              _thisDistribucion.fnUbigeo('lstProvincia_Distribucion', dijit.byId("lstRegion_Distribucion").item.value);
              _appLayer.onSelectZoom(_urlRegion, "CD_DEPA" + " = '" + dijit.byId("lstRegion_Distribucion").item.value + "'", 1);

              //_appControl.fnMostrar('lblProvincia_Distribucion');
              _appControl.fnMostrar('lstProvincia_Distribucion');

              //_appControl.fnOcultar('lblDistrito_Distribucion');
              _appControl.fnOcultar('lstDistrito_Distribucion');

              _thisDistribucion.fnChart(dijit.byId("lstRegion_Distribucion").item.value);
              //_app.wResize(_thisDMUbigeo, 430, 250)


          },
          onSelectProvincia: function () {


              //
              _thisDistribucion.fnUbigeo('lstDistrito_Distribucion', dijit.byId("lstProvincia_Distribucion").item.value);
              _appLayer.onSelectZoom(_urlProvincia, "CD_PROV" + " = '" + dijit.byId("lstProvincia_Distribucion").item.value + "'", 2);


              _appControl.fnMostrar('_lblDistrito_Distribucion');
              _appControl.fnMostrar('_lstDistrito_Distribucion');

          },
          onSelectDistrito: function () {
              _appLayer.onSelectZoom(_urlDistrito, "CD_DIST" + " = '" + dijit.byId("lstDistrito_Distribucion").item.value + "'", 3);
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