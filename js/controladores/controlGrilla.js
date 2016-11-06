miApp.controller("controlGrillas",function($scope,Grilla,$state,$http,$auth){
			$scope.logeado = $auth.getPayload();
			console.info(Grilla);

			/*
		 	$http.get('PHP/nexo.php', { params: {accion :"traer"}})
		 	.then(function(respuesta) {     	
		      	 $scope.ListadoPersonas = respuesta.data.listado;
		      	 

		    },function errorCallback(response) {
		     		 $scope.ListadoPersonas= [];
		     		console.log( response);

		     	});

*/
		$scope.Desloguear = function(){

			$auth.logout();
			$state.go("login.menu");
		}

		$scope.IraAlta = function(){
		$state.go("persona.Alta");
		}
		$scope.IraGrilla = function(){
			$state.go("persona.Grilla");
		}


		 	
		 	$scope.Borrar=function(persona){
				console.log("borrar"+persona);



		$http.post("PHP/nexo.php",{datos:{accion :"borrar",persona:persona}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
		 .then(function(respuesta) {       
		         //aca se ejetuca si retorno sin errores        
		         console.log(respuesta.data);
				 $http.get('PHP/nexo.php', { params: {accion :"traer"}})
				.then(function(respuesta) {     	
					console.log(persona);
					 $scope.ListadoPersonas = respuesta.data.listado;
					 console.log(respuesta.data);

				},function errorCallback(response) {
						 $scope.ListadoPersonas= [];
						console.log( response);
				 });

		    },function errorCallback(response) {        
		        //aca se ejecuta cuando hay errores
		        console.log( response);           
		    });


		 	}


		$scope.Modificar=function(persona)
			{
				$state.go("modificacion", persona);
			};

})