/**
 * Created by Mike on 6/27/14.
 */
angular.module("teluxe")
    .controller('statsController',function($scope, $rootScope, qStorage, Facebook){
        $scope.qStorage = qStorage;
        $scope.results = qStorage.model.results;

        console.log($scope.qStorage.model);

        console.log($scope.results);

        //TODO:REMOVE!!
        $scope.debugString = JSON.stringify(qStorage.model.results);

        $scope.shareText = '';
        $scope.saved = 0;


        //TODO: Change to actual calculations
        if($scope.qStorage.type == 'incandescent'){
            $scope.saved = '$200'
        }
        if($scope.qStorage.type == 'fluorescent'){
            $scope.saved = '$200'
        }


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