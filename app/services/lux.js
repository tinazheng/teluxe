/**
 * Created by michaelshi on 10/4/14.
 */

angular.module("teluxe")
    .factory('lux', function($window, $rootScope){

        var lux = {};

        lux.listener = function(){
            $window.addEventListener('devicelight', function(e) {
                $rootScope.$apply(function(){
                    lux.val = e.value;
                });
            });
        };

        return lux;
    });