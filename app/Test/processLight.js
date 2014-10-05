/**
 * Created by JMBros on 10/4/14.
 */
angular.module("teluxe")
    .controller('testController', function($scope, processLightService){
        //var x = processLightService.getRecommendedSettings(800, "read", 1);
        //console.log("800 lux at 1 foot for reading");
        //console.log(x);
        //
        //var x = processLightService.getRecommendedSettings(800, "read", 2);
        //console.log("800 lux at 2 foot for reading");
        //console.log(x);
        //
        //var x = processLightService.getRecommendedSettings(800, "read", 1/2);
        //console.log("800 lux at 1/2 foot for reading");
        //console.log(x);

        var x = processLightService.getRecommendedSettings(1000, "read", 1.7);
        console.log("800 lux at 1/2 foot for reading");
        console.log(x);
    });