'use strict';

/**
 * Created by Mike on 6/27/14.
 */
var scorePortalApp = angular.module('teluxe', ['ui.router', 'duScroll']);

scorePortalApp.run(
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
scorePortalApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $logProvider){
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
        });

    $locationProvider.html5Mode(true);
});