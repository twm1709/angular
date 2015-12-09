(function() {
  var app = angular.module('app', []);
  
  var createDB = function(){
      if (!localStorage.users){
        localStorage.users = JSON.stringify(usuarios);
        localStorage.comics = JSON.stringify(comics);
        localStorage.genres = JSON.stringify(genres);
      }
  };
  createDB();

  //Servicios
  var getUser = function(){

    if (!sessionStorage.usuario){
        return {logueado: false, info: ""};
      }
      else{
        return {logueado: true, info: JSON.parse(sessionStorage.usuario)};
      }
  };

  var getComics= function(){
    return JSON.parse(localStorage.comics);
  };

  var getGenres= function(){
    return JSON.parse(localStorage.genres);
  };

  app.value('usuario', getUser());
  app.value('comics', getComics());
  app.value('genres', getGenres());

  var createDB = function(){
      if (!localStorage.users){
        localStorage.users = JSON.stringify(usuarios);
        localStorage.comics = JSON.stringify(comics);
        localStorage.genres = JSON.stringify(genres);
      }
  };
  createDB();

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

  app.controller('ComicsController', function($scope, comics, genres, orderByFilter){
    $scope.comics = comics;
    $scope.viewGenres = false;
    $scope.viewComics = true;
    $scope.viewInfo = false;
    $scope.genres = genres;
    $scope.getStarArray= function(stars){
      return new Array(stars);
    };

    $scope.predicate = 'name';
    $scope.reverse = false;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };
    
    $scope.selected_genre = "";
    $scope.getGenre = function(){
      return $scope.selected_genre;
    };

    $scope.setGenre= function(genre){
      $scope.selected_genre = genre;
      $scope.viewComics = true;
      $scope.viewGenres = false;
    }
    $scope.listGenres = function(){
      $scope.viewGenres = true;
      $scope.viewComics = false;
    }
    $scope.mainTab = function(){
      showList();
      $scope.setGenre('');
    }
    $scope.showList = function(){
      $scope.viewGenres = false; 
      $scope.viewComics = true;
      $scope.viewInfo = false;
    }
    $scope.getReverse = function(){
      if (!$scope.reverse)
        return 'Ascending';
      else
        return 'Descending';

    };
    $scope.setSelectedComic = function(comic){
      $scope.selectedComic = comic;
      $scope.viewInfo = true;
      $scope.viewComics = false;
      $scope.viewGenres = false;
    };

    $scope.getComicName = function(){
      return $scope.selectedComic.name;
    }



  });

  app.controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });

  
  

  //Filtros
  app.filter('stars', 
      function() {
        return function(cant) {
          var aux = "";
          for (i = 0; i < cant; i++)
            aux += "<img src='img/interface/stars.png'/>";
          
          aux = "Rating: " + cant;
          return aux;
        };
      });
  
  //Directives
  app.directive('contentArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/interface/content-area.html"
    };
  });
  app.directive('genreList', function(){
    return{
      restrict: 'E',
      templateUrl: "views/comics/genre-list.html"
    };
  });
  app.directive('comicInfo', function(){
    return{
      restrict: 'E',
      templateUrl: "views/comics/comic-info.html"
    };
  });

  app.directive('comicsList', function(){
    return{
      restrict: 'E',
      templateUrl: "views/comics/comics-list.html"
    };
  });

  app.directive('sidebarTabsArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/interface/sidebar-tabs.html"
    };
  });

  app.directive('loginArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/users/login-area.html",
      controller: function($scope,$rootScope, usuario){
                    $scope.message = "";    
                    $rootScope.logueado = usuario.logueado;
                    $rootScope.registrar = false;

                    $scope.login = function(){
                      lista_usuarios = JSON.parse(localStorage.users);
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

                  },
      controllerAs: 'login'
      
    };
  });

  app.directive('footerArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/interface/footer-area.html"
    };
  });

  app.directive('headerArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/interface/header-area.html"
    };
  });

  app.directive('registerArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/users/register-area.html",
      controller: function($scope, $rootScope, usuario){
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
              lista_usuarios = JSON.parse(localStorage.users);
              usuario_sel = lista_usuarios.filter(function(obj) { return obj.user == $scope.user_input; });
              
              if (usuario_sel.length == 0){
                usuario_nuevo = {nombre: $scope.nombre_input, user: $scope.user_input, password: $scope.clave_input, admin: 0};
                lista_usuarios.push(usuario_nuevo);
                localStorage.users = JSON.stringify(lista_usuarios);
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

        }
    }
  });

})();
