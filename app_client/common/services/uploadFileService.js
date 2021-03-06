
(function() {

  angular
    .module('pingFyp')
    .service('multipartForm', multipartForm);

  multipartForm.$inject = ['$http'];
  function multipartForm ($http) {

   this.post = function(uploadUrl, data){
		var fd = new FormData();
		for(var key in data)
			fd.append(key, data[key]);
		return	$http.post(uploadUrl, fd, {	transformRequest: angular.indentity,
			headers: { 'Content-Type': undefined }
		}).success(function(data){
			console.log("DATA IS :"+data);
		});
	
}
  }

})();