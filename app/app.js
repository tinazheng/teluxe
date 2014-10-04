'use strict';

/**
 * Created by Mike on 10/4/14.
 */
var teluxe = angular.module('teluxe', ['ui.router', 'duScroll']);

teluxe.run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ui-sref-active="active }"> will set the <li> // to active whenever
            // 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
);

//Angular UI Router Config
teluxe.config(function($stateProvider, $urlRouterProvider, $locationProvider, $logProvider, $httpProvider){
    //Enable CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //TODO: Remove Debugging
    $logProvider.debugEnabled(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('index', {
            url: '/',
            title: 'Welcome To Teluxe!',
            views: {
                'content':{
                    templateUrl: 'index/index.html',
                    controller: 'indexController'
                }
            }
        })
        .state('activity', {
            url: '/activity',
            title: "What are you doing right now?",
            views: {
                'content':{
                    templateUrl: 'activity/activity.html',
                    controller: 'activityController'
                }
            }
        })
        .state('testAmazon', {
            url: '/test',
            title: "Test Amazon Page",
            views: {
                'content':{
                    templateUrl: 'test/test.html',
                    controller: 'testController'
                }
            }
        })
        .state('distance', {
            url: '/distance',
            title: "How far away is the source?",
            views: {
                'content':{
                    templateUrl: 'distance/distance.html',
                    controller: 'distanceController'
                }
            }
        });

    $locationProvider.html5Mode(true);
});