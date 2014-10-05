/**
 * Created by michaelshi on 10/4/14.
 */
angular.module("teluxe")
    .factory('qStorage', ['$rootScope', function ($rootScope) {

    var service = {

        /*
         Activity Options:
             sleep
             read
             computer
             lounging
             tv
         Type Options:
            fluorescent
            incandescent
            LED
         Distance Options: (Note: They're a single value for convenience but should rep. full range in the answr)
            1
            2
            4
            7
            10
        */
        model: {
            activity: '',
            distance: '',
            type:'',
            results: {}
        },

        SaveState: function () {
            sessionStorage.userService = angular.toJson(service.model);
        },

        RestoreState: function () {
            service.model = angular.fromJson(sessionStorage.userService);
        }
    };

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
}]);