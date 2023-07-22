app.controller("ProductBasics", function ($scope, $rootScope, DBContext) {

    $scope.Star = () => {
        DBContext.GetBasics().then((res) => {
            $rootScope.AllStoreBasics = res.data;
            DBContext.GetAllBasics().then((Allres) => {
                $scope.SugBasics = Allres.data;
                $rootScope.isLoadingfun();
            });
        });
    };

    // ---------------------------------------------------

    $rootScope.UpdateBasics = () => {
        DBContext.UpdateAllBasics($rootScope.AllStoreBasics).then((res) => {
            var obj = res.data;
            if (obj != null) {
                swal({
                    title: "نجاح!",
                    text: "",
                    type: "success"
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result) {
                        $rootScope.AllStoreBasics = obj;
                    };
                });
            }
        });
    };

    // ---------------------------------------------------

    $scope.isActive = (item, index) => {
        if (index > 1 || !item.isActive) {
            item.isActive = !item.isActive;
        }
    };

    // ---------------------------------------------------

    $scope.AddMe = (item, BasePag) => {
        var index = BasePag.indexOf(item);
        if (index < 0) {
            BasePag.push(item);
        }
    };

    // ---------------------------------------------------

    $scope.Star();


});
