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

  
	
  $scope.Guardar=function(){
    console.info($scope.tipologin);
  		if($scope.tipologin === "CLIENTE")
  	{
  		$scope.usuario.rol=3;			
  	}
     if($scope.tipologin === "EMPLEADO")
  	{
  		$scope.usuario.rol=2;
  	}
     if($scope.tipologin === "ENGARCADO")
  	{
  		$scope.usuario.rol = 4;
  	}

  	
  	   factoryLoginABM.Insertar(JSON.stringify($scope.usuario)) //+ JSON.stringify($scope.persona))
			  .then(function(respuesta) {  
			 //aca se ejetuca si retorno sin errores 
					// $state.go("menu.Grillas");
				
	});
}
if($auth.isAuthenticated())
$scope.user = $auth.getPayload();

console.info($scope.user);

	$scope.Desloguear = function(){

				$auth.logout();
				$state.go("login.menu");
			}

})