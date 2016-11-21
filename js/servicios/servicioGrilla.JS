miApp.service('Grilla', function ($http) {
        
var Url = 'http://localhost:8080/pizzeriaTP/ws1/';

  this.TraerTodos = TraerTodos;
  function TraerTodos(){

    return $http.get(Url + 'usuarios')
      .then(function(respuesta) { 
       return respuesta.data

    });// FIN DEL RETURN


  };//FIN IF QUE TRAER CLIENTES

this.TraerTodosLosLocales =TraerTodosLosLocales;
 function TraerTodosLosLocales(){

    return $http.get(Url + 'locales')
      .then(function(respuesta) { 
       return respuesta.data

    });// FIN DEL RETURN


  };//FIN IF QUE TRAER CLIENTES



    this.BorrarObjeto = BorrarObjeto;

   function BorrarObjeto(id){
    console.info(id);
    return $http.delete(Url + "personas/" + id) 
    .then(function(respuesta) {
      return TraerTodos();
    });
   };



  })