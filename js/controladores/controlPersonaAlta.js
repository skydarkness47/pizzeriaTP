miApp.controller("controlPersonaAlta",function($scope,$state,FileUploader,$http,$auth){
					$scope.logeado = $auth.getPayload();

			if(!$auth.isAuthenticated())
			$state.go("login.menu");

			//inicio las variables
			$scope.SubirdorArchivos = new FileUploader({url:'./servidor/archivos.php'});  $scope.persona={};
			  $scope.persona.nombre= "natalia" ;
			  $scope.persona.dni= "12312312" ;
			  $scope.persona.apellido= "natalia" ;
			  $scope.persona.foto="pordefecto.png";


			$scope.SubirdorArchivos.onSuccessItem = function(item, response, status, headers) {
			            console.info('onSuccessItem', item, response, status, headers);
			            $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
						  .then(function(respuesta) {     	
						 //aca se ejetuca si retorno sin errores      	
								 console.log(respuesta.data);
							

								},function errorCallback(response) {     		
						//aca se ejecuta cuando hay errores
								console.log( response);     			
				  });
						console.info("Ya guardé el archivo.", item, response, status, headers);
			        };




				  $scope.Guardar=function(){
					console.log($scope.SubirdorArchivos.queue);
					if($scope.SubirdorArchivos.queue[0]!=undefined)
					{
						var nombreFoto = $scope.SubirdorArchivos.queue[0]._file.name;
						$scope.persona.foto=nombreFoto;
					}
					$scope.SubirdorArchivos.uploadAll();
				  	console.log("persona a guardar:");
				    console.log($scope.persona);
					

				  

				  }
					


				$scope.Desloguear = function(){

					$auth.logout();
				}

				$scope.IraAlta = function(){
				$state.go("persona.Alta");
				}
				$scope.IraGrilla = function(){
					$state.go("persona.Grilla");
				}



});
