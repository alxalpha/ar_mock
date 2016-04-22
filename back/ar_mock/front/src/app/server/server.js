'use strict';

angular.module('ar_mock')
    .config(['$stateProvider',function ($stateProvider) {
        $stateProvider
            .state('server', {
                parent: '',
                url: '/server',
                views : {
                    'content@': {
                        templateUrl: 'app/server/server.html',
                        controller: 'ServerController'
                    }
                }
            });
    }]);
