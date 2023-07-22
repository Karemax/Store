app.controller("AllOutcomeType", function ($scope, DBContext, $filter, $rootScope) {
    $scope.ClearOutcomeType = () => {
        DBContext.GetAllOutcomeType().then((res) => {
            $scope.All = res.data;
            $scope.Enttiy = {
                Title: "",
                IsMonthly: false
            }
            $rootScope.isLoadingfun();
        });
    };

    $scope.CreateOutcomeType = () => {
        var Check = $("#OutcomeTypeformValidate").valid();
        if (Check) {
            DBContext.CreateOutcomeType($scope.Enttiy).then((res) => {
                var massage = res.data.massage
                if (res.data.succeeded) {
                    swal({
                        title: "نجاح!",
                        text: massage,
                        type: "success"
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result) {
                            $scope.ClearOutcomeType();
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
    $scope.ClearOutcomeType();
    $rootScope.isLoadingfun();
});