define(["../src/scoping-shim.js","../src/style-settings.js"],function(_scopingShim,_styleSettings){"use strict";_scopingShim=babelHelpers.interopRequireDefault(_scopingShim);const scopingShim=new _scopingShim.default;let ApplyShim,CustomStyleInterface;if(window.ShadyCSS){ApplyShim=window.ShadyCSS.ApplyShim;CustomStyleInterface=window.ShadyCSS.CustomStyleInterface}window.ShadyCSS={ScopingShim:scopingShim,prepareTemplate(template,elementName,elementExtends){scopingShim.flushCustomStyles();scopingShim.prepareTemplate(template,elementName,elementExtends)},prepareTemplateDom(template,elementName){scopingShim.prepareTemplateDom(template,elementName)},prepareTemplateStyles(template,elementName,elementExtends){scopingShim.flushCustomStyles();scopingShim.prepareTemplateStyles(template,elementName,elementExtends)},styleSubtree(element,properties){scopingShim.flushCustomStyles();scopingShim.styleSubtree(element,properties)},styleElement(element){scopingShim.flushCustomStyles();scopingShim.styleElement(element)},styleDocument(properties){scopingShim.flushCustomStyles();scopingShim.styleDocument(properties)},flushCustomStyles(){scopingShim.flushCustomStyles()},getComputedStyleValue(element,property){return scopingShim.getComputedStyleValue(element,property)},nativeCss:_styleSettings.nativeCssVariables,nativeShadow:_styleSettings.nativeShadow};if(ApplyShim){window.ShadyCSS.ApplyShim=ApplyShim}if(CustomStyleInterface){window.ShadyCSS.CustomStyleInterface=CustomStyleInterface}});