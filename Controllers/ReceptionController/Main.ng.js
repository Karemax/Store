app.controller("POSs", function ($rootScope, $scope, DBContext, $filter) {
    $rootScope.PlusCart = (it) => {
        var MaxNumber = it.AvailableQuantity;
        if (it.NumberOfPieces < MaxNumber) {
            it.NumberOfPieces = it.NumberOfPieces + 1;
            $rootScope.GetTotalcart();
        }
    }
    // --------------------------------------------------------------
    $rootScope.minusCart = (it) => {
        if (it.NumberOfPieces > 1) {
            it.NumberOfPieces = it.NumberOfPieces - 1;
            $rootScope.GetTotalcart();
        }
    }
    // --------------------------------------------------------------
    $rootScope.Plus = () => {
        var MaxNumber = $rootScope.Enttiy.ItemAvailableColor[$rootScope.Enttiy.Color].availableSizes[$rootScope.Enttiy.Size].availableQuantity;
        if ($rootScope.Enttiy.NumberOfPieces < MaxNumber) {
            $rootScope.Enttiy.NumberOfPieces = $rootScope.Enttiy.NumberOfPieces + 1;
        }
    }
    // --------------------------------------------------------------
    $rootScope.minus = () => {
        if ($rootScope.Enttiy.NumberOfPieces > 1) {
            $rootScope.Enttiy.NumberOfPieces = $rootScope.Enttiy.NumberOfPieces - 1;
        }
    }
    // --------------------------------------------------------------
    $rootScope.OnlyColorMeSelected = (index, list) => {
        for (var i = 0; i < list.length; i++) {
            list[i].isSelected = false;
        };
        list[index].isSelected = true;
        $rootScope.Enttiy.Color = index;
        $rootScope.OnlySizeMeSelected(0, list[index].availableSizes);
    }
    // --------------------------------------------------------------
    $rootScope.OnlySizeMeSelected = (index, list) => {
        for (var i = 0; i < list.length; i++) {
            list[i].isSelected = false;
        };
        list[index].isSelected = true;
        $rootScope.Enttiy.Size = index;
        $rootScope.Enttiy.NumberOfPieces = 1;
    }
    // --------------------------------------------------------------
    $rootScope.GetTotalcart = () => {
        var TotalPrice = 0;
        for (var i = 0; i < $rootScope.cart.length; i++) {
            var thisPrice = $rootScope.cart[i].Price * $rootScope.cart[i].NumberOfPieces;
            TotalPrice = TotalPrice + thisPrice;
        }
        $rootScope.TotalPrice = TotalPrice;
    }
    // --------------------------------------------------------------
    $rootScope.SelectItemDetails = (item) => {
        var slideindex = $('.slick-initialized').slick('slickCurrentSlide');
        if (slideindex != 0) {
            $('.slick-initialized').slick('slickGoTo',0,true);
        }
        DBContext.GetBusinessProduct(item.id, $rootScope.id).then((res) => {
            var data = res.data;
            for (var i = 0; i < data.length; i++) {
                data[i].isSelected = false;
                for (var n = 0; n < data[i].availableSizes.length; n++) {
                    data[i].availableSizes[n].isSelected = false;
                }
            }
            data[0].isSelected = true;
            data[0].availableSizes[0].isSelected = true;
            $rootScope.Enttiy = {
                Name: "",
                Price: 0,
                minPrice: 0,
                AvailableQuantity: 0,
                Color: data[0].colorIndex,
                Size: data[0].availableSizes[0].sizeIndex,
                NumberOfPieces: 1,
                ProductId: item,
                ItemAvailableColor: data,
            };
        });
    }
    // --------------------------------------------------------------
    $rootScope.AddMeToChart = () => {
        var salePrice = $rootScope.Enttiy.ProductId.salePrice
        if (salePrice > 0) { $rootScope.Enttiy.Price = salePrice } else { $rootScope.Enttiy.Price = $rootScope.Enttiy.ProductId.price; }
        $rootScope.Enttiy.Name = $rootScope.Enttiy.ProductId.name;
        $rootScope.Enttiy.minPrice = $rootScope.Enttiy.ProductId.minPrice;
        $rootScope.Enttiy.AvailableQuantity = $rootScope.Enttiy.ItemAvailableColor[$rootScope.Enttiy.Color].availableSizes[$rootScope.Enttiy.Size].availableQuantity;
        $rootScope.Enttiy.ProductColorSizeId = $rootScope.Enttiy.ItemAvailableColor[$rootScope.Enttiy.Color].availableSizes[$rootScope.Enttiy.Size].productColorSizeId;
        $rootScope.Enttiy.Size = $rootScope.Enttiy.ItemAvailableColor[$rootScope.Enttiy.Color].availableSizes[$rootScope.Enttiy.Size].size;
        $rootScope.Enttiy.Color = $rootScope.Enttiy.ItemAvailableColor[$rootScope.Enttiy.Color].color;
        $rootScope.Enttiy.ProductId = $rootScope.Enttiy.ProductId.id;
        var dd = $filter('filter')($rootScope.cart, { ProductId: $rootScope.Enttiy.ProductId, Size: $rootScope.Enttiy.Size, Color: $rootScope.Enttiy.Color})[0]
        if (dd == undefined || $rootScope.cart.length == 0) {
            $rootScope.cart.push($rootScope.Enttiy);
            $rootScope.GetTotalcart();
            $rootScope.Enttiy = {
                Name: "",
                Price: 0,
                minPrice: 0,
                AvailableQuantity: 0,
                Color: "",
                Size: 1,
                NumberOfPieces: 1,
                ProductId: {},
                ItemAvailableColor: []
            }

        }
    }
    // --------------------------------------------------------------
    $rootScope.DeleteMEFormCart = (iteminCart) => {
        var index = $rootScope.cart.indexOf(iteminCart);
        $rootScope.cart.splice(index, 1);
        if ($rootScope.cart.length == 0) {
            $rootScope.TotalPrice = 0;
        } else {
            $rootScope.GetTotalcart();
        }
    }
    // --------------------------------------------------------------
    $rootScope.ChangeDiscount = (DiscountPrice) => {
        if (DiscountPrice != undefined) {
            $rootScope.GetTotalcart()
            var TotalminPrice = 0;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                var thisItemminPrice = $rootScope.cart[i].minPrice * $rootScope.cart[i].NumberOfPieces;
                TotalminPrice = TotalminPrice + thisItemminPrice;
            }
            var res = $rootScope.TotalPrice - TotalminPrice;
            if (res >= DiscountPrice) {
                $rootScope.TotalPrice = $rootScope.TotalPrice - DiscountPrice
                $rootScope.DiscountPrice = DiscountPrice;
            };
        } else {
            $rootScope.GetTotalcart();
        }
    }
    // --------------------------------------------------------------
    $rootScope.CreateCheckout = () => {
        var Order = {};
        var Pag = [];
        if ($rootScope.cart.length > 0) {
            for (var i = 0; i < $rootScope.cart.length; i++) {
                var SmallPag = {
                    ProductColorSizeId: $rootScope.cart[i].ProductColorSizeId,
                    Count: $rootScope.cart[i].NumberOfPieces,
                    Price: $rootScope.cart[i].Price
                };
                Pag.push(SmallPag);
            }
            Order.OrderItems = Pag;
            Order.Discount = $rootScope.DiscountPrice;
            DBContext.CreateCheckout(Order).then((res) => {
            var Error = DBContext.CreateCheckout.message;
            if (DBContext.CreateCheckout.succeeded) {
                swal({
                    title: "نجاح!",
                    text: Error,
                    type: "success"
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result) {
                        $rootScope.ClearProduct();
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
        } else {
            var Error = "لا توجد منتجات";
            Swal.fire({
                type: 'error',
                title: 'فشل',
                text: Error,
            })
        }
    };
    // --------------------------------------------------------------
    $rootScope.ClearProduct = () => {
        DBContext.GetBusinessProducts($rootScope.id).then((res) => {
            $rootScope.All = res.data;
            $rootScope.cart = [];
            $rootScope.DiscountPrice = 0;
            $rootScope.Enttiy = {
                Name: "",
                Price: 0,
                minPrice: 0,
                AvailableQuantity: 0,
                Color: "",
                Size: 1,
                NumberOfPieces: 1,
                ProductId: {},
                ItemAvailableColor: []
            }
            $rootScope.TotalPrice = 0;
            $rootScope.isLoadingfun();
        });
    };
    // --------------------------------------------------------------
    $rootScope.ClearProduct();
});