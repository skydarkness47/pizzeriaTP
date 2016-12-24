miApp.service('factoryLocal', function (Login,ABM,factoryRutas,Grilla) {
objeto = {};
   objeto.nombre = "factory de login y abm";
  objeto.InsertarLocal = InsertarLocal;
objeto.TraerTodosLosLocales=TraerTodosLosLocales;
objeto.BorrarLocal = BorrarLocal;
objeto.ModificarLocal =ModificarLocal;

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
        return ABM.BorrarLocal(id);

  }
 function ModificarLocal(local)
  {
        return ABM.ModificarLocal(local);

  }


})