/**
 * Created by Jacky on 10/4/14.
 */
angular.module("teluxe")
    .controller('typesController',function($scope, $rootScope, qStorage){
        $scope.qStorage = qStorage;
    });