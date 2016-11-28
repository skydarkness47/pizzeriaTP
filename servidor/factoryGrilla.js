miApp.service('factoryGrilla', function (Grilla) {
var objeto = {};
   objeto.TraerTodos= TraerTodos;
  objeto.borrar= borrar;
  objeto.TraerTodosUsuarios= TraerTodosUsuarios;
  objeto.borrarUsuario = borrarUsuario;
  objeto.ModificarUsuario = ModificarUsuario;
  objeto.borrarUsuario = borrarUsuario;
  objeto.ModificarUsuario = ModificarUsuario;
  objeto.TraerTodosLosClientes = TraerTodosLosClientes;
  objeto.TraerClientesEmpleados = TraerClientesEmpleados;

   return objeto;

   function TraerTodos()
   {
   
      return  Grilla.TraerTodos();
   }

   function borrar(obj)
   {
   
      return  Grilla.borrar(obj);
   }

 function borrarUsuario(obj)
   {
 
      return  Grilla.borrarUsuario(obj);
   }
   function ModificarUsuario(obj)
   {
 
      return  Grilla.ModificarUsuario(obj);
   }


   function TraerTodosUsuarios()
   {
      return Grilla.TraerTodosUsuarios();

   }

  function TraerTodosLosClientes()
  {
     return Grilla.TraerTodosLosClientes();
  }
   function ModificarUsuario(parametro)
   {
      return Grilla.ModificarUsuario(parametro);

   }
   function TraerClientesEmpleados()
  {
     return Grilla.TraerClientesEmpleados();
  }

   
  })//cierro factory
