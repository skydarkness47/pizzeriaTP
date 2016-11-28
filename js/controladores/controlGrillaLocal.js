miApp.controller('grillaLocal', function($scope, $state,i18nService,NgMap, uiGridConstants,$auth,factoryLocal) {
    $scope.titulo = "Configuracion Campos";
    console.info(factoryLocal);


 $scope.user = $auth.getPayload();

$scope.BorrarLocal = function(row){

factoryLocal.BorrarLocal(JSON.stringify(row.id_local))
                .then(function(respuesta) {
                  $scope.gridOptions.data= respuesta;
                    console.log(respuesta);
             
                });

}

$scope.ModificarLocal = function(row){
factoryLocal.ModificarLocal(JSON.stringify(row))
                .then(function(respuesta) {
                  $scope.gridOptions.data= respuesta;
                    console.log(respuesta);
             
                });


}

$scope.abrir = function (row) { 
var ventana;
ventana = window.open(row,'./vistas/slider.html','','top=300,left=300,width=300,height=300');ç
ventana.focus(); 
} 

  $scope.Deslogueo = function(){

        $auth.logout();
        $state.go("inicio");
      }
      
       console.info($scope.user.rol);
        // Objeto de configuracion de la grilla.
        $scope.gridOptions = {};
        $scope.gridOptions.enableCellEditOnFocus = true;
        $scope.gridOptions.enableCellEdit = true;
        $scope.gridOptions.paginationPageSizes = [25, 50, 75];
            $scope.gridOptions.enableFiltering = true;
        // Configuracion de la paginacion
       $scope.gridOptions.paginationPageSize = 25;
    
    if($scope.user.rol === "ADMINISTRADOR"){
       $scope.gridOptions.columnDefs = columADM();
     }else {
       $scope.gridOptions.columnDefs = columCMP();
     }
   $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

  factoryLocal.TraerTodosLosLocales()
                .then(function(respuesta) {
                  $scope.gridOptions.data= respuesta;
                    console.log(respuesta);
             
                });

 $scope.Mapa= function(row){
  
      $scope.lat=40.00000;
      $scope.lon=-10.000000;
      $scope.map = "hola";
     NgMap.getMap().then(function (map) {
          console.log(map.getBounds().toString());
      });

    }

function columADM () {
  return [
          { field: 'id_local', name: 'id'},

        { field: 'nombre_local', name: 'nombre'},
        {field: 'direccion_local', name: 'direccion'},

        {field: 'latitud_local', name: 'latitud'},
        {field: 'longitud_local', name: 'longitud'},
        
        { width: 100, cellTemplate:"<button ng-Click='grid.appScope.ModificarLocal(row.entity)'>MODIFICAR", name:"MODIFICAR",enableCellEdit: false
        },
        { width: 100, cellTemplate:"<button ng-Click='grid.appScope.BorrarLocal(row.entity)'>BORRAR", name:"BORRAR",enableCellEdit: false
        }
        ,
        { width: 100, cellTemplate:"<button ng-Click='grid.appScope.abrir(row.entity)'>IMAGENES", name:"IMAGENES",enableCellEdit: false
        }

        ];
    
  }
function columCMP () {
  return [
          { field: 'id_local', name: 'id'},

        { field: 'nombre_local', name: 'nombre'},
        {field: 'direccion_local', name: 'direccion'},

        {field: 'latitud_local', name: 'latitud'},
        {field: 'longitud_local', name: 'longitud'},
        { width: 100, cellTemplate:"<button ng-Click='grid.appScope.Mapa(row.entity)'>MOSTRAR MAPA", name:"MAPA"
        }
      

        ];
    }

  
})
