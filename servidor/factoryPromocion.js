miApp.service('factoryPromocion', function (Grilla,ABM,factoryRutas) {
objeto = {};
   objeto.nombre = "factory de login y abm";
   objeto.TraerObjeto= TraerObjeto;
   objeto.InsertarPromocion = InsertarPromocion;
   objeto.ApiArchivos = ApiArchivos;
   objeto.TraerTodasLasPromos=TraerTodasLasPromos;
   return objeto;


 function TraerObjeto(parametro){
      return Login.TraerObjeto(parametro);
        
     }


  function InsertarPromocion(parametro)
  {
    return ABM.InsertarPromocion(parametro);

  }
  

  function ApiArchivos(){
    return factoryRutas.ApiUrl + "archivos";
  }


function TraerTodasLasPromos(){
    return  Grilla.TraerTodasLasPromos();
  }
  })//cierro factory
