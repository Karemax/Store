app.controller("BusinessPackage", function ($scope, $rootScope, DBContext) {
    $rootScope.Enttiy = {
        Name: '',
        Cost: 0
    }

    $rootScope.CreateBusinessPackage = () => {
        var Check = $("#PackageformValidate").valid();
        if (Check) {
            DBContext.CreatePackage($rootScope.Enttiy).then((res) => {
                var message = res.statusText;
                if (res.xhrStatus == "complete") {
                    swal({
                        title: "نجاح!",
                        text: message,
                        type: "success"
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result) {
                            $scope.GetData();
                        };
                    });
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'فشل',
                        text: message,
                    })
                }
            });
        }
    }

    $scope.GetData = () => {
        DBContext.GetPackages().then((res) => {
            $scope.Packages = res.data;
        });
    }

    $scope.GetData();
});