define(["dojo/_base/array", 'jimu/PanelManager', "jimu/WidgetManager", "dijit/Dialog",
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/Color', 'esri/layers/GraphicsLayer' ],
        function (arrayUtils, PanelManager, WidgetManager, Dialog,
            SimpleFillSymbol,
            SimpleLineSymbol,
            Color,
            GraphicsLayer) {
            var extent;
            this.graphicsNivel1 = new GraphicsLayer();
            this.graphicsNivel2  = new GraphicsLayer();
            this.graphicsNivel3 = new GraphicsLayer();
            this.graphicsNivel4 = new GraphicsLayer();

            this.symbolFillNivel1 = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1), new Color([255, 0, 0, 0.25]));
            this.symbolFillNivel2 = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1), new Color([255, 0, 0, 0.35]));
            this.symbolFillNivel3 = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1), new Color([255, 0, 0, 0.45]));
            this.symbolFillNivel4 = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1), new Color([255, 0, 0, 0.55]));

            this.loNumNivel = 0;

    return {
        

        init: function() {  
            on(dom.byId("chkbox1_ID"), "change", lang.hitch(this, function(evt) {  
                this.chk1_onChange(evt, param1, param2);  
            }));  
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

        },
        /*****************************************************************/
        /**************  Definition Query       **************************/
        /*****************************************************************/
        onSelectZoom: function (lourl, lowhere, nivel) {
            loNumNivel = nivel;
            queryTask = new esri.tasks.QueryTask(lourl);
            query = new esri.tasks.Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            query.outSpatialReference = _viewerMap.spatialReference;
            query.where = lowhere;
            queryTask.execute(query, this.showResults);

        },
        showResults: function (featureSet) {

            extent = 0;
            // ************  Nivel 1 - Poligono *******
            if (loNumNivel==1) {
                this.graphicsNivel1.clear();
                this.graphicsNivel2.clear();
                this.graphicsNivel3.clear();
                this.graphicsNivel4.clear();
                this.graphicsNivel1.add(featureSet.features[0].setSymbol(this.symbolFillNivel1));
                this._viewerMap.addLayer(this.graphicsNivel1);

                
            }
            // ************  Nivel 2 - Poligono *******
            if (loNumNivel == 2) {
                this.graphicsNivel2.clear();
                this.graphicsNivel3.clear();
                this.graphicsNivel4.clear();
                this.graphicsNivel2.add(featureSet.features[0].setSymbol(this.symbolFillNivel2));
                this._viewerMap.addLayer(this.graphicsNivel2);
                
            }

            // ************  Nivel 3 - Poligono *******
            if (loNumNivel == 3) {
                this.graphicsNivel3.clear();
                this.graphicsNivel4.clear();
                this.graphicsNivel3.add(featureSet.features[0].setSymbol(this.symbolFillNivel3));
                this._viewerMap.addLayer(this.graphicsNivel3);

            }
            if (loNumNivel == 4) {                
                this.graphicsNivel4.clear();
                this.graphicsNivel4.add(featureSet.features[0].setSymbol(this.symbolFillNivel4));
                this._viewerMap.addLayer(this.graphicsNivel4);

            }
            /************************/

            geometry = featureSet.features[0].geometry;
            ext = geometry.getExtent();
            if (extent) {
                extent = extent.union(ext);
            } else {
                extent = new esri.geometry.Extent(ext);
            }

            _viewerMap.setExtent(extent.expand(2));

//            this._viewerMap.map.setExtent(extent.expand(1.5));
        },
        fnLimpiarGraphics: function () {

            graphicsNivel1.clear();
            graphicsNivel2.clear();
            graphicsNivel3.clear();
            graphicsNivel4.clear();
        }
    };
}); 