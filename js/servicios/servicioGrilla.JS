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



 

    this.borrarUsuario = borrarUsuario;
   function borrarUsuario(id){
    return $http.delete(Url + "usuarios/borrar/" + id) 
    .then(function(respuesta) {
      console.info(respuesta);
      return TraerTodosLosLocales();
    });
   };

   this.ModificarUsuario = ModificarUsuario;
   function ModificarUsuario(obj){
    return $http.get(Url + "usuarios/modificar/" + obj) 
    .then(function(respuesta) {
      console.info(respuesta);
      return TraerTodosLosLocales();
    });
   };

this.TraerTodasLasPromos = TraerTodasLasPromos;
   function TraerTodasLasPromos(){
    return $http.get(Url + "promociones") 
    .then(function(respuesta) {
      console.info(respuesta);
      return respuesta.data;
    });
   };



this.TraerTodosLosClientes = TraerTodosLosClientes;
   function TraerTodosLosClientes(){
    return $http.get(Url + "clientes") 
    .then(function(respuesta) {
      console.info(respuesta);
      return respuesta.data;
    });
   };


this.TraerTodosLosPedidos = TraerTodosLosPedidos;
   function TraerTodosLosPedidos(){
    return $http.get(Url + "pedidos") 
    .then(function(respuesta) {
      console.info(respuesta);
      return respuesta.data;
    });
   };

this.TraerClientesEmpleados = TraerClientesEmpleados;
   function TraerClientesEmpleados(){
    return $http.get(Url + "clientesEmpleados") 
    .then(function(respuesta) {
      console.info(respuesta);
      return respuesta.data;
    });
   };


})