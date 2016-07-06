angular.module('dropzio')

.service('MakeDropService', function($q, $http){

  return {

    drop: function (userObj){
      var deferred = $q.defer();
      $http.post('https://dropzio-server.herokuapp.com/posts', userObj)
      .then(function(serviceRes){
        deferred.resolve(serviceRes)
      })
      .catch(function(err){
        deferred.reject(err)
      })
      console.log('deferred', deferred.promise);
      return deferred.promise;
    }

  }

});
