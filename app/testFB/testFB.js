/**
 * Created by Jacky on 10/4/14.
 */
angular.module("teluxe")
    .controller('testFBController',function($scope, $timeout, Facebook){

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

        $scope.goPost = function(){
            //call post
//            Facebook.api('/me/feed', 'post', {
//                link: 'teluxe.local',
//                name: 'Teluxe',
//                caption: 'Light Stuff',
//                description: $scope.shareText,
//                picture: 'http://www.easyvectors.com/assets/images/vectors/afbig/light-bulb-clip-art.jpg'
//            },function(response){
//
//            });
            FB.ui(
                {
                    method: 'share',
                    href: 'teluxe.ngrok.com',
                    caption:$scope.shareText
                },
                function(response) {
                    console.log(response);
                }
            );
        };

        // Defining user logged status
        $scope.logged = false;

        // And some fancy flags to display messages upon user status change
        $scope.byebye = false;
        $scope.salutation = false;

        /**
         * Watch for Facebook to be ready.
         * There's also the event that could be used
         */
        $scope.$watch(
            function() {
                return Facebook.isReady();
            },
            function(newVal) {
            }
        );

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

        /**
         * Taking approach of Events :D
         */
        $scope.$on('Facebook:statusChange', function(ev, data) {
            console.log('Status: ', data);
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

    });