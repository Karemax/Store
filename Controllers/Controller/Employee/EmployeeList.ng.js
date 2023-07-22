app.controller("EmployeeList", function ($scope, DBContext, $filter, $rootScope) {
    $scope.GetAllEmployee = () => {
        DBContext.GetAllEmployee().then((res) => {
            $scope.AllEmployee = res.data;
            if ($scope.AllEmployee.length > 0) {
                $rootScope.Islength = true;
            }
            $rootScope.isLoadingfun();
        });
    }
    $scope.GetAllEmployee();
});