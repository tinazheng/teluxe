/**
 * Created by JonChu on 10/4/14.
 */
/**
 * Created by Mike on 6/27/14.
 */
angular.module("teluxe")
    .controller('testController',function($scope, amazon_search_service){
        amazon_search_service.getLightBulbs()
            .success(function(data, status, headers, config){
                console.log(data);
            });
    });