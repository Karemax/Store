app.controller("AddNewProductUnitCat", function ($scope, DBContext, $filter, $rootScope) {
    $scope.GetAllProductCat = () => {
        DBContext.GetAllProductCat().then((res) => {
            $scope.AllCat = res.data.data;
            if ($scope.AllCat.length > 0) {
                $rootScope.Islength = true;
            } else {
            $scope.Enttiy = {
                Titel: "",
                CategoryId: $scope.AllCat[0].id
                }
            }
            $rootScope.isLoadingfun();
        });
    };


    $scope.CreateProductUnitCat = () => {
        var Check = $("#ProductUnitCatformValidate").valid();
        if (Check) {
            DBContext.CreateProductUnitCat($scope.Enttiy).then((res) => {
                var Error = res.data.massage
                if (res.data.succeeded) {
                    swal({
                        title: "نجاح!",
                        text: Error,
                        type: "success"
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result) {
                            $scope.GetAllProductUnitCat();
                        };
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'فشل',
                        text: Error,
                    })
                }
            });
        }
    };
    $scope.GetAllProductCat();
});