miApp.controller("productoCtrl",function($scope,$auth,$state,FileUploader,factoryProducto){
	console.log(factoryProducto.ApiArchivos());
	
//inicio las variables
	$scope.SubirdorArchivos = new FileUploader({url:factoryProducto.ApiArchivos()});  
	$scope.usuario={};

  if($auth.isAuthenticated())
$scope.user = $auth.getPayload();

  	/*$scope.persona.nombre= "natalia" ;
  	$scope.persona.dni= "1" ;
  	$scope.persona.apellido= "natalia" ;
  	$scope.persona.foto="pordefecto.png";
  	*///$scope.persona.foto="http://localhost:8080/Laboratorio-IV-2016/Clase.07/ws1/fotos/pordefecto.png";
$scope.Deslogueo = function(){

        $auth.logout();
        $state.go("inicio");
      }

      
	
    $scope.SubirdorArchivos.onCompleteAll = function(item, response, status, headers) {
  	   factoryProducto.Insertar(JSON.stringify($scope.producto)) //+ JSON.stringify($scope.persona))
			  .then(function(respuesta) {

			   // $state.go("menu.login");
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
    $scope.producto.foto_pizza=nombreFoto;
  }
  $scope.SubirdorArchivos.uploadAll();
  }


})