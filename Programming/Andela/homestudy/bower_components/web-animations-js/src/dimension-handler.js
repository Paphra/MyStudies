(function(scope){function calculate(expression){var tokenRegularExpression=/([\+\-\w\.]+|[\(\)\*\/])/g,currentToken;function consume(){var matchResult=tokenRegularExpression.exec(expression);if(matchResult)currentToken=matchResult[0];else currentToken=void 0}consume();function calcNumber(){var result=+currentToken;consume();return result}function calcValue(){if("("!==currentToken)return calcNumber();consume();var result=calcSum();if(")"!==currentToken)return NaN;consume();return result}function calcProduct(){var left=calcValue();while("*"===currentToken||"/"===currentToken){var operator=currentToken;consume();var right=calcValue();if("*"===operator)left*=right;else left/=right}return left}function calcSum(){var left=calcProduct();while("+"===currentToken||"-"===currentToken){var operator=currentToken;consume();var right=calcProduct();if("+"===operator)left+=right;else left-=right}return left}return calcSum()}function parseDimension(unitRegExp,string){string=string.trim().toLowerCase();if("0"==string&&0<="px".search(unitRegExp))return{px:0};if(!/^[^(]*$|^calc/.test(string))return;string=string.replace(/calc\(/g,"(");var matchedUnits={};string=string.replace(unitRegExp,function(match){matchedUnits[match]=null;return"U"+match});var taggedUnitRegExp="U("+unitRegExp.source+")",typeCheck=string.replace(/[-+]?(\d*\.)?\d+([Ee][-+]?\d+)?/g,"N").replace(new RegExp("N"+taggedUnitRegExp,"g"),"D").replace(/\s[+-]\s/g,"O").replace(/\s/g,""),reductions=[/N\*(D)/g,/(N|D)[*/]N/g,/(N|D)O\1/g,/\((N|D)\)/g],i=0;while(i<reductions.length){if(reductions[i].test(typeCheck)){typeCheck=typeCheck.replace(reductions[i],"$1");i=0}else{i++}}if("D"!=typeCheck)return;for(var unit in matchedUnits){var result=calculate(string.replace(new RegExp("U"+unit,"g"),"").replace(new RegExp(taggedUnitRegExp,"g"),"*0"));if(!isFinite(result))return;matchedUnits[unit]=result}return matchedUnits}function mergeDimensionsNonNegative(left,right){return mergeDimensions(left,right,!0)}function mergeDimensions(left,right,nonNegative){var units=[],unit;for(unit in left)units.push(unit);for(unit in right){if(0>units.indexOf(unit))units.push(unit)}left=units.map(function(unit){return left[unit]||0});right=units.map(function(unit){return right[unit]||0});return[left,right,function(values){var result=values.map(function(value,i){if(1==values.length&&nonNegative){value=Math.max(value,0)}return scope.numberToString(value)+units[i]}).join(" + ");return 1<values.length?"calc("+result+")":result}]}var parseLength=parseDimension.bind(null,/px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc/g),parseLengthOrPercent=parseDimension.bind(null,/px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|%/g),parseAngle=parseDimension.bind(null,/deg|rad|grad|turn/g);scope.parseLength=parseLength;scope.parseLengthOrPercent=parseLengthOrPercent;scope.consumeLengthOrPercent=scope.consumeParenthesised.bind(null,parseLengthOrPercent);scope.parseAngle=parseAngle;scope.mergeDimensions=mergeDimensions;var consumeLength=scope.consumeParenthesised.bind(null,parseLength),consumeSizePair=scope.consumeRepeated.bind(void 0,consumeLength,/^/),consumeSizePairList=scope.consumeRepeated.bind(void 0,consumeSizePair,/^,/);scope.consumeSizePairList=consumeSizePairList;var mergeNonNegativeSizePair=scope.mergeNestedRepeated.bind(void 0,mergeDimensionsNonNegative," "),mergeNonNegativeSizePairList=scope.mergeNestedRepeated.bind(void 0,mergeNonNegativeSizePair,",");scope.mergeNonNegativeSizePair=mergeNonNegativeSizePair;scope.addPropertiesHandler(function(input){var result=consumeSizePairList(input);if(result&&""==result[1]){return result[0]}},mergeNonNegativeSizePairList,["background-size"]);scope.addPropertiesHandler(parseLengthOrPercent,mergeDimensionsNonNegative,["border-bottom-width","border-image-width","border-left-width","border-right-width","border-top-width","flex-basis","font-size","height","line-height","max-height","max-width","outline-width","width"]);scope.addPropertiesHandler(parseLengthOrPercent,mergeDimensions,["border-bottom-left-radius","border-bottom-right-radius","border-top-left-radius","border-top-right-radius","bottom","left","letter-spacing","margin-bottom","margin-left","margin-right","margin-top","min-height","min-width","outline-offset","padding-bottom","padding-left","padding-right","padding-top","perspective","right","shape-margin","stroke-dashoffset","text-indent","top","vertical-align","word-spacing"])})(webAnimations1,webAnimationsTesting);