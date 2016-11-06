miApp.controller("controlInicio",function($scope,$auth){

if($auth.isAuthenticated())
$scope.user = $auth.getPayload();
console.info($scope.user);





})