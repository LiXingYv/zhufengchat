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