/**
 * Created by Mike on 6/27/14.
 */
angular.module("teluxe")
    .controller('instructionsController',function($scope, $rootScope, $state, qStorage, lux, processLightService){

        $scope.qStorage = qStorage;

        //TODO: Remove
        /*$scope.mockListener = function(){
            qStorage.model.results = processLightService.getRecommendedSettings(900, $scope.qStorage.model.activity, $scope.qStorage.model.distance, $scope.qStorage.model.type);

            $state.go('stats');
        };*/
        
        $scope.sampling = false;

        $scope.samples = [];
        $scope.sampleAverage = -1;

        //Stage in sampling 0=init, 1=sampling
        $scope.stage = 0;

        //Watches for changes in lighting
        $scope.$watch(function(){
            //Only return when we want it to sample anything
            if($scope.sampling)
                return lux.val;
        }, function(newValue){
            if(isNaN(newValue)){
                return false;
            }
            $scope.samples.push(newValue);
            console.log(newValue);
            //Stop after enough light samples
            if($scope.samples.length > 25){
                $scope.calculate();
            }
        });

        //Functions to stop and start sampling
        $scope.runListener = function(){
            $scope.sampling = true;
            $scope.stage = 1;
        };

        $scope.stopListener = function(){
            $scope.sampling = false;
        };

        $scope.calculate = function(){
            $scope.stopListener();
            var sampleSum = 0;
            //Meh
            for(var i=0; i<$scope.samples.length; i++){
                sampleSum += $scope.samples[i];
            }
            $scope.sampleAverage = sampleSum/$scope.samples.length;

//            console.log($scope.sampleAverage, qStorage.model.activity, qStorage.model.distance);

            //Get recommendation
            var rec = processLightService.getRecommendedSettings($scope.sampleAverage, qStorage.model.activity, qStorage.model.distance, 'LED');

//            console.log(rec);

            qStorage.model.results = rec;

            $state.go('stats');
        };

        //Initialize Listener
        lux.listener();
        $scope.runListener();
});