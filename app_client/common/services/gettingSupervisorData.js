(function() {

  angular
    .module('pingFyp')
    .service('supervisorData', supervisorData);

  
  supervisorData.$inject = ['$http'];
  function supervisorData ($http) {

    var getListOfGuards = function (emailId) {
      return $http.get('/api/supervisorName/'+emailId);
    };

    return {
      getListOfGuards : getListOfGuards
    };
  }

})();