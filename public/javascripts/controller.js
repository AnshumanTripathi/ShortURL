/**
 * Created by AnshumanTripathi on 4/21/17.
 */

angular.module("controller", [])
    .controller("UrlController", ['$http', '$scope', function ($http, $scope) {

        $scope.urls = [{}];
        $scope.encodeURL = function () {
            $scope.url = document.getElementById("url").value;
            if ($scope.urls.length > 0) {
                $http({
                    method: 'POST',
                    url: '/encode',
                    data: {'url': $scope.url}
                }).then(function success(response) {
                    console.log(JSON.stringify(response.data));
                    if (response.data.statusCode === 300) {
                        var currResults = response.data;
                        for (var i = 0; i < $scope.urls.length; i++) {
                            if ($scope.urls[i].actualUrl === currResults.actualUrl) {
                                $scope.urls.splice(i, 1);
                            }
                        }
                    }
                    $scope.urls.unshift(response.data);
                }, function error(err) {
                    console.log('Error Occured: ' + err);
                });
            }
        };


        $scope.getAllUrls = function () {
            $http({
                method: 'GET',
                url: '/getAllUrls'
            }).then(function success(response) {
                console.log(JSON.stringify(response.data));
                var results = response.data.urls;
                for (var i = 0; i < results.length; i++) {
                    $scope.urls[i] = results[i];
                }
            }, function error(err) {
                console.log("Error Occured: " + err);
            });
        }
    }]);
    
