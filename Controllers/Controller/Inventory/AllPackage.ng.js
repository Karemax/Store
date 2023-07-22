app.controller("AllPackage", function ($scope, DBContext, $filter, $rootScope) {

    $scope.SlidInventory = [
        {htmlsrc:"/"},
    ];

    $scope.GetStart = () => {
        DBContext.GetAllInventory().then((res) => {
            $scope.Inventory = res.data;
            $rootScope.isLoadingfun();
        });
    }

    $scope.GetStart();
});