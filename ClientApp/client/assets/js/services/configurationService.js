angular.module('application').factory('configService', function($rootScope, $http) {
    var configService = {};
    configService.serverUrl = "{{ServerUrl}}";
    return configService;
});
