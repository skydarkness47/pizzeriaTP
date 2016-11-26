miApp.service('factoryPromocion', function (ABM,factoryRutas) {
objeto = {};
   objeto.nombre = "factory de login y abm";
   objeto.TraerObjeto= TraerObjeto;
   objeto.Insertar = Insertar;
   objeto.ApiArchivos = ApiArchivos;
   return objeto;


 function TraerObjeto(parametro){
      return Login.TraerObjeto(parametro);
        
     }


  function Insertar(parametro)
  {
    return ABM.InsertarProducto(parametro);

  }
  

  function ApiArchivos(){
    return factoryRutas.ApiUrl + "archivos";
  }
  function Guardar()
  {
    return ABM.Guardar;
  }
  })//cierro factory
