'use strict';

angular.module('ar_mock')
    .directive('navigation',[
    function() {
        return {
            restrict: 'AE',
            templateUrl : 'app/navigation/navigation.html',
            link: function (scope, element, attrs) {
                
            }
        };
    }]);
