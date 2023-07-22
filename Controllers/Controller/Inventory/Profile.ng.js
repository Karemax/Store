app.controller("InventoryProfile", function ($scope, DBContext, $filter, $location, $rootScope, $routeParams) {
    $scope.id = Number($routeParams.ProductId);

    $scope.GetStart = () => {
        DBContext.GetInventoryProfile($scope.id).then((res) => {
            $scope.InventoryItem = res.data;
            $rootScope.isLoadingfun();
        });
    }

    $scope.GetStart();
});