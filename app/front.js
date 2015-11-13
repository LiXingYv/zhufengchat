angular.module('zhufengChat', ['ngRoute','angularMoment']).config(function($routeProvider,$locationProvider,$routeProvider){
    //$locationProvider.html5Mode(true);
    $routeProvider.when('/room',{
        templateUrl:'/pages/room.html',
        controller:'RoomCtrl'
    }).when('/reg',{
        templateUrl:'/pages/reg.html',
        controller:'RegCtrl'
    }).when('/login',{
        templateUrl:'/pages/login.html',
        controller:'LoginCtrl'
    }).otherwise({
        redirectTo:'/room'
    });
});

angular.module('zhufengChat').run(function($rootScope,$location,$http,amMoment,socket,validator){
    //处理进行用户验证
    validator.then(function(user) {//  成功
        $location.path('/');
    }, function(reason) {//失败
        $location.path('/login');
    });

    $rootScope.$on('login', function (evt, me) {
        $rootScope.me = me;
    })

    $rootScope.$on('$routeChangeStart', function(evt, next, current){
        //loadedTemplateUrl: "/pages/room.html"
        if(current && '/pages/room.html' == current.loadedTemplateUrl){
            socket.emit('leave',$rootScope.me);
        }
    });

    $rootScope.$on('$routeChangeSuccess', function(evt, next, current){
        if('/pages/room.html' == next.loadedTemplateUrl){
            socket.emit('join',$rootScope.me);
        }
    });
});