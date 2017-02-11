(function() {

  angular
    .module('pingFyp')
    .service('assignedGuard', assignedGuard);

  assignedGuard.$inject = ['$http'];
  function assignedGuard ($http) {

    var getListOfGuards = function () {
      return $http.get('/api/addingguard');
    };

    return {
      getListOfGuards : getListOfGuards
    };
  }

})();