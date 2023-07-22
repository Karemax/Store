app.service('DBContext', function ($http, UserService, getmydomain) {
    var config = () => {
        var Token = UserService.getToken();
        return {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Token +""
            },
            dataType: 'json',
        }
    }

    var url = getmydomain.res();

    // Account
    this.Logout = () => $http.get( url + '/api/account/Logout', config());
    this.GetAllRoles = () => $http.get( url + '/api/account/AllRoles', config());
    this.Login = (model) => $http.post(url + '/api/account/UserLogin', model, config());
    this.Register = (model) => $http.post( url + '/api/account/register', model, config());

    // Admin Business
    this.GetPackages = () => $http.get( url + '/Business/GetPackages', config()); 
    this.GetPackageById = (PackageId) => $http.get( url + '/Business/GetPackageById?PackageId=' + PackageId, config());
    this.CreatePackage = (Package) => $http.post( url + '/Business/CreatePackage', Package, config());

    // Business
    this.CheckIfOwenrHasStore = () => $http.get(url + '/api/BusinessStore/CheckIfOwenrHasStore', config());
    this.GetBusinessName = () => $http.get(url + '/api/BusinessStore/GetStoreNameAsync', config());
    this.GetBusinessData = () => $http.get(url + '/api/BusinessStore/GetStoreAsync', config());
    this.UpdateBusiness = (Store) => $http.put(url + '/api/BusinessStore/Updatestore', Store, config());
    this.CreateBusiness = (newBusiness) => $http.post(url + '/api/BusinessStore/CreateNewStore', newBusiness, config());
    this.RestoreMystore = () => $http.get(url + '/api/BusinessStore/RestoreMystore', config());

    // Admin Basic
    this.GetSuperBasics = () => $http.get( url + '/SuperBasic/GetBasics', config());
    this.CreateBasics = (model) => $http.post( url + '/SuperBasic/CreateBasics', model, config());

    // Reception
    this.GetBusinessNameById = (StoreId) => $http.get( url + '/Reception/GetStoreNameAsync/' + StoreId, config());
    this.GetBusinessProducts = (StoreId) => $http.get( url + '/Reception/GetStoreProductsAsync/' + StoreId, config());
    this.GetBusinessProduct = (productId, StoreId) => $http.get( url + '/Reception/GetProduct/'+ productId + '/' + StoreId, config());
    this.GetBusinessByName = (BusinessName) => $http.get(url + '/Reception/GetBusinessByName/' + BusinessName, config());

    // Pos 
    this.GetAllProductToPOS = () => $http.get( url + '/api/POSs', config());
    this.GetProductDetilesToPOS = (productId) => $http.get( url + '/api/POSs/' + productId, config());
    this.CreateCheckout = (model) => $http.post(url + '/api/POSs/CreateOrder', model, config());

    // Basics
    this.GetBasics = () => $http.get( url + '/api/Basic/GetBasics', config());
    this.GetAllBasics = () => $http.get( url + '/api/Basic/GetAllBasics', config());
    this.GetSomeBasics = () => $http.get(url + '/api/Basic/GetSomeBasics', config());
    this.GetAllActiveBasics = () => $http.get( url + '/api/Basic/GetActiveBasics', config());
    this.UpdateAllBasics = (model) => $http.post( url + '/api/Basic/UpdateBasics', model, config());
    this.CreateMaterial = (model) => $http.post(url + '/api/Material/CreateMaterial', model, config());

    // ProductNames
    this.GetAllProductNamesAdd = () => $http.get(url + '/api/ProductNames/GetAllProductNamesAdd', config());
    this.GetAllProductNames = () => $http.get(url + '/api/ProductNames/GetAllProductNames', config());
    this.UpdateProductNames = (model) => $http.post(url + '/api/ProductNames/UpdateProductNames', model, config());
    this.CreateProductNames = (model) => $http.post(url + '/api/ProductNames/CreateProductNames', model, config());

    // MenuFacturer
    this.GetMenuFacturers = () => $http.get(url + '/api/MenuFacturer/GetAllMenuFacturer', config());
    this.CreateMenuFacturers = (model) => $http.post(url + '/api/MenuFacturer/CreateMenuFacturer', model, config());

    // MenuFacturer
    this.GetUniqItemNames = () => $http.get(url + '/api/UniqItemName/GetAllUniqItemName', config());
    this.CreateUniqItemNames = (model) => $http.post(url + '/api/UniqItemName/CreateUniqItemName', model, config());

    /// -- Start Stock 

    // index
    this.GetAllStockIndex = (Date) => $http.get(url + '/api/Stock/index?Date=' + Date, config());
    this.CreateSupplier = (model) => $http.post(url + '/api/Stock/CreateSupplier', model, config());

    // CreatePackge
    this.CreatePackge = (model) => $http.post(url + '/api/Stock/CreatePackge', model, config());
    this.GetSupplierStock = () => $http.get(url + '/api/Stock/GetSupplierStock', config());

    // Stock Remaining
    this.GetAllRemainingStockBill = () => $http.get( url + '/api/Stock/GetRemainingStockBill', config());
    this.CreateRemainingStockBill = (model) => $http.post(url + '/api/Stock/CreateRemainingStockBill', model, config());

    // BillDetiles
    this.GetStockBillbyId = (packageId) => $http.get(url + '/api/Stock/GetPackage/' + packageId, config());
    this.UpdateStockBill = (packageId, model) => $http.put(url + '/api/Stock/UpdatePackage' + packageId, model, config());

    /// -- End Stock

    // Inventory
    this.GetAllInventory = () => $http.get( url + '/api/inventory/index', config());
    this.GetInventoryProfile = (productTypeStyleId) => $http.get( url + '/api/inventory/' + productTypeStyleId, config());

    // Product
    this.GetAllProduct = () => $http.get( url + '/api/Product', config());
    this.GetProductByid = (productId) => $http.get( url + '/api/Product/' + productId, config());
    this.UpdateProduct = (productId, model) => $http.put( url + '/api/Product/' + productId, model, config());
    this.ClearProductColorsByid = (productId) => $http.put( url + '/api/Product/Clear/' + productId, config());

    // Employee
    this.GetAllEmployee = () => $http.get( url + '/api/Employee', config());
    this.GetEmployeeById = (EmployeeId) => $http.get(url + '/api/Employee/' + EmployeeId, config());
    this.CreateEmployee = (model) => $http.post( url + '/api/Employee', model, config());
    this.GetAllRole = () => $http.get( url + '/api/Employee', config());
    this.deleteEmployee = (EmployeeId) => $http.delete(url + '/api/Employee/' + EmployeeId ,config());

    // Outcome
    this.GetAllOutcome = () => $http.get(url + '/api/OutCome/GetOutComes', config());
    this.CreateOutcome = (model) => $http.post(url + '/api/OutCome/CreateOutCome', model, config());
    this.GetAllOutcomeType = () => $http.get(url + '/api/OutCome/GetOutComeTypes', config());
    this.CreateOutcomeType = (model) => $http.post(url + '/api/OutCome/CreateOutComeType', model, config());

    // Orders
    this.GetAllOrders = (From, To) => $http.get(url + '/api/Order/GetAllOrdersByDate?From=' + From + "&&To=" + To, config());
    this.GetOrderByid = (OrderId) => $http.get( url + '/api/Order/' + OrderId, config());
    this.UpdateOrder = (OrderId, model) => $http.put( url + '/api/Order/' + OrderId, model, config());

    //Finance
    this.ReportBydate = (From, To) => $http.get(url + '/api/Finance/DailyReport?From=' + From + "&&To=" + To, config());
    this.GetAllCheckoutBillByDate = (From, To) => $http.get(url + '/api/Finance/OrdersReport?From=' + From + "&&To=" + To, config());
    this.GetAllOutcomeByDate = (From, To) => $http.get(url + '/api/Finance/OutcomesReport?From=' + From + "&&To=" + To, config());
    this.GetinventoryBillsByDate = (From, To) => $http.get(url + '/api/Finance/inventoryBillsReport?From=' + From + "&&To=" + To, config());

});