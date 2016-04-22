angular.module('ar_mock', ['ui.router','amUtil']).config(['$stateProvider', '$urlRouterProvider','$httpProvider',
        function ($stateProvider, $urlRouterProvider,$httpProvider) {
            $urlRouterProvider.otherwise('/');
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        }]);