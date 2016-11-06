
miApp.controller("controlMenuAbstracto",function($scope,$auth,$state){



if($auth.isAuthenticated())
$scope.user = $auth.getPayload();

console.info($scope.user);

	$scope.Desloguear = function(){

				$auth.logout();
				$state.go("login.menu");
			}




})