app.controller("AllOutcome", function ($scope, DBContext, $filter, $rootScope) {
    $rootScope.IslengthAllType = false;
    $scope.ClearOutcome = () => {
        DBContext.GetAllOutcome().then((res) => {
            $scope.All = res.data;
            $rootScope.Checklength($scope.All);
            DBContext.GetAllOutcomeType().then((ress) => {
                $rootScope.AllOutType = ress.data;
                if ($rootScope.AllOutType.length > 0) { // Not Empty
                    $rootScope.IslengthAllType = false;
                    $rootScope.EnttiyOutcome = {
                        Title: "",
                        Price: 0,
                        OutComeTypeId: $rootScope.AllOutType[0].id
                    }
                } else {
                    $rootScope.IslengthAllType = true;
                }
                $rootScope.isLoadingfun();
            });
        });
    };

    $rootScope.CreateOutcome = () => {
        var Check = $("#OutcomeformValidate").valid();
        if (Check) {
            DBContext.CreateOutcome($scope.EnttiyOutcome).then((res) => {
                var massage = res.data.massage
                if (res.data.succeeded) {
                    swal({
                        title: "نجاح!",
                        text: massage,
                        type: "success"
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result) {
                            $scope.ClearOutcome();
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
    $scope.ClearOutcome();
});