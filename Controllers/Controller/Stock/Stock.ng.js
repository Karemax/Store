app.controller("Stock", function ($scope, DBContext, $filter, $rootScope) {
    $rootScope.Date = $filter("date")(new Date(), "MM/dd/yyyy");
    $rootScope.GetAllData = (Date) => {
        if (Date != undefined) {
            DBContext.GetAllStockIndex(Date).then((res) => {
                $scope.AllSuppliers = res.data.suppliers;
                //$scope.AllMenuFacturer = res.data.menuFacturers;
                $scope.All = res.data.packages;
                if ($rootScope.All.length > 0) {
                    $rootScope.Islength = true;
                };
                $rootScope.Enttiy = {
                    Name: "",
                    Phone: ""
                };
                $rootScope.isLoadingfun();
            });
        }
    }

    // ---------------------------------------------------

    $rootScope.CreateSuppliers = () => {
        var Check = $("#SuppliersformValidate").valid();
        if (Check) {
            DBContext.CreateSupplier($rootScope.Enttiy).then((res) => {
                var massage = res.data.massage
                if (res.data.succeeded) {
                    swal({
                        title: "نجاح!",
                        text: massage,
                        type: "success"
                    }).then((result) => {
                        if (result) {
                            $scope.GetAllData($rootScope.Date);
                        };
                    });
                }
                else {
                    massage = res.data;
                    Swal.fire({
                        type: 'error',
                        title: 'فشل',
                        text: massage,
                    })
                }
            });
        }
    };

    // ---------------------------------------------------

    $rootScope.GetAllItemPack = (Pac) => {
        $rootScope.FullPackage = {};
        var pp = Pac.packageItems;
         $rootScope.FullPackage = {
            itemPack: pp,
            Pac: Pac
        }
    }

    // ---------------------------------------------------

    $rootScope.ClearPackage = () => {
        $scope.GetAllData($rootScope.Date);
    };

    // ---------------------------------------------------

    $rootScope.ClearPackage();
});