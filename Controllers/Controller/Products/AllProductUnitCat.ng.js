app.controller("AllProductUnitCat", function ($scope, DBContext, $filter, $rootScope) {

    $scope.GetAllProductUnitCat = () => {
        DBContext.GetAllProductUnitCat().then((res) => {
            $scope.All = res.data.data;
            $rootScope.isLoadingfun();
        });
    };

    $scope.GetAllProductUnitCat();
});