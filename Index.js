var app = angular.module("SPAApp", ['ngRoute', 'ngSanitize', 'akFileUploader', 'moment-picker']);
app.constant('moment', moment);

app.run(function ($rootScope) {

    var animation = bodymovin.loadAnimation({
        container: document.getElementById('bm'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/loadingstormebrand.json'
    })

    if (!$rootScope.IsAuth || undefined) {
        window.location.href = "#/Login";
    }

});

/*Config*/

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

        .when('/Login', {
            controller: 'Login',
            templateUrl: '/Views/Account/Account.html',
        })
        .when('/Register', {
            controller: 'Register',
            templateUrl: '/Views/Account/Account.html',
        })
        .when('/CreateStore', {
            controller: 'BusinessController',
            templateUrl: '/Views/Account/Account.html',
        })

        //-----------------------------------------------

        .when('/POS', {
            controller: 'POS',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/Staff', {
            controller: 'EmployeeList',
            templateUrl: '/Views/Dashboard/Dashboard.html',

        })
        .when('/CreateEmployee', {
            controller: 'CreateEmployee',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/EProfile/:EmployeeId', {
            controller: 'EProfile',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/Products', {
            controller: 'AllProduct',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/ProductDetiles/:ProductId', {
            controller: 'ProductDetiles',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/Stock', {
            controller: 'Stock',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/BillDetiles/:ProductId', {
            controller: 'BillDetiles',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/Supply', {
            controller: 'Supply',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/Remaining', {
            controller: 'Remaining',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/AllPackage', {
            controller: 'AllPackage',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/InventoryProfile/:ProductId', {
            controller: 'InventoryProfile',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/Expenses', {
            controller: 'AllOutcome',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/ExpensesType', {
            controller: 'AllOutcomeType',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/Orders', {
            controller: 'Orders',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/Finance', {
            controller: 'Finance',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/Basics', {
            controller: 'Basics',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/ProductBasics', {
            controller: 'ProductBasics',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/Manufacturers', {
            controller: 'Manufacturers',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })
        .when('/Store', {
            controller: 'Store',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })

        .when('/SuperBasics', {
            controller: 'SuperBasic',
            templateUrl: '/Views/Dashboard/Dashboard.html',
        })

        //.when('/Reception:BusinessName', {
        //    templateUrl: 'Views/Reception/Reception.html',
        //    controller: 'ReceptionController'
        //})

        .otherwise({
            redirectTo: '/Login'
        });

}]);

//factory

app.factory('UserService', function ($rootScope,) {

    $rootScope.IsAuth = false;
    $rootScope.Username = "";
    $rootScope.Token = "";
    $rootScope.Roles = [];
    $rootScope.controller = "Login";

    return {

        getController: function () {
            return $rootScope.controller;
        },
        getToken: function () {
            return $rootScope.Token;
        },
        getUsername: function () {
            return $rootScope.Username;
        },
        IsAuth: function () {
            return $rootScope.IsAuth;
        },
        getRoles: function () {
            return $rootScope.Roles;
        },

        IfAdmin: function () {
            var rr = $rootScope.Roles.indexOf("Owner");
            if (rr == -1) {
                return false
            } else {
                return true
            }
        },

        setStatus: function (Username, Token, Roles) {
            $rootScope.Username = Username;
            $rootScope.Token = Token;
            for (var i = 0; i < Roles.length; i++) {
                $rootScope.Roles.push(Roles[i])
            };
            return true;
        },
        setAuth: function (IsAuth) {
            $rootScope.IsAuth = IsAuth;
            return $rootScope.IsAuth;

        },
        logout: function () {
            $rootScope.IsAuth = false;
            $rootScope.Username = "";
            $rootScope.Token = "";
            $rootScope.Roles = [];
            $rootScope.controller = "Login";
        }
    };

});

app.factory("entityService", function (DBContext, $http, UserService) {
    var AJAXSubmit = async function AJAXSubmit(oFormElement, url) {
        var Token = UserService.getToken();
        const formData = new FormData();
        if (typeof oFormElement === 'object' && oFormElement !== null) {
            formData.append("File", oFormElement)
        } else {
            angular.forEach(oFormElement, function (value) {
                formData.append("File", value)
            });
        }
        window.fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + Token + '',
            },
        })
    };
    return {
        AJAXSubmit: AJAXSubmit
    }
});

//service

app.service('getmydomain', function () {
    this.res = function () {
        var domain = 'https://karemax0-001-site1.atempurl.com';
        var localdomain = 'https://localhost:44338';
        return domain;
    }
});

//directive

//app.directive('dynamicCtrl', ['$compile', '$parse','UserService', function ($compile, $parse, UserService) {
//    return {
//        restrict: 'A',
//        terminal: true,
//        priority: 100000,
//        controller: UserService.getController(),
//        link: function (Scope, elem) {
//            elem.on('chamge', function () {
//                var name = UserService.getController();
//                elem.removeAttr('dynamic-ctrl');
//                elem.attr('ng-controller', name);
//                $compile(elem)(Scope);
//            });
//            var name = UserService.getController();
//            elem.removeAttr('dynamic-ctrl');
//            elem.attr('ng-controller', name);
//            $compile(elem)(Scope);
//        }
//    };
//}]);


//app.directive('httpLoader', ['$http', function ($http) {
//    return {
//        restrict: 'A',
//        link: function (scope, elm, attrs) {
//            scope.Request = function () {
//                return $http.pendingRequests.length > 0;
//            };

//            scope.$watch(scope.Request, function (v) {
//                if (!v) {
//                    elm.hide();
//                } else {
//                    elm.fadeOut();
//                }
//            });
//        }
//    };
//}]);
