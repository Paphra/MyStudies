define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.default=function(callback){requestAnimationFrame(function(){if(whenReady){whenReady(callback)}else{if(!readyPromise){readyPromise=new Promise(resolve=>{resolveFn=resolve});if("complete"===document.readyState){resolveFn()}else{document.addEventListener("readystatechange",()=>{if("complete"===document.readyState){resolveFn()}})}}readyPromise.then(function(){callback&&callback()})}})};let readyPromise=null,whenReady=window.HTMLImports&&window.HTMLImports.whenReady||null,resolveFn});