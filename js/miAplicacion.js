var miApp = angular.module("AngularABM",["ui.router","angularFileUpload",'satellizer']);


miApp.config(function($stateProvider,$urlRouterProvider,$authProvider){

$authProvider.loginUrl = 'pizzeriaTP/servidor/jwt/php/auth.php';
$authProvider.signupUrl = '/auth/signup';
$authProvider.unlinkUrl = '/auth/unlink/';
$authProvider.tokenName = 'TokenNameAxelCores';
$authProvider.tokenPrefix = 'AngularABM';
$authProvider.authHeader = 'data';
$authProvider.tokenHeader = 'Authorization';
$authProvider.httpInterceptor = function() { return true; },
$authProvider.withCredentials = false;
$authProvider.tokenRoot = null;

$authProvider.github({
  url: '/auth/github',
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  redirectUri: window.location.origin,
  optionalUrlParams: ['scope'],
  scope: ['user:email'],
  scopeDelimiter: ' ',
  oauthType: '2.0',
   clientId: '60f395a4d1cd93ad39bf',
  popupOptions: { width: 1020, height: 618 }
});

$stateProvider
		.state(
			"inicio",{
				url: "/inicio",
				templateUrl: "menu.html",
				controller:"controlInicio"
			})
			.state(
			"menu",{
				url:"/menu",
				abstract:true,
				templateUrl:"menuAbstracto.html"

			})
			.state(
			"menu.login",{
				url:"/login",
				views: {
					"contenido":{
					templateUrl:"login.html",
					controller:"controlLoginMenu"
						}
				}
			})	.state(
			"menu.inicio",{
				url:"/inicio",
				views: {
					"contenido":{
					templateUrl:"inicio.html",
					controller:"controlInicio"
						}
				}
			}).state(
			"menu.ABM",{
				url:"/ABM",
				views: {
					"contenido":{
					templateUrl:"ABM.html",
					controller:"controlABM"
						}
				}
			})



		$urlRouterProvider.otherwise("/inicio");



});


miApp.controller("controlInicio",function($scope,$auth){

if($auth.isAuthenticated())
$scope.user = $auth.getPayload();





});

miApp.controller("controlMenuAbstracto",function($scope,$auth,$state){



if($auth.isAuthenticated())
$scope.user = $auth.getPayload();

console.info($scope.user);

	$scope.Desloguear = function(){

				$auth.logout();
				$state.go("login.menu");
			}




});

miApp.controller("controlABM",function($scope,$auth,$state){



if($auth.isAuthenticated())
$scope.user = $auth.getPayload();

console.info($scope.user);

	$scope.Desloguear = function(){

				$auth.logout();
				$state.go("login.menu");
			}




});


miApp.controller("controlLoginMenu",function($scope,$state,$auth,$http){
			
$scope.usuario  = {};




$scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };


if($auth.isAuthenticated())
	console.info("Token",$auth.getPayload());
else
	console.info("No Token",$auth.getPayload());

$scope.IniciarSeccion = function(tipo){

$scope.usuario.perfil = tipo;

console.info($scope.usuario);
	
	
$http.get("http://localhost/pizzeriaTP/ws1/usuarios/validar/"+JSON.stringify($scope.usuario))


 .then(function(respuesta) {    

 console.info(respuesta);   
         //aca se ejetuca si retorno sin errores  
         console.info(respuesta);  

         	$scope.validador = respuesta.data;

         	console.info("d",$scope.validador);
			if($scope.validador != true)
			{
				$scope.usuario  = {};
				console.log("no entro");
			}else
			{
				console.log("entro");


 $http.get("http://localhost/pizzeriaTP/ws1/usuarios/traer/"+JSON.stringify($scope.usuario))		

 		 	.then(function(respuesta) {   	
		console.info(respuesta);
	$auth.login($scope.usuario)
  	.then(function(response) {
  		console.info(response);
  		if($auth.isAuthenticated()){

  			
  			$state.go("menu.inicio");
			console.info("Token Validado", $auth.getPayload());
			

			$scope.usuario  = {};
		}
		else
			console.info("No Token Valido",$auth.getPayload());
    	$scope.usuario  = {};
  	})
  	.catch(function(response) {
    	console.info("no",response);
  	});


		},function errorCallback(response) {
				 $scope.ListadoPersonas= [];
				console.log( response);
		 });



		
			
		}
	    	
  	});



	
}








});
miApp.controller("controlPersonaAlta",function($scope,$state,FileUploader,$http,$auth){
					$scope.logeado = $auth.getPayload();

			if(!$auth.isAuthenticated())
			$state.go("login.menu");

			//inicio las variables
			$scope.SubirdorArchivos = new FileUploader({url:'./servidor/archivos.php'});  $scope.persona={};
			  $scope.persona.nombre= "natalia" ;
			  $scope.persona.dni= "12312312" ;
			  $scope.persona.apellido= "natalia" ;
			  $scope.persona.foto="pordefecto.png";


			$scope.SubirdorArchivos.onSuccessItem = function(item, response, status, headers) {
			            console.info('onSuccessItem', item, response, status, headers);
			            $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
						  .then(function(respuesta) {     	
						 //aca se ejetuca si retorno sin errores      	
								 console.log(respuesta.data);
							

								},function errorCallback(response) {     		
						//aca se ejecuta cuando hay errores
								console.log( response);     			
				  });
						console.info("Ya guardé el archivo.", item, response, status, headers);
			        };




				  $scope.Guardar=function(){
					console.log($scope.SubirdorArchivos.queue);
					if($scope.SubirdorArchivos.queue[0]!=undefined)
					{
						var nombreFoto = $scope.SubirdorArchivos.queue[0]._file.name;
						$scope.persona.foto=nombreFoto;
					}
					$scope.SubirdorArchivos.uploadAll();
				  	console.log("persona a guardar:");
				    console.log($scope.persona);
					

				  

				  }
					


				$scope.Desloguear = function(){

					$auth.logout();
				}

				$scope.IraAlta = function(){
				$state.go("persona.Alta");
				}
				$scope.IraGrilla = function(){
					$state.go("persona.Grilla");
				}



});







miApp.controller("controlPersonaGrilla",function($scope,$state,$http,$auth){
			$scope.logeado = $auth.getPayload();
			
		 	$http.get('PHP/nexo.php', { params: {accion :"traer"}})
		 	.then(function(respuesta) {     	
		      	 $scope.ListadoPersonas = respuesta.data.listado;
		      	 

		    },function errorCallback(response) {
		     		 $scope.ListadoPersonas= [];
		     		console.log( response);

		     	});


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

});





miApp.controller("controlLogin",function($scope,$state,$auth,$http){

		$scope.usuario={};
		$scope.usuario.correo = "admin@admin";
		$scope.usuario.password = "admin";

		$scope.authenticate = function(provider) {
		      $auth.authenticate(provider);
		    };


		if($auth.isAuthenticated())
			console.info("Token",$auth.getPayload());
		else
			console.info("No Token",$auth.getPayload());

		$scope.IniciarSeccion = function(){
		$http.post("PHP/nexo.php",{datos:{accion :"validar",usuario:$scope.usuario}})
		 .then(function(respuesta) {       
		         //aca se ejetuca si retorno sin errores        
         	$scope.validador = respuesta.data;

         	console.info("d",$scope.validador);
			if($scope.validador != true)
			{
				console.log("no entro");
			}else
			{
								console.log("entro");
				 $http.post("PHP/nexo.php",{datos:{accion :"traer",usuario:$scope.usuario}})	
				 		 	.then(function(respuesta) {     	
							$datos = respuesta.data;
							$scope.usuario.tipo =$datos;
							console.info($scope.usuario);	
									
							$auth.login($scope.usuario)
				  			.then(function(response) {
				  				console.info(response);

				  			if($auth.isAuthenticated()){
				  				$state.go("persona.Grilla");
							
							console.info("Token Validado", $auth.getPayload());
							
						}
						else
							console.info("No Token Valido",$auth.getPayload());
    	
  	})
  	.catch(function(response) {
    	console.info("no",response);
  	});


		},function errorCallback(response) {
				 $scope.ListadoPersonas= [];
				console.log( response);
		 });
			
		}
	    	
  	});
  	
}

});




miApp.controller("ControlRegistro",function($scope,$state){


});

miApp.controller("controlSalaJuegos",function($scope,$state){
$scope.IraJuego1 = function(){
$state.go("sala.juego1");
}
$scope.IraJuego2 = function(){
$state.go("sala.juego2");
}
$scope.IraJuego3 = function(){
$state.go("sala.juego3");
}
$scope.IraJuego4 = function(){
$state.go("sala.juego4");
}
$scope.Comenzar =function(){
	console.log("holaaaa");
}






});


miApp.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader)//, $routeParams, $location)
{
	$scope.persona={};
	$scope.DatoTest="**Modificar**";
	$scope.SubirdorArchivos = new FileUploader({url:'./servidor/archivos.php'});  $scope.persona={};
	console.log($stateParams);//$scope.persona=$stateParams;
	$scope.persona.id=$stateParams.id;
	$scope.persona.nombre=$stateParams.nombre;
	$scope.persona.apellido=$stateParams.apellido;
	$scope.persona.dni=$stateParams.dni;
	$scope.persona.foto=$stateParams.foto;

	$scope.SubirdorArchivos.onSuccessItem=function(item, response, status, headers)
	{
		$http.post('PHP/nexo.php', { datos: {accion :"modificar",persona:$scope.persona}})
		.then(function(respuesta) 
		{
			//aca se ejetuca si retorno sin errores      	
			console.log(respuesta.data);
			$state.go("persona.Grilla");
		},
		function errorCallback(response)
		{
			//aca se ejecuta cuando hay errores
			console.log( response);     			
		});
		console.info("Ya guardé el archivo.", item, response, status, headers);
	};

	$scope.Modificar=function(persona)
	{
	
		if($scope.SubirdorArchivos.queue[0]!=undefined)
		{
			var nombreFoto = $scope.SubirdorArchivos.queue[0]._file.name;
			$scope.persona.foto=nombreFoto;
		}
		$scope.SubirdorArchivos.uploadAll();
	}

});