
miApp.controller("controlLogin",function($scope,$state,$auth,$http){

		$scope.usuario={};
		$scope.usuario.correo = "admin@admin";
		$scope.usuario.password = "admin";

		$scope.authenticate = function(provider) {
		      $auth.authenticate(provider);
		    };


		if($auth.isAuthenticated())
			console.info("Token",$auth.getPayload());
		else
			console.info("No Token",$auth.getPayload());

		$scope.IniciarSeccion = function(){
		$http.post("PHP/nexo.php",{datos:{accion :"validar",usuario:$scope.usuario}})
		 .then(function(respuesta) {       
		         //aca se ejetuca si retorno sin errores        
         	$scope.validador = respuesta.data;

         	console.info("d",$scope.validador);
			if($scope.validador != true)
			{
				console.log("no entro");
			}else
			{
								console.log("entro");
				 $http.post("PHP/nexo.php",{datos:{accion :"traer",usuario:$scope.usuario}})	
				 		 	.then(function(respuesta) {     	
							$datos = respuesta.data;
							$scope.usuario.tipo =$datos;
							console.info($scope.usuario);	
							$auth.login($scope.usuario)
				  			.then(function(response) {
				  				console.info(response);

				  			if($auth.isAuthenticated()){
				  				$state.go("persona.Grilla");
							
							console.info("Token Validado", $auth.getPayload());
							
						}
						else
							console.info("No Token Valido",$auth.getPayload());
    	
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