
var StoreController = function($scope){
	var $product = {
		name: "Producto1",
		price: 999,
		can_purchase: true,
		sold_out: false
	}
	$scope.message = "Hello Angular!";
	$scope.product = $product;
	$scope.gems = [
	{
		name: "Producto1",
		price: 999,
		can_purchase: true,
		sold_out: false
	},
	{
		name: "Producto2",
		price: 999,
		can_purchase: false,
		sold_out: false
	},
	{
		name: "Producto3",
		price: 999,
		can_purchase: true,
		sold_out: true
	}

	];
};
angular.module('fede', []).controller('StoreController', StoreController);