miApp.controller('controlGrillas', function($scope, Grilla, i18nService, uiGridConstants) {
    $scope.titulo = "Configuracion Campos";
    console.info(Grilla);

    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [15, 20, 45];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
 
    $scope.gridOptions.columnDefs = columDefs();
    // Activo la busqueda en todos los campos.
  //  $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');



function columDefs () {
  return [
        { field: 'nombre', name: 'nombre'},
       
        ];
    }

  
  })
