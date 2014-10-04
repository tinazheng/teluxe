/**
 * Created by Mike on 6/27/14.
 */
angular.module("teluxe")
    .controller('distanceController',function($scope, $rootScope, qStorage){
        $scope.qStorage = qStorage;
});