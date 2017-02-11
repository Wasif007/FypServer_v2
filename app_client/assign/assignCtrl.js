(function () {

  angular
    .module('pingFyp')
    .controller('assignCtrl', assignCtrl);

    assignCtrl.$inject = ['assignedGuard','supervisorData','$window'];
  function assignCtrl(assignedGuard,supervisorData,$window) {
    var vm = this;

    assignedGuard.getListOfGuards()
        .success(function(data) {
          vm.data = { guards: data };
          console.log(vm.data.guards.name);
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
       supervisorData.getListOfGuards($window.localStorage['supervisor-email'])
       .success(function(data){
       	vm.data={supervisor:data};
       	console.log(vm.data.supervisor.name);
       })
       .error(function(e){
       	vm.message="Sorry, something's gone wrong";
       })


}

})();