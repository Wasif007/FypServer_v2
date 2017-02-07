(function () {

  angular
    .module('pingFyp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['authentication','$location'];
  function registerCtrl(authentication,$location) {
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
        vm.formError = "All fields required, please try again"+vm.credentials.name+
              " "+vm.credentials.email+" "+vm.credentials.phone+" "+
              vm.credentials.password+" "+vm.credentials.home_address+" FILE:"+vm.credentials.file.name;
              console.log("HELLO1")

        return false;
     
      } else {
              console.log("HELLO2")

        vm.doRegister();
      }
    };

    vm.doRegister = function() {
      vm.formError = "";
      console.log("HELLO3")
      authentication
        .register(vm.credentials)
        .error(function(err){
          if (err.name == 'ValidationError') {
   vm.formError="Email is already taken";
  } else {
    vm.formError = err;
  }
          
        })
        .then(function(){
          $location.path('/login');
        });
    };

  }

})();