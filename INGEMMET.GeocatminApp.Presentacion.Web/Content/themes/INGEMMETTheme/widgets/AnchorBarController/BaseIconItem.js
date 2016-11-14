///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define(['dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/on',
  'dojo/mouse',
  'dojo/Evented',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/popup',
  'dijit/TooltipDialog',
  'dojo/text!./BaseIconItem.html'
  ], function(declare, lang, domClass, domStyle, on, mouse, Evented,
  _WidgetBase, _TemplatedMixin, popup, TooltipDialog, template){
  var   PANEL_WIDTH = 200, PANEL_HEIGHT = 300, MIN_MARGIN = 10,
  BACKGROUND_COLOR_COUNT = 6;//INGEMMET
  /**
   * @exports themes/INGEMMETTheme/widgets/AnchorBarController/BaseIconItem
   */
  var clazz = declare([_WidgetBase, _TemplatedMixin, Evented], {
    baseClass: 'jimu-anchorbar-iconitem jimu-float-leading',
    templateString: template,
    /**
     * Widget info, read only
     * @type {object} - Include label and uri.
     */
    config: null,
    backgroundIndex: -1,
    /**
     * Whether this widget is opened.
     * @type {Boolean}
     */
    isOpen: false,
    /**
     * The index of this widget in the widget list. It is used to calculate position when
     * opened in panel.
     * @type {Number}
     */
    panelIndex: -1,

    /**
     * The size of the icon item.
     * @type {Number}
     */
    size: 40,

    postCreate: function() {
      this.inherited(arguments);

      this.tooltipDialog = new TooltipDialog({
        'content': this.config.label,
        'class': "launchpad-tooltip"
      });

        //domClass.add(this.iconItemNode, 'icon-item-background' + this.getBackgroundColorIndex());
      if (this.config.tipo == 'grupo')
      {
          domClass.add(this.iconItemNode, 'icon-item-grupo' + this.config.index);//INGEMMET                            
          domClass.add(this.lblNode, 'icon_menu_label_off');//INGEMMET
          

      }
      else {
          domClass.add(this.iconItemNode, ' menuIcon icon-item-background');//INGEMMET
          domClass.add(this.lblNode, 'icon_menu_label_on');//INGEMMET
      }

      

      this.own(on(this.iconItemNode, mouse.enter, lang.hitch(this, function(){
        if(!window.appInfo.isRunInMobile){
          popup.open({
            parent: this,
            popup: this.tooltipDialog,
            around: this.iconItemNode,
            orient: ['after-centered'],
            onCancel: lang.hitch(this, function(){
              popup.close(this.tooltipDialog);
            })
          });
        }
      })));

      this.own(on(this.iconItemNode, mouse.leave, lang.hitch(this, function(){
        if(!window.appInfo.isRunInMobile){
          popup.close(this.tooltipDialog);
        }
      })));
    },

    getConfigForPanel: function(){
      var panelConfig = lang.clone(this.config);
      panelConfig.backgroundColor = this.getColor();
      panelConfig.panel.position = this._initPosition();
      panelConfig.panel.position.index = this.panelIndex;

      return panelConfig;
    },

    /**
     * Calculate initial position of the panel containing this widget.
     * @private
     * @return {object} position object, contains left, right, width and height
     */
    _initPosition: function () {
       
        var _top, _left, _width, _height, _margin;

        try{
            _top = window.appInfo.isRunInMobile ? (typeof this.config.position.top != "undefined" ?  this.config.position.top : 20) : 120;//INGEMMET
            _left= typeof this.config.position.left != "undefined" ? this.config.position.left : MIN_MARGIN;
            _width= typeof this.config.position.width != "undefined" ? this.config.position.width : PANEL_WIDTH;
            _height= typeof this.config.position.height != "undefined" ? this.config.position.height : PANEL_HEIGHT;
            _margin= MIN_MARGIN;
        }
        catch(error)
        {
            _top= window.appInfo.isRunInMobile ? 20 : 120;
            _left= MIN_MARGIN;
            _width= PANEL_WIDTH;
            _height= PANEL_HEIGHT;
            _margin= MIN_MARGIN;
        }
        


      return {
          top: _top,//INGEMMET
          left: _left,
          width: _width,
          height: _height,
          margin: _width
      };
    },

    /**
     * Event handler when user click this node.
     * @private
     */
    _onNodeClick: function(){
      domClass.toggle(this.iconItemStatus, 'selected');
      domClass.toggle(this.iconItemNode, 'selected');
      this.isOpen = domClass.contains(this.iconItemNode, 'selected');

      if(!this.isOpen){
        this.panelIndex = -1;
      }

      this.emit('nodeClick', {
        target: this
      });
    },

    /**
     * Check if this item is a widget group.
     * @return {Boolean} Return true if this is a widget group, or false if this is a single widget.
     */
    isGroup: function(){
      if(this.config.widgets && this.config.widgets.length > 1){
        return true;
      }else{
        return false;
      }
    },

    isOpenAtStart: function(){
      return this.config && this.config.openAtStart === true;
    },

    setOpened: function(value){
      if(value){
        if(this.iconItemStatus){
          domClass.add(this.iconItemStatus, 'selected');
        }
        if(this.iconItemNode){
          domClass.add(this.iconItemNode, 'selected');
        }

        this.isOpen = true;
      }else{
        if(this.iconItemStatus){
          domClass.remove(this.iconItemStatus, 'selected');
        }
        if(this.iconItemNode){
          domClass.remove(this.iconItemNode, 'selected');
        }
        this.isOpen = false;
        this.panelIndex = -1;
      }
    },

    getPanelIndex: function(){
      return this.panelIndex;
    },

    setPanelIndex: function(theValue){
      this.panelIndex = theValue;
    },

    getColor: function(){
        return domStyle.get(this.iconItemNode, 'background-color') || '#056896';
    },

    getBackgroundColorIndex: function(){
      return this.backgroundIndex % BACKGROUND_COLOR_COUNT;
    }
  });
  return clazz;
});
