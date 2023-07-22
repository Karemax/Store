app.controller("BusinessController", function ($scope, $rootScope, DBContext) {
    $scope.ShowBusiness = true;
    $scope.getStart = () => {
        $scope.Business = {};
        $scope.Packages = [];
        $scope.GetPackage();
    }
    $scope.GetPackage = () => {
        DBContext.GetPackages().then((res) => {
            var obj = res.data;
            $scope.Packages = obj;
        });
    }

    $scope.CreateBusiness = (Package) => {
        var Packageid = Package.id;
        $scope.Business.PackageId = Packageid;
        DBContext.CreateBusiness($scope.Business).then((res) => {
            var obj = res.data;
            if (object = "object") {
                Swal.fire({
                    title: "نجاح!",
                    text: obj,
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
                    text: obj,
                });
            }
        });
    };

    $scope.Chose = () => {
        var check = $('#CreateStoreformValidate').valid();
        if (check) {
            $scope.ShowBusiness = false;
        };
    };

    $scope.getStart();
});