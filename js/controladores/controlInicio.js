miApp.controller("controlInicio",function($scope,$auth,$state){

if($auth.isAuthenticated())
$scope.user = $auth.getPayload();
console.info($scope.user);


	
	$scope.Deslogueo = function(){

				$auth.logout();
				$state.go("inicio");
			}


})