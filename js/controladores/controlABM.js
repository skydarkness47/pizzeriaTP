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
$scope.Desloguear = function(){

        $auth.logout();
        $state.go("inicio");
      }

      
	
  $scope.Guardar=function(){
    console.info($scope.tipologin);
    
  		if($scope.tipologin === "CLIENTE")
  	{
  		$scope.usuario.id_rol=3;			
  	}
     if($scope.tipologin === "EMPLEADO")
  	{
  		$scope.usuario.id_rol=2;
  	}
     if($scope.tipologin === "ENGARCADO")
  	{
  		$scope.usuario.id_rol = 4;
  	}

  	
    if(!$auth.isAuthenticated())
    {
      console.info("entre");
      $scope.usuario.id_rol = 3;
    }
  	   factoryLoginABM.Insertar(JSON.stringify($scope.usuario)) //+ JSON.stringify($scope.persona))
			  .then(function(respuesta) {

			 if(!$auth.isAuthenticated())
            {
            alert("SE DIO DE ALTA CORRECTAMENTE! SERA REDIRECCIONADO PARA EL LOGIN"); 
              $state.go("menu.login");
            }else{
              alert("SE DIO DE ALTA CORRECTAMENTE!"); 
                $state.go("menu.Grillas");
            }


				
	});
}
if($auth.isAuthenticated())
$scope.user = $auth.getPayload();

console.info($scope.user);


})