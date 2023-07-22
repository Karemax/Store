app.controller("BillDetiles", function ($scope, DBContext, $filter, $location, $rootScope, $routeParams) {
    $scope.id = $routeParams.ProductId;

    $rootScope.All = {};
    $scope.GetAllData = () => {
        DBContext.GetStockBillbyId($scope.id).then((res) => {
            $rootScope.All = res.data;
            $scope.Remaining = $rootScope.All.total - $rootScope.All.paied
            $rootScope.isLoadingfun();
        });
    }
    // --------------------------------------------------------------

    $scope.Plus = (item) => {
        item.quantity = item.quantity + 1;
        $scope.GetTotal(item);
    }

    // --------------------------------------------------------------

    $scope.minus = (item) => {
        var showing = item.showing;
        if (item.quantity > 1 && item.quantity > showing ) {
            item.quantity = item.quantity - 1;
            $scope.GetTotal(item);
        }
    }
    // --------------------------------------------------------------
    $scope.NoRemaining = () => {
        $rootScope.All.paied = $rootScope.All.total;
        $scope.Remaining = 0;
    }
    // --------------------------------------------------------------

    $scope.GetTotal = (item) => {
        item.totalPrice = item.quantity * item.price;
        var total = 0;
        for (var i = 0; i < $rootScope.All.packageItems.length; i++) {
            var product = $rootScope.All.packageItems[i];
            if (!product.isBack) {
            total += product.totalPrice;
            }
        }
        $rootScope.All.total = total;
        if ($scope.Remaining > 0) {
            $rootScope.All.paied = $rootScope.All.total - $scope.Remaining;
        }
        else {
            $scope.NoRemaining();
        }
    };
    // --------------------------------------------------------------

    $rootScope.isBack = (item) => {
        item.isBack = !item.isBack;
        $scope.GetTotal(item);
    };

    // ---------------------------------------------------

    $scope.ClearPackage = () => {
        $scope.GetAllData();    
    };

    // ---------------------------------------------------

    $rootScope.UpdateBill = () => {
        var IsPaid = true;
        if ($rootScope.All.status == 'ليست مدفوعه') {
            var IsPaid = false;
        }
        var UpdatePackageDto = { SupplierId: $rootScope.All.supplierId, IsPaid: IsPaid , Note: $rootScope.All.note, Shipping: $rootScope.All.shipping , PackageItems: $rootScope.All.packageItems}
        DBContext.UpdateStockBill($scope.id, UpdatePackageDto).then((res) => {
            $rootScope.All = res.data.data;
        });
    };

    // ---------------------------------------------------

    $scope.ClearPackage();
});