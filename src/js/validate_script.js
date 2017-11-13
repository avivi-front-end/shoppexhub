
var validationMessages = {
    email:{required: "Вы пропустили", maxlength: "превышает 72", email:"невалидный почта", remote:"ответочка от бека"},
    password:{required: "Вы пропустили", minlength: "минимум 6", maxlength: "превышает 72",},
    repassword:{required: "Вы пропустили",equalTo:"пароли не совпадают.", minlength: "минимум 6", maxlength: "превышает 72",},
    agree:{required: "Вы пропустили"},
}
function validation(form,options) {
    var valic;
    var setings = {
        submitFunction:null,
    };
    $.extend(setings, options);
    var $form = $(form);
    console.log($form);
    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function (e) {
            e.preventDefault();
        });
        valic = $form.validate({
            rules:{
                email:{
                    required: true,
                    maxlength: 72,
                    email: true,
                    remote: {
                        url: "ajax2.php",
                        type: "POST",
                        cache: false,
                        dataType: "json",
                        data: {
                            email: function() { return $("#email").val(); }
                        },
                        dataFilter: function(response) {
                            return jQuery.parseJSON(response);
                        }
                    }
                },
                password:{required: true, minlength: 5, maxlength: 72},
                repassword:{ minlength:3, equalTo:"[name=password]"},
                agree:{required: true},

            },
            messages:validationMessages,
            highlight: function(element, errorClass, validClass) {

                $(element).addClass(errorClass).removeClass(validClass);
                $(element).closest('.js-input').addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                $(element).closest('.js-input').removeClass(errorClass).addClass(validClass);
            },
            errorPlacement: function(error, element) {
                var errorHTML= '<div class="error-placement"><i class="js-notvalid"><svg><use xlink:href="#notvalid"></use></svg></i><i class="js-valid"><svg><use xlink:href="#valid"></use></svg></i><div class="error-placement-text">'+error.text()+'</div></div>';
                element.closest('.js-input').find('.error-placement').remove();
                element.closest('.js-input').prepend(errorHTML);
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });
    }
}
$.validator.methods.email = function( value, element ) {
    return this.optional( element ) || /[A-z\d]+@[A-z\d]+\.[A-z]{2,6}$/g.test( value );
}


$(document).ready(function(){
    if($('form#enter-popup').length > 0) validation('form#enter-popup');
});
