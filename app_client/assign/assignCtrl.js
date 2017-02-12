(function () {

  angular
    .module('pingFyp')
    .controller('assignCtrl', assignCtrl);

    assignCtrl.$inject = ['assignedGuard','supervisorData','$window'];
  function assignCtrl(assignedGuard,supervisorData,$window) {
    var vm = this;
vm.credentials = {
      time : ""
    };
    assignedGuard.getListOfGuards()
        .success(function(data) {
         vm.datas = { guards: data };
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
       supervisorData.getListOfGuards($window.localStorage['supervisor-email'])
       .success(function(data){
       	vm.data={supervisor:data};
       	vm.credentials.supervisorName=vm.data.supervisor.name;
       	vm.credentials.supervisorImageUrl=vm.data.supervisor.imageUrl;
       })
       .error(function(e){
       	vm.message="Sorry, something's gone wrong";
       });

       vm.onSubmit=function(){
       if(!vm.credentials.supervisorName || !vm.credentials.guardName 
    || !vm.credentials.supervisorImageUrl   
    || !vm.credentials.time || !vm.credentials.location )
  {console.log("First Time "+vm.credentials.supervisorName +" "+vm.credentials.guardName 
    +" "+vm.credentials.supervisorImageUrl  +" "+vm.credentials.guardImageUrl 
    +" "+vm.credentials.time +" "+vm.credentials.location +" "+vm.credentials.guardUsername);
           
        vm.formError = "All fields required, please try again"
         return false;
     
      } else {
        assignedGuard.getGuardSpecificGuard(vm.credentials.guardName).success(function(data){
        vm.guardData={guard:data};
        vm.credentials.guardImageUrl=vm.guardData.guard.imageUrl;
       vm.credentials.email=vm.guardData.guard.email;
  console.log("Second Time "+vm.credentials.supervisorName +" "+vm.credentials.guardName 
    +" "+vm.credentials.supervisorImageUrl  +" "+vm.credentials.guardImageUrl 
    +" "+vm.credentials.time +" "+vm.credentials.location +" "+vm.credentials.guardUsername);
  
        vm.assignDuty();
       }).error(function(e){
        vm.message="Sorry, something's gone wrong";
       });
      }

       
       }

    vm.assignDuty = function() {
      assignedGuard
        .assigningDuty(vm.credentials)
        .error(function(err){
         
          vm.formError = err;
        }
        )
        .then(function(){
          $location.path('/supervisor');
        });
    };
 /*
vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.time || !vm.credentials.guardName) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
      console.log(vm.credentials.guardName+" "+
      	vm.credentials.supervisorName
      		+" "+vm.credentials.supervisorImageUrl+" "+
      		vm.credentials.guardImageUrl+" "+
      		vm.credentials.location+" "+
      		vm.credentials.time
      		);
        vm.assignDuty();
      }
    };
    vm.assignDuty = function() {
      vm.formError = "";
      assignedGuard
        .assigningDuty(vm.credentials)
        .error(function(err){
         
          vm.formError = err;
        }
        })
        .then(function(){
          $location.path('/supervisor');
        });
    };
*/
}

})();