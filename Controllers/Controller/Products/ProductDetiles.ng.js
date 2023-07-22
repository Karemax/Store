app.controller("ProductDetiles", function ($scope, DBContext, $filter, $location, $rootScope, entityService, $routeParams, getmydomain) {
    $scope.id = $routeParams.ProductId;

    $scope.tutorial = {
        imageUpload: {},
        imageUploads: []
    };

    $scope.Addcard = {};
    $rootScope.SelectColor = [{}];
    $scope.AllPac = [];
    $scope.massege = ""

    // --------------------------------------------------------------
    $scope.UploadPhtots = (tutorial) => {
        var id = parseInt($scope.id);
        if (tutorial.imageUpload.length > 0) {
            entityService.AJAXSubmit(tutorial.imageUpload, getmydomain.res() +"/api/Product/photo/" + id);
        };
        if (tutorial.imageUploads.length > 0) {
            entityService.AJAXSubmit(tutorial.imageUploads, getmydomain.res() +"api/Product/photos/" + id);
        };
    }

    $rootScope.CreateProduct = () => {
        var Check = $("#ProductformValidate").valid();
        if (Check) {
            //$scope.UploadPhtots(tutorial);
            $rootScope.Enttiy.productTypeStyleId = $rootScope.Enttiy.productTypeStyle.id;
            var id = parseInt($scope.id);
            DBContext.UpdateProduct(id,$rootScope.Enttiy).then((res) => {
                    var massage = res.data.massage
                if (res.data.succeeded) {
                    swal({
                        title: "نجاح!",
                        text: massage,
                        type: "success"
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result) {
                            $scope.ClearProduct();
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

    // --------------------------------------------------------------

    $rootScope.ActiveColor = (color) => {
        color.isActive = !color.isActive;
        var Filter = $filter('filter')($rootScope.Enttiy.productColors, { isActive: false }).length;
        if (Filter <= 0) {
            $('#onboardingWideFormModalColor').css('display', 'none');
            $('.modal-backdrop').css('display', 'none');
            $('body').removeClass("modal-open");
        }
    }

    // --------------------------------------------------------------

    $scope.ActiveColors = (color) => {
        $rootScope.SelectColor = color;
    }

    // --------------------------------------------------------------

    $rootScope.ActiveSize = (size) => {
        var MaxNumber = $rootScope.Enttiy.quantityInStock;
        if (MaxNumber > 0 ) {
            size.isActive = !size.isActive;
            $rootScope.Enttiy.quantity += 1;
            $rootScope.Enttiy.quantityInStock -= 1;
            size.quantity = 1;
            var Filter = $filter('filter')($rootScope.SelectColor.productColorSizes, { isActive: false }).length;
            if (Filter <= 0) {
                $('#onboardingWideFormModal').css('display', 'none');
                $('.modal-backdrop').css('display', 'none');
                $('body').removeClass("modal-open");
            }
        }
    }
    // --------------------------------------------------------------

    $rootScope.DisActiveSize = (size, color) => {
        size.isActive = !size.isActive;
        $rootScope.Enttiy.quantity -= size.quantity;
        $rootScope.Enttiy.quantityInStock += size.quantity;
        size.quantity = 0;
        var Filter = $filter('filter')(color.productColorSizes, { isActive: false }).length;
        if (Filter <= 0) {
            color.isActive = false;
        }
    }

    // --------------------------------------------------------------

    $rootScope.Active = () => {
        $rootScope.Enttiy.isAvailable = !$rootScope.Enttiy.isAvailable;
        if ($rootScope.Enttiy.isAvailable) {
            $scope.massege = 'أيقاف المنتج';
        } else {
            $scope.massege = 'تنشيط المنتج';
        }
    }

    // --------------------------------------------------------------

    $rootScope.Plus = (Size) => {
        var MaxNumber = $rootScope.Enttiy.quantityInStock;
        if (MaxNumber > 0) {
            Size.quantity += 1;
            $rootScope.Enttiy.quantity += 1;
            $rootScope.Enttiy.quantityInStock -= 1;
        }
    }

    // --------------------------------------------------------------

    $rootScope.minus = (Size) => {
        if (Size.quantity > 1) {
            Size.quantity -=  1;
            $rootScope.Enttiy.quantity -= 1;
            $rootScope.Enttiy.quantityInStock += 1;
        } else {
            Size.quantity = 0;
            $rootScope.Enttiy.quantity -= 1;
            $rootScope.Enttiy.quantityInStock += 1;
            Size.isActive = false;
        };
    }

    // --------------------------------------------------------------

    $scope.ClearProduct = () => {
        var id = parseInt($scope.id);
        DBContext.GetProductByid(id).then((res) => {
            $rootScope.Enttiy = res.data;
            $rootScope.Enttiy.quantityInStock -= $rootScope.Enttiy.quantity;
        if ($rootScope.Enttiy.isAvailable) {
            $scope.massege = 'أيقاف المنتج';
        } else {
            $scope.massege = 'تنشيط المنتج';
            }
            $rootScope.isLoadingfun();
        });
    };

    // --------------------------------------------------------------

    $scope.ClearProduct();
});

