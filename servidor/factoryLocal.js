miApp.service('factoryLocal', function (Login,ABM,factoryRutas,Grilla) {
objeto = {};
   objeto.nombre = "factory de login y abm";
  objeto.InsertarLocal = InsertarLocal;
objeto.TraerTodosLosLocales=TraerTodosLosLocales;
objeto.BorrarLocal = BorrarLocal;
   return objeto;



  function InsertarLocal(parametro)
  {
    return ABM.InsertarLocal(parametro);

  }

  function TraerTodosLosLocales()
  {
        return Grilla.TraerTodosLosLocales();

  }

  function BorrarLocal(id)
  {
    console.info(id);
        return Grilla.BorrarLocal(id);

  }

})