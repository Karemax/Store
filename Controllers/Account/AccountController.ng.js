app.controller("AccountController", function ($scope, $rootScope, UserService, $location, getmydomain) {

    // -------------- Bar Settings

    $rootScope.Start = () => {
        $scope.StartBar();
    }

    $scope.StartBar = () => {
        $rootScope.SiteMap = [];
        var map = $scope.SiteMapSrc;
        $scope.Setbar($scope.SiteMapSrc[0])
        $rootScope.SiteMap = map;
    }


    $scope.DoFun = (fun) => {
        fun();
    }

    $scope.Setbar = (m, kay) => {

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

    }

    $scope.Setbarhref = (index, kay) => {
        var tt = $scope.SiteMapSrc[index];
        $scope.Setbar(tt, kay);
    }

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
        //------------------------------------------------------------------------------------------- Login 1

        {
            id: 1, titel: "تسجيل الدخول", icon: "os-icon-airplay", controller: "Login",
            sections: [{
                isActive: true, titel: "تسجيل الدخول", col: "row col-lg-12 col-md-10 col-sm-12 auth-box-w",
                subsections: [
                    { titel: "تسجيل الدخول", view: "/Views/Account/Login/Login.html", col: "col-lg-12" }
                ]
            }],
        },

        //------------------------------------------------------------------------------------------- Register 1

        {
            id: 2, titel: "التسجيل", icon: "os-icon-airplay", controller: "Register",
            sections: [{
                isActive: true, titel: "التسجيل", col: "row col-lg-12 col-md-10 col-sm-12 auth-box-w",
                subsections: [
                    { titel: "التسجيل", view: "/Views/Account/Register/Register.html", col: "col-lg-12" }
                ]
            }],
        },

        //------------------------------------------------------------------------------------------- Business 1

        {
            id: 3, titel: "أنشاء متجر جديد", icon: "os-icon-airplay", controller: "BusinessController",
            sections: [{
                isActive: true, titel: "أنشاء متجر جديد", col: "row col-lg-12 col-md-10 col-sm-12 auth-box-w",
                subsections: [
                    { titel: "أنشاء متجر جديد", view: "/Views/Account/CreateStore/CreateStore.html", col: "col-lg-12" }
                ]
            }],
        },


    ]

    // -------------- End Bar Settings

    $rootScope.Start();
});