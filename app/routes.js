var app =  angular.module('main-App',['ngRoute','angularUtils.directives.dirPagination', 'ngFlash', 'uiCropper']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'templates/items.html',
                controller: 'ItemController'
            });
}]);