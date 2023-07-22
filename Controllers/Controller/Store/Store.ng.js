app.controller("Store", function ($scope, DBContext, $filter, $rootScope, entityService, getmydomain) {

    $scope.UpdateStore = () => {
        $scope.UpdateMylogo();
        DBContext.UpdateBusiness($scope.Business).then((res) => {
            if (res.data == "This Store Updated") {
                swal({
                    title: "نجاح!",
                    text: "تم التحديث بنجاح",
                    type: "success"
                }).then((result) => {
                    if (result) {
                        $scope.GetBusinessData();
                    };
                });
            }
        });
    };

    // ---------------------------------------------------

    $scope.UpdateMylogo = () => {
        if ($scope.logo != undefined) {
            var id = $scope.Business.id;
            entityService.AJAXSubmit($scope.logo, getmydomain.res() + "/api/Business/UpdateLogo/" + id);
            $rootScope.GetBusinessName();
        };
    }
    // ---------------------------------------------------

    $scope.RestoreStore = () => {
        DBContext.RestoreMystore().then((res) => {
            var massage = res.data
            if (res.data.succeeded) {
                swal({
                    title: "نجاح!",
                    text: massage,
                    type: "success"
                }).then((result) => {
                    if (result) {
                        $scope.GetBusinessData();
                    };
                });
            }
        });
    };

    // ---------------------------------------------------

    $scope.GetBusinessData = () => {
        DBContext.GetBusinessData().then((res) => {
            $scope.Business = res.data;
            $rootScope.isLoadingfun();
        });
    };

    // ---------------------------------------------------

    $scope.ClearPackage = () => {
        $scope.GetBusinessData();
        $scope.logo = {};
    };

    // ---------------------------------------------------

    $scope.ClearPackage();

});