
$("#EformValidate").validate({
    rules: {
        StoreName: {
            required: true,
            minlength: 3
        },
        PhoneNumber: {
            required: true,
            minlength: 11,
            maxlength: 11,
            number: true
        },
        Address: {
            required: true,
            minlength: 10
        },
    },
    //For custom messages
    messages: {
        StoreName: {
            required: "أدخل أسم المحل",
            minlength: "أدخل 3 حروف علي الأقل"
        },
        PhoneNumber: {
            required: "أدخل رقم الهاتف",
            minlength: "أدخل 11 رقم علي الأقل",
            maxlength: "أدخل 11 رقم علي الأقل"
        },
        Address: {
            required: "أدخل عنوان المحل",
            minlength: "أدخل 10 رقم علي الأقل",
        },
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
        var placement = $(element).data('error');
        if (placement) {
            $(placement).append(error)
        } else {
            error.insertAfter(element);
        }
    },
    invalidHandler: function (e, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
            $('.error-alert-bar').show();
        }
    },
    submitHandler: function () {
        $('.error-alert-bar').hide();
        $('.success-alert-bar').show().delay(5000).fadeOut();
    }
});

$("#ProductNamesformValidate").validate({
    rules: {
        Titel: {
            required: true,
            minlength: 3
        },
    },
    //For custom messages
    messages: {
        Titel: {
            required: "أدخل أسم المنتج",
            minlength: "أدخل 3 حروف علي الأقل"
        },
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
        var placement = $(element).data('error');
        if (placement) {
            $(placement).append(error)
        } else {
            error.insertAfter(element);
        }
    },
    invalidHandler: function (e, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
            $('.error-alert-bar').show();
        }
    },
    submitHandler: function () {
        $('.error-alert-bar').hide();
        $('.success-alert-bar').show().delay(5000).fadeOut();
    }
});

$("#OutcomeformValidate").validate({
    rules: {
        Type: {
            required: true,
            minlength: 3
        },
        Cost: {
            required: true,
        },
    },
    //For custom messages
    messages: {
        Type: {
            required: "أدخل العنوان",
            minlength: "أدخل 3 حروف علي الأقل"
        },
        Cost: {
            required: "أدخل التكلفه",
        },
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
        var placement = $(element).data('error');
        if (placement) {
            $(placement).append(error)
        } else {
            error.insertAfter(element);
        }
    },
    invalidHandler: function (e, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
            $('.error-alert-bar').show();
        }
    },
    submitHandler: function () {
        $('.error-alert-bar').hide();
        $('.success-alert-bar').show().delay(5000).fadeOut();
    }
});

$("#OutcomeTypeformValidate").validate({
    rules: {
        Type: {
            required: true,
            minlength: 3
        },
    },
    //For custom messages
    messages: {
        Type: {
            required: "أدخل النوع",
            minlength: "أدخل 3 حروف علي الأقل"
        },
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
        var placement = $(element).data('error');
        if (placement) {
            $(placement).append(error)
        } else {
            error.insertAfter(element);
        }
    },
    invalidHandler: function (e, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
            $('.error-alert-bar').show();
        }
    },
    submitHandler: function () {
        $('.error-alert-bar').hide();
        $('.success-alert-bar').show().delay(5000).fadeOut();
    }
});

$("#ProductformValidate").validate({
    rules: {
        Name: {
            required: true,
            minlength: 3
        },
        Code: {
            required: true,
            minlength: 3
        },
        NumberOfPieces: {
            required: true,
        },
        SalePrice: {
            required: true,
        },
        WholesalePrice: {
            required: true,
        },
    },
    //For custom messages
    messages: {
        Name: {
            required: "أدخل اسم المنتج",
            minlength: " أدخل 3 حروف علي الأقل "
        },
        Code: {
            required: "أدخل كود المنتج",
            minlength: " أدخل 3 حروف علي الأقل "
        },
        NumberOfPieces: {
            required: "أدخل عدد القطع",
        },
        SalePrice: {
            required: "أدخل سعر البيع",
        },
        WholesalePrice: {
            required: "أدخل سعر الجمله",
        },
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
        var placement = $(element).data('error');
        if (placement) {
            $(placement).append(error)
        } else {
            error.insertAfter(element);
        }
    },
    invalidHandler: function (e, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
            $('.error-alert-bar').show();
        }
    },
    submitHandler: function () {
        $('.error-alert-bar').hide();
        $('.success-alert-bar').show().delay(5000).fadeOut();
    }
});

$("#addPackageformValidate").validate({
    rules: {
        Remaining: {
            required: true,
        },
        NOP: {
            required: true,
        },
        price: {
            required: true,
        },
    },
    //For custom messages
    messages: {
        Remaining: {
            required: "أدخل السعر المتبقي",
        },
        NOP: {
            required: "أدخل عدد القطع",
        },
        price: {
            required: "أدخل السعر الكلي",
        },
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
        var placement = $(element).data('error');
        if (placement) {
            $(placement).append(error)
        } else {
            error.insertAfter(element);
        }
    },
    invalidHandler: function (e, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
            $('.error-alert-bar').show();
        }
    },
    submitHandler: function () {
        $('.error-alert-bar').hide();
        $('.success-alert-bar').show().delay(5000).fadeOut();
    }
});

$("#SuppliersformValidate").validate({
    rules: {
        Name: {
            required: true,
            minlength: 3
        },
        Phone: {
            required: true,
            minlength: 11,
            maxlength: 11,
        },
    },
    //For custom messages
    messages: {
        Name: {
            required: "أدخل أسم المورد",
            minlength: "أدخل 3 حروف علي الأقل"
        },
        Phone: {
            required: "أدخل رقم الهاتف",
            minlength: "أدخل 11 رقم علي الأقل",
            maxlength: "أدخل 11 رقم علي الأقل"
        },
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
        var placement = $(element).data('error');
        if (placement) {
            $(placement).append(error)
        } else {
            error.insertAfter(element);
        }
    },
    invalidHandler: function (e, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
            $('.error-alert-bar').show();
        }
    },
    submitHandler: function () {
        $('.error-alert-bar').hide();
        $('.success-alert-bar').show().delay(5000).fadeOut();
    }
});

$("#StoreformValidate").validate({
    rules: {
        StoreName: {
            required: true,
            minlength: 3
        },
        PhoneNumber: {
            required: true,
            minlength: 11,
            maxlength: 11,
            number: true
        },
        Address: {
            required: true,
            minlength: 10
        },
    },
    //For custom messages
    messages: {
        StoreName: {
            required: "أدخل أسم المحل",
            minlength: "أدخل 3 حروف علي الأقل"
        },
        PhoneNumber: {
            required: "أدخل رقم الهاتف",
            minlength: "أدخل 11 رقم علي الأقل",
            maxlength: "أدخل 11 رقم علي الأقل"
        },
        Address: {
            required: "أدخل عنوان المحل",
            minlength: "أدخل 10 رقم علي الأقل",
        },
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
        var placement = $(element).data('error');
        if (placement) {
            $(placement).append(error)
        } else {
            error.insertAfter(element);
        }
    },
    invalidHandler: function (e, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
            $('.error-alert-bar').show();
        }
    },
    submitHandler: function () {
        $('.error-alert-bar').hide();
        $('.success-alert-bar').show().delay(5000).fadeOut();
    }
});
