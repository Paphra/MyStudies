(function(scope){function consumeShadow(string){var shadow={inset:!1,lengths:[],color:null};var result=scope.consumeRepeated(function(string){var result=scope.consumeToken(/^inset/i,string);if(result){shadow.inset=!0;return result}var result=scope.consumeLengthOrPercent(string);if(result){shadow.lengths.push(result[0]);return result}var result=scope.consumeColor(string);if(result){shadow.color=result[0];return result}},/^/,string);if(result&&result[0].length){return[shadow,result[1]]}}var mergeShadowList=function(nestedMerge,separator,left,right){var leftCopy=[],rightCopy=[];function defaultShadow(inset){return{inset:inset,color:[0,0,0,0],lengths:[{px:0},{px:0},{px:0},{px:0}]}}for(var i=0;i<left.length||i<right.length;i++){var l=left[i]||defaultShadow(right[i].inset),r=right[i]||defaultShadow(left[i].inset);leftCopy.push(l);rightCopy.push(r)}return scope.mergeNestedRepeated(nestedMerge,separator,leftCopy,rightCopy)}.bind(null,function(left,right){var _Mathmax=Math.max;while(left.lengths.length<_Mathmax(left.lengths.length,right.lengths.length))left.lengths.push({px:0});while(right.lengths.length<_Mathmax(left.lengths.length,right.lengths.length))right.lengths.push({px:0});if(left.inset!=right.inset||!!left.color!=!!right.color){return}for(var lengthReconstitution=[],colorReconstitution,matchingLeft=[[],0],matchingRight=[[],0],i=0,mergedDimensions;i<left.lengths.length;i++){mergedDimensions=scope.mergeDimensions(left.lengths[i],right.lengths[i],2==i);matchingLeft[0].push(mergedDimensions[0]);matchingRight[0].push(mergedDimensions[1]);lengthReconstitution.push(mergedDimensions[2])}if(left.color&&right.color){var mergedColor=scope.mergeColors(left.color,right.color);matchingLeft[1]=mergedColor[0];matchingRight[1]=mergedColor[1];colorReconstitution=mergedColor[2]}return[matchingLeft,matchingRight,function(value){for(var result=left.inset?"inset ":" ",i=0;i<lengthReconstitution.length;i++){result+=lengthReconstitution[i](value[0][i])+" "}if(colorReconstitution){result+=colorReconstitution(value[1])}return result}]},", ");scope.addPropertiesHandler(function(string){var result=scope.consumeRepeated(consumeShadow,/^,/,string);if(result&&""==result[1]){return result[0]}},mergeShadowList,["box-shadow","text-shadow"])})(webAnimations1);