(function(scope){var composeMatrix=function(){function multiply(a,b){for(var result=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],i=0;4>i;i++){for(var j=0;4>j;j++){for(var k=0;4>k;k++){result[i][j]+=b[i][k]*a[k][j]}}}return result}function is2D(m){return 0==m[0][2]&&0==m[0][3]&&0==m[1][2]&&0==m[1][3]&&0==m[2][0]&&0==m[2][1]&&1==m[2][2]&&0==m[2][3]&&0==m[3][2]&&1==m[3][3]}return function(translate,scale,skew,quat,perspective){for(var matrix=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],i=0;4>i;i++){matrix[i][3]=perspective[i]}for(var i=0;3>i;i++){for(var j=0;3>j;j++){matrix[3][i]+=translate[j]*matrix[j][i]}}var x=quat[0],y=quat[1],z=quat[2],w=quat[3],rotMatrix=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];rotMatrix[0][0]=1-2*(y*y+z*z);rotMatrix[0][1]=2*(x*y-z*w);rotMatrix[0][2]=2*(x*z+y*w);rotMatrix[1][0]=2*(x*y+z*w);rotMatrix[1][1]=1-2*(x*x+z*z);rotMatrix[1][2]=2*(y*z-x*w);rotMatrix[2][0]=2*(x*z-y*w);rotMatrix[2][1]=2*(y*z+x*w);rotMatrix[2][2]=1-2*(x*x+y*y);matrix=multiply(matrix,rotMatrix);var temp=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];if(skew[2]){temp[2][1]=skew[2];matrix=multiply(matrix,temp)}if(skew[1]){temp[2][1]=0;temp[2][0]=skew[0];matrix=multiply(matrix,temp)}if(skew[0]){temp[2][0]=0;temp[1][0]=skew[0];matrix=multiply(matrix,temp)}for(var i=0;3>i;i++){for(var j=0;3>j;j++){matrix[i][j]*=scale[i]}}if(is2D(matrix)){return[matrix[0][0],matrix[0][1],matrix[1][0],matrix[1][1],matrix[3][0],matrix[3][1]]}return matrix[0].concat(matrix[1],matrix[2],matrix[3])}}();function clamp(x,min,max){return Math.max(Math.min(x,max),min)}function quat(fromQ,toQ,f){var product=scope.dot(fromQ,toQ);product=clamp(product,-1,1);var quat=[];if(1===product){quat=fromQ}else{for(var theta=Math.acos(product),w=1*Math.sin(f*theta)/Math.sqrt(1-product*product),i=0;4>i;i++){quat.push(fromQ[i]*(Math.cos(f*theta)-product*w)+toQ[i]*w)}}return quat}scope.composeMatrix=composeMatrix;scope.quat=quat})(webAnimations1,webAnimationsTesting);