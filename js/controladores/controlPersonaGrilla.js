miApp.controller('controlGrillas', function($scope, $state,Grilla, i18nService, uiGridConstants,$auth,factoryGrilla) {
    $scope.titulo = "Configuracion Campos";
    


  $scope.Deslogueo = function(){

        $auth.logout();
        $state.go("inicio");
      }
      

$scope.user = $auth.getPayload();
console.info($scope.user);

if($scope.user.rol === "ADMINISTRADOR"){
 factoryGrilla.TraerTodos()
                .then(function(respuesta) {
                  $scope.gridOptions.data= respuesta;
             
                });
  }else if($scope.user.rol === "ENCARGADO"){
console.info("empleado");
     factoryGrilla.TraerClientesEmpleados()
                .then(function(respuesta) {
                  $scope.gridOptions.data= respuesta;
             
                });
  }else if($scope.user.rol === "EMPLEADO"){
console.info("empleado");
     factoryGrilla.TraerTodosLosClientes()
                .then(function(respuesta) {
                  $scope.gridOptions.data= respuesta;
             
                });
  }


$scope.borrarUsuario= function(obj){
   factoryGrilla.borrarUsuario(obj.id_usuario)
                .then(function(respuesta) {
                  
                    factoryGrilla.TraerTodos()
                        .then(function(respuesta) {
                            $scope.gridOptions.data= respuesta;
                 
                         });
             
                });              
      }
$scope.ModificarUsuario= function(obj){
  JSON.stringify(obj);
  console.info(obj);
   factoryGrilla.ModificarUsuario(obj)
                .then(function(respuesta) {

                    factoryGrilla.TraerTodos()
                        .then(function(respuesta) {
                            $scope.gridOptions.data= respuesta;
                 
                         });
             
                });              
      }

    function columAdmin () {
      return [
              { field: 'id_usuario', name: 'id'},

            { field: 'nombre_usuario', name: 'nombre'},
            {field: 'descripcion_rol', name: 'rol'},
            { width: 100, cellTemplate:"<button ng-Click='grid.appScope.borrarUsuario(row.entity)'>Borrar", name:"Borrar",enableCellEdit: false},
            { width: 100, cellTemplate:"<button ng-Click='grid.appScope.ModificarUsuario(row.entity)'>Modificar", name:"Modificar" ,enableCellEdit: false }

           
            ];
        }

  function columCliente () {
      return [
              { field: 'id_usuario', name: 'id'},

            { field: 'nombre_usuario', name: 'nombre'},
            {field: 'descripcion_rol', name: 'rol'},
         
           
            ];
        }

function columClieEmple () {
      return [
              { field: 'id_usuario', name: 'id'},

            { field: 'nombre_usuario', name: 'nombre'},
            {field: 'descripcion_rol', name: 'rol'},
         
           
            ];
        }
        
        // Objeto de configuracion de la grilla.
        $scope.gridOptions = {};
        $scope.gridOptions.enableCellEditOnFocus = true;
        $scope.gridOptions.enableCellEdit = true;
        $scope.gridOptions.paginationPageSizes = [25, 50, 75];
            $scope.gridOptions.enableFiltering = true;
        // Configuracion de la paginacion
        $scope.gridOptions.paginationPageSize = 25;

        if($scope.user.rol === "ADMINISTRADOR"){
         $scope.gridOptions.columnDefs = columAdmin();
        }else  if($scope.user.rol == "ENCARGADO"){
         $scope.gridOptions.columnDefs = columClieEmple();
        }else if($scope.user.rol == "EMPLEADO"){
          $scope.gridOptions.columnDefs = columCliente();
        }

  //  $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

 



  
  
})
