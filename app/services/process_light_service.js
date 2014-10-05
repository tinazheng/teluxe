angular.module('teluxe')
    .factory('processLightService', function($window){

        function getPercentile(lux, activity){
            var SCORE_COEFFICIENT = 0.00002;
            var LUX_RECOMMENDED = getRecommendedLux(activity);

            var lux_change = $window.Math.abs(lux - LUX_RECOMMENDED);
            return 100 * $window.Math.pow(Math.E, - SCORE_COEFFICIENT * $window.Math.pow(lux_change,2));
        }

        function getRecommendedLux(activity){
            if (activity == "sleep")            // Dark Surroundings
                return 25;
            else if (activity == "read")        // Normal Reading/Drawing
                return 1000;
            else if (activity == "computer")    // Normal Office Work
                return 500;
            else if (activity == "lounge")      // Casual Work
                return 250;
            else if (activity == "tv")          // Theaters
                return 150;
            return 0;
        }

        function getComment(lux, activity){
            var LUX_RECOMMENDED = getRecommendedLux(activity);
            var lux_change = $window.Math.abs(lux - LUX_RECOMMENDED);

            if (lux < LUX_RECOMMENDED)
                return "You do not have enough light.  You are " + lux_change + " lux below the recommended amount";
            return "You are wasting energy.  You have " + lux_change + " lux above the recommended amount";
        }

        function getRecommendedLumens(activity, d){
            var REFLECTION_COEFFICIENT = 0.07;              // Between 0.8 and 0.12
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
            else if (activity == "lounge")
                return SOFT_WHITE;
            else if (activity == "tv")
                return COOL;
            return 0;
        }

        return{
            getRecommendedSettings:  function(lux_use, action, distance) {
                return {
                    "percentile": getPercentile(lux_use, action),
                    "comment": getComment(lux_use, action),
                    "recommendedWatts": getRecommendedWatts(action, distance),
                    "recommendedLux": getRecommendedLux(action),
                    "recommendedLumens": getRecommendedLumens(action, distance),
                    "recommendedTemperature": getRecommendedTemperature(action)
                };
            }
        }
    });