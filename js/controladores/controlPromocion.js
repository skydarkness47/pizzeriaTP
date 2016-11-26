miApp.controller("promocionCtrl",function($scope,$auth,$state,FileUploader,factoryProducto,factoryPromocion){
	console.log(factoryProducto.ApiArchivos());//inicio las variables
	$scope.SubirdorArchivos = new FileUploader({url:factoryProducto.ApiArchivos()});  
	$scope.usuario={};
  if($auth.isAuthenticated())
$scope.user = $auth.getPayload();

  	/*$scope.persona.nombre= "natalia" ;
  	$scope.persona.dni= "1" ;
  	$scope.persona.apellido= "natalia" ;
  	$scope.persona.foto="pordefecto.png";
  	*///$scope.persona.foto="http://localhost:8080/Laboratorio-IV-2016/Clase.07/ws1/fotos/pordefecto.png";
$scope.Desloguear = function(){

        $auth.logout();
        $state.go("inicio");
      }

      
$scope.traer = function(){

   factoryProducto.TraerTodosProductos()
                .then(function(respuesta) {
                 $scope.listapizzas={};
                  $scope.listapizzas= respuesta.data;
                });

}
      console.info($scope.listapizzas);

  /*	   factoryProducto.Insertar(JSON.stringify($scope.producto)) //+ JSON.stringify($scope.persona))
			  .then(function(respuesta) {

			   // $state.go("menu.login");
       },function errorCallback(response) {         
      //aca se ejecuta cuando hay errores
          console.info(response);  
           

				
	});
  */

 


})