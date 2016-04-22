'use strict';

angular.module('ar_mock')
    .config(['$stateProvider',function ($stateProvider) {
        $stateProvider
            .state('resource', {
                parent: '',
                url: '/resource',
                views : {
                    'content@': {
                        templateUrl: 'app/resource/resource.html',
                        controller: 'ResourceController'
                    }
                }
            });
    }]);
