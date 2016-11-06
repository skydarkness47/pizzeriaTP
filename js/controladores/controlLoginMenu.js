miApp.controller("controlLoginMenu",function(factoryLoginABM,$scope,$state,$auth,$http){
			
$scope.usuario  = {};
$scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };


if($auth.isAuthenticated())
	console.info("Token",$auth.getPayload());
else
	console.info("No Token",$auth.getPayload());

$scope.IniciarSeccion = function(tipo){

$scope.usuario.perfil = tipo;

console.info($scope.usuario);
	$scope.usuario = JSON.stringify($scope.usuario);
	
factoryLoginABM.validarLogin($scope.usuario)
 .then(function(respuesta) {    
 	console.info(respuesta);
         	$scope.validador = respuesta;

         	console.info("d",$scope.validador);
			if($scope.validador != true)
			{
				$scope.usuario  = {};
				console.log("no entro");
			}else
			{
				console.log("entro");

factoryLoginABM.TraerObjeto($scope.usuario)
 		 	.then(function(respuesta) {   	
		console.info(respuesta);
			$auth.login($scope.usuario)
  				.then(function(response) {
  					console.info(response);
 			 		if($auth.isAuthenticated()){
				  			$state.go("inicio");
							console.info("Token Validado", $auth.getPayload());
							$scope.usuario  = {};
						}
						else
							console.info("No Token Valido",$auth.getPayload());
				    		$scope.usuario  = {};
  	})
  	.catch(function(response) {
    	console.info("no",response);
  	});


		},function errorCallback(response) {
				 $scope.ListadoPersonas= [];
				console.log( response);
		 });

			
		}
	    	
  	});

}
})