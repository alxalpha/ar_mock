angular
    .module('ar_mock')
    .controller('ResourceController',['$scope','ResourceService','METHOD','PROTOCOL',function($scope,ResourceService,METHOD,PROTOCOL) {

        $scope.resourceController = {
            resources : [],
            resourceToAdd : {
                domain : '',
                port : 80,
                protocol : PROTOCOL.HTTP,
                method : METHOD.GET,
                server : '',
                pathParams : [{name : ''}],
                queryParams : [{name : ''}]
            }

        };


        ResourceService.getResources().then(function(resources) {
            resources.forEach(function(currentResource) {
                $scope.resourceController.resources.push(currentResource);
            });

        });

        $scope.onAddResource = function() {
            ResourceService.addResource(angular.copy($scope.resourceController.resourceToAdd)).then(function(resourceFromBack) {
                $scope.resourceController.resources.push(resourceFromBack);
            });
        };

        $scope.handleParamsOnClick = function(paramList,index) {
            if(paramList.length -1 === index) {
                paramList.push({name : ''});
            }
        };


        function handleUrlChangeQueryParamPart(url,resourceToAdd) {
            var indexOfQueries = url.indexOf('?');
            if(indexOfQueries !== -1) {
                resourceToAdd.queryParams.length = 0;
                url.substr(indexOfQueries+1).split('&').forEach(function(currentQueryPath) {
                    resourceToAdd.queryParams.push(currentQueryPath);
                });
            }
        }


        function handleUrlChangeProtocol(url, resourceToAdd) {
            var stopindexOfProtocol = url.indexOf('://');
            resourceToAdd.protocol = stopindexOfProtocol !== -1 ? url.substring(0,stopindexOfProtocol) : '';
        }

        function handleUrlChangeServer(url, resourceToAdd) {
            var startIndexOfServer = url.indexOf('://');
            var stopIndexOfServer = url.indexOf(':',startIndexOfServer+3);
            var stopIndexOfPort = url.indexOf('/',stopIndexOfServer+1);
            var startQueryParams = url.indexOf('?');


            resourceToAdd.server = startIndexOfServer !== -1  && stopIndexOfServer !== -1 ? url.substring(startIndexOfServer+3,stopIndexOfServer) : '';
            resourceToAdd.port = stopIndexOfServer !== -1  && stopIndexOfPort !== -1 ? url.substring(stopIndexOfServer+1,stopIndexOfPort) : '';

            startQueryParams = startQueryParams === -1 ? url.length : startQueryParams;

            resourceToAdd.pathParams.length = 0;
            url.substring(stopIndexOfPort+1,startQueryParams).split('/').forEach(function(currentPathParam) {
                resourceToAdd.pathParams.push(currentPathParam);
            });

        }



        $scope.handleUrlChange = function() {
            var resourceToAdd = $scope.resourceController.resourceToAdd;
            var url = angular.copy($scope.url);

            handleUrlChangeProtocol(url,resourceToAdd);
            handleUrlChangeServer(url,resourceToAdd);
            handleUrlChangeQueryParamPart(url,resourceToAdd);
        };


        function joinParams(params, joinChar) {
            return params.map(function(param) {return param.name}).join(joinChar);
        }

        $scope.getUrlFromResource = function(resource){
            return resource.protocol + '://' + (angular.isObject(resource.server) ? resource.server.name : resource.server )+ ":" + resource.port + '/' + resource.domain + '/' + joinParams(resource.pathParams,'/') + '?' + joinParams(resource.queryParams,'&')
        };

        $scope.urlBuilder = function () {
            var resourceToAdd = $scope.resourceController.resourceToAdd;
            $scope.url= $scope.getUrlFromResource(resourceToAdd);
        };
        
        $scope.urlBuilder();

    }]).value('METHOD', {
    GET : 'GET',
    POST : 'POST',
    DELETE : 'DELETE',
    PUT : 'PUT',
    PATCH : 'PATCH'
}).value('PROTOCOL', {
    HTTP : 'http',
    HTTPS : 'https'
});