angular
    .module('ar_mock')
    .service('ResourceService',['$http',function($http) {

        function addResource(resource) {
            var parms = {};

            parms.url = '/ar_mock/api/resources/';

            parms.method = 'POST';
            parms.data = resource;

            resource.pathParams.pop();
            resource.queryParams.pop();
            return $http(parms).then(function(resourceFromBack) {
                return resourceFromBack.data;
            });

        }

        function removeResource(resource) {

        }

        function getResources() {
            var parms = {};

            parms.url = '/ar_mock/api/resources/';

            parms.method = 'GET';

            return $http(parms).then(function(resourcesFromBack) {
                return resourcesFromBack.data;
            });

        }

        return {
            addResource : addResource,
            removeResource : removeResource,
            getResources : getResources
        };
    }]);