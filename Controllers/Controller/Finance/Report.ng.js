app.controller("Report", function ($rootScope, $scope, DBContext, $filter) {

    $scope.Total = 0;
    $scope.TotalBills = 0;
    $scope.TotalOutcome = 0;
    $scope.Totalinventory = 0;
    $scope.TotalRinventory = 0;
    $scope.From = $filter("date")(new Date(), "M/d/yy")
    $scope.To = $filter("date")(new Date(), "M/d/yy")

    // --------------------------------------------------------------

    $scope.BillsCon = true;
    $scope.OutcomeCon = false;
    $scope.inventoryCon = false;

    // --------------------------------------------------------------

    $scope.GetBills = () => {
        DBContext.GetAllCheckoutBillByDate($scope.From, $scope.To).then((res) => {
            var FF = res.data;
            $scope.TodayBillsTable = FF;
            $scope.BillsCon = true;
            $scope.OutcomeCon = false;
            $scope.inventoryCon = false;
            $rootScope.isLoadingfun();
        });
    };

    // --------------------------------------------------------------

    $scope.GetOutcome = () => {
        DBContext.GetAllOutcomeByDate($scope.From, $scope.To).then((res) => {
            var FF = res.data;
            $scope.outcomesTable = FF;
            $scope.BillsCon = false;
            $scope.OutcomeCon = true;
            $scope.inventoryCon = false;

        });
    };

    // --------------------------------------------------------------

    $scope.GetinventoryBills = () => {
        DBContext.GetinventoryBillsByDate($scope.From, $scope.To).then((res) => {
            var FF = res.data;
            $scope.TodayinventoryTable = FF;
            $scope.BillsCon = false;
            $scope.OutcomeCon = false;
            $scope.inventoryCon = true;

        });
    };

    // --------------------------------------------------------------

    $scope.GetReport = () => {
        DBContext.ReportBydate($scope.From, $scope.To).then((res) => {
            $scope.All = res.data.data;
            $scope.Total = $scope.All.totalBills - $scope.All.totalOutcome;
            $scope.GetBills();
        });
    };

    // --------------------------------------------------------------

    $scope.GetReport();
});