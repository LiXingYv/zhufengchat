angular.module('zhufengChat').controller('RegCtrl',function($scope,$http,$location){
    $scope.user = {};
    //添加ng-submit="login()"，为表单提交绑定一个处理函数login
    $scope.save = function(){
        $http({
            url:'/users/reg',
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