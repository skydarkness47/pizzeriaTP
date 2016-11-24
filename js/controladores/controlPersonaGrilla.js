miApp.controller('controlGrillas', function($scope, Grilla, i18nService, uiGridConstants,$auth,factoryGrilla) {
    $scope.titulo = "Configuracion Campos";
    console.info(Grilla);


  $scope.Deslogueo = function(){

        $auth.logout();
        $state.go("login.menu");
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

  factoryGrilla.TraerTodos()
                .then(function(respuesta) {
                  $scope.gridOptions.data= respuesta;
                    console.log(respuesta);
             
                });


function columDefs () {
  return [
          { field: 'id_usuario', name: 'id'},

        { field: 'nombre_usuario', name: 'nombre'},
        {field: 'descripcion_rol', name: 'rol'},


       
        ];
    }

  
  })
