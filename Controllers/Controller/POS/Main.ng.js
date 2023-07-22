app.controller("POS", function ($rootScope, $scope, DBContext, $filter) {
    $rootScope.GetBusinessName();
    $scope.date = new Date();
    $scope.newReminingOrder = false;
    $scope.ReminingClients = [];
    $scope.BillType = "كاش";
    $scope.ClientPag = {
        name: "",
        id:0
    }
    // --------------------------------------------------------------

    $rootScope.GetStoreInfo = () => {
        DBContext.GetBusinessData().then((res) => {
            $rootScope.Store = res.data;
        });
    }
    // --------------------------------------------------------------

    $scope.Openinvoice = () => {
        $rootScope.Bar.sections[0].subsections[0].col = "h-100 col-sm-5"
        $rootScope.Bar.sections[0].subsections[1].col = "h-100 col-sm-7"
    }
    // --------------------------------------------------------------
    $scope.Closeinvoice = () => {
        if ($rootScope.controller == "POS") {
            $rootScope.Bar.sections[0].subsections[0].col = "h-100 d-none"
            $rootScope.Bar.sections[0].subsections[1].col = "h-100 col-sm-12"
        }
    }
    // --------------------------------------------------------------

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
        var MaxNumber = $rootScope.Enttiy.Data[$rootScope.Enttiy.Colorindex].availableSizes[$rootScope.Enttiy.Sizeindex].availableQuantity;
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
        var Color = $filter('filter')(list, { colorIndex: index})[0];
        Color.isSelected = true;
        $rootScope.Enttiy.Color = index;
        $rootScope.OnlySizeMeSelected(Color.availableSizes[0].sizeIndex, Color.availableSizes);
    }
    // --------------------------------------------------------------
    $rootScope.OnlySizeMeSelected = (index, list) => {
        for (var i = 0; i < list.length; i++) {
            list[i].isSelected = false;
        };
        var Size = $filter('filter')(list, { sizeIndex: index })[0];
        Size.isSelected = true;
        $rootScope.Enttiy.Size = index;
        $rootScope.Enttiy.NumberOfPieces = 1;
    }
    // --------------------------------------------------------------

    $rootScope.GetTotalcart = () => {
        var TotalPrice = 0;
        var PaidPrice = 0;
        for (var i = 0; i < $rootScope.cart.length; i++) {
            var thisPaidPrice = ($rootScope.cart[i].Price - $rootScope.cart[i].Discount) * $rootScope.cart[i].NumberOfPieces;
            var thisPrice = $rootScope.cart[i].Price * $rootScope.cart[i].NumberOfPieces;
            PaidPrice += thisPaidPrice;
            TotalPrice += thisPrice;
        }
        $rootScope.TotalPrice = TotalPrice;
        $rootScope.PaidPrice = PaidPrice;
    }
     // --------------------------------------------------------------
    $rootScope.SetCartItem = (data, colorzindex, sizezindex) => {
        var item = $rootScope.SelectItem;
        var Colorindex = 0;
        var Sizeindex = 0;
        if (colorzindex != undefined) {
            Colorindex = colorzindex;
        } else {
            var IFristNotEmptycolor = $filter('filter')(data, { isEmpty: false })[0];
            Colorindex = IFristNotEmptycolor.colorIndex;
        }
        if (sizezindex != undefined) {
            Sizeindex = sizezindex;
        } else {
            var IFristNotEmptycolor = $filter('filter')(data, { isEmpty: false })[0];
            var IFristNotEmptysize = $filter('filter')(IFristNotEmptycolor.availableSizes, { isEmpty: false })[0];
            Sizeindex = IFristNotEmptysize.sizeIndex;
        }
        var FristNotEmptycolor = $filter('filter')(data, { colorIndex: Colorindex })[0];
        var FristNotEmptysize = $filter('filter')(FristNotEmptycolor.availableSizes, { sizeIndex: Sizeindex })[0];
        for (var i = 0; i < data.length; i++) {
            data[i].isSelected = false;
        };
        for (var i = 0; i < FristNotEmptycolor.availableSizes.length; i++) {
            FristNotEmptycolor.availableSizes[i].isSelected = false;
        };
        FristNotEmptycolor.isSelected = true;
        FristNotEmptysize.isSelected = true;
        $rootScope.Enttiy = {
            Name: item.name,
            Price: item.price,
            Discount: 0,
            minPrice: item.minPrice,
            AvailableQuantity: FristNotEmptysize.availableQuantity,
            ProductColorSizeId: FristNotEmptysize.productColorSizeId,
            Color: FristNotEmptycolor.color,
            Size: FristNotEmptysize.size,
            Colorindex: FristNotEmptycolor.colorIndex,
            Sizeindex: FristNotEmptysize.sizeIndex,
            NumberOfPieces: 1,
            ProductId: item.id,
            Data: data,
        };
        var salePrice = item.salePrice
        if (salePrice > 0) { $rootScope.Enttiy.Price = salePrice } else { $rootScope.Enttiy.Price = item.price; }

    }
    // --------------------------------------------------------------
    $rootScope.SelectItemDetails = (item) => {
        $rootScope.SelectItem = item;
        $rootScope.isEmpty = false;
        //var slideindex = $('.slick-initialized').slick('slickCurrentSlide');
        //if (slideindex != 0) {
        //    $('.slick-initialized').slick('slickGoTo',0,true);
        //}
        DBContext.GetProductDetilesToPOS(item.id).then((res) => {
            var data = res.data
            for (var i = 0; i < data.length; i++) {
                var count = 0
                data[i].isSelected = false;
                data[i].isEmpty = false;
                for (var n = 0; n < data[i].availableSizes.length; n++) {
                    data[i].availableSizes[n].isSelected = false;
                    data[i].availableSizes[n].isEmpty = false;
                    var Chartitem = {};
                    if ($rootScope.cart.length > 0) { // cart not Empty
                        Chartitem = $filter('filter')($rootScope.cart, { ProductId: item.id, Sizeindex: data[i].availableSizes[n].sizeIndex, Colorindex: data[i].colorIndex })[0];
                        if (Chartitem != undefined) {
                            data[i].availableSizes[n].availableQuantity -= Chartitem.NumberOfPieces;
                        }
                    }
                    if (data[i].availableSizes[n].availableQuantity == 0) { // size have't Quantity
                        data[i].availableSizes[n].isEmpty = true;
                    } else {
                        count += data[i].availableSizes[n].availableQuantity;
                    }
                }
                if (count == 0) {
                    data[i].isEmpty = true;
                }
            }   
            var FilterData = $filter('filter')(data, { isEmpty: false });
            if (FilterData.length > 0) {
                $rootScope.SetCartItem(data);
            } else {
                $rootScope.isEmpty = true;
            }
        });
    }
    // --------------------------------------------------------------

    $rootScope.AddMeToChart = () => {
        var ColorIndex = $rootScope.Enttiy.Colorindex;
        var SizeIndex = $rootScope.Enttiy.Sizeindex;
        var FilterItem = $filter('filter')($rootScope.cart, { ProductId: $rootScope.Enttiy.ProductId, Sizeindex: SizeIndex, Colorindex: ColorIndex })[0]
        if (FilterItem == undefined) {
            if ($rootScope.cart.length == 0) {
                $scope.Openinvoice();
            }
            $rootScope.cart.push($rootScope.Enttiy);
            $rootScope.GetTotalcart();
            $rootScope.Enttiy = {
                Name: "",
                Discount: 0,
                Price: 0,
                minPrice: 0,
                AvailableQuantity: 0,
                Color: "",
                Size: "",
                NumberOfPieces: 1,
                ProductId: 0,
                Data: []
            }
        } else {
            FilterItem.NumberOfPieces += 1;
            $rootScope.GetTotalcart();
        }
    }
    // --------------------------------------------------------------
    $rootScope.DeleteMEFormCart = (iteminCart) => {
        var index = $rootScope.cart.indexOf(iteminCart);
        $rootScope.cart.splice(index, 1);
        if ($rootScope.cart.length == 0) {
            $rootScope.TotalPrice = 0;
            $scope.Closeinvoice();
        } else {
            $rootScope.GetTotalcart();
        }
    }
    // --------------------------------------------------------------
    $scope.ReminingOrderToggel = () => {
        if ($scope.ReminingClients.length <= 0) { // No ReminingClients Found
            $scope.newReminingOrder = true;
            $scope.ClientPag = {
                id: 0,
                name: "",
                balance: 0,
            }
        } else {
            if ($scope.newReminingOrder) {
                $scope.ChangeClientPag($scope.ReminingClients[0]);
            } else {
                $scope.ClientPag = {
                    id: 0,
                    name: "",
                    balance: 0,
                }
            }
            $scope.newReminingOrder = !$scope.newReminingOrder;
        }
    };
    // --------------------------------------------------------------
    $scope.BillTypeToggel = (BillType) => {
        if (BillType == "كاش") {
            $scope.newReminingOrder = true;
            $scope.ClientPag = {
                id: 0,
                name: "",
                balance: 0,
            }
            $rootScope.GetTotalcart();
        } else {
            $scope.ReminingOrderToggel();
        }
    };
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
                $rootScope.TotalPrice = $rootScope.TotalPrice
                $rootScope.DiscountPrice = DiscountPrice;
            };
        } else {
            $rootScope.GetTotalcart();
        }
    }
    // --------------------------------------------------------------
    $rootScope.ChangeitemDiscount = (item) => {
        if (item != undefined) {
            var DiscountPrice = item.Price - item.Discount;
            if (DiscountPrice < item.minPrice) {
                var minDiscount = item.Price - item.minPrice;
                item.Discount = minDiscount;
            }
            let sum = 0;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                sum += $rootScope.cart[i].Discount * $rootScope.cart[i].NumberOfPieces;
            }
            $rootScope.ChangeDiscount(sum);
        } else {
            $rootScope.GetTotalcart();
        }
    }
    // --------------------------------------------------------------
    $scope.ChangeClientPag = (ReminingClient) => {
        $scope.ClientPag.id = ReminingClient.id;
        $scope.ClientPag.name = ReminingClient.name;
        $scope.ClientPag.balance = ReminingClient.balance;
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
                    Price: $rootScope.cart[i].Price,
                    Discount: $rootScope.cart[i].Discount
                };
                Pag.push(SmallPag);
            }
            Order.OrderItems = Pag;
            Order.Discount = $rootScope.DiscountPrice;
            Order.BillType = $scope.BillType;
            Order.ClientId = $scope.ClientPag.id;
            Order.ClientName = $scope.ClientPag.name;
            DBContext.CreateCheckout(Order).then((res) => {
                var massage = res.data.massage
                if (res.data.succeeded) {
                    swal({
                        title: "نجاح!",
                        text: massage,
                        type: "success"
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result) {
                        $rootScope.ClearProduct();
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
        DBContext.GetAllProductToPOS().then((res) => {
            $rootScope.All = res.data.products;
            $scope.ReminingClients = res.data.reminingClients;

            if ($rootScope.All.length > 0) {
                $rootScope.Islength = true;
            };

            $scope.ClientPag = {};
            if ($scope.ReminingClients.length > 0) {
                $scope.ChangeClientPag($scope.ReminingClients[0]);
            };

            $rootScope.cart = [];
            $rootScope.DiscountPrice = 0;
            $rootScope.Enttiy = {
                Name: "",
                Discount: 0,
                Price: 0,
                minPrice: 0,
                AvailableQuantity: 0,
                Color: "",
                Size: "",
                NumberOfPieces: 1,
                ProductId: 0,
                Data: []
            };

            $rootScope.GetStoreInfo();
            $scope.Closeinvoice();
            $rootScope.TotalPrice = 0;
            $rootScope.PaidPrice = 0;
            $rootScope.isLoadingfun();
        });
    };
    // --------------------------------------------------------------
    $rootScope.ClearProduct();
});