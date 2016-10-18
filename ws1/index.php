<?php
require_once('Clases/AccesoDatos.php');
require_once('Clases/administradores.php');
require_once('Clases/clientes.php');


/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/**
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
*
*  GET: Para consultar y leer recursos */

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/personas[/]', function ($request, $response, $args) {
    $datos=Persona::TraerTodasLasPersonas();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto=json_decode($datos[$i]->foto);
    }
    return $response->write(json_encode($datos));
});


$app->get('/usuarios/validar/{objeto}', function ($request, $response, $args) {

  $usuario=json_decode($args['objeto']);
   $validador = false;

   if($usuario->perfil == "admin")
   {
   $arrAdmin = Administrador::TraerTodosLosAdmin();

   foreach ($arrAdmin as $adm) {
        if($adm->usuario == $usuario->usuario)
            if($adm->clave == $usuario->clave)
                 $validador=true;

   }}else if($usuario->perfil == "cliente")
   {
         $arrCliente=Cliente::TraerTodosLosClientes();
          foreach ($arrCliente as $cliente ) {
              if($cliente->numero == $usuario->numero)
                  if($cliente->clave == $usuario->clave)
                    if($cliente->dni == $usuario->dni)
                $validador = true;
      }

   }


   echo  $validador;


});

$app->get('/usuarios/traer/{objeto}', function ($request, $response, $args) {

  $usuario=json_decode($args['objeto']);
  var_dump($usuario);
  if($usuario->perfil == "admin")
  {
  $usuarioBuscado=Administrador::TraerUnAdmin($usuario->usuario);
  }else if($usuario->perfil == "admin")
  {
    $usuarioBuscado=Cliente::TraerUnCliente($usuario->numero);
  }
  var_dump($usuarioBuscado);
   
 
});




/* POST: Para crear recursos */
$app->post('/personas/{objeto}', function ($request, $response, $args) {
    $persona=json_decode($args['objeto']);
    $persona->foto=explode(';',$persona->foto);
    $arrayFoto = array();
    if(count($persona->foto) > 0){
        for ($i = 0; $i < count($persona->foto); $i++ ){
            $rutaVieja="fotos/".$persona->foto[$i];
            $rutaNueva=$persona->dni. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]="http://localhost:8080/Laboratorio-IV-2016/Clase.07/ws1/fotos/".$rutaNueva;
        } 
        $persona->foto=json_encode($arrayFoto); 
    }
    return $response->write(Persona::InsertarPersona($persona)); 
});

$app->post('/archivos', function ($request, $response, $args) {
    
    if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = "fotos" . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );
} else {
    echo 'No files';
}
    return $response;
});

// /* PUT: Para editar recursos */
$app->put('/personas/{objeto}', function ($request, $response, $args) {
    $persona=json_decode($args['objeto']);
    if($persona->foto != "pordefecto.png"){
                        
        $rutaVieja="fotos/".$persona->foto;
        $rutaNueva=$persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "fotos/".$rutaNueva);
        unlink($rutaVieja);
        $persona->foto="http://localhost:8080/Laboratorio-IV-2016/Clase.07/ws1/fotos/".$rutaNueva;            
    }
    return $response->write(Persona::ModificarPersona($persona));

});

// /* DELETE: Para eliminar recursos */
$app->delete('/personas/{id}', function ($request, $response, $args) {
    return $response->write(Persona::BorrarPersona($args['id']));
});
/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
