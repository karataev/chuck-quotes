
angular.module('chuck', [])

  .factory('Quotes', function ($http) {
    function getRandom() {
      return $http.get('http://api.icndb.com/jokes/random/')
    }

    function getById(id) {
      return $http.get('http://api.icndb.com/jokes/' + id)
    }

    function getTotal() {
      return $http.get('http://api.icndb.com/jokes/count/')
        .then(function (result) {
          return result.data.value;
        })
    }

    return {
      getRandom: getRandom,
      getById: getById,
      getTotal: getTotal
    }
  })

  .controller('AppCtrl', function (Quotes) {
    var vm = this;
    vm.joke = undefined;
    vm.totalJokes = undefined;

    vm.getRandomQuote = function () {
      vm.joke = undefined;
      Quotes.getRandom()
        .then(function (result) {
          vm.joke = result.data.value.joke;
        })
    };

    vm.getQuoteById = function (id) {
      vm.joke = undefined;
      Quotes.getById(id)
        .then(function (result) {
          vm.joke = result.data.value.joke;
        })
    };

    Quotes.getTotal()
      .then(function (total) {
        vm.indeces = _.range(1, total);
        vm.getRandomQuote();
      })

  });