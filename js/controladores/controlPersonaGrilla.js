miApp.controller('controlGrillas', function($scope, $state,Grilla, i18nService, uiGridConstants,$auth,factoryGrilla) {
    $scope.titulo = "Configuracion Campos";
    


  $scope.Deslogueo = function(){

        $auth.logout();
        $state.go("inicio");
      }
      

$scope.usuario = $auth.getPayload();


 factoryGrilla.TraerTodos()
                .then(function(respuesta) {
                  $scope.gridOptions.data= respuesta;
             
                });

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

if($scope.usuario.rol === "ADMINISTRADOR")
{
    function columDefs () {
      return [
              { field: 'id_usuario', name: 'id'},

            { field: 'nombre_usuario', name: 'nombre'},
            {field: 'descripcion_rol', name: 'rol'},
            { width: 100, cellTemplate:"<button ng-Click='grid.appScope.borrarUsuario(row.entity)'>Borrar", name:"MostrarAmigos"},
            { width: 100, cellTemplate:"<button ng-Click='grid.appScope.ModificarUsuario(row.entity)'>Modificar", name:"GpsAmigos"  }

           
            ];
        }
}else{
  function columDefs () {
      return [
              { field: 'id_usuario', name: 'id'},

            { field: 'nombre_usuario', name: 'nombre'},
            {field: 'descripcion_rol', name: 'rol'},
         
           
            ];
        }
}

        
        // Objeto de configuracion de la grilla.
        $scope.gridOptions = {};
        $scope.gridOptions.enableCellEditOnFocus = true;
        $scope.gridOptions.enableCellEdit = true;
        $scope.gridOptions.paginationPageSizes = [25, 50, 75];
            $scope.gridOptions.enableFiltering = true;
        // Configuracion de la paginacion
        $scope.gridOptions.paginationPageSize = 25;
         $scope.gridOptions.columnDefs = columDefs();
  //  $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

 



  
  
})
