define(["dojo/_base/array", 'jimu/PanelManager', "jimu/WidgetManager", "dijit/Dialog"], function (arrayUtils, PanelManager, WidgetManager, Dialog) {
    return {  
        init: function() {  
            on(dom.byId("chkbox1_ID"), "change", lang.hitch(this, function(evt) {  
                this.chk1_onChange(evt, param1, param2);  
            }));  
        },  
        wResize: function (_widget, _w, _h) {
            dojo.byId([_widget.getPanel()][0].id).style.height = _w;
            dojo.byId([_widget.getPanel()][0].id).style.height = _h
        },

        /********************************************************/
        fnAlerta: function (_msg) {
            var myDialog = new Dialog({
                title: "Geocatmin",
                style: "width: 300px",
                content: _msg
            });
            
            myDialog.show();
        } 
    };  
}); 