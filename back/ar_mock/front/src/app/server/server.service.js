angular
    .module('ar_mock')
    .service('ServerService',['$http','AmUrlUtil',function($http,urlUtil) {

        var resourceName = 'server';

        function addServer(server) {
            var parms = {};

            parms.url = '/ar_mock/api/servers/';

            parms.method = 'POST';
            parms.data = server;

            return $http(parms).then(function(serverFromBack) {
                return serverFromBack.data;
            });

        }

        function removeServer(server) {

        }

        function getServers() {
            var parms = {};

            parms.url = '/ar_mock/api/servers/';

            parms.method = 'GET';

            return $http(parms).then(function(serversFromBack) {
                return serversFromBack.data;
            });

        }

        return {
            addServer : addServer,
            removeServer : removeServer,
            getServers : getServers
        };
    }]);