miApp.service('factoryPedidos', function (ABM,factoryRutas,Grilla) {
objeto = {};
   objeto.nombre = "factory de login y abm";
   objeto.InsertarPedido = InsertarPedido;
   objeto.ApiArchivos = ApiArchivos;
   objeto.TraerTodosLosPedidos= TraerTodosLosPedidos;
   return objeto;



  function InsertarPedido(parametro)
  {
    return ABM.InsertarPedido(parametro);

  }
  function TraerTodosLosPedidos()
  {
    return Grilla.TraerTodosLosPedidos();
  }

  function ApiArchivos(){
    return factoryRutas.ApiUrl + "archivos";
  }

  })//cierro factory
