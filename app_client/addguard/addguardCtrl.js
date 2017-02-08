(function () {

  angular
    .module('pingFyp')
    .controller('addguardCtrl', addguardCtrl);

    addguardCtrl.$inject = ['authentication','multipartForm','$location'];

  function addguardCtrl(authentication,multipartForm,$location) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      code : "",
      file:"",
      phone:"",
      home_address:""
    };


    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.home_address
          || !vm.credentials.file || !vm.credentials.phone 
          ||!vm.credentials.email || !vm.credentials.code
          )
           {
        vm.formError = "All fields required, please try again";
        return false;
     
      } else {
        vm.doAddGuard();
      }
    };

    vm.doAddGuard = function() {
      vm.formError = "";
     var uploadUrl = '/api/addingguard';
    multipartForm.post(uploadUrl, vm.credentials).then(function(){
          $location.path('/supervisor');
        });
    };

  

  }

})();