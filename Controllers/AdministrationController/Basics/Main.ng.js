app.controller("SuperBasic", function ($scope, $rootScope, DBContext) {
    $scope.GetAllData = () => {
        DBContext.GetSuperBasics().then((res) => {
            $rootScope.AllBasics = res.data;
            $rootScope.isLoadingfun();
        });
    }

    // -------------------------------------------------

    $scope.Send = () => {
        DBContext.CreateBasics($rootScope.AllBasics).then((res) => {
            $scope.GetAllData();
        });
    }

    // -------------------------------------------------

    $rootScope.isActive = (item) => {
        item.isActive = !item.isActive;
    }

    // -------------------------------------------------
    $rootScope.AddColor = (Color) => {
        var pag = {
            name: Color.name,
            code: Color.code,
            isActive: true
        }
        $rootScope.AllBasics.colors.push(pag);
    }
    // -------------------------------------------------
    $rootScope.AddSize = (size) => {
        var pag = {
            name: size,
            isActive: true
        }
        $rootScope.AllBasics.sizes.push(pag);
    }
    
    // -------------------------------------------------
    $rootScope.AddGender = (gender) => {
        var pag = {
            name: gender,
            isActive: true
        }
        $rootScope.AllBasics.genders.push(pag);
    }
    
    // -------------------------------------------------
    $rootScope.AddType = (type) => {
        var pag = {
            name: type,
            isActive: true
        }
        $rootScope.AllBasics.productTypes.push(pag);
    }
    
    // -------------------------------------------------
    $rootScope.AddSleeveStyle = (SleeveStyle) => {
        var pag = {
            name: SleeveStyle,
            isActive: true
        }
        $rootScope.AllBasics.sleeveStyles.push(pag);
    }
    // -------------------------------------------------
        $rootScope.AddMaterial = (Material) => {
            var pag = {
                name: Material,
                isActive: true
            };
            $rootScope.AllBasics.materials.push(pag);
    }
    // -------------------------------------------------
    $rootScope.AddUniqItemName = (UniqItemName) => {
            var pag = {
                title: UniqItemName,
                isActive: true
            };
        $rootScope.AllBasics.uniqItemNames.push(pag);
    }

    $scope.GetAllData();

});