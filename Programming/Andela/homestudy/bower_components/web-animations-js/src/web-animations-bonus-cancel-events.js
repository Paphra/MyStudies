(function(){if(document.createElement("div").animate([]).oncancel!==void 0){return}if(WEB_ANIMATIONS_TESTING){var now=function(){return webAnimations1.timeline.currentTime}}else if(window.performance&&performance.now){var now=function(){return performance.now()}}else{var now=function(){return Date.now()}}var AnimationCancelEvent=function(target,currentTime,timelineTime){this.target=target;this.currentTime=currentTime;this.timelineTime=timelineTime;this.type="cancel";this.bubbles=!1;this.cancelable=!1;this.currentTarget=target;this.defaultPrevented=!1;this.eventPhase=Event.AT_TARGET;this.timeStamp=Date.now()},originalElementAnimate=window.Element.prototype.animate;window.Element.prototype.animate=function(effectInput,options){var animation=originalElementAnimate.call(this,effectInput,options);animation._cancelHandlers=[];animation.oncancel=null;var originalCancel=animation.cancel;animation.cancel=function(){originalCancel.call(this);var event=new AnimationCancelEvent(this,null,now()),handlers=this._cancelHandlers.concat(this.oncancel?[this.oncancel]:[]);setTimeout(function(){handlers.forEach(function(handler){handler.call(event.target,event)})},0)};var originalAddEventListener=animation.addEventListener;animation.addEventListener=function(type,handler){if("function"==typeof handler&&"cancel"==type)this._cancelHandlers.push(handler);else originalAddEventListener.call(this,type,handler)};var originalRemoveEventListener=animation.removeEventListener;animation.removeEventListener=function(type,handler){if("cancel"==type){var index=this._cancelHandlers.indexOf(handler);if(0<=index)this._cancelHandlers.splice(index,1)}else{originalRemoveEventListener.call(this,type,handler)}};return animation}})();