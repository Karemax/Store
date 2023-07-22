app.controller("Supply", function ($scope, DBContext, $filter, $rootScope) {
    $scope.GetAllData = () => {
        DBContext.GetSupplierStock().then((resc) => {
            var Pag = resc.data;
            $scope.Allsup = Pag.suppliers;
            $scope.AllTypeStyle = Pag.productTypeStyles;
            $scope.Colors = Pag.basics.colors;
            $scope.Sizes = Pag.basics.sizes;
            if ($scope.Allsup.length <= 0 || $scope.AllTypeStyle.length <= 0) {
                $rootScope.Islength = false;
            } else {
                $rootScope.AddNewCart();
                $rootScope.PackEnttiy.SupplierId = $scope.Allsup[0].id
                $rootScope.Islength = true;
                $rootScope.ChosenColorIndex = 0;
                $rootScope.ChosenItemIndex = 0;
            };
                $rootScope.isLoadingfun();
        });
    }

    // -----------------------------------------------------------------

    $rootScope.AddColor = (color) => {
        var Item = $rootScope.PackEnttiy.PackageItem[$rootScope.ChosenItemIndex];
        var SizeNumber = $rootScope.GetColorTotal();
        if (SizeNumber < Item.NumberOfPieces) {
            var pag = {
                id: color.id,
                code: color.code,
                sizes: []
            }
            Item.Colors.push(pag);
        }
    }

    // -----------------------------------------------------------------

    $rootScope.AddSize = (size) => {
        var Item = $rootScope.PackEnttiy.PackageItem[$rootScope.ChosenItemIndex];
        var SizeNumber = $rootScope.GetColorTotal();
        if (SizeNumber < Item.NumberOfPieces) {
            var color = Item.Colors[$rootScope.ChosenColorIndex];
            var pag = {
                id: size.id,
                name: size.name,
                quantity: 1
            }
            color.sizes.push(pag);
        }
    }
 
    // -----------------------------------------------------------------

    $rootScope.ChoseItem = (itemIndex) => {
        $rootScope.ChosenItemIndex = itemIndex;
    }

    // -----------------------------------------------------------------

    $rootScope.ChoseColor = (colorIndex) => {
        $rootScope.ChosenColorIndex = colorIndex;
        var Item = $rootScope.PackEnttiy.PackageItem[$rootScope.ChosenItemIndex];
        $rootScope.SelectColor = Item.code;
    }

    // -----------------------------------------------------------------

    $rootScope.minus = (size) => {
        if (size.quantity > 1) {
            size.quantity -= 1;
        } else {
            size.quantity -= 1;
            $rootScope.RemoveSize(size);
        }
    }

    // -----------------------------------------------------------------

    $rootScope.Plus = (size) => {
        var MaxNumber = $rootScope.PackEnttiy.PackageItem[$rootScope.ChosenItemIndex].NumberOfPieces;
        var SizeNumber = $rootScope.GetColorTotal();
        if (SizeNumber < MaxNumber) {
            size.quantity += 1;
        }
    }

    // -----------------------------------------------------------------

    $rootScope.GetColorTotal = () => {
        var Colors = $rootScope.PackEnttiy.PackageItem[$rootScope.ChosenItemIndex].Colors;
        var ColorNumber = 0;
        if (Colors.length > 0) {
            for (var i = 0; i < Colors.length; i++) {
                var SizeNumber = 0;
                if (Colors[i] != undefined) {
                    if (Colors[i].sizes.length > 0) {
                        for (var z = 0; z < Colors[i].sizes.length; z++) {
                            var itemNumber = Colors[i].sizes[z].quantity;
                            SizeNumber += itemNumber;
                        };
                        ColorNumber += SizeNumber;
                    };
                };
            };
        };
        return ColorNumber;
    }

    // -----------------------------------------------------------------

    $rootScope.DeleteSize = (index,sizes) => {
        sizes.splice(index, 1);
    }

    // -----------------------------------------------------------------

    $rootScope.IsProductActive = (item) => {
        item.IsProductActive = !item.IsProductActive;
        item.Colors = [];
    }

    // -----------------------------------------------------------------
    $rootScope.AddNewCart = () => {
        var PackageItems = $rootScope.PackEnttiy.PackageItem
        if (PackageItems.length > 0) {
            var lastItem = PackageItems[PackageItems.length - 1]
            lastItem.IsActive = false;
        }
        var pag = {
            IsActive: true,
            IsProductActive: true,
            NumberOfPieces: 1,
            TotalPrice: 0,
            UnitCategory: $scope.AllTypeStyle[0].id,
            quantity: 0,
            Colors: []
        };
        $rootScope.PackEnttiy.PackageItem.push(pag);
        $rootScope.ChosenItemIndex += 1;
        $scope.PicesNumberChanger(pag);
    }

    // -----------------------------------------------------------------

    $scope.PicesNumberChanger = (item) => {
        var key = item.UnitCategory;
        var TypeStyle = $filter('filter')($scope.AllTypeStyle, { id: key })[0];
        if (TypeStyle != null) {
            item.quantity = TypeStyle.quantity;
            item.showing = TypeStyle.showing;
        }
    }

    // -----------------------------------------------------------------

    $scope.RemoveNewCart = (iteminCart) => {
        var PackageItems = $rootScope.PackEnttiy.PackageItem
        if (PackageItems.length > 1) {
            var index = PackageItems.indexOf(iteminCart);
            PackageItems.splice(index, 1);
            var lastItem = PackageItems[PackageItems.length - 1]
            lastItem.IsActive = true;
            $rootScope.ChosenItemIndex -= 1;
            $scope.getTotal();
        }
    }

    // -----------------------------------------------------------------

    $scope.getTotal = function () {
        var total = 0;
        if ($rootScope.PackEnttiy != undefined) {
            var PackageItems = $rootScope.PackEnttiy.PackageItem
            if (PackageItems.length > 0) {
                for (var i = 0; i < PackageItems.length; i++) {
                    var Item = $rootScope.PackEnttiy.PackageItem[i];
                    total += (Item.TotalPrice);
                }
                $rootScope.PackEnttiy.TotlaPrice = total;
            }
        }
        return total;
    }

    // -----------------------------------------------------------------

    $rootScope.CreatePackage = () => {
        var Check = $("#addPackageformValidate").valid();
        if (Check) {
            var Total = $rootScope.PackEnttiy.TotlaPrice;
            var paied = Total - $rootScope.PackEnttiy.Remaining;
            if ($rootScope.PackEnttiy.Shipping == "") {
            $rootScope.PackEnttiy.Shipping = 0;
            };
            var pag = { supplierId: $rootScope.PackEnttiy.SupplierId, paied: paied, Note: $rootScope.PackEnttiy.Note, Shipping: $rootScope.PackEnttiy.Shipping, PackageItems: [] };

            for (var i = 0; i < $rootScope.PackEnttiy.PackageItem.length; i++) {
                var NumberOfPieces = $rootScope.PackEnttiy.PackageItem[i].NumberOfPieces;
                var TotalPrice = $rootScope.PackEnttiy.PackageItem[i].TotalPrice;
                if (Total > 0 && NumberOfPieces > 0) {
                    var price = TotalPrice / NumberOfPieces;
                    };
                var PackageItemPag = {
                    productTypeStyleId: $rootScope.PackEnttiy.PackageItem[i].UnitCategory,
                    quantity: NumberOfPieces,
                    price: price,
                    showing: 0,
                    colors: $rootScope.PackEnttiy.PackageItem[i].Colors
                };
                pag.PackageItems.push(PackageItemPag);
            };
            DBContext.CreatePackge(pag).then((res) => {
                var massage = res.data.massage
                if (res.data.succeeded) {
                    swal({
                        title: "نجاح!",
                        text: massage,
                        type: "success"
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result) {
                            $scope.ClearPackage();
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
        };
    };

    // -----------------------------------------------------------------

    $scope.ClearPackage = () => {
        $rootScope.PackEnttiy = {
            SupplierId: "",
            TotlaPrice: $scope.getTotal(),
            Type: "",
            Note: "",
            Shipping: 0,
            Remaining: 0,
            PackageItem: [],
        };
        $scope.GetAllData();
    };

    // -----------------------------------------------------------------

    $scope.ClearPackage();
});