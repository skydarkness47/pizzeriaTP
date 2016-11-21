<?php
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;
$DatosPorPost = file_get_contents("php://input");

$usuario =json_decode($DatosPorPost);

	$ClaveDeEncriptacion="pizzeria";
	//$key = "1234";
	
$token["usuario"]=$usuario->nombre_usuario;
	$token["clave"]=$usuario->pass_usuario;
	$token["rol"]=$usuario->descripcion_rol;

 
	$token["iat"]=time();//momento de creacion
	$token["exp"]=time() + 20000000;
	$jwt = JWT::encode($token, $ClaveDeEncriptacion);


$ArrayConToken["pizzeriaTP"]=$jwt;
echo json_encode($ArrayConToken);

?>