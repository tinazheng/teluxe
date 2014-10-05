/**
 * Created by Mike on 6/27/14.
 */
angular.module("teluxe")
    .controller('statsController',function($scope, $rootScope, qStorage, Facebook,ebay_search_service){
        //Declare Variables
        $scope.qStorage = qStorage;
        $scope.lights = [];
        $scope.results = qStorage.model.results;
/*        $scope.results = {
            'percentile': 982.4769036935782,
            'currentWattage': 21.873417721518987,
            'comment': "You do not have enough light.  You are 100 lux below the recommended amount.",
            'recommendedWatts': 50,
            'recommendedLux': 1000,
            'recommendedLumens': 360,
            'recommendedTemperature': 5800,
            'savings':0.5235654
        };*/

        console.log($scope.results);

        //Facebook
        $scope.shareText = '';

        $scope.shareScore = function(score){
            $scope.shareText = 'My lights scored '+score+' efficiency points on Teluxe! Can you do better?';
            if(!userIsConnected){
                $scope.login();
            }
            else{
                $scope.goPost();
            }
        };

        //TODO: Figure out what to do w/ lack of message
        //TODO: Change app domain
        $scope.goPost = function(){
            FB.ui(
                {
                    method: 'share',
                    href: 'teluxe.ngrok.com',
                    caption:$scope.shareText
                },
                function(response) {
                }
            );
        };

        // Defining user logged status
        $scope.logged = false;

        // And some fancy flags to display messages upon user status change
        $scope.byebye = false;
        $scope.salutation = false;

        //Wait for FB to be ready
        $scope.$watch(
            function() {
                return Facebook.isReady();
            });

        var userIsConnected = false;

        Facebook.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                userIsConnected = true;
            }
        });

        $scope.IntentLogin = function() {
            if(!userIsConnected) {
                $scope.login();
            }
        };

        $scope.login = function() {
            Facebook.login(function(response) {
                if (response.status == 'connected') {
                    $scope.logged = true;
                    $scope.goPost();
                }
            },{ scope:'publish_actions' });
            //TODO: need , for actual posts
        };

        $scope.logout = function() {
            Facebook.logout(function() {
                $scope.$apply(function() {
                    $scope.logged = false;
                });
            });
        };

        //Wait for FB Events
        $scope.$on('Facebook:statusChange', function(ev, data) {
            if (data.status == 'connected') {
                $scope.$apply(function() {
                    $scope.salutation = true;
                    $scope.byebye     = false;
                });
            } else {
                $scope.$apply(function() {
                    $scope.salutation = false;
                    $scope.byebye     = true;

                    // Dismiss byebye message after two seconds
                    $timeout(function() {
                        $scope.byebye = false;
                    }, 2000)
                });
            }
        });

        //eBay
        //TODO: Results not complete pertinent
        function Light(picture, title, url, currentPrice, saleTimeLeft){
            this.picture = picture;
            this.title = title;
            this.url = url;
            this.currentPrice = currentPrice;
            this.saleTimeLeft = saleTimeLeft;
        }
        $scope.setLightsFromData = function(data){

            for(var i = 0; i<5; i++){
                //Selects the URL to image posted on Ebay
                light_galleryUrl = data['findItemsByKeywordsResponse']['0']['searchResult']['0']['item'][i]['galleryURL']['0'];

                //Selects Title of Product
                light_title = data['findItemsByKeywordsResponse']['0']['searchResult']['0']['item'][i]['title']['0'];

                //Gives url to specified item
                light_url = data['findItemsByKeywordsResponse']['0']['searchResult']['0']['item'][i]['viewItemURL']['0'];

                //Gives price in seller's specified currency
                light_currentPriceValue = data['findItemsByKeywordsResponse']['0']['searchResult']['0']['item'][i]['sellingStatus']['0']['currentPrice']['0']['__value__'];
                light_currentPriceCurrency = data['findItemsByKeywordsResponse']['0']['searchResult']['0']['item'][i]['sellingStatus']['0']['currentPrice']['0']['@currencyId'];
                light_currentPrice = light_currentPriceValue +" "+ light_currentPriceCurrency;

                //Time before end of sale
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

                //Stores info taken from Ebay into Array
                $scope.lights.push(new Light(light_galleryUrl, light_title, light_url, light_currentPrice, light_time));
            }
            return $scope.lights;
        };

        ebay_search_service.getLightBulbs($scope.results.recommendedWatts, $scope.results.recommendedLumens, "LED")
            .success(function(data, status, headers, config){
                console.log(data);
                console.log($scope.setLightsFromData(data));
            });
});