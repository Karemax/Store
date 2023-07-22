app.controller("Remaining", function ($scope, DBContext, $filter, $rootScope) {

    $scope.GetStart = () => {
        DBContext.GetAllRemainingStockBill().then((res) => {
            $scope.Bills = res.data;
            $rootScope.isLoadingfun();
        });
    }

    $scope.CreateRemaining = (bill) => {
        var Pag = {
            BillId: bill.billId,
            Cost: parseInt(bill.RCost),
        }
        DBContext.CreateRemainingStockBill(Pag).then((res) => {
            var massage = res.data.massage
            if (res.data != undefined) {
                swal({
                    title: "نجاح!",
                    text: massage,
                    type: "success"
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result) {
                        $scope.GetStart();
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
    $scope.GetStart();
});
