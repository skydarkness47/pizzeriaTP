<?php 

include "clases/Personas.php";
include "clases/Profesores.php";

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);


	if(isset($_GET['accion']))
{
	$accion=$_GET['accion'];
	if($accion=="traer")
	{
		$respuesta= array();
		//$respuesta['listado']=Persona::TraerPersonasTest();
		$respuesta['listado']=Persona::TraerTodasLasPersonas();
		//var_dump(Persona::TraerTodasLasPersonas());
		$arrayJson = json_encode($respuesta);
	
		echo  $arrayJson;
	}


	

}else{


	switch ($respuesta->datos->accion) {
		case 'insertar':
		if($respuesta->datos->persona->foto!="pordefecto.png")
			{
				$rutaVieja="../fotos/".$respuesta->datos->persona->foto;
				$rutaNueva=$respuesta->datos->persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				copy($rutaVieja, "../fotos/".$rutaNueva);
				unlink($rutaVieja);
				$respuesta->datos->persona->foto=$rutaNueva;
			}
			Persona::InsertarPersona($respuesta->datos->persona);
	
			break;

			 case 'borrar':
			 echo "hola";
			if($respuesta->datos->persona->foto!="pordefecto.png")
			{
				unlink("../fotos/".$respuesta->datos->persona->foto);
			}
			Persona::BorrarPersona($respuesta->datos->persona->id);
			break;

			 case 'modificar':
if($respuesta->datos->persona->foto!="pordefecto.png")
			{
				$rutaVieja="../fotos/".$respuesta->datos->persona->foto;
				$rutaNueva=$respuesta->datos->persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				copy($rutaVieja, "../fotos/".$rutaNueva);
				unlink($rutaVieja);
				$respuesta->datos->persona->foto=$rutaNueva;
			}
			Persona::ModificarPersona($respuesta->datos->persona);
			break;
				case 'validar':
					$validador = false;
				$profesores = Profesor::TraerTodosLosProfes();
				foreach ($profesores as $profe) {
						if($profe->usuario == $respuesta->datos->usuario->correo)
						{
							if($profe->Clave ==$respuesta->datos->usuario->password)

							$validador= true;

						}

								}
			echo $validador;
					break;


				case 'traer':
			$profe=Profesor::TraerUnProfesor($respuesta->datos->usuario->correo); 
			echo $profe->Tipo;
			 break;

	}
}
 ?>