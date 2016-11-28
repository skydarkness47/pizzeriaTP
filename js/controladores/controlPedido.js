miApp.controller("pedidosCtrl",function($scope,$auth,$state,FileUploader,factoryProducto,factoryPromocion,factoryLocal,factoryGrilla,factoryPedidos){
  console.log(factoryProducto.ApiArchivos());//inicio las variables
  $scope.SubirdorArchivos = new FileUploader({url:factoryProducto.ApiArchivos()});  
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
  $scope.pizza={};

    factoryGrilla.TraerTodosLosClientes()
                .then(function(respuesta) {
                  console.info(respuesta);
                 $scope.listaclientes={};
                  $scope.listaclientes= respuesta;
                });   

   factoryProducto.TraerTodosProductos()
                .then(function(respuesta) {
                 $scope.listapizzas={};
                  $scope.listapizzas= respuesta;
                });


factoryLocal.TraerTodosLosLocales()
          .then(function(respuesta) {
                 $scope.listalocales={};
                  $scope.listalocales= respuesta;
                  console.info($scope.listalocales);
                });


$scope.Guardar = function () {

        console.info($scope.objeSeleccionadoLocal);

        if ($scope.objeSeleccionadoPizza == null && $scope.objeSeleccionadoLocal == null)
            return;

        $scope.pizza.id_local = $scope.objeSeleccionadoLocal.id_local;
        $scope.pizza.id_pizza = $scope.objeSeleccionadoPizza.id_pizza;
        $scope.pizza.id_user = $scope.objeSeleccionadoUser.id_usuario;
        console.info($scope.pizza);
        factoryPedidos.InsertarPedido(JSON.stringify($scope.pizza))
            .then(function (respuesta) {
              // $state.go("Abm.PromocionGrilla");

            }, function (error) {
                console.info(error);
            });
    }

        $scope.gridOptions = {};
        $scope.gridOptions.enableCellEditOnFocus = true;
        $scope.gridOptions.enableCellEdit = true;
        $scope.gridOptions.paginationPageSizes = [25, 50, 75];
            $scope.gridOptions.enableFiltering = true;
        // Configuracion de la paginacion
       $scope.gridOptions.paginationPageSize = 25;
   $scope.gridOptions.columnDefs = columPromo();



factoryPedidos.TraerTodosLosPedidos()
          .then(function(respuesta) {
                 $scope.listalocales={};
                 console.info(respuesta);
                  $scope.gridOptions.data= respuesta;
                });

       function columPromo () {
  return [
        { field: 'nombre_usuario', name: 'cliente'},
        {field: 'descripcion_pizza', name: 'descripcion pedido'},
        {field: 'cantidad_pizza', name: 'cantidad pedido'},
        {field: 'nombre_local', name: 'local'},
        {field: 'fecha_entrega', name: 'fecha de entrega'},
        {field: 'estado_pedido', name: 'estado del pedido'},
        ];
    
  }
 


})