app.controller("Basics", function ($scope, $rootScope, DBContext, $filter) {
    $rootScope.NewMenuFacturer = {
        Name: "",
        Phone: "012"
    };

    $rootScope.UniqItemName = {
        Title: "",
    };
    $scope.Stert = () => {
        $scope.GetAllBasics();
        $scope.GetAllProductNames();
    };
    // ---------------------------------------------------

    $scope.GetAllBasics = () => {
        DBContext.GetSomeBasics().then((Basics) => {
            $scope.AllBasics = Basics.data;
            if ($rootScope.AllProductNames.length <= 0 && $scope.BaseProductNames.length <= 0) {
                $rootScope.AddNewCartName();
            }
        });
    };

    // ---------------------------------------------------

    $scope.GetAllProductNames = () => {
        DBContext.GetAllProductNamesAdd().then((ProductNames) => {
            $scope.BaseProductNames = ProductNames.data;
            $rootScope.AllProductNames = [];
            $rootScope.isLoadingfun();
        });
    };
    // ---------------------------------------------------

    $rootScope.AddNewCartName = () => {
        var pag = {
            id: 0,
            productTypeId: $scope.AllBasics.productTypes[0].id,
            genderId: $scope.AllBasics.genders[0].id,
            sleeveStyleId: 0,
            materialId: 0,
            uniqItemNameId: $scope.AllBasics.uniqItemName[0].id,
        };
        $rootScope.AllProductNames.push(pag);
    }

    // ---------------------------------------------------

    $rootScope.CreateNewMaterial = (NewMaterial) => {
        DBContext.CreateMaterial(NewMaterial).then((res) => {
            $scope.GetAllBasics();
        });
    }

    // ---------------------------------------------------

    $rootScope.CreateUniqItemName = (UniqItemName) => {
        DBContext.CreateUniqItemNames(UniqItemName).then((res) => {
            $scope.GetAllBasics();
        });
    }

    // ---------------------------------------------------

    $scope.RemoveNewCart = (iteminCart) => {
        if ($rootScope.AllProductNames.length > 1 && $scope.BaseProductNames.length > 1) {
            var index = $rootScope.AllProductNames.indexOf(iteminCart);
            $rootScope.AllProductNames.splice(index, 1);
        }
    }

    // ---------------------------------------------------

    $scope.RemoveItem = (iteminCart) => {
        iteminCart.isDeleted = true;
    }

    // ---------------------------------------------------

    $rootScope.ChaneType = (item, id) => {
        item.productTypeId = id;
    }

    // ---------------------------------------------------

    $rootScope.UpdateProductNames = () => {
        var items = $filter('filter')($scope.BaseProductNames, { isEdit: true });
        if (items.length > 0) {
            DBContext.UpdateProductNames(items).then((res) => {
                if (res.data != null) {
                    $rootScope.AllProductNames = {};
                    $scope.GetAllBasics();
                    swal({
                        title: "نجاح!",
                        text: "تم الحفظ",
                        type: "success"
                    });
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'فشل',
                        text: "فشل في الحفظ",
                    });

                }
            });
        }
        else {
            swal({
                title: "نجاح!",
                text: "تم الحفظ",
                type: "success"
            });
        }
    }
    // ---------------------------------------------------

    $rootScope.SaveChange = () => {
        if ($rootScope.AllProductNames.length > 0) {
            DBContext.CreateProductNames($rootScope.AllProductNames).then((res) => {
                $rootScope.UpdateProductNames();
            });
        } else {
            $rootScope.UpdateProductNames();
        }
    };
    $scope.Stert();
});