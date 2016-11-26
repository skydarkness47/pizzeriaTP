miApp.config(function($stateProvider,$urlRouterProvider,$authProvider){

$authProvider.loginUrl = 'pizzeriaTP/servidor/jwt/php/auth.php';
$authProvider.signupUrl = '/auth/signup';
$authProvider.unlinkUrl = '/auth/unlink/';
$authProvider.tokenName = 'pizzeriaTP';
$authProvider.tokenPrefix = 'usuario';
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
})

$stateProvider
		.state(
			"inicio",{
				url: "/inicio",
				templateUrl: "vistas/inicio.html",
				controller:"controlInicio"
			})
			.state(
			"menu",{
				url:"/menu",
				abstract:true,
				templateUrl:"vistas/menuAbstracto.html"

			})
			.state(
			"menu.login",{
				url:"/login",
				views: {
					"contenido":{
					templateUrl:"vistas/login.html",
					controller:"controlLoginMenu"
						}
				}
			})	.state(
			"menu.logueado",{
				url:"/logueado",
				views: {
					"contenido":{
					templateUrl:"vistas/inicio.html",
					controller:"controlInicio"
						}
				}
			}).state(
			"menu.ABM",{
				url:"/ABM",
				views: {
					"contenido":{
					templateUrl:"vistas/ABM.html",
					controller:"controlABM"
						}
				}
			}).state(
			"menu.Grillas",{
				url:"/grillas",
				views: {
					"contenido":{
					templateUrl:"vistas/grillas.html",
					controller:"controlGrillas"
						}
				}
			}).state(
			"menu.AltaLocal",{
				url:"/altaLocal",
				views: {
					"contenido":{
					templateUrl:"vistas/altaLocal.html",
					controller:"altaLocal"
						}
				}
			}).state(
			"menu.GrillaLocal",{
				url:"/GrillaLocal",
				views: {
					"contenido":{
					templateUrl:"vistas/grillaLocal.html",
					controller:"grillaLocal"
						}
				}
			}).state(
			"menu.Registro",{
				url:"/Registro",
				views: {
					"contenido":{
					templateUrl:"vistas/Registro.html",
					controller:"controlABM"
						}
				}
			}).state(
			"menu.AltaProducto",{
				url:"/AltaProducto",
				views: {
					"contenido":{
					templateUrl:"vistas/AltaProducto.html",
					controller:"productoCtrl"
						}
				}
			}).state(
			"menu.AltaPromocion",{
				url:"/AltaPromocion",
				views: {
					"contenido":{
					templateUrl:"vistas/AltaPromocion.html",
					controller:"promocionCtrl"
						}
				}
			})



		$urlRouterProvider.otherwise("/inicio");

});
