(function () {
    "use strict"
    angular.module("akFileUploader", [])
        .factory("akFileUploaderService", ["$q", "$http",
            function ($q, $http) {
                var getModelAsFormData = function (Rdata) {
                    var dataAsFormData = new FormData();
                    angular.forEach(Rdata, function (key, value) {
                        dataAsFormData.append(key, value);
                    });
                    return dataAsFormData;
                };
                var saveModel = function (Rdata, url) {
                    var deferred = $q.defer();
                    var dto = getModelAsFormData(Rdata);
                    $http({
                        url: url,
                        method: "POST",
                        data: Rdata,
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'multipart/form-data; boundary=---------------------------41184676334',
                        },
                        transformRequest: angular.identity
                    }).then(function (result) {
                        deferred.resolve(result);
                    }, function (result, error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                return {
                    saveModel: saveModel
                }
            }])
        .directive("akFileModel", ["$parse",
            function ($parse) {
                return {
                    restrict: "A",
                    link: function (scope, element, attrs) {
                        var model = $parse(attrs.akFileModel);
                        var modelSetter = model.assign;
                        element.bind("change", function () {
                            scope.$apply(function () {
                                modelSetter(scope, element[0].files[0]);
                            });
                        });
                    }
                };
            }]);
})(window, document);