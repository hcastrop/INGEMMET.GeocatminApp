define(["dojo/_base/array",
        'jimu/PanelManager', "jimu/WidgetManager", 'dojo/_base/lang',
        'dojo/dom',
        'dojo/dom-class',
        'dojo/dom-style',
        'dojo/on',
        "dojo/data/ItemFileWriteStore",
        "dojo/data/ItemFileReadStore",
        "dojo/store/Memory",        
        "dojo/data/ItemFileReadStore",
        "dojo/parser",
        "dijit/form/ComboBox",
        "dojo/domReady!"],
        function (arrayUtils,
            PanelManager,
            WidgetManager,
            lang,
            dom, domClass, domStyle, on, ItemFileWriteStore, ItemFileReadStore,
            Memory,
            parser,
            ComboBox,
            ItemFileReadStore,
            domReady) {


            return {


                init: function () {
                    on(dom.byId("chkbox1_ID"), "change", lang.hitch(this, function (evt) {
                        this.chk1_onChange(evt, param1, param2);
                    }));
                },

                /*****************************************************************/
                /**************  Elimina Opciones de ListBox**************************/
                /*****************************************************************/
                removeAllOptions: function (_select) {
                    try {
                        var sel = dom.byId(_select);
                        var i;
                        for (i = sel.options.length - 1; i >= 0; i--) {
                            sel.remove(i);
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }

                },
                /************************************************************/
                /**************  Mostrar Controles **************************/
                /************************************************************/
                fnOcultar: function (_control) {
                    try{
                       var  _controlForm = dijit.byId(_control);
                        domClass.add(_controlForm, "oculto");
                    }
                    catch(err)
                    {
                        domClass.add(_control, "oculto");
                    }
                },

                /************************************************************/
                /**************  Ocultar Controles **************************/
                /************************************************************/
                fnMostrar: function (_control) {
                    console.log(_control);
                    try {
                        var _controlForm = dijit.byId(_control);                        
                        domClass.remove(_controlForm, "oculto");
                    }
                    catch (err) {
                        domClass.remove(_control, "oculto");
                    }

                    
                },

                /*********************************************************************************/
                /**************  Permite adicionar datos a los comobos  **************************/
                /*********************************************************************************/
                fnCargarCombos: function (_combo, _Criterio, _url) {

                    //sel = dom.byId(_combo);
                    //_appControl.fnCargarCombos(sel, _Criterio, "/Combos/SelListarUbigeo");

                    this.removeAllOptions(_combo);

                    var param = dojo.toJson({ Parametro: _Criterio });
                    dojo.xhrPost({
                        url:_url,// "/Combos/SelListarUbigeo",
                        postData: param,
                        handleAs: "json",
                        contentType: "application/json",
                        handle: function (res) {
                            console.log(res);
                            var values = [];
                            for (var i = 0; i < res.length; i++) {
                                values.push({ name: res[i].name, value: res[i].value });
                            }
                            var dataItems = {
                                identifier: 'value',
                                id:'value',
                                label: 'name',
                                items: values,
                                maxHeight: 300
                            };
                            var datos = new Memory({ data: dataItems });
                            dijit.byId(_combo).store = datos;
                        },
                        error: function (error) {
                            console.log(error + " - " + _combo);
                        }
                    });

                },
                /*********************************************************************************/
                /**************  Permite adicionar datos a los Listas  **************************/
                /*********************************************************************************/
                fnCargarLista: function (_select, _Criterio, _url) {
                    var sel = dom.byId(_select);


                    var param = dojo.toJson({ Parametro: _Criterio });
                    dojo.xhrPost({
                        url: _url,//"/Combos/SelListarHojas",
                        postData: param,
                        //Con parametros
                        //postData: dojo.toJson({ Parametro: "010000" }), 
                        handleAs: "json",
                        contentType: "application/json",
                        handle: function (res) {
                            console.log(res);


                            var n = 0;

                            for (var i = 0; i < res.length; i++) {
                                var c = dojo.doc.createElement('option');
                                c.innerHTML = res[i].name;
                                c.value = res[i].value;
                                sel.appendChild(c);
                                // console.log(i);
                            }

                            // var myMultiSelect = new MultiSelect({ name: _select }, sel).startup();

                        },
                        error: function (error) {
                            // We'll 404 in the demo, but that's okay.  We don't have a 'postIt' service on the
                            // docs server.
                            //   dojo.byId("response2").innerHTML = "Message posted.";
                            console.log(error);
                        }
                    });
                  

                },
                /********************************************************************/
                /**************  Elimina Opciones de Combo **************************/
                /********************************************************************/
                removeAllOptionsCombo: function (_select) {
                    try
                    {
                        var sel = dom.byId(_select);
                        var i;
                        for (i = sel.options.length - 1; i >= 0; i--) {
                            sel.remove(i);
                        }
                    }
                    catch(err)
                    {
                        console.log('Remove items combo')
                    }
                    
                },

            };
        });