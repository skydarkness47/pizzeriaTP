<?php
require_once('Clases/AccesoDatos.php');
require_once('Clases/personas.php');
require_once('Clases/local.php');

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


$app->get('/usuarios', function ($request, $response, $args) {

 
   $arrAdmin = Usuario::TraerTodasLasPersonas();


   
   return json_encode($arrAdmin);


});


$app->get('/usuarios/traer/{objeto}', function ($request, $response, $args) {

  $usuario=json_decode($args['objeto']);
  

  $usuarioBuscado=Usuario::TraerUnUsuario($usuario->nombre_usuario);
 
 return json_encode($usuarioBuscado);
   
 
});

$app->delete('/usuarios/borrar/{objeto}', function ($request, $response, $args) {
        
        $usuario=json_encode($args['objeto']);  
        
         $usuario = preg_replace('([^A-Za-z0-9])', '', $usuario);


          return Usuaurio::BorrarUsuario($usuario); 
    
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


$app->get('/locales', function ($request, $response, $args) {

 
   $arrAdmin = Local::TraerTodasLosLocales();


   
   return json_encode($arrAdmin);


});

/* POST: Para crear recursos */
$app->post('/local/alta/{objeto}', function ($request, $response, $args) {

$local=json_decode($args['objeto']);
    $local->foto_local=explode(';',$local->foto_local);
    $arrayFoto = array();
    if(count($local->foto_local) > 0){
        for ($i = 0; $i < count($local->foto_local); $i++ ){
            $rutaVieja="fotos/".$local->foto_local[$i];
            $rutaNueva=$local->nombre_local. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]="http://localhost:8080/pizzeriaTP/ws1/fotos/".$rutaNueva;
        } 

        $local->foto_local=json_encode($arrayFoto); 

    }
          return $response->write(Local::InsertarLocal($local)); 
    
});

$app->delete('/local/BorrarLocal/{objeto}', function ($request, $response, $args) {
        
        $local=json_encode($args['objeto']);  
        
         $local = preg_replace('([^A-Za-z0-9])', '', $local);


          return Local::BorrarLocal($local); 
    
});

$app->post('/usuarios/alta/{objeto}', function ($request, $response, $args) {

          return $response->write(Usuario::Insertar(json_decode($args['objeto']))); 
    
});



$app->run();
