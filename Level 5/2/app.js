(function() {
  var app = angular.module('gemStore', ['store-directives']);

  app.controller('StoreController', function(){
    var store = this;
    store.products = [];
    
  });

  app.controller('ReviewController', function() {
    this.review = {};

    this.addReview = function(product) {
      product.reviews.push(this.review);

      this.review = {};
    };
  });
})();
