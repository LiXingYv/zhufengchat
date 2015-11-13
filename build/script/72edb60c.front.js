angular.module("zhufengChat", [ "ngRoute", "angularMoment" ]).config(function($routeProvider, $locationProvider, $routeProvider) {
    $routeProvider.when("/room", {
        templateUrl: "/pages/room.html",
        controller: "RoomCtrl"
    }).when("/reg", {
        templateUrl: "/pages/reg.html",
        controller: "RegCtrl"
    }).when("/login", {
        templateUrl: "/pages/login.html",
        controller: "LoginCtrl"
    }).otherwise({
        redirectTo: "/room"
    });
}), angular.module("zhufengChat").run(function($rootScope, $location, $http, amMoment, socket, validator) {
    validator.then(function(user) {
        $location.path("/");
    }, function(reason) {
        $location.path("/login");
    }), $rootScope.$on("login", function(evt, me) {
        $rootScope.me = me;
    });
}), angular.module("zhufengChat").controller("MessageCreatorCtrl", function($rootScope, $scope, socket) {
    $scope.newMessage = "", $scope.createMessage = function() {
        $scope.newMessage && (socket.emit("createMessage", {
            content: $scope.newMessage,
            creator: $rootScope.me,
            createAt: new Date()
        }), $scope.newMessage = "");
    };
});

var col = angular.module("zhufengChat").controller("RoomCtrl", function($scope, socket) {
    $scope.messages = [], socket.emit("getAllMessages"), socket.on("allMessages", function(room) {
        $scope.room = room;
    }), socket.on("message.add", function(message) {
        $scope.room.messages.push(message);
    });
});

angular.module("zhufengChat").controller("NavbarCtrl", function($scope, $location, $http) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }, $scope.logout = function() {
        $http({
            url: "/users/logout",
            method: "GET"
        }).success(function(user) {
            $scope.$emit("logout"), $location.path("/login");
        }).error(function(data) {
            $location.path("/login");
        });
    };
}), angular.module("zhufengChat").controller("RegCtrl", function($scope, $http, $location) {
    $scope.user = {}, $scope.save = function() {
        $http({
            url: "/users/reg",
            method: "POST",
            data: $scope.user
        }).success(function(user) {
            $scope.$emit("login", user), $location.path("/");
        }).error(function(data) {
            $location.path("/login");
        });
    };
}), angular.module("zhufengChat").controller("LoginCtrl", function($scope, $http, $location) {
    $scope.user = {}, $scope.save = function() {
        $http({
            url: "/users/login",
            method: "POST",
            data: $scope.user
        }).success(function(user) {
            $scope.$emit("login", user), $location.path("/");
        }).error(function(data) {
            $location.path("/login");
        });
    };
}), angular.module("zhufengChat").directive("ctrlEnterBreakLine", function() {
    return function(scope, element, attrs) {
        var ctrlDown = !1;
        element.bind("keydown", function(event) {
            17 == event.which && (ctrlDown = !0, setTimeout(function() {
                ctrlDown = !1;
            }, 1e3)), 13 === event.which && (ctrlDown ? element.val(element.val() + "\n") : (scope.$apply(function() {
                scope.$eval(attrs.ctrlEnterBreakLine);
            }), event.preventDefault()));
        });
    };
}), angular.module("zhufengChat").directive("autoScrollToBottom", function() {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(function() {
                return element.children().length;
            }, function() {
                element.animate({
                    scrollTop: element.prop("scrollHeight")
                }, 1e3);
            });
        }
    };
}), angular.module("zhufengChat").factory("socket", function($rootScope) {
    var socket = io.connect("http://" + window.location.host);
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback && callback.apply(socket, args);
                });
            });
        }
    };
}), angular.module("zhufengChat").factory("validator", function($rootScope, $q, $http) {
    var deferred = $q.defer();
    return $http({
        url: "/users/validate",
        method: "GET"
    }).success(function(user) {
        $rootScope.me = user, deferred.resolve(user);
    }).error(function(data) {
        deferred.reject(data);
    }), deferred.promise;
});