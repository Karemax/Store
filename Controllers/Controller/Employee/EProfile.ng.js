app.controller("EProfile", function ($scope, DBContext, $routeParams, $rootScope, entityService, getmydomain) {
    $scope.id = $routeParams.EmployeeId;

    $scope.UpdateEmployee = () => {
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

    $scope.UpdateEmployee = () => {
        DBContext.deleteEmployee($scope.id).then((res) => {

        });
    };

    // ---------------------------------------------------

    $scope.deleteEmployee = () => {
        DBContext.deleteEmployee($scope.id).then((res) => {

        });
    };

    // ---------------------------------------------------

    $scope.GetEData = () => {
        DBContext.GetEmployeeById($scope.id).then((res) => {
            $scope.Employee = res.data;
            $rootScope.isLoadingfun();
        });
    };

    // ---------------------------------------------------

    $scope.EProfile = () => {
        $scope.GetEData();
        $scope.logo = {};
    };

    // ---------------------------------------------------

    $scope.EProfile();

});