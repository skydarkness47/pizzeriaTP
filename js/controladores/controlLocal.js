
miApp.controller("altaLocal",function($scope,$state,$auth,$http,factoryLocal,FileUploader){

		$scope.SubirdorArchivos = new FileUploader({url:'http://localhost:8080/pizzeriaTP/ws1/archivos'});  
	$scope.local={};
 
  	//$scope.persona.foto="http://localhost:8080/Laboratorio-IV-2016/Clase.07/ws1/fotos/pordefecto.png";


	$scope.SubirdorArchivos.onCompleteAll = function(item, response, status, headers) {

factoryLocal.InsertarLocal(JSON.stringify($scope.local)) //+ JSON.stringify($scope.persona))
			  .then(function(respuesta) {     	
			 //aca se ejetuca si retorno sin errores 
			 		console.info(respuesta);
					 $state.go("menu.GrillaLocal");
				

					},function errorCallback(response) {     		
			//aca se ejecuta cuando hay errores
					console.info(response);     			
  		});
        };


	$scope.Deslogueo = function(){

				$auth.logout();
				$state.go("inicio");
			}



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
		$scope.local.foto_local=nombreFoto;
	}
	$scope.SubirdorArchivos.uploadAll();
  }

})