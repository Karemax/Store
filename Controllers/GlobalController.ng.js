
app.controller("Global", function ($scope, $rootScope, DBContext, UserService, getmydomain) {

    // -------------- Loading Settings

    $rootScope.isLoading = true;
    $rootScope.ToggelMenu = false;


    $rootScope.isLoadingfun = function () {
        $rootScope.isLoading = false;
    //    setTimeout(show, 5);
    //    function show() {
    //        $('.tab-content .BoxView .tab-item').css({ "height": "98%", "padding": "20px 20px" });
    //    }
    };

    $rootScope.isLoadingfunOn = function () {
        //setTimeout(hide, 5);
        $rootScope.ToggelMenu = false;
        $rootScope.isLoading = true;
    //    function hide() {
    //        $('.tab-content .BoxView .tab-item').css({ "height": "0rem", "padding": "0px" });
    //    }
    }
  // ---------------------------------

    $rootScope.Imgpath = getmydomain.res() + "/app-images";
    $rootScope.BusinessName = "";
    $rootScope.IsAuth = UserService.IsAuth();
    $rootScope.Bar = {
        titel: "",
        button: [],
        funbutton: [],
        sublinks: [],
        sections: [],
        back: "",
        itemlink: {},
    };
    $rootScope.IfAdmin = UserService.IfAdmin();
    $rootScope.Islength = false;
    $rootScope.EditModeControl = false;

    $scope.MapRole = [
        { mapid: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11], role: "Owner" },
        { mapid: [1, 2, 3, 6, 7, 8], role: "Manager" },
        { mapid: [1, 6, 7], role: "Seller" },
        { mapid: [1, 6, 7, 8], role: "Cashier" },
        { mapid: [0], role: "User" },
    ]

    $rootScope.Edit = () => {
        var da = $scope.EditModeControl;
        $scope.EditModeControl = !da;
    };

    $rootScope.logout = () => {
        UserService.logout();
        window.location.reload();
    };

    $rootScope.Checklength = (List) => {
        if (Array.isArray(List)) {
            if (List.length <= 0) { // Is empaty
                $rootScope.Islength = true;
            } else {
                $rootScope.Islength = false;
            }
        }
    }


});