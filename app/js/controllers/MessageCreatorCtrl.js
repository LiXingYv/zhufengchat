/**
 * MessageCteatorCtrl的定义也非常简单，当用户按下回车时，将消息通过socket发送给服务端；
 * 注意着了的newMessage是通过ng-model与textarea直接绑定的；
 *
 * 数据模型$scope.newMessage = ''与视图中的
 * <textarea ng-model="newMessage" ctrl-enter-break-line="createMessage()"></textarea>绑定。
 * 同时绑定了一个控制器方法createMessage，当用户回车时，调用这个方法，把新消息发送给服务端。
 */
angular.module('zhufengChat').controller('MessageCreatorCtrl',function($scope,socket){
    $scope.newMessage = '';
    $scope.createMessage = function(){
        if($scope.newMessage){
            socket.emit('createMessage',$scope.newMessage);
            $scope.newMessage = '';
        }
    }
});