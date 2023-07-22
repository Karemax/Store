app.controller("CreateEmployee", function ($scope, DBContext, $filter, $rootScope) {
    $scope.ClearEmployee = () => {
        DBContext.GetAllRoles().then((res) => {
            $scope.Roles = res.data;
            $scope.Enttiy = {
                UserName: "",
                Gender: "ذكر",
                Email: "",
                Password: "",
                ConfirmPassword: "",
                Role: $scope.Roles[0].name
            }
            $rootScope.isLoadingfun();
        });
    };

    $scope.CreateEmployee = () => {
        var Check = $("#EmployeeformValidate").valid();
        if (Check) {
            $scope.Enttiy.DateOfBirth = moment($scope.Enttiy.DateOfBirth, 'YYYY-MM-DD');
            $scope.Enttiy.PhoneNumber = $scope.Enttiy.PhoneNumber + "";
            DBContext.CreateEmployee($scope.Enttiy).then((res) => {
                var massage = res.data.massage
                if (res.data.succeeded) {
                    swal({
                        title: "نجاح!",
                        text: massage,
                        type: "success"
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result) {
                            $scope.ClearEmployee();
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
    $scope.ClearEmployee();
});