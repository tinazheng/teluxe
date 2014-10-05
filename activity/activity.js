/**
 * Created by Mike on 6/27/14.
 */
angular.module("teluxe")
    .controller('activityController',function($scope, $rootScope, qStorage){
        $scope.qStorage = qStorage;
});