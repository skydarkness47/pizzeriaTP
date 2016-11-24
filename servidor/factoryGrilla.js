miApp.service('factoryGrilla', function (Grilla) {
var objeto = {};
   objeto.TraerTodos= TraerTodos;
  objeto.borrar= borrar;
  objeto.TraerTodosUsuarios= TraerTodosUsuarios;
  objeto.borrarUsuario = borrarUsuario;
  objeto.ModificarUsuario = ModificarUsuario;
  objeto.borrarUsuario = borrarUsuario;
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

   function TraerTodosUsuarios()
   {
      return Grilla.TraerTodosUsuarios();

   }


   function ModificarUsuario(parametro)
   {
      return Grilla.ModificarUsuario(parametro);

   }
  })//cierro factory
