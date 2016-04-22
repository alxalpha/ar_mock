'use strict';

angular.module('ar_mock')
    .config(['$stateProvider',function ($stateProvider) {
        $stateProvider
            .state('mock', {
                parent: '',
                url: '/mock',
                views : {
                    'content@': {
                        templateUrl: 'app/mock/mock.html',
                        controller: 'MockController'
                    }
                }
            });
    }]);
