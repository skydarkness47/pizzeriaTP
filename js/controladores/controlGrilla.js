miApp.controller("controlGrillas",function($scope,Grilla,$state,$http,$auth){
			$scope.logeado = $auth.getPayload();
			console.info(Grilla);

			/*
		 	$http.get('PHP/nexo.php', { params: {accion :"traer"}})
		 	.then(function(respuesta) {     	
		      	 $scope.ListadoPersonas = respuesta.data.listado;
		      	 

		    },function errorCallback(response) {
		     		 $scope.ListadoPersonas= [];
		     		console.log( response);

		     	});

*/

	$scope.Desloguear = function(){

				$auth.logout();
				$state.go("login.menu");
			}
			
        $scope.usuario = $auth.getPayload();
        // Objeto de configuracion de la grilla.
        $scope.gridOptions = {};
        $scope.gridOptions.enableCellEditOnFocus = true;
        $scope.gridOptions.enableCellEdit = true;
        $scope.gridOptions.paginationPageSizes = [25, 50, 75];
        // Configuracion de la paginacion
        $scope.gridOptions.paginationPageSize = 25;
         $scope.gridOptions.columnDefs = columComprador();
          //$scope.gridOptions.data = respuesta;

		$scope.Desloguear = function(){

			$auth.logout();
			$state.go("login.menu");
		}

		$scope.IraAlta = function(){
		$state.go("persona.Alta");
		}
		$scope.IraGrilla = function(){
			$state.go("persona.Grilla");
		}


		 	
		 	$scope.Borrar=function(persona){
				console.log("borrar"+persona);



		$http.post("PHP/nexo.php",{datos:{accion :"borrar",persona:persona}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
		 .then(function(respuesta) {       
		         //aca se ejetuca si retorno sin errores        
		         console.log(respuesta.data);
				 $http.get('PHP/nexo.php', { params: {accion :"traer"}})
				.then(function(respuesta) {     	
					console.log(persona);
					 $scope.ListadoPersonas = respuesta.data.listado;
					 console.log(respuesta.data);

				},function errorCallback(response) {
						 $scope.ListadoPersonas= [];
						console.log( response);
				 });

		    },function errorCallback(response) {        
		        //aca se ejecuta cuando hay errores
		        console.log( response);           
		    });


		 	}


		$scope.Modificar=function(persona)
			{
				$state.go("modificacion", persona);
			};


   function columComprador() {
            return [{
                    field: 'id',
                    name: 'id'
                }, {
                    field: 'nombre',
                    name: 'nombre'
                },{
                field: 'precio',
                name: 'precio'
            },{ width: 100, cellTemplate:"<button ng-Click='grid.appScope.ModificarLocal(row.entity)'>MODIFICAR", name:"MostrarLongitud"
              },{ width: 100, cellTemplate:"<button ng-Click='grid.appScope.BorrarLocal(row.entity)'>BORRAR", name:"MostrarLongitud"
        	  },

            ];
        }

})