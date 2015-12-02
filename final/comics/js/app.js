(function() {
  var app = angular.module('app', []);
  
  var usuarios = [
  					{nombre: 'juan', user: 'admin', password: 'admin0'}, 
  					{nombre: 'pedro', user: 'user', password: '123'}
				];

  var crearBase = function(){
      if (!localStorage.usuarios){
        localStorage.usuarios = JSON.stringify(usuarios);
      }
  };
  crearBase();

  var verificarUsuario = function(){
    if (!sessionStorage.usuario_nombre){
        return {logueado: false, nombre: ""};
      }
      else{
        return {logueado: true, nombre: sessionStorage.usuario_nombre};
      }


  };

  app.value('usuario', verificarUsuario());
  app.value('registrar', {activo: true});

  app.controller('MainController', function($scope, usuario, registrar){
    $scope.logueado = usuario.logueado;
    $scope.usuario_nombre = usuario.nombre;
    $scope.registrar = 

  });

  app.controller('RegisterController', function($scope, usuario){
    $scope.user_input = "";
    $scope.clave_input = "";
    $scope.nombre_input = "";
    $scope.clave2_input = "";

  });
  
  app.controller('LoginController', function($scope, usuario){
    
    $scope.user_input = "";
    $scope.clave_input = "";
    $scope.message = "";    
    $scope.usuario_nombre = "";
    $scope.logueado = usuario.logueado;

    
    $scope.login = function(){
      
      lista_usuarios = JSON.parse(localStorage.usuarios);
      usuario = null;
      for (u in lista_usuarios){
        var aux = lista_usuarios[u];
         if (aux.user == $scope.user_input){
            usuario = aux;
          }
      }
      if (usuario){
        if (usuario.password == $scope.clave_input){
          $scope.logueado = true;
          sessionStorage.usuario_nombre = usuario.nombre;
          usuario.nombre = sessionStorage.usuario_nombre;
        }
        else{
          $scope.message = "Clave incorrecta";
        }
      }
      else{
        $scope.message = "Usuario no existe";

      }
    };

    $scope.register = function(){

    };

  });

})();
