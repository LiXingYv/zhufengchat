angular.module('zhufengChat').factory('validator',function($rootScope,$q,$http){
            var deferred = $q.defer();
            $http({
                url:'/users/validate',
                method:'GET'
            }).success(function(user){
                $rootScope.me = user;
                deferred.resolve(user);
            }).error(function(data){
                deferred.reject(data);
            });
            return deferred.promise;
})