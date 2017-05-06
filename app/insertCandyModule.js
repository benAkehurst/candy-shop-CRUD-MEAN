(function() {

    'use strict';

    var insertCandyModule = angular.module("insertCandyModule", []);

    insertCandyModule.controller("InsertCandyController", function($http, $scope, $rootScope, $location, $timeout) {

        $scope.addNewCandy = function() {

            var newCandyObj = {
                "name": $scope.candyName,
                "description": $scope.candyDescription,
                "price": $scope.candyPrice
            }

            $http({
                method: "POST",
                url: "/addCandy",
                headers: { 'Content-Type': 'application/json' },
                data: newCandyObj
            })

            .then(function(response) {

                $scope.updateSuccess = "Candy Added!"

                if (response) {
                    $timeout(function() {
                        $location.path('/');;
                    }, 500);
                }
            });
        }

    });

})();
