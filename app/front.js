angular.module('zhufengChat', ['ngRoute']).config(function($routeProvider,$locationProvider,$routeProvider){
  //$locationProvider.html5Mode(true);
    $routeProvider.when('/',{
        templateUrl:'/pages/room.html',
        controller:'RoomCtrl'
    }).otherwise({
        redirectTo:'/'
    });
});

