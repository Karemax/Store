app.controller("Login", function ($scope, DBContext, $filter, $location, $rootScope, UserService) {
	$scope.GotoDashBoard = () => {
		window.location.href = "#/POS";
		UserService.setAuth(true);
	}

	$scope.Send = () => {
		DBContext.Login($scope.model).then((res) => {
			var obj = res.data;
			if (obj.isAuthenticated) {
				var IsOwner = obj.roles.indexOf("Owner")
				UserService.setStatus(obj.userName, obj.accessToken, obj.roles);
				if (IsOwner == -1) {
					$scope.GotoDashBoard();
				} else {
					DBContext.CheckIfOwenrHasStore().then((res) => {
						var IfOwenrHasStore = res.data;
						if (!IfOwenrHasStore) {
							$scope.Setbarhref(2, 0);
						} else {
							$scope.GotoDashBoard();
						}
					});
				}
			}
			else {
				Swal.fire({
					type: 'error',
					title: 'فشل',
					text: obj.message,
				});
			};
		});
	}
});
