app.controller("AllProduct", function ($scope, DBContext, $filter, $rootScope) {
    $scope.ClearAllProduct = () => {
        DBContext.GetAllProduct().then((res) => {
            $scope.All = res.data;
            $rootScope.isLoadingfun();
        });
    };
    $scope.ClearAllProduct();
});