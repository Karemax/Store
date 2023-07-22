app.controller("MainController", function ($scope, $rootScope, DBContext, $filter, $location, UserService,$http, getmydomain) {

    // -------------- Bar Settings

    $rootScope.Start = () => {
        var Token = UserService.getToken();
        if (Token != "") {
            $rootScope.IsAuth = true;
            $scope.StartBar();
        } else {
            $rootScope.IsAuth = false;
            window.location.href = "#/Login";
        }
    }

    $rootScope.OpenSection = (s) => {
        for (var i = 0; i < $rootScope.Bar.sections.length; i++) {
            if ($rootScope.Bar.sections[i].titel != s.titel) {
                $rootScope.Bar.sections[i].isActive = false;
            } else {
                $rootScope.Bar.sections[i].isActive = true;
            }
        }
    };

    $rootScope.GetBusinessName = () => {
        $rootScope.Username = UserService.getUsername();
        if ($rootScope.BusinessName == "") {
            DBContext.GetBusinessName().then((res) => {
                $rootScope.BusinessName = res.data.name;
                $rootScope.BusinessLogo = res.data.logo;
                $rootScope.Start();
            });
        };
    };

    $rootScope.isOwner = () => {
        return UserService.IfAdmin();
    };

    $scope.StartBar = () => {
        $rootScope.SiteMap = [];
        var map = $scope.SiteMapSrc;
        var userroles = UserService.getRoles();
        var Maproles = $scope.MapRole
        angular.forEach(Maproles, function (mRole) {
            var IfinRole = userroles.indexOf(mRole.role);
            if (IfinRole >= 0) {
                $rootScope.Setbar($scope.SiteMapSrc[0])
                angular.forEach(mRole.mapid, function (mapitem) {
                    var dd = $filter('filter')(map, { id: mapitem })[0];
                    if (dd != undefined) {
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
        link: "",
    };
    
    $scope.DoFun = (fun) => {
        fun();
    }

    $rootScope.GotoMystore = () => {
        $scope.Setbarhref(9);
    }

    $rootScope.Setbar = (m, kay) => {
        if (m.link != $rootScope.Bar.link) {

            $rootScope.isLoadingfunOn();
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
            if ($rootScope.Bar.itemlink != undefined) {
                BackBar.itemlink = $rootScope.Bar.itemlink;
            } else {
                BackBar.itemlink = {};
            }
            if ($rootScope.Bar.link != undefined) {
                BackBar.link = $rootScope.Bar.link;
            } else {
                BackBar.link = "";
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
            if (m.itemlink != undefined) {
                $rootScope.Bar.itemlink = m.itemlink;
            } else {
                $rootScope.Bar.itemlink = {};
            }
            if (m.link != undefined) {
                $rootScope.Bar.link = m.link;
            } else {
                $rootScope.Bar.link = "";
            }
            if (kay != undefined) {
                window.location.href = m.link + "/" + kay;
            } else {
                window.location.href = m.link;
            }
        }
    }
    $scope.Setbarhref = (index, kay) => {
        var tt = $scope.SiteMapSrc[index];
        $scope.Setbar(tt, kay);
    }

    $scope.goBack = () => {
        window.location.href = $rootScope.Bar.back;
        $rootScope.isLoadingfunOn();
        if ($rootScope.Bar !=  BackBar) {
            $rootScope.Bar =  BackBar;
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

    $scope.SetActiveSection = (s) =>
    {
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
        //-------------------------------------------------------------------------------------------POS 1

        {
            id: 1, titel: "نقطة البيع", icon: "os-icon os-icon-airplay", link: "#/POS", ShowWithMenu: true,
            sections: [{
                isActive: true, titel: "نقطة البيع", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item",
                subsections: [
                    { titel: "الفاتوره", view: "/Views/Dashboard/POS/POSPrtialviews/InvoiceBox.html", col: "box-style-Main d-none" , HasSearchInheader: false},
                    { titel: "المنتجات", view: "/Views/Dashboard/POS/POSPrtialviews/ProductsPOS.html", col: "box-style-Main col-lg-12", HasSearchInheader: true}]
            }],
        },

        //------------------------------------------------------------------------------------------- Staff 2

        {
            id: 2, titel: "البائعين", icon: "os-icon os-icon-ui-93", link: "#/Staff", ShowWithMenu: true,

            sections: [{
                isActive: true, titel: "جميع البائعين", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item",
                subsections: [
                    { titel: "جميع البائعين", view: "/Views/Dashboard/Employee/EmployeePartialviews/EmployeeListBox.html", col: "box-style-Main col-sm-12", HasSearchInheader: true }]
            }],

            sublinks: [{
                titel: "أنشاء بائع جديد", icon: "fa fa-user-plus", back: "#/Staff", link: "#/CreateEmployee",
                sections: [{
                    isActive: true, titel: "أنشاء بائع جديد", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item ",
                    subsections: [
                        { titel: "أنشاء بائع جديد", view: "/Views/Dashboard/Employee/EmployeePartialviews/CreateEmployeeBox.html", col: "box-style-Main col-sm-12" }]
                }],
            }],
            itemlink: {
                titel: "ملف تعريف الموظف", back: "#/Staff", link: "#/EProfile",
                sections: [{
                    isActive: true, titel: "ملف تعريف الموظف", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item ",
                    subsections: [
                        { titel: "ملف تعريف الموظف", view: "/Views/Dashboard/Employee/ProfilePartialviews/ProfileBox.html", col: "box-style-Main col-sm-12" }]
                }],
            },

        },

        //------------------------------------------------------------------------------------------- Products 3

        {
            id: 3, titel: "المنتجات", icon: "os-icon os-icon-grid-squares-22", link: "#/Products", ShowWithMenu: true,

            sections: [{
                isActive: true, titel: "المنتجات", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item",
                subsections: [
                    { titel: "المنتجات", view: "/Views/Dashboard/Products/IndexPartialviews/ProductsBox.html", col: "col-sm-12", HasSearchInheader: true}]
            }],

            itemlink: {
                titel: "تفاصيل المنتج", back: "#/Products", link: "#/ProductDetiles",

                sections: [{
                    isActive: true, titel: "تفاصيل المنتج", col: "row col-lg-12 col-md-10 col-sm-12 tab-item ",
                    subsections: [
                        { titel: "معلومات المنتج", view: "/Views/Dashboard/Products/ProductDetilesPartialviews/ProductInfoBox.html", col: "box-style-Main col-sm-8" },
                        { titel: "صور المنتج", view: "/Views/Dashboard/Products/ProductDetilesPartialviews/ProductImgsBox.html", col: "box-style-Main col-sm-4" },
                        { titel: "ألوان و أحجام المنتج", view: "/Views/Dashboard/Products/ProductDetilesPartialviews/ProductColorSizeBox.html", col: "box-style-Main col-sm-12" }
                    ]
                }],

                funbutton: [{ titel: "حفظ التغيرات", action: function () { return $rootScope.CreateProduct() }, icon: "fa fa-floppy-o" },
                    { titel: "تشغيل \ ايقاف عرض المنتج", action: function () { return $rootScope.Active() }, icon: "os-icon os-icon-power" }],
            }
        },

        //------------------------------------------------------------------------------------------- Store invoices 4
            
        {
            id: 4, titel: "فواتير المخزن", icon: "os-icon os-icon-file-text", link: "#/Stock", ShowWithMenu: true,

            sections: [{
                isActive: true, titel: "المخزن", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item",
                subsections: [
                    { titel: "جميع فواتير المخزن", view: "/Views/Dashboard/Stock/IndexPartialviews/BillsBox.html", col: "box-style-Main col-sm-8", HasSearchInheader: true},
                    { titel: "جميع الموردين", view: "/Views/Dashboard/Stock/IndexPartialviews/SuppliersBox.html", col: "box-style-Main col-sm-4", HasSearchInheader: true }]
            }],

            button: [{ titel: "أنشاء مورد جديد", datatarget: "#exampleModal1", icon: "fa fa-user-plus" }],

            itemlink: {
                titel: "تفاصيل الفاتوره", back: "#/Stock", link: "#/BillDetiles",
                funbutton: [{ titel: "حفظ التغيرات", action: function () { return $rootScope.UpdateBill() }, icon: "fa fa-floppy-o" }],
                sections: [{
                    isActive: true, titel: "تفاصيل الفاتوره", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item ",
                    subsections: [
                        { titel: "تفاصيل الفاتوره", view: "/Views/Dashboard/Stock/BillDetilesPartialviews/BillDetilesBox.html", col: "col-sm-7" },
                        { titel: "مورد الفاتوره", view: "/Views/Dashboard/Stock/BillDetilesPartialviews/SupplerDetilesBox.html", col: "col-sm-5" }]
                }],
            },
            sublinks: [{
                titel: "أضافه فاتوره جديده", icon: "fa fa-plus", back: "#/Stock", link: "#/Supply",
                funbutton: [{ titel: "حفظ التغيرات", action: function () { return $rootScope.CreatePackage() }, icon: "fa fa-floppy-o" },
                    { titel: "أضافه أسم جديد", action: function () { return $rootScope.AddNewCart() }, icon: "fa fa-plus" }],
                sections: [{
                    isActive: true, titel: "أضافه فاتوره جديده", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item ",
                    subsections: [
                        { titel: "أضافه فاتوره جديده", view: "/Views/Dashboard/Stock/SupplyPartialviews/SupplyBox.html", col: "box-style-Main col-sm-12" },
                    ]
                }],
            },
            {
                titel: "الفواتير التي لم تنتهي", icon: "os-icon os-icon-phone-21", back: "#/Stock", link: "#/Remaining",
                sections: [{
                    isActive: true, titel: "جميع فواتير الموردين التي لم تنتهي", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item ",
                    subsections: [
                        { titel: "جميع فواتير الموردين التي لم تنتهي", view: "/Views/Dashboard/Stock/RemainingPartialviews/RemainingListBox.html", col: "box-style-Main col-sm-12" }]
                }],
                },
            ]
        },

        //------------------------------------------------------------------------------------------- Inventory 5

        {
            id: 5, titel: "المخزون", icon: "os-icon os-icon-delivery-box-2", link: "#/AllPackage", ShowWithMenu: true,

            sections: [{
                isActive: true, titel: "المنتجات المخزنه", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item ",
                subsections: [
                    { titel: "المخزون", view: "/Views/Dashboard/Inventory/IndexPartialviews/InventoryBox.html", col: " col-sm-12", HasSearchInheader: true }]
            }],
            button: [{ titel: "جرد", datatarget: "#staticBackdrop", icon: "fa fa-indent" }],
            itemlink: {
                titel: "تفاصيل المنتج", back: "#/AllPackage", link: "#/InventoryProfile",
                sections: [{
                    isActive: true, titel: "تفاصيل الفاتوره", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item ",
                    subsections: [
                        { titel: "تفاصيل الفاتوره", view: "/Views/Dashboard/Inventory/ProfilePartialviews/ProfileBox.html", col: "box-style-Main col-sm-12", HasSearchInheader: false }]
                }],
            },

        },

        //------------------------------------------------------------------------------------------- Expenses 6

        {
            id: 6, titel: "المصروفات", icon: "os-icon os-icon-coins-4", link: "#/Expenses", ShowWithMenu: true,

            sections: [{
                isActive: true, titel: "جميع المصروفات", col: "h-90 row col-lg-12 col-md-10 col-sm-12 tab-item ",
                subsections: [
                    //{ titel: "أضافه المصروفات", view: "/Views/Dashboard/Outcome/OutcomePartialviews/AddOutcomeBox.html", col: "mb-5 box-style-Main col-sm-4" },
                    { titel: "جميع المصروفات", view: "/Views/Dashboard/Outcome/OutcomePartialviews/OutcomeListBox.html", col: "box-style-Main col-sm-12", HasSearchInheader: true }]
            }],

            button: [{ titel: "أضافه المصروفات", datatarget: "#exampleModal1001", icon: "fa fa-plus" }],

            sublinks: [{
                titel: "أنواع المصروفات", icon: "fa fa-plus", back: "#/Expenses", link: "#/ExpensesType",
                sections: [{
                    isActive: true, titel: "أنواع المصروفات", col: "row col-lg-12 col-md-10 col-sm-12 tab-item ",
                    subsections: [
                        { titel: "أضافة أنواع المصروفات", view: "/Views/Dashboard/Outcome/OutcomeTypePartialviews/AddOutcomeTypeBox.html", col: "box-style-Main col-sm-12", HasSearchInheader: false },
                        { titel: "جميع أنواع المصروفات", view: "/Views/Dashboard/Outcome/OutcomeTypePartialviews/OutcomeTypeListBox.html", col: "box-style-Main col-sm-12", HasSearchInheader: true }]
                }],
            }]
        },

        //------------------------------------------------------------------------------------------- the Sales 7

        {
            id: 7, titel: "المبيعات", icon: "os-icon os-icon-wallet-loaded", link: "#/Orders", ShowWithMenu: true,

            sections: [{
                isActive: true, titel: "المبيعات", col: "row col-lg-12 col-md-10 col-sm-12 tab-item ",
                subsections: [
                    { titel: "تاريخ فواتير البيع", view: "/Views/Dashboard/Orders/OrderPartiallviews/OrderFinanceBox.html", col: "mb-5 col-sm-12", HasSearchInheader: false },
                    { titel: "جميع فواتير البيع", view: "/Views/Dashboard/Orders/OrderPartiallviews/OrderListBox.html", col: "box-style-Main col-sm-7", HasSearchInheader: true },
                    { titel: "تفاصل الفاتوره", view: "/Views/Dashboard/Orders/OrderPartiallviews/OrderDetailsBox.html", col: "box-style-Main col-sm-5 d-none", HasSearchInheader: false }]
            }],
        },

        //------------------------------------------------------------------------------------------- Reports 8

        {
            id: 8, titel: "التقارير", icon: "os-icon os-icon-agenda-1", link: "#/Finance", ShowWithMenu: true,

            sections: [{
                isActive: true, titel: "التقرير الأساسي", col: "row col-lg-12 col-md-10 col-sm-12 tab-item ",
                subsections: [
                    { titel: "التقرير الأساسي", view: "/Views/Dashboard/Finance/ReportPartialviews/MainReportBox.html", col: "box-style-Main col-sm-12", HasSearchInheader: false }]
            }]
        },

        //-------------------------------------------------------------------------------------------Basics 9

        {
            id: 9, titel: "الأساسيات", icon: "os-icon os-icon-settings", link: "#/Basics", ShowWithMenu: true,

            sections: [{
                isActive: true, titel: "أسماء المنتحات", col: "row col-lg-12 col-md-10 col-sm-12 tab-item ",
                subsections: [
                    { titel: "أسماء المنتحات", view: "/Views/Dashboard/Basics/IndexPartialviews/BasicsBox.html", col: "box-style-Main col-sm-12", HasSearchInheader: true }]
            },
                {
                    isActive: false, titel: "الخامات", col: "row col-lg-12 col-md-10 col-sm-12 tab-item ",
                subsections: [
                    { titel: "الخامات", view: "/Views/Dashboard/Basics/IndexPartialviews/Materials.html", col: "box-style-Main col-sm-12", HasSearchInheader: true }]
                },
                {
                    isActive: false, titel: "الأستايل", col: "row col-lg-12 col-md-10 col-sm-12 tab-item ",
                    subsections: [
                        { titel: "الأستايل", view: "/Views/Dashboard/Basics/IndexPartialviews/UniqItemNamesBox.html", col: "box-style-Main col-sm-12", HasSearchInheader: true }]
                }
            ],

            funbutton: [{ titel: "حفظ التغيرات", action: function () { return $rootScope.SaveChange() }, icon: "fa fa-floppy-o" },
                { titel: "أضافه أسم جديد", action: function () { return $rootScope.AddNewCartName() }, icon: "fa fa-plus" }],

            button: [{ titel: "أنشاء خامه جديد", datatarget: "#exampleModal221", icon: "fa fa-simplybuilt" },
                { titel: "أنشاء أستايل جديد", datatarget: "#exampleModal22122", icon: "fa fa-tags" }
            ],

                sublinks: [{
                    titel: "أساسيات المنتج", icon: "os-icon os-icon-hamburger-menu-2", back: "#/Basics", link: "#/ProductBasics",
                sections: [{
                    isActive: true, titel: "أساسيات المنتج", col: "row col-lg-12 col-md-10 col-sm-12 tab-item ",
                    subsections: [
                        { titel: "أساسيات المنتج", view: "/Views/Dashboard/Basics/ProductBasicsPartialviews/ProductBasicsBox.html", col: "box-style-Main col-sm-12", HasSearchInheader: false }]
                }],
                    funbutton: [{ titel: "حفظ التغيرات", action: function () { return $rootScope.UpdateBasics() }, icon: "fa fa-floppy-o" }],
            }]
        }
        //------------------------------------------------------------------------------------------- Store Profile 10

        , {
            id: 10, titel: "الملف التعريفي للمدجر", icon: "os-icon os-icon-agenda-1", link: "#/Store", ShowWithMenu: false,

            sections: [{
                isActive: true, titel: "الملف التعريفي", col: "row col-lg-12 col-md-10 col-sm-12 tab-item ",
                subsections: [
                    { titel: "الملف التعريفي", view: "/Views/Dashboard/Store/Index.html", col: "box-style-Main col-sm-12", HasSearchInheader: false }]
            }]
        },
        //------------------------------------------------------------------------------------------- Super Basics 11

        , {
            id: 11, titel: "الأساسيات", icon: "os-icon os-icon-agenda", link: "#/SuperBasics", ShowWithMenu: true,

            sections: [{
                isActive: true, titel: "الأساسيات", col: "row col-lg-12 col-md-10 col-sm-12 tab-item ",
                subsections: [
                    { titel: "الأساسيات", view: "/Views/SuperBasic/index.html", col: "box-style-Main col-sm-12", HasSearchInheader: false }]
            }]
        },

    ]

    // -------------- End Bar Settings
});