angular.module('zhufengChat').controller('NavbarCtrl',function($scope,$location,$http){
    $scope.isActive = function (route) {
        return route === $location.path();
    }

    $scope.logout = function(){
        $http({
            url:'/users/logout',
            method:'GET'
        }).success(function(user){
            $scope.$emit('logout')
            $location.path('/login')
        }).error(function(data){
            $location.path('/login')
        });
    }
});