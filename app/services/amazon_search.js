/**
 * Created by JonChu on 10/4/14.
 */

angular.module("teluxe")
    .factory('amazon_search_service',function($http){
        return {
            getLightBulbs: function(){

                delete $http.defaults.headers.common['X-Requested-With'];
                return $http.get("http://www.corsproxy.com/svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0" + "&SECURITY-APPNAME=Teluxe353-437d-47df-922a-5d92b1cc138&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=harry%20potter%20phoenix");
            }
        }
    })