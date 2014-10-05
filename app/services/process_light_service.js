angular.module('teluxe')
    .factory('processLightService', function($window){

        function getPercentile(lux, activity){
            var SCORE_COEFFICIENT = 0.00002;
            var LUX_RECOMMENDED = getRecommendedLux(activity);

            var lux_change = $window.Math.abs(lux - LUX_RECOMMENDED);
            return 1200 * $window.Math.pow(Math.E, - SCORE_COEFFICIENT * $window.Math.pow(lux_change,2));
        }

        function getEfficacy(bulb){
            var efficacy = 0;
            if (bulb == "fluorescent")
                efficacy = 43;
            else if (bulb == "incandescent")
                efficacy = 12;
            else if (bulb == "LED")
                efficacy = 79;
            return efficacy
        }

        function getCurrentWatts(lux, bulb, distance){
            return getCurrentLumens(lux, distance) / getEfficacy(bulb);
        }

        function getCurrentLumens(lux, d){
            var REFLECTION_COEFFICIENT = 0.48;              // Between 0.07 and 0.1
            return lux * d * d * REFLECTION_COEFFICIENT;
        }

        function getRecommendedLux(activity){
            if (activity == "sleep")            // Dark Surroundings
                return 25;
            else if (activity == "read")        // Normal Reading/Drawing
                return 1000;
            else if (activity == "computer")    // Normal Office Work
                return 500;
            else if (activity == "lounging")      // Casual Work
                return 250;
            else if (activity == "tv")          // Theaters
                return 150;
            return 0;
        }

        function getComment(lux, activity){
            var LUX_RECOMMENDED = getRecommendedLux(activity);
            var lux_change = $window.Math.abs(lux - LUX_RECOMMENDED);

            console.log('lux change'+lux_change);

            if (lux < LUX_RECOMMENDED)
                return "You do not have enough light.  You are " + lux_change + " lux below the recommended amount.";
            else if(lux == LUX_RECOMMENDED)
                return "Perfect! You have the ideal amount of light.";
            return "You are wasting energy.  You have " + lux_change + " lux above the recommended amount.";
        }

        function getRecommendedLumens(activity, d){
            var REFLECTION_COEFFICIENT = 0.09;              // Between 0.07 and 0.1
            var recommendedLux = getRecommendedLux(activity);
            return recommendedLux * d * d * REFLECTION_COEFFICIENT;
        }

        function getRecommendedWatts(activity){
            if (activity == "sleep")            // 100W for Wake-Up Lights
                return 100;
            else if (activity == "read")        // Between 40W - 60W
                return 50;
            else if (activity == "computer")    // No more than 60W
                return 60;
            else if (activity == "lounge")      // Ambient Light Bulbs
                return 12;
            else if (activity == "tv")          // No more than 60W
                return 60;
            return 0;
        }

        function getRecommendedTemperature(activity){
            var SOFT_WHITE = 2800;   // Between 2700K and 3000K
            var COOL = 3800;         // Between 3500K and 4100K
            var DAYLIGHT = 5800;     // Between 5000K and 6500K

            if (activity == "sleep")
                return SOFT_WHITE;
            else if (activity == "read")
                return DAYLIGHT;
            else if (activity == "computer")
                return COOL;
            else if (activity == "lounging")
                return SOFT_WHITE;
            else if (activity == "tv")
                return COOL;
            return 0;
        }

        function getSavings(curLightWattage,recommendedLightWatts,bulb_type){
            var curEfficacy = getEfficacy(bulb_type)/100;
            var idealEfficacy = getEfficacy('LED')/100;

            var curUsedWatt = curLightWattage/curEfficacy;
            var idealUsedWatt = recommendedLightWatts/idealEfficacy;

            return (curUsedWatt - idealUsedWatt) / curUsedWatt;
        }

        return{
            getRecommendedSettings:  function(lux_use, action, distance, bulb_type) {
                var returnBody = {
                    "percentile": getPercentile(lux_use, action),
                    "currentWattage": getCurrentWatts(lux_use, bulb_type, distance),
                    "comment": getComment(lux_use, action),
                    "recommendedWatts": getRecommendedWatts(action, distance),
                    "recommendedLux": getRecommendedLux(action),
                    "recommendedLumens": getRecommendedLumens(action, distance),
                    "recommendedTemperature": getRecommendedTemperature(action)
                };

                returnBody.savings = getSavings(returnBody.currentWattage,returnBody.recommendedWatts,bulb_type);
                return returnBody;
            }
        }
    });