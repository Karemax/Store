app.controller("AllProductPriceing", function ($scope, DBContext, $filter, $rootScope) {
    $scope.ClearProductPriceing = () => {
        DBContext.GetAllProductPriceing().then((res) => {
            $scope.All = res.data.data;
            $scope.Enttiy = {
                Titel: "",
                SalePrice: "",
                PurchasingPrice: "",
                WholesalePrice: "",
            }
            $rootScope.isLoadingfun();
        });
    };

    $scope.CreateProductPriceing = () => {
        var Check = $("#ProductPriceingformValidate").valid();
        if (Check) {
            DBContext.CreateProductPriceing($scope.Enttiy).then((res) => {
                var Error = res.data.massage
                if (res.data.succeeded) {
                    swal({
                        title: "نجاح!",
                        text: Error,
                        type: "success"
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result) {
                            $scope.ClearProductPriceing();
                        };
                    });
                }
                else {
                    var Error = res.data.massage;
                    Swal.fire({
                        type: 'error',
                        title: 'فشل',
                        text: Error,
                    })
                }
            });
        }
    };
    $scope.ClearProductPriceing();
});