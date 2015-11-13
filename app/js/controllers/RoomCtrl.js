angular.module('zhufengChat').controller('RoomCtrl',function($scope,socket){
    $scope.messages = [];
    socket.emit('getAllMessages');
    console.log($scope);
    socket.on('allMessages',function(messsages){
        $scope.messages = messsages;
    });
    socket.on('message.add',function(message){
        $scope.messages.push(message);
    });
});
