app.controller("Finance", function ($rootScope, $scope, DBContext, $filter) {

    $scope.Total = 0;
    $scope.TotalBills = 0;
    $scope.TotalOutcome = 0;
    $scope.Totalinventory = 0;
    $scope.TotalRinventory = 0;
    $scope.From = $filter("date")(new Date(), "MM/dd/yyyy");
    $scope.To = $filter("date")(new Date(), "MM/dd/yyyy");


    // --------------------------------------------------------------

    $scope.GetInputValue = () => {
        var from = $('input[name="from"]').val();
        var to = $('input[name="to"]').val();
        $scope.From = from;
        $scope.To = to;
        $scope.GetDailyReport();
    }

    $scope.GetDailyReport = () => {
        DBContext.ReportBydate($scope.From, $scope.To).then((res) => {
            $scope.All = res.data;
            $scope.Total = $scope.All.totalBills - $scope.All.totalOutcome;
            $scope.GetTodayBills();
        });
    };

    // --------------------------------------------------------------

    $scope.BillsCon = true;
    $scope.OutcomeCon = false;
    $scope.inventoryCon = false;

    // --------------------------------------------------------------

    $scope.GetTodayBills = () => {
        DBContext.GetAllCheckoutBillByDate($scope.From, $scope.To).then((res) => {
            var FF = res.data;
            $rootScope.Checklength(FF);
            $scope.TodayBillsTable = FF;
            $scope.BillsCon = true;
            $scope.OutcomeCon = false;
            $scope.inventoryCon = false;
            $rootScope.isLoadingfun();
        });
    };

    // --------------------------------------------------------------

    $scope.GetTodayOutcome = () => {
        DBContext.GetAllOutcomeByDate($scope.From, $scope.To).then((res) => {
            var FF = res.data;
            $rootScope.Checklength(FF);
            $scope.outcomesTable = FF;
            $scope.BillsCon = false;
            $scope.OutcomeCon = true;
            $scope.inventoryCon = false;
        });
    };

    // --------------------------------------------------------------

    $scope.GetDailyinventoryBills = () => {
        DBContext.GetinventoryBillsByDate($scope.From, $scope.To).then((res) => {
            var FF = res.data;
            $rootScope.Checklength(FF);
            $scope.TodayinventoryTable = FF;
            $scope.BillsCon = false;
            $scope.OutcomeCon = false;
            $scope.inventoryCon = true;
            $rootScope.isLoadingfun();
        });
    };

    
    // --------------------------------------------------------------


    $scope.GetDailyReport();
});