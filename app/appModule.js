(function(){
    
    'use strict';
    
    var appModule = angular.module("appModule", ["ngRoute",
                                                 "allCandiesModule",
                                                 "editCandiesModule",
                                                 "insertCandyModule"
                                                ]);
    
    appModule.config(function($routeProvider){
        
        $routeProvider
        
        .when("/allCandies",{
            controller:"AllCandiesController",
            templateUrl:"app/allCandiesView.html"
        })
        
        .when("/editCandy/:id",{
            controller:"EditCandiesController",
            templateUrl:"app/editCandiesView.html"
        })
        
        .when("/insertCandy",{
            controller:"InsertCandyController",
            templateUrl:"app/insertCandyView.html"
        })
        
        .otherwise({
			redirectTo:"/allCandies"
		});
        
    });
    
})();