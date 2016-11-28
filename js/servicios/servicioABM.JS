
miApp.service('ABM', function ($http,factoryRutas) {
        
var Url = factoryRutas.ApiUrl;

  this.Insertar = Insertar;
  function Insertar(objeto){
console.log(objeto);
    return $http.post(Url + "usuarios/alta/"+ objeto)
      .then(function(respuesta) {
      console.info(respuesta); 
       return respuesta.data

    })      // FIN DEL RETURN


  }//FIN IF QUE TRAER CLIENTES

    this.TraerObjeto = TraerObjeto;
  function TraerObjeto(objeto){
    return $http.get(Url +"usuarios/validar/"+ objeto)
      .then(function(respuesta) { 
      console.info(respuesta.data);    
       return respuesta.data

    })

    }



    this.BorrarObjeto = BorrarObjeto;

   function BorrarObjeto(id){
    console.info(id);
    return $http.delete(Url + "personas/" + id) 
    .then(function(respuesta) {
      return TraerTodos();
    });
   };

   
  this.InsertarLocal = InsertarLocal;
  function InsertarLocal(objeto){
    return $http.get(Url + "local/alta/"+ objeto)
      .then(function(respuesta) {
      console.info(respuesta); 
       return respuesta.data

    })      // FIN DEL RETURN


  }//FIN IF QUE TRAER CLIENTES


 this.InsertarProducto = InsertarProducto;
  function InsertarProducto(objeto){
    return $http.post(Url + "producto/alta/"+ objeto)
      .then(function(respuesta) {
      console.info(respuesta); 
       return respuesta.data

    })      // FIN DEL RETURN


  }//FIN IF QUE TRAER CLIENTES

   this.TraerTodosProductos = TraerTodosProductos;
  function TraerTodosProductos(){
    return $http.get(Url + "producto")
      .then(function(respuesta) {
       return respuesta.data

    })      // FIN DEL RETURN


  }//FIN IF QUE TRAER CLIENTES

  this.InsertarPromocion = InsertarPromocion;
  function InsertarPromocion(obj){
    return $http.post(Url + "promocion/" + obj)
      .then(function(respuesta) {
       return respuesta.data

    })      // FIN DEL RETURN


  }//FIN IF QUE TRAER CLIENTES

   this.InsertarPedido = InsertarPedido;
  function InsertarPedido(objeto){
    console.info(objeto);
    return $http.get(Url + "pedidos/alta/"+ objeto)
      .then(function(respuesta) {
      console.info(respuesta); 
       return respuesta.data

    })      // FIN DEL RETURN


  }//FIN IF QUE TRAER CLIENTE
  


  })