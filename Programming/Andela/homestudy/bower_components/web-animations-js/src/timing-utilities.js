(function(shared,testing){var _Mathabs=Math.abs,fills="backwards|forwards|both|none".split("|"),directions="reverse|alternate|alternate-reverse".split("|"),linear=function(x){return x};function AnimationEffectTiming(){this._delay=0;this._endDelay=0;this._fill="none";this._iterationStart=0;this._iterations=1;this._duration=0;this._playbackRate=1;this._direction="normal";this._easing="linear";this._easingFunction=linear}function isInvalidTimingDeprecated(){return shared.isDeprecated("Invalid timing inputs","2016-03-02","TypeError exceptions will be thrown instead.",!0)}AnimationEffectTiming.prototype={_setMember:function(member,value){this["_"+member]=value;if(this._effect){this._effect._timingInput[member]=value;this._effect._timing=shared.normalizeTimingInput(this._effect._timingInput);this._effect.activeDuration=shared.calculateActiveDuration(this._effect._timing);if(this._effect._animation){this._effect._animation._rebuildUnderlyingAnimation()}}},get playbackRate(){return this._playbackRate},set delay(value){this._setMember("delay",value)},get delay(){return this._delay},set endDelay(value){this._setMember("endDelay",value)},get endDelay(){return this._endDelay},set fill(value){this._setMember("fill",value)},get fill(){return this._fill},set iterationStart(value){if((isNaN(value)||0>value)&&isInvalidTimingDeprecated()){throw new TypeError("iterationStart must be a non-negative number, received: "+timing.iterationStart)}this._setMember("iterationStart",value)},get iterationStart(){return this._iterationStart},set duration(value){if("auto"!=value&&(isNaN(value)||0>value)&&isInvalidTimingDeprecated()){throw new TypeError("duration must be non-negative or auto, received: "+value)}this._setMember("duration",value)},get duration(){return this._duration},set direction(value){this._setMember("direction",value)},get direction(){return this._direction},set easing(value){this._easingFunction=parseEasingFunction(normalizeEasing(value));this._setMember("easing",value)},get easing(){return this._easing},set iterations(value){if((isNaN(value)||0>value)&&isInvalidTimingDeprecated()){throw new TypeError("iterations must be non-negative, received: "+value)}this._setMember("iterations",value)},get iterations(){return this._iterations}};function makeTiming(timingInput,forGroup){var timing=new AnimationEffectTiming;if(forGroup){timing.fill="both";timing.duration="auto"}if("number"==typeof timingInput&&!isNaN(timingInput)){timing.duration=timingInput}else if(timingInput!==void 0){Object.getOwnPropertyNames(timingInput).forEach(function(property){if("auto"!=timingInput[property]){if("number"==typeof timing[property]||"duration"==property){if("number"!=typeof timingInput[property]||isNaN(timingInput[property])){return}}if("fill"==property&&-1==fills.indexOf(timingInput[property])){return}if("direction"==property&&-1==directions.indexOf(timingInput[property])){return}if("playbackRate"==property&&1!==timingInput[property]&&shared.isDeprecated("AnimationEffectTiming.playbackRate","2014-11-28","Use Animation.playbackRate instead.")){return}timing[property]=timingInput[property]}})}return timing}function normalizeTimingInput(timingInput,forGroup){timingInput=shared.numericTimingToObject(timingInput);return makeTiming(timingInput,forGroup)}function cubic(a,b,c,d){if(0>a||1<a||0>c||1<c){return linear}return function(x){if(0>=x){var start_gradient=0;if(0<a)start_gradient=b/a;else if(!b&&0<c)start_gradient=d/c;return start_gradient*x}if(1<=x){var end_gradient=0;if(1>c)end_gradient=(d-1)/(c-1);else if(1==c&&1>a)end_gradient=(b-1)/(a-1);return 1+end_gradient*(x-1)}var start=0,end=1;while(start<end){var mid=(start+end)/2;function f(a,b,m){return 3*a*(1-m)*(1-m)*m+3*b*(1-m)*m*m+m*m*m}var xEst=f(a,c,mid);if(1e-5>_Mathabs(x-xEst)){return f(b,d,mid)}if(xEst<x){start=mid}else{end=mid}}return f(b,d,mid)}}var Start=1,Middle=.5,End=0;function step(count,pos){return function(x){if(1<=x){return 1}var stepSize=1/count;x+=pos*stepSize;return x-x%stepSize}}var presets={ease:cubic(.25,.1,.25,1),"ease-in":cubic(.42,0,1,1),"ease-out":cubic(0,0,.58,1),"ease-in-out":cubic(.42,0,.58,1),"step-start":step(1,Start),"step-middle":step(1,Middle),"step-end":step(1,End)},styleForCleaning=null,numberString="\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*",cubicBezierRe=new RegExp("cubic-bezier\\("+numberString+","+numberString+","+numberString+","+numberString+"\\)"),stepRe=/steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/;function normalizeEasing(easing){if(!styleForCleaning){styleForCleaning=document.createElement("div").style}styleForCleaning.animationTimingFunction="";styleForCleaning.animationTimingFunction=easing;var normalizedEasing=styleForCleaning.animationTimingFunction;if(""==normalizedEasing&&isInvalidTimingDeprecated()){throw new TypeError(easing+" is not a valid value for easing")}return normalizedEasing}function parseEasingFunction(normalizedEasing){if("linear"==normalizedEasing){return linear}var cubicData=cubicBezierRe.exec(normalizedEasing);if(cubicData){return cubic.apply(this,cubicData.slice(1).map(Number))}var stepData=stepRe.exec(normalizedEasing);if(stepData){return step(+stepData[1],{start:Start,middle:Middle,end:End}[stepData[2]])}var preset=presets[normalizedEasing];if(preset){return preset}return linear}function calculateActiveDuration(timing){return _Mathabs(repeatedDuration(timing)/timing.playbackRate)}function repeatedDuration(timing){if(0===timing.duration||0===timing.iterations){return 0}return timing.duration*timing.iterations}var PhaseNone=0,PhaseBefore=1,PhaseAfter=2,PhaseActive=3;function calculatePhase(activeDuration,localTime,timing){var _Mathmin=Math.min;if(null==localTime){return PhaseNone}var endTime=timing.delay+activeDuration+timing.endDelay;if(localTime<_Mathmin(timing.delay,endTime)){return PhaseBefore}if(localTime>=_Mathmin(timing.delay+activeDuration,endTime)){return PhaseAfter}return PhaseActive}function calculateActiveTime(activeDuration,fillMode,localTime,phase,delay){switch(phase){case PhaseBefore:if("backwards"==fillMode||"both"==fillMode)return 0;return null;case PhaseActive:return localTime-delay;case PhaseAfter:if("forwards"==fillMode||"both"==fillMode)return activeDuration;return null;case PhaseNone:return null;}}function calculateOverallProgress(iterationDuration,phase,iterations,activeTime,iterationStart){var overallProgress=iterationStart;if(0===iterationDuration){if(phase!==PhaseBefore){overallProgress+=iterations}}else{overallProgress+=activeTime/iterationDuration}return overallProgress}function calculateSimpleIterationProgress(overallProgress,iterationStart,phase,iterations,activeTime,iterationDuration){var simpleIterationProgress=overallProgress===1/0?iterationStart%1:overallProgress%1;if(0===simpleIterationProgress&&phase===PhaseAfter&&0!==iterations&&(0!==activeTime||0===iterationDuration)){simpleIterationProgress=1}return simpleIterationProgress}function calculateCurrentIteration(phase,iterations,simpleIterationProgress,overallProgress){var _Mathfloor=Math.floor;if(phase===PhaseAfter&&iterations===1/0){return 1/0}if(1===simpleIterationProgress){return _Mathfloor(overallProgress)-1}return _Mathfloor(overallProgress)}function calculateDirectedProgress(playbackDirection,currentIteration,simpleIterationProgress){var currentDirection=playbackDirection;if("normal"!==playbackDirection&&"reverse"!==playbackDirection){var d=currentIteration;if("alternate-reverse"===playbackDirection){d+=1}currentDirection="normal";if(d!==1/0&&0!==d%2){currentDirection="reverse"}}if("normal"===currentDirection){return simpleIterationProgress}return 1-simpleIterationProgress}shared.cloneTimingInput=function(timingInput){if("number"==typeof timingInput){return timingInput}var clone={};for(var m in timingInput){clone[m]=timingInput[m]}return clone};shared.makeTiming=makeTiming;shared.numericTimingToObject=function(timingInput){if("number"==typeof timingInput){if(isNaN(timingInput)){timingInput={duration:0}}else{timingInput={duration:timingInput}}}return timingInput};shared.normalizeTimingInput=normalizeTimingInput;shared.calculateActiveDuration=calculateActiveDuration;shared.calculateIterationProgress=function(activeDuration,localTime,timing){var phase=calculatePhase(activeDuration,localTime,timing),activeTime=calculateActiveTime(activeDuration,timing.fill,localTime,phase,timing.delay);if(null===activeTime)return null;var overallProgress=calculateOverallProgress(timing.duration,phase,timing.iterations,activeTime,timing.iterationStart),simpleIterationProgress=calculateSimpleIterationProgress(overallProgress,timing.iterationStart,phase,timing.iterations,activeTime,timing.duration),currentIteration=calculateCurrentIteration(phase,timing.iterations,simpleIterationProgress,overallProgress),directedProgress=calculateDirectedProgress(timing.direction,currentIteration,simpleIterationProgress);return timing._easingFunction(directedProgress)};shared.calculatePhase=calculatePhase;shared.normalizeEasing=normalizeEasing;shared.parseEasingFunction=parseEasingFunction;if(WEB_ANIMATIONS_TESTING){testing.normalizeTimingInput=normalizeTimingInput;testing.normalizeEasing=normalizeEasing;testing.parseEasingFunction=parseEasingFunction;testing.calculateActiveDuration=calculateActiveDuration;testing.calculatePhase=calculatePhase;testing.PhaseNone=PhaseNone;testing.PhaseBefore=PhaseBefore;testing.PhaseActive=PhaseActive;testing.PhaseAfter=PhaseAfter}})(webAnimationsShared,webAnimationsTesting);