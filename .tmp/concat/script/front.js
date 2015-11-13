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

});
/**
 * MessageCteatorCtrl的定义也非常简单，当用户按下回车时，将消息通过socket发送给服务端；
 * 注意着了的newMessage是通过ng-model与textarea直接绑定的；
 *
 * 数据模型$scope.newMessage = ''与视图中的
 * <textarea ng-model="newMessage" ctrl-enter-break-line="createMessage()"></textarea>绑定。
 * 同时绑定了一个控制器方法createMessage，当用户回车时，调用这个方法，把新消息发送给服务端。
 */
angular.module('zhufengChat').controller('MessageCreatorCtrl',function($rootScope,$scope,socket){
    $scope.newMessage = '';
    $scope.createMessage = function(){
        if($scope.newMessage){
            socket.emit('createMessage',{
                content: $scope.newMessage,
                creator: $rootScope.me,
                createAt: new Date()
            });
            $scope.newMessage = '';
        }
    }
});
var col = angular.module('zhufengChat').controller('RoomCtrl',function($scope,socket){
    $scope.messages = [];
    socket.emit('getAllMessages');
    socket.on('allMessages',function(room){
        $scope.room = room;
    });
    socket.on('message.add',function(message){
        $scope.room.messages.push(message);
    });
});
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
/**
 * ctrlEnterBreakLine: 在textarea回车，默认会换行，使用这个组件，可以通过ctrl+enter来换行，
 * 而enter则触发绑定的行为，在这里就是createMessage这个方法
 */
angular.module('zhufengChat').directive('ctrlEnterBreakLine',function(){
    return function(scope,element,attrs){
        var ctrlDown = false;
        element.bind('keydown',function(event){
            if(event.which == 17){
                ctrlDown = true;
                setTimeout(function(){
                    ctrlDown = false;
                },1000);
            }
            if(event.which === 13){
                if(ctrlDown){
                    element.val(element.val()+'\n');
                }else{
                    scope.$apply(function(){
                        scope.$eval(attrs.ctrlEnterBreakLine);
                    });
                    event.preventDefault();
                }
            }
        });
    }
});
/**
 * autoScrollToBottom：当消息很多出现滚动条时，该组件使得滚动条能随着消息的增加自动滚动到底部；
 * scrollTop: 设置 <div> 元素中滚动条的垂直偏移：
 * scrollHeight:获取给定对象的滚动高度
 */
angular.module('zhufengChat').directive('autoScrollToBottom',function(){
    return {
        link: function(scope, element, attrs) {
            scope.$watch(
                function() {
                    return element.children().length;
                },
                function() {
                    element.animate({
                        scrollTop: element.prop('scrollHeight')
                    }, 1000);
                }
            );
        }
    };
});
angular.module('zhufengChat').factory('socket',function($rootScope){
    var socket = io.connect('http://'+window.location.host);
    /**
     * socket服务并不是简单的将socket.io分装成了Angular服务，在每个回调函数里，我们调用了$rootScope.$apply。
     * 在Angular中，如果调用$scope.$apply(callback)，就是告诉Angular，执行callback，并在执行后，
     * 检查$scope（我们用的是$rootScope就是检查整个应用）数据状态，如果有变化就更新index.html中的绑定。
     * 通俗地说，就是每次与服务端通信后，根据数据变化，更新视图。
     */
    return {
        on:function(eventName,callback){
            socket.on(eventName,function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    callback.apply(socket,args);
                });
            });
        },
        emit:function(eventName,data,callback){
            socket.emit(eventName,data,function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    if(callback){
                        callback.apply(socket,args);
                    }
                });
            });
        }
    }
})
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