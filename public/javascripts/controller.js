/**
 * Created by AnshumanTripathi on 4/21/17.
 */

angular.module("controller", [])
    .controller("UrlController", ['$http', '$scope', function ($http, $scope) {


        $scope.encodeURL = function () {
            $scope.urls = [];
            var url = document.getElementById("url").value;
            console.log(url);
            console.log("Encode URL called");
            $http({
                method: 'POST',
                url: '/encode',
                data: {"url": url}
            }).success(function (data) {
                console.log(data);
                $scope.urls.push(data);
            });
        };

        $scope.urls = [];

        $scope.getAllUrls = function () {

            $http({
                method: 'GET',
                url: '/getAllUrls'
            }).success(function (data) {
                $scope.urls.push(data.urls);
            });
        }
    }]);
    
