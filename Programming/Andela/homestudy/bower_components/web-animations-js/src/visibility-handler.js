(function(scope){scope.addPropertiesHandler(String,function(left,right){if("visible"!=left&&"visible"!=right)return;return[0,1,function(x){if(0>=x)return left;if(1<=x)return right;return"visible"}]},["visibility"])})(webAnimations1);