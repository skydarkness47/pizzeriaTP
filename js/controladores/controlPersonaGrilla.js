miApp.controller('controlGrillas', function($scope, Grilla, i18nService, uiGridConstants,$auth,factoryGrilla) {
    $scope.titulo = "Configuracion Campos";
    console.info(Grilla);


  factoryGrilla.TraerTodos()
                .then(function(respuesta) {
                    console.log(respuesta);
             
                });



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



function columDefs () {
  return [
        { field: 'nombre', name: 'nombre'},
     { field: 'grilla', name: 'grilla'},


       
        ];
    }

  
  })
