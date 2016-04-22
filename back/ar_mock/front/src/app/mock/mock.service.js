angular
    .module('ar_mock')
    .service('MockService',['$http','AmUrlUtil',function($http,urlUtil) {

        var resourceName = 'mock';

        function addMock(mock) {
            var parms = {};

            parms.url = '/ar_mock/api/mocks/';

            parms.method = 'POST';
            parms.data = mock;

            return $http(parms).then(function(mockFromBack) {
                return mockFromBack.data;
            });

        }

        function removeMock(mock) {

        }

        function getMocks() {
            var parms = {};

            parms.url = '/ar_mock/api/mocks/';

            parms.method = 'GET';

            return $http(parms).then(function(mocksFromBack) {
                return mocksFromBack.data;
            });

        }

        return {
            addMock : addMock,
            removeMock : removeMock,
            getMocks : getMocks
        };
    }]);