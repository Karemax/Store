app.controller("Orders", function ($scope, DBContext, $filter, $location, $rootScope) {

    $scope.From = $filter("date")(new Date(), "MM/dd/yyyy");
    $scope.To = $filter("date")(new Date(), "MM/dd/yyyy");
    $scope.All = [];
    $scope.Order = {};
    $scope.GetAllData = (From, To) => {
        if (From != undefined && To != undefined) {
            DBContext.GetAllOrders(From, To).then((res) => {
                $scope.All = res.data.orders;
                if ($scope.All.length > 0) {
                    $rootScope.Islength = true;
                } else {
                    $rootScope.Islength = false;
                }
                $rootScope.Checklength($scope.All);
                $scope.TotalSalesPrice = res.data.totalSalesPrice;
                $scope.TotalDiscountPrice = res.data.totalDiscountPrice;
                $scope.TotalBuyerPrice = res.data.totalBuyerPrice;
                $scope.TotalCount = res.data.count;
                $scope.GetOrderDetiles($scope.All[0]);
                $rootScope.isLoadingfun();
            });
        }
    }
    // --------------------------------------------------------------

    $scope.Update = (Order, IsBack) => {
        if (IsBack) {
            Order.IsBack = IsBack
        }
        DBContext.UpdateOrder(Order.id, Order);
    };

    // --------------------------------------------------------------

    $scope.ChangeDiscount = (item) => {
        let items = $scope.Order.orderItems
        var total = 0
        for (var i = 0; i < items.length; i++) {
            if (!items[i].isBack) {
            total += items[i].discount;
            }
        }
        $scope.Order.discount = total;
    }
    // --------------------------------------------------------------

    $scope.GetOrderDetiles = (Orders) => {
        if (!$rootScope.Islength) {
            $scope.Order = Orders;
            $rootScope.Bar.sections[0].subsections[1].col = "mb-5 h-100 col-sm-7"
            $rootScope.Bar.sections[0].subsections[2].col = "mb-5 h-100 col-sm-5"
        } else {
            $rootScope.Bar.sections[0].subsections[1].col = "mb-5 h-100 col-sm-12"
            $rootScope.Bar.sections[0].subsections[2].col = "mb-5 h-100 col-sm-5 d-none"
        }
    };

    // --------------------------------------------------------------

    $scope.ClearOrders = () => {
        $scope.GetAllData($scope.From, $scope.To);
    };

    // ---------------------------------------------------

    $scope.ClearOrders();

});