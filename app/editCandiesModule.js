(function() {

    'use strict';

    var editCandiesModule = angular.module("editCandiesModule", []);

    editCandiesModule.controller("EditCandiesController", function($http, $scope, $timeout, $location, $rootScope, $routeParams) {

        $scope.editCandy = function(item) {

            var id = $rootScope.candyId;

            var editCandyObj = {
                "name": $scope.candyName,
                "description": $scope.candyDescription,
                "price": $scope.candyPrice,
                "id": $scope.candyId
            }

            $http({
                method: "PUT",
                url: "/editCandy/" + id,
                headers: { 'Content-Type': 'application/json' },
                data: editCandyObj
            })

            .then(function(response) {

                $scope.updateSuccess = "Details Updated!"

                if (response) {
                    $timeout(function() {
                        $location.path('/');;
                    }, 500);
                }
            });
        }

    });

})();
