app.controller("Register", function ($scope, DBContext, $filter, $location, $rootScope) {
    $scope.model = {
        fristName: "",
        lastName: "",
        email: "",
        userName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    }
    $scope.Send = () => {
        DBContext.Register($scope.model).then((res) => {
            var obj = res.data;
            if (obj.isAuthenticated) {
                swal({
                    title: "نجاح!",
                    text: obj.message,
                    type: "success"
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result) {
                        window.location.reload();
                    };
                });
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'فشل',
                    text: obj.message,
                })
            }
        });
    }
});