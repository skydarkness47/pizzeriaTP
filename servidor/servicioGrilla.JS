miApp.service('Grilla', function ($http) {
        
var Url = 'http://localhost:8080/pizzeriaTP/ws1/';

  this.TraerTodos = TraerTodos;
  function TraerTodos(queTraer){

    if(queTraer == "CLIENTES")
    {
    return $http.get(Url + 'clientes')
      .then(function(respuesta) { 
      console.info(respuesta.data);    
       return respuesta.data

    }) // FIN DEL RETURN


  }//FIN IF QUE TRAER CLIENTES

  }; // FIN DE LA FUNCION TRAER


    this.BorrarObjeto = BorrarObjeto;

   function BorrarObjeto(id){
    console.info(id);
    return $http.delete(Url + "personas/" + id) 
    .then(function(respuesta) {
      return TraerTodos();
    });
   };



  })