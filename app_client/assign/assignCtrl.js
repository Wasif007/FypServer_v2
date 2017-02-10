(function () {

  angular
    .module('pingFyp')
    .controller('assignCtrl', assignCtrl);

    assignCtrl.$inject = ['assignedGuard'];
  function assignCtrl(assignedGuard) {
    var vm = this;

    assignedGuard.getListOfGuards()
        .success(function(data) {
          vm.data = { guards: data };
          console.log(vm.data);
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });

}

})();