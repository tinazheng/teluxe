/**
 * Created by JonChu on 10/4/14.
 */
/**
 * Created by Mike on 6/27/14.
 */
angular.module("teluxe")
    .controller('testController',function($scope, ebay_search_service){

        $scope.lights = [];
        $scope.setLightsFromData = function(data){

            for(var i = 0; i<5; i++){
                light_galleryUrl = data['findItemsByKeywordsResponse']['0']['searchResult']['0']['item'][i]['galleryURL']['0'];
                light_title = data['findItemsByKeywordsResponse']['0']['searchResult']['0']['item'][i]['title']['0'];
                light_url = data['findItemsByKeywordsResponse']['0']['searchResult']['0']['item'][i]['viewItemURL']['0'];
                light_currentPriceValue = data['findItemsByKeywordsResponse']['0']['searchResult']['0']['item'][i]['sellingStatus']['0']['currentPrice']['0']['__value__'];
                light_currentPriceCurrency = data['findItemsByKeywordsResponse']['0']['searchResult']['0']['item'][i]['sellingStatus']['0']['currentPrice']['0']['@currencyId'];
                light_currentPrice = light_currentPriceValue +" "+ light_currentPriceCurrency;
                light_timeLeft = data['findItemsByKeywordsResponse']['0']['searchResult']['0']['item'][i]['sellingStatus']['0']['timeLeft']['0'];
                light_daysLeft = light_timeLeft.substring(light_timeLeft.indexOf("P")+1, light_timeLeft.indexOf("D")) + " days";
                light_hoursLeft = light_timeLeft.substring(light_timeLeft.indexOf("T")+1, light_timeLeft.indexOf("H")) + " hours";
                light_time = "";
                if(light_daysLeft=="0 days"){
                    light_time = light_hoursLeft;
                }
                else{
                    light_time = light_daysLeft;
                }


                $scope.lights.push([light_galleryUrl, light_title, light_url, light_currentPrice, light_time])
            }
            return $scope.lights;
        };

        ebay_search_service.getLightBulbs()
            .success(function(data, status, headers, config){
                console.log(data);
                console.log($scope.setLightsFromData(data));
            });
    });