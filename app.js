'use strict';

/**
 * Created by Mike on 10/4/14.
 */
var teluxe = angular.module('teluxe', ['ui.router', 'duScroll','facebook']);

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
teluxe.config(function($stateProvider, $urlRouterProvider, $locationProvider, $logProvider, $httpProvider, FacebookProvider){
    //Enable CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    //Facebook Config

    var myAppId = '298846526977428';

    // You can set appId with setApp method
    FacebookProvider.setAppId('myAppId');

    /**
     * After setting appId you need to initialize the module.
     * You can pass the appId on the init method as a shortcut too.
     */
    FacebookProvider.init(myAppId);

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
        .state('testebay', {
            url: '/test',
            title: "Test Ebay Page",
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
        })
        .state('types', {
            url: '/types',
            title: "What type of light bulb are you using?",
            views: {
                'content':{
                    templateUrl: 'types/types.html',
                    controller: 'typesController'
                }
            }
        })
        .state('stats', {
            url: '/stats',
            title: "Teluxe Results",
            views: {
                'content':{
                    templateUrl: 'stats/stats.html',
                    controller: 'statsController'
                }
            }
        })
        .state('instructions', {
            url: '/instructions',
            title: "Light source sampling",
            views: {
                'content':{
                    templateUrl: 'instructions/instructions.html',
                    controller: 'instructionsController'
                }
            }
        });

    //$locationProvider.html5Mode(true);
});
