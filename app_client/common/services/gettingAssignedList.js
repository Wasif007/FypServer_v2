(function() {

  angular
    .module('pingFyp')
    .service('assignedGuard', assignedGuard);

  assignedGuard.$inject = ['$http'];
  function assignedGuard ($http) {

    var getListOfGuards = function () {
      return $http.get('/api/addingguard');
    };
    
    var getGuardSpecificGuard=function(name)
    {
      return $http.get('/api/guardData/'+name);
    }
    return {
      getGuardSpecificGuard:getGuardSpecificGuard,
      getListOfGuards : getListOfGuards
    };
  }

})();