(function() {
  var app = angular.module('app', []);

  var usuarios = [
  					{nombre: 'juan', user: 'admin', password: 'admin0'}, 
  					{nombre: 'pedro', user: 'user', password: '123'}
				];

  app.controller('MainController', function(){
	var logueado = false;
	var lista_usuarios = function(){
		alert('eee');
	};

  });

})();
