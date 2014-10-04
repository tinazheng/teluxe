/**
 * Created by Jacky on 10/4/14.
 */
angular.module("teluxe")
    .factory('shareResult', function($window, $rootScope,Facebook){
        return {
            postResult: function(content){
                Facebook.ui({
                    method: 'feed',
                    link: 'teluxe.local',
                    caption: content
                }, function(response){
                    console.log(response);
                });
            }
        };
    });

