miApp.service('factoryLocal', function (Login,ABM,factoryRutas,Grilla) {
objeto = {};
   objeto.nombre = "factory de login y abm";
  objeto.InsertarLocal = InsertarLocal;
objeto.TraerTodosLosLocales=TraerTodosLosLocales;
   return objeto;



  function InsertarLocal(parametro)
  {
    return ABM.InsertarLocal(parametro);

  }

  function TraerTodosLosLocales()
  {
        return Grilla.TraerTodosLosLocales();

  }


})