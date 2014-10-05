/**
 * Created by Mike on 6/27/14.
 */
angular.module("teluxe")
    .controller('instructionsController',function($scope, qStorage){
        $scope.qStorage = qStorage;
});