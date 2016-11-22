miApp.controller('grillaLocal', function($scope, i18nService, uiGridConstants,$auth,factoryLocal) {
    $scope.titulo = "Configuracion Campos";
    console.info(factoryLocal);




$scope.BorrarLocal = function(row){

factoryLocal.BorrarLocal(JSON.stringify(row.id_local))
                .then(function(respuesta) {
                  $scope.gridOptions.data= respuesta;
                    console.log(respuesta);
             
                });

}

        $scope.usuario = $auth.getPayload();
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

  factoryLocal.TraerTodosLosLocales()
                .then(function(respuesta) {
                  $scope.gridOptions.data= respuesta;
                    console.log(respuesta);
             
                });


function columDefs () {
  return [
          { field: 'id_local', name: 'id'},

        { field: 'nombre_local', name: 'nombre'},
        {field: 'direccion_local', name: 'direccion'},

        {field: 'latitud_local', name: 'latitud'},
        {field: 'longitud_local', name: 'longitud'},
        
        { width: 100, cellTemplate:"<button ng-Click='grid.appScope.ModificarLocal(row.entity)'>MODIFICAR", name:"MostrarLongitud"
        },{ width: 100, cellTemplate:"<button ng-Click='grid.appScope.BorrarLocal(row.entity)'>BORRAR", name:"MostrarLongitud"
        }


        ];
    }

  
  })
