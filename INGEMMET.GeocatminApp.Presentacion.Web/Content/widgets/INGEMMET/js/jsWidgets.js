var fnGeneral = {
    /********************************************************/
    init: function () {
        alert();
    },
    /********************************************************/
    wResize: function (_widget, _w, _h) {
        dojo.byId([_widget.getPanel()][0].id).style.height = _w;
        dojo.byId([_widget.getPanel()][0].id).style.height = _h
    },

     /********************************************************/   
    fnAbrirWidgetResultados: function (_thisResultados) {

        var myWidget = null;


        arrayUtils.some(_thisResultados.widgetManager.appConfig.widgetPool.widgets, function (aWidget) {
            if (aWidget.id == 'INGEMMET_TablaResultados') {
                myWidget = aWidget;
                return true;
            }
            return false;
        });


        for (i = 0; i < _thisResultados.widgetManager.appConfig.widgetPool.groups.length; i++) {
            arrayUtils.some(_thisResultados.widgetManager.appConfig.widgetPool.groups[i].widgets, function (aWidget) {
                if (aWidget.id == 'INGEMMET_TablaResultados') {
                    myWidget = aWidget;
                    return true;
                }
                return false;
            });
        }

        _thisResultados.widgetManager.loadWidget(myWidget);
        _thisResultados.widgetManager.openWidget(myWidget);
        var pm = PanelManager.getInstance();
        pm.showPanel(myWidget);
        _thisResultados.widgetManager.activeWidget.onActive = myWidget;
    },
    /********************************************************/


};

//fnGenaral.init();


//fnGenaral.gr = function () { };


