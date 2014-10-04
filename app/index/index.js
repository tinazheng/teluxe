/**
 * Created by Mike on 6/27/14.
 */
angular.module("teluxe")
    .controller('indexController',function($scope, $rootScope, lux){
        //Watches for changes in lighting
        $scope.$watch(function(){return lux.val;}, function(newValue){
            //Do stuff with newValue here
        });
        //Initialize lighting listener
        lux.listener();
});