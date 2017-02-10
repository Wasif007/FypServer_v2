(function () {

  angular
    .module('pingFyp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['ping-token'] = token;

    };
    var saveEmail=function(email)
    {
      $window.localStorage['supervisor-email']=email;
    }
    var getToken = function () {
      return $window.localStorage['ping-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };
  var gettingEmail=function()
  {
    var token=getToken();
 var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.email;

          }
    register = function(user) {
     console.log(user);
      return $http.post('/api/supervisorSignup',user).success(function(data){
        saveToken(data.token);
       
      });
    };

    login = function(user) {
      return $http.post('/api/supervisorLogin', user).success(function(data) {
        saveToken(data.token);
         saveEmail(gettingEmail());
      });
    };

    posting=function(uploadUrl,data)
    {
        var fd = new FormData();
    for(var key in data)
      fd.append(key, data[key]);
    return  $http.post(uploadUrl, fd, { transformRequest: angular.indentity,
      headers: { 'Content-Type': undefined }
    }).success(function(data){
      console.log("DATA IS :"+data);
    });
  
    }
    logout = function() {
      $window.localStorage.removeItem('ping-token');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
  }


})();