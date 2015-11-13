angular.module('zhufengChat').controller('LoginCtrl',function($scope,$http,$location){
    $scope.user = {};
    $scope.save = function(){
        $http({
            url:'/users/login',
            method:'POST',
            data:$scope.user
        }).success(function(user){
            $scope.$emit('login', user)
            $location.path('/')
        }).error(function(data){
            $location.path('/login')
        });
    }
});