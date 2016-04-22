'use strict';

angular.module('ar_mock')
    .config(['$stateProvider',function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: '',
                url: '/',
                views : {
                    'content@': {
                        templateUrl: 'app/home/home.html',
                        controller: 'HomeController'
                    }
                }
            });
    }]);
