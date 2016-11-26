miApp.controller("controlLoginMenu",function(factoryLoginABM,$scope,$state,$auth,$http){
			
$scope.usuario  = {};
$scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };


if($auth.isAuthenticated())
	console.info("Token",$auth.getPayload());
else
	console.info("No Token",$auth.getPayload());

$scope.RegistroClientes =function(){
	$state.go("menu.Registro");
}

$scope.Usuarios = function(param)
	{
		if(param === "ADMINISTRADOR")
		{
			console.info("hola");
			$scope.usuario.nombre_usuario="admin";
			$scope.usuario.pass_usuario="admin"
		}else if(param === "CLIENTE")
		{
			$scope.usuario.nombre_usuario="cliente";
			$scope.usuario.pass_usuario="cliente"
		}
		else if(param === "EMPLEADO")
		{
			$scope.usuario.nombre_usuario="empleado";
			$scope.usuario.pass_usuario="empleado"
		}
	}



$scope.IniciarSeccion = function(){

	
factoryLoginABM.validarLogin(JSON.stringify($scope.usuario))
 .then(function(respuesta) {    
 	

 				if(respuesta != true)
			{
				$scope.usuario  = {};
				console.log("no entro");
			}else{
			
				console.log("entro");
			

factoryLoginABM.TraerObjeto(JSON.stringify($scope.usuario))
 		 	.then(function(respuesta) { 
 		 	console.info(respuesta);
			$auth.login(respuesta)
  				.then(function(response) {
  				
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