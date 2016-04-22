angular
    .module('ar_mock')
    .controller('ServerController',['$scope','ServerService',function($scope,ServerService) {

        $scope.serverController = {
            servers : [],
            serverToAdd : {
                name : null,
                description : null
            }

        };

        ServerService.getServers().then(function(servers) {
            servers.forEach(function(currentServer) {
                 $scope.serverController.servers.push(currentServer);
            });

        });

        $scope.onAddServer = function() {
            ServerService.addServer(angular.copy($scope.serverController.serverToAdd)).then(function(serverFromBack) {
                $scope.serverController.servers.push(serverFromBack);
            });
        }
    }]);