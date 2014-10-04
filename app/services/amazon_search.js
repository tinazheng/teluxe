/**
 * Created by JonChu on 10/4/14.
 */

angular.module("teluxe")
    .factory('amazon_search_service',function($http){

        var getLightBulbs = function(){

            $http.get('http://webservices.amazon.com/onca/xml?' +
                        'Service=AWSECommerceService&' +
                        'Operation=ItemSearch&' +
                        'AWSAccessKeyId=AKIAI2ATKITQIS25CJEQ&' +
                        'AssociateTag=teluxe-20&' +
                        'SearchIndex=Appliances&' +
                        'Keywords=light bulbs&' +
                        'Timestamp=[YYYY-MM-DDThh:mm:ssZ]&' +
                        'Signature=[Request Signature]' ,data)
                .success(function(data){

                    //do stuff with data_from_server
                    console.log(data);

            })
                .error(function(data_from_server){

                })


        };

        return getLightBulbs;
    })