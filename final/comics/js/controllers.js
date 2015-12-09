//Controladores
(function() {
  //var app = angular.module('comics-controllers', []);

  app.controller('MainController', function($scope, $rootScope, usuario){
    $rootScope.logueado = usuario.logueado;
    $rootScope.usuarioActivo = usuario.info;
    if ($rootScope.usuarioActivo)
      $scope.usuario_nombre = $rootScope.usuarioActivo.nombre;
    $scope.logout = function(){
      sessionStorage.clear();
      $rootScope.logueado = false;
    };

  });

  app.controller('ComicsController', function($scope, comics){
    $scope.comics = comics;
  });

  app.controller('RegisterController', function($scope, $rootScope, usuario){
    $scope.user_input = "";
    $scope.clave_input = "";
    $scope.nombre_input = "";
    $scope.clave2_input = "";
    $scope.message = "";

    $scope.volver = function(){
      $rootScope.registrar = !$rootScope.registrar;
    };

    $scope.crearUsuario = function(){
      if ($scope.clave_input == $scope.clave2_input){
        lista_usuarios = JSON.parse(localStorage.usuarios);
        usuario_sel = lista_usuarios.filter(function(obj) { return obj.user == $scope.user_input; });
        
        if (usuario_sel.length == 0){
          usuario_nuevo = {nombre: $scope.nombre_input, user: $scope.user_input, password: $scope.clave_input, admin: 0};
          lista_usuarios.push(usuario_nuevo);
          localStorage.usuarios = JSON.stringify(lista_usuarios);
          $scope.message = "Usuario agregado";
          $scope.user_input = "";
          $scope.clave_input = "";
          $scope.clave2_input = "";
          $scope.nombre_input = "";
          
        }
        else{
          $scope.message = "Usuario ya existe";
        }
      }
      else{
        $scope.message = "Claves no coinciden";
      }

    };

  });
  
  app.controller('LoginController', function($scope,$rootScope, usuario){
    $scope.message = "";    
    $rootScope.logueado = usuario.logueado;
    $rootScope.registrar = false;

    $scope.login = function(){
      lista_usuarios = JSON.parse(localStorage.usuarios);
      usuario_sel = lista_usuarios.filter(function(obj) { return obj.user == $scope.user_input; });
      if (usuario_sel.length > 0){
        usuario_sel = usuario_sel[0];
        if (usuario_sel.password == $scope.clave_input){
          sessionStorage.usuario = JSON.stringify(usuario_sel);
          
          $rootScope.usuarioActivo = usuario_sel;
          //usuario.info = usuario_sel;
          $rootScope.logueado = true;
          $scope.user_input = "";
          $scope.clave_input = "";
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
      $rootScope.registrar = !$rootScope.registrar;
      $scope.user_input = "";
      $scope.clave_input = "";
    };

  });

});