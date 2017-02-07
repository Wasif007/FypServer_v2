
(function() {

  angular
    .module('pingFyp')
    .service('multipartForm', multipartForm);

  multipartForm.$inject = ['$http'];
  function multipartForm ($http) {

  return{ this.post = function(uploadUrl, data){
		var fd = new FormData();
		for(var key in data)
			fd.append(key, data[key]);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.indentity,
			headers: { 'Content-Type': undefined }
		});
		
	}
}
  }

})();