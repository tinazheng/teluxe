/**
 * Created by JonChu on 10/4/14.
 */

angular.module("teluxe")
    .factory('ebay_search_service',function($http){
        return {
            getLightBulbs: function(watt,lumen,bulb){
                var watt_or_lumen = 0;
                if (bulb == "fluorescent"){
                    watt_or_lumen = watt;
                }
                else{
                    watt_or_lumen = lumen;
                }
                lightType = watt_or_lumen+"W" +"%20" + bulb + "%20light%20bulb";
                delete $http.defaults.headers.common['X-Requested-With'];
                return $http.get("http://www.corsproxy.com/svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0" + "&SECURITY-APPNAME=Teluxe353-437d-47df-922a-5d92b1cc138&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords="+lightType);
            }
        }
    })