(function(){"use strict";const CustomStyleInterface=window.ShadyCSS.CustomStyleInterface;class CustomStyle extends HTMLElement{constructor(){super();this._style=null;CustomStyleInterface.addCustomStyle(this)}getStyle(){if(!this._style){this._style=this.querySelector("style")}return this._style}}window.CustomStyle=CustomStyle;window.customElements.define("custom-style",CustomStyle)})();