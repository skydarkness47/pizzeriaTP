miApp.controller("controlABM",function($scope,$auth,$state,FileUploader,factoryLoginABM){
	console.log(factoryLoginABM.ApiArchivos());
	
//inicio las variables
	$scope.SubirdorArchivos = new FileUploader({url:factoryLoginABM.ApiArchivos()});  
	$scope.usuario={};
  	/*$scope.persona.nombre= "natalia" ;
  	$scope.persona.dni= "1" ;
  	$scope.persona.apellido= "natalia" ;
  	$scope.persona.foto="pordefecto.png";
  	*///$scope.persona.foto="http://localhost:8080/Laboratorio-IV-2016/Clase.07/ws1/fotos/pordefecto.png";


	$scope.SubirdorArchivos.onCompleteAll = function(item, response, status, headers) {
		$scope.usuario.perfil = $scope.tipologin;

           
           factoryLoginABM.Insertar(JSON.stringify($scope.usuario)) //+ JSON.stringify($scope.persona))
			  .then(function(respuesta) {  
			  console.log($scope.usuario);   	
			 //aca se ejetuca si retorno sin errores 
			 		console.info(respuesta);
					 $state.go("menu.Grillas");
				

					},function errorCallback(response) {     		
			//aca se ejecuta cuando hay errores
					console.info(response);     			
  		});
        };




  $scope.Guardar=function(){
	if($scope.SubirdorArchivos.queue != undefined)
	{
		var nombreFoto="";
		for (i in $scope.SubirdorArchivos.queue) {
			if(nombreFoto != "")
				nombreFoto = nombreFoto + ";" +($scope.SubirdorArchivos.queue[i]._file.name);
			else
				nombreFoto = ($scope.SubirdorArchivos.queue[i]._file.name);
		}
		$scope.usuario.foto=nombreFoto;
		console.log($scope.usuario.foto);
	}
	$scope.SubirdorArchivos.uploadAll();
  }

if($auth.isAuthenticated())
$scope.user = $auth.getPayload();

console.info($scope.user);

	$scope.Desloguear = function(){

				$auth.logout();
				$state.go("login.menu");
			}

})