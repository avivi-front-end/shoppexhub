var preloaderFile ='<div class="preloadfile"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="preloadfile__svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="rgb(74,118,166)" stroke-width="2" fill="transparent"    /><circle cx="12" cy="12" r="10"  stroke="rgb(202,205,211)" stroke-width="2" class="preloadfile__circle"/></svg></div>';
function readURL(input) {
    if (input.files && input.files[0]) {
        var mass = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf", "image/bmp"];
        var nt = document.createElement('input');
        nt.setAttribute("type", "file");
        nt.setAttribute("name", 'files[]');
        nt.setAttribute("accept", "image/jpeg,image/png,image/gif,application/pdf,image/bmp");
        var reader = new FileReader();
        reader.onload = function (e) {
            var div = $('.journal__imgitem.etalon').clone();
            div.removeClass('etalon');
            var img = div.find('img');
            var typec = input.files[0].type;
            var size = input.files[0].size;
            div.find('p').text(input.files[0].name);
            $(img).attr('src', e.target.result);
            function acceptung() {
                div.append(preloaderFile);
                $(input).closest('.journal__buttons').find('.js-container-img').append(div);
                $(input).closest('label').prepend(nt);
                div.append(input);
            }
            function declinetung() {
                $(input).closest('label').prepend(nt);
                $(input).remove();
            }
            if(typec == "application/pdf"){
                if(size > 11000000){
                    declinetung();
                    alert('max size 4 pdf 10Mb');
                }else{
                    $(img).attr('src', 'images/pdf.jpg');
                    acceptung();
                }
            }else if($.inArray(typec, mass) == -1 ){
                declinetung();
            }else if(size > 6100000){
                declinetung();
                alert('max size 4 image 6Mb');
            }else{
                acceptung();
            }
        }
        reader.readAsDataURL(input.files[0]);

    }
}
function readFile(input) {
    if (input.files && input.files[0]) {
        var mass = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf", "image/bmp"];
        var nt = document.createElement('input');
        nt.setAttribute("type", "file");
        nt.setAttribute("name", 'files[]');
        nt.setAttribute("accept", "image/jpeg,image/png,image/gif,application/pdf,image/bmp");
        var reader = new FileReader();
        reader.onload = function (e) {
            var div = $('.fileinput__item-wrap.etalon').clone();
            div.removeClass('etalon');
            var img = div.find('img');
            var typec = input.files[0].type;
            var size = input.files[0].size;
            div.find('.js-file-name').text(input.files[0].name);
            div.find('.js-file-size').text(bytesToSize(input.files[0].size));
            div.find('a').attr('href', e.target.result);
            $(img).attr('src', e.target.result);
            function acceptung() {
                div.append(preloaderFile);
                $(input).closest('.fileinput').find('.fileinput__result').append(div);
                $(input).closest('label').prepend(nt);
                div.append(input);
            }
            function declinetung() {
                $(input).closest('label').prepend(nt);
                $(input).remove();
            }
            if(typec == "application/pdf"){
                if(size > 11000000){
                    declinetung();
                    alert('max size 4 pdf 10Mb');
                }else{
                    $(img).attr('src', 'images/pdf.jpg');
                    acceptung();
                }
            }else if($.inArray(typec, mass) == -1 ){
                declinetung();
            }else if(size > 6100000){
                declinetung();
                alert('max size 4 image 6Mb');
            }else{
                acceptung();
            }
        }
        reader.readAsDataURL(input.files[0]);

    }
}
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
function journalLogic(){
    $(document).on('click', '.js-show-hide-journal', function () {
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $('.dayinner__journal').stop().slideDown();
        }else{
            $('.dayinner__journal').stop().slideUp();
        }
    });
    $(document).on('click', '.js-hide-journal', function () {
        $('.js-show-hide-journal').removeClass('active');
        $('.dayinner__journal').stop().slideUp();
    });
}
function selectStyled(elem){
    elem.each(function () {
        $(this).styler({
            selectSmartPositioning: false
        });
    });
}
function clickClear () {
    $(document).on('click', ' .js-clear', function (e) {
        var target = $(this).attr('href');
        $(target).val('').focus();

        e.preventDefault();
    });
}
$(document).ready(function () {
    if($('.js-styled').length > 0) selectStyled($('.js-styled'));
    journalLogic();
    clickClear();
    $(document).on('change', '.js-input-file input',function(){
        readURL(this);
    });
    $(document).on('change', '.js-tablecheck',function(){
        if($(this).prop('checked')){
            $(this).closest('tr').addClass('active');
        }else{
            $(this).closest('tr').removeClass('active');
        }
    });
    $(document).on('change', '.js-need-file input',function(){
        readFile(this);
    });
    $(document).on('click', '.journal__imgitem button',function(){
        $(this).closest('.journal__imgitem').remove();
    });

});