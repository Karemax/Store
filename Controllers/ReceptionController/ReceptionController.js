app.controller("ReceptionController", function ($scope, $rootScope, DBContext, $routeParams, $location, getmydomain) {
    $scope.BusinessName = $routeParams.BusinessName;
    $rootScope.isLoading = true;

    $rootScope.GetBusinessByName = () => {
        $rootScope.Username = UserService.getUsername();
        if ($rootScope.BusinessName == "") {
            DBContext.GetBusinessByName($scope.BusinessName).then((res) => {
                $rootScope.BusinessName = res.data.name;
                $scope.BusinessLogo = res.data.logo;
                $rootScope.Start();
            });
        };
    };

    // -------------- Loading Settings

    $rootScope.isLoading = true;

    $rootScope.isLoadingfun = function () {
        $('.menu-and-user').show();
        setTimeout(show, 5);
        function show() {
            $('.tab-content .tab-item').css({ "height": "100%", "padding": "20px 20px" });
            $rootScope.isLoading = false;
        }
    };

    $scope.$on('$locationChangeStart', function (event, newLoc, oldLoc) {
        $('.menu-and-user').hide();
        setTimeout(hide, 5);
        function hide() {
            $('.tab-content .tab-item').css({ "height": "0rem", "padding": "0px" })
            $rootScope.isLoading = true;
        }
    });

    // -------------- Bar Settings

    $rootScope.Start = () => {
        var Token = UserService.getToken();
        if (Token != "") {
            $rootScope.IsAuth = true;
            $scope.StartBar();
        } else {
            $rootScope.IsAuth = false;
        }
    }

    $scope.StartBar = () => {
        $rootScope.SiteMap = [];
        var map = $scope.SiteMapSrc;
        var userroles = UserService.getRoles();
        var Maproles = $scope.MapRole
        angular.forEach(Maproles, function (mRole) {
            var IfinRole = userroles.indexOf(mRole.role);
            if (IfinRole >= 0) {
                angular.forEach(mRole.mapid, function (mapitem) {
                    var dd = $filter('filter')(map, { id: mapitem })[0];
                    if (dd != undefined) {
                        $rootScope.Setbar($scope.SiteMapSrc[0])
                        $rootScope.SiteMap.push(dd);
                    }
                });
            }
        });
    }

    let BackBar = {
        titel: "",
        button: [],
        funbutton: [],
        sublinks: [],
        sections: [],
        back: "",
        itemlink: {},
    };

    $scope.DoFun = (fun) => {
        fun();
    }

    $rootScope.Setbar = (m, kay) => {

        // set BackBar 
        BackBar.titel = $rootScope.Bar.titel;

        if ($rootScope.Bar.button != undefined) {
            BackBar.button = $rootScope.Bar.button;
        } else {
            BackBar.button = [];
        }
        if ($rootScope.Bar.funbutton != undefined) {
            BackBar.funbutton = $rootScope.Bar.funbutton;
        } else {
            BackBar.funbutton = [];
        }
        if ($rootScope.Bar.sublinks != undefined) {
            BackBar.sublinks = $rootScope.Bar.sublinks;
        } else {
            BackBar.sublinks = [];
        }
        if ($rootScope.Bar.back != undefined) {
            BackBar.back = $rootScope.Bar.back;
        } else {
            BackBar.back = "";
        }
        if ($rootScope.Bar.sections != undefined) {
            BackBar.sections = $rootScope.Bar.sections;
        } else {
            BackBar.sections = [];
        }
        if ($rootScope.Bar.sections != undefined) {
            BackBar.itemlink = $rootScope.Bar.itemlink;
        } else {
            BackBar.itemlink = {};
        }
        // ----------------------------------------

        // set BackBar 

        $rootScope.Bar.titel = m.titel;

        if (m.button != undefined) {
            $rootScope.Bar.button = m.button;
        } else {
            $rootScope.Bar.button = [];
        }
        if (m.funbutton != undefined) {
            $rootScope.Bar.funbutton = m.funbutton;
        } else {
            $rootScope.Bar.funbutton = [];
        }
        if (m.sublinks != undefined) {
            $rootScope.Bar.sublinks = m.sublinks;
        } else {
            $rootScope.Bar.sublinks = [];
        }
        if (m.back != undefined) {
            $rootScope.Bar.back = m.back;
        } else {
            $rootScope.Bar.back = "";
        }
        if (m.sections != undefined) {
            $rootScope.Bar.sections = m.sections;
        } else {
            $rootScope.Bar.sections = [];
        }
        if (m.sections != undefined) {
            $rootScope.Bar.itemlink = m.itemlink;
        } else {
            $rootScope.Bar.itemlink = {};
        }
        if (m.link.endsWith('/')) {
            window.location.href = m.link + kay;
        }
    }

    $scope.goBack = () => {
        window.location.href = $rootScope.Bar.back;
        if ($rootScope.Bar != BackBar) {
            $rootScope.Bar = BackBar;
        } else {
            $rootScope.Bar = {
                titel: "نقطة البيع",
                button: [],
                funbutton: [],
                sublinks: [],
                sections: [],
                back: "",
                itemlink: {},
            };
        }
    };
    
    $scope.SetActiveSection = (s) => {
        var index = $rootScope.Bar.sections.indexOf(s);
        for (var i = 0; i < $rootScope.Bar.sections.length; i++) {
            var Selectindex = $rootScope.Bar.sections.indexOf($rootScope.Bar.sections[i]);
            if (Selectindex == index) {
                $rootScope.Bar.sections[i].isActive = true;
            } else {
                $rootScope.Bar.sections[i].isActive = false;
            }
        }
    };

    $scope.SiteMapSrc = [
        //------------------------------------------------------------------------------------------- SocialLinks 1

        {
            id: 1, titel: "روابط اجتماعية", icon: "os-icon-airplay", controller: "SocialLinks",
            sections: [{
                isActive: true, titel: "نقطة البيع", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item",
                subsections: [
                    { titel: "الفاتوره", view: "/Views/Reception/SocialLinks/SocialLinks.html", col: "col-lg-12" }
                    ]
            }],
        },


    ]

    // -------------- End Bar Settings
});