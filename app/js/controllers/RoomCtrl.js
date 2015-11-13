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