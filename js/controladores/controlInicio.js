miApp.controller("controlInicio",function($scope,$auth,$state,factoryLocal){

if($auth.isAuthenticated())
$scope.user = $auth.getPayload();
console.info($scope.user);

/* Modernizr 2.5.3 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-shiv-cssclasses-load
 */
	
	$scope.Deslogueo = function(){
console.info("hola");
				$auth.logout();
				$state.go("inicio");
			}

  factoryLocal.TraerTodosLosLocales()
                .then(function(respuesta) {
                  $scope.List= respuesta;
                    console.log(respuesta);
             
                });

})