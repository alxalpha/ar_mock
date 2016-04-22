angular
    .module('ar_mock')
    .controller('MockController',['$scope','MockService','METHOD','PROTOCOL',function($scope,MockService,PROTOCOL,METHOD) {

        $scope.mockController = {
            mocks : [],
            resource : {
                domain : 'test',
                port : 80,
                protocol : PROTOCOL.HTTP,
                method : METHOD.GET,
                server : 'titi',
                pathParams : [{name : 'test'}],
                queryParams : [{name : 'tata'}]
            },
            mockToAdd : {
                name : null,
                description : null
            }

        };



        //MockService.getMocks().then(function(mocks) {
        //    mocks.forEach(function(currentMock) {
        //         $scope.mockController.mocks.push(currentMock);
        //    });

        //});

        $scope.onAddMock = function() {
            MockService.addMock(angular.copy($scope.mockController.mockToAdd)).then(function(mockFromBack) {
                $scope.mockController.mocks.push(mockFromBack);
            });
        }
    }]);