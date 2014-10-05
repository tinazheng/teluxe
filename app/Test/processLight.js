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

        var x = processLightService.getRecommendedSettings(500, "read", 1.3, "LED");
        console.log(x);

        //var x = processLightService.getRecommendedSettings(508, "computer", 1.3, "LED");
        //console.log(x);

        //var x = processLightService.getRecommendedSettings(166, "tv", 1.3, "LED");
        //console.log(x);
        //
        //var x = processLightService.getRecommendedSettings(508, "lounge", 1.3, "LED");
        //console.log(x);
    });