(function() {

    'use strict';

    var allCandiesModule = angular.module("allCandiesModule", []);

    allCandiesModule.controller("AllCandiesController", function($http, $scope, $rootScope, $location) {

        // Get all candies
        $http({
            method: "GET",
            url: "/seeAllCandy",
            headers: { 'Content-Type': 'application/json' },
        })

        .then(function(response) {
            $scope.allCandy = response.data;
        });


        // Route to candy edit
        $scope.editCandyDetails = function(item) {
            var id = item._id;
            $rootScope.candyId = id;
            $location.path("/editCandy/" + id);
        }

        // Runs add candy function
        $scope.addCandy = function() {
            $location.path("/insertCandy");
        }

        // Deletes a candy from the table
        $scope.deleteCandy = function(item) {

            var id = item._id;

            $http({
                method: "DELETE",
                url: "/deleteCandy/" + id,
                headers: { 'Content-Type': 'application/json' },
            })

            .then(function() {
                reloadTable();
            });

        }

        // This reloads the table after delete
        function reloadTable() {

            $http({
                method: "GET",
                url: "/seeAllCandy",
                headers: { 'Content-Type': 'application/json' },
            })

            .then(function(response) {
                $scope.allCandy = response.data;
            });
        }

    });

})();
