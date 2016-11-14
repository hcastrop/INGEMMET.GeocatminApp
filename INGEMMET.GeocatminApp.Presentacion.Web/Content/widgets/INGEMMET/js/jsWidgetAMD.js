define(["dojo/_base/array", 'jimu/PanelManager', "jimu/WidgetManager", "dijit/Dialog"], function (arrayUtils, PanelManager, WidgetManager, Dialog) {
    return {  
        init: function() {  
            on(dom.byId("chkbox1_ID"), "change", lang.hitch(this, function(evt) {  
                this.chk1_onChange(evt, param1, param2);  
            }));  
        },  
        wResize: function (_widget, _w, _h) {
            dojo.byId([_widget.getPanel()][0].id).style.width = _w + "px";
            dojo.byId([_widget.getPanel()][0].id).style.height = _h + "px";
        },

        /********************************************************/
        fnAbrirWidgetResultados: function (_thisWidgets, _pa_Where, _pa_array, _pa_geom) {

            var myWidget = null;


            arrayUtils.some(_thisWidgets.widgetManager.appConfig.widgetPool.widgets, function (aWidget) {
                if (aWidget.id == 'INGEMMET_Resultados') {
                    myWidget = aWidget;
                    return true;
                }
                return false;
            });


            for (i = 0; i < _thisWidgets.widgetManager.appConfig.widgetPool.groups.length; i++) {
                arrayUtils.some(_thisWidgets.widgetManager.appConfig.widgetOnScreen.widgets, function (aWidget) {
                    if (aWidget.id == 'INGEMMET_Resultados') {
                        myWidget = aWidget;
                        return true;
                    }
                    return false;
                });
            }

            _thisWidgets.widgetManager.loadWidget(myWidget);
            //_thisWidgets.widgetManager.openWidget(myWidget);
            var pm = PanelManager.getInstance();
            pm.showPanel(myWidget);
            //_thisWidgets.widgetManager.activeWidget.onActive = myWidget;


            /************* Preparar grilla con resultados*************/

            _thisWidgets.publishData({
                _where:_pa_Where,                
                _array: _pa_array,
                _geom: _pa_geom
                });
        },
        fnCerrarWidget: function (widgetid)
        {
            //var pm = PanelManager.getInstance();
            //pm.showPanel(myWidget);
            PanelManager.getInstance().closePanel(widgetid + '_panel');
            //_thisWidgets.WidgetManager.getInstance().closeWidget(widgetId)

        }
      ,
        fnAlerta: function (_msg) {
        var myDialog = new Dialog({
            title: "Geocatmin",
            style: "width: 300px",
            content: _msg
        });
            
        myDialog.show();
        },
        /*****************************************************************/
        /**************  Definition Query       **************************/
        /*****************************************************************/
        onDefinitionQuery: function (loName, loWhereDef, loNumCapas) {
            //loNumCapas = [1,2]  ejem.

            for (var j = 0, jl = _viewerMap.layerIds.length; j < jl; j++) {
                var currentLayer = _viewerMap.getLayer(_viewerMap.layerIds[j]);
                if (currentLayer.id == loName) {
                    currentLayer.setVisibility(true)

                    var layerDefinitions = [];
                    for (var i = 0; i < loNumCapas.length; i++) {
                        var _capa = Number(loNumCapas[i]);
                        layerDefinitions[_capa] = loWhereDef;
                        // msgForNormal = msgForNormal + dato[i] + ' - '; 
                    }


                    currentLayer.setLayerDefinitions(layerDefinitions);
                }
            }

        }

    };
}); 