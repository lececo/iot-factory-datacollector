

var smartfactoryApp = angular.module('smarfactoryApp', []);


//Dashboard


smartfactoryApp.controller(
    'AllMessageController', function AllMessageController($scope, $http, $interval) {

        $interval(function () {
            $http.get('/getAllMessages')
                .then(function successCallback(response) {
                    $scope.mqttMessages = response.data;
                });
        }, 1000);
    });

smartfactoryApp.controller('ButtonHandler', function ButtonHandler($scope, $http) {
    $scope.startMqtt = function () {
        var response = $http.get('/startClient');
    };

    $scope.getClientsData = function () {

        var req = {
            method: 'POST',
            url: '/getSpecificClientData',
            data: "client_localhost"
        };

        var response = $http.post(req);
    };
});

