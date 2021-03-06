(function () {

  angular
    .module('pingFyp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['authentication','multipartForm','$location'];
  function registerCtrl(authentication,multipartForm,$location) {
    var vm = this;

    vm.pageHeader = {
      title: 'Create a new PING account'
    };

    vm.credentials = {
      name : "",
      email : "",
      password : "",
      file:"",
      phone:"",
      home_address:""
    };


    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.home_address
          || !vm.credentials.file || !vm.credentials.phone 
          ||!vm.credentials.email || !vm.credentials.password
          )
           {
        vm.formError = "All fields required, please try again"
         return false;
     
      } else {
        vm.doRegister();
      }
    };

    vm.doRegister = function() {
      vm.formError = "";
     var uploadUrl = '/api/supervisorSignup';
    multipartForm.post(uploadUrl, vm.credentials).then(function(){
          $location.path('/login');
        });
    };

  }

})();