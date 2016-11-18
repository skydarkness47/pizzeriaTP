<?php
require_once('Clases/AccesoDatos.php');
require_once('Clases/personas.php');

require 'vendor/autoload.php';



$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);



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

$app->get('/clientes[/]', function ($request, $response, $args) {
    $datos=Cliente::TraerTodosLosClientes();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto=json_decode($datos[$i]->foto);
    }
    return $response->write(json_encode($datos));
});



$app->get('/usuarios/validar/{objeto}', function ($request, $response, $args) {

  $usuario=json_decode($args['objeto']);
   $validador = false;   
   $arrAdmin = Usuario::TraerTodasLasPersonas();
   foreach ($arrAdmin as $adm) {
        if($adm->nombre_usuario == $usuario->nombre_usuario)
            if($adm->pass_usuario == $usuario->pass_usuario)
                 $validador=true;

   
   }
   echo  $validador;


});


$app->get('/usuarios/traer/{objeto}', function ($request, $response, $args) {

  $usuario=json_decode($args['objeto']);
  

  $usuarioBuscado=Usuario::TraerUnUsuario($usuario->nombre_usuario);
 
 return json_encode($usuarioBuscado);
   
 
});






/* POST: Para crear recursos */
$app->post('/usuarios/alta/{objeto}', function ($request, $response, $args) {

          return $response->write(Usuario::Insertar(json_decode($args['objeto']))); 
    
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
