angular.module('teluxe')
    .factory('processLightService', function(){

        function getPercentile(lux, activity){
            var SCORE_COEFFICIENT = 0.2;
            var LUX_RECOMMENDED = getRecommendedLux(activity);

            var lux_change = abs(lux - LUX_RECOMMENDED);
            return 1000 * pow(Math.E, - SCORE_COEFFICIENT * pow(lux_change,2));
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

        function getRecommendedLumens(activity, d){
            var recommendedLux = getRecommendedLux(activity);
            return recommendedLux * 4 * Math.PI * d * d;
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
            getRecommendedSettings:  function(lux_source, lux_use, action, distance) {
                return {
                    "percentile": getPercentile(lux_use, action),
                    "watts": getRecommendedWatts(action, distance),
                    "lumens": getRecommendedLumens(action, distance),
                    "temperature": getRecommendedTemperature(action)
                };
            }
        }
    });