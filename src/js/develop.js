var preloaderFile ='<div class="preloadfile"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="preloadfile__svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="rgb(74,118,166)" stroke-width="2" fill="transparent"    /><circle cx="12" cy="12" r="10"  stroke="rgb(202,205,211)" stroke-width="2" class="preloadfile__circle"/></svg></div>';
function readURL(input) {
    if (input.files && input.files[0]) {
        var mass = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf", "image/bmp", "text/csv"];
        var nt = document.createElement('input');
        nt.setAttribute("type", "file");
        nt.setAttribute("name", 'files[]');
        nt.setAttribute("accept", "image/jpeg,image/png,image/gif,application/pdf,image/bmp,text/csv");
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
            if(typec == "application/pdf" || typec == "text/csv"){
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
function toolTips() {
    var tips;
    $(document).on('mouseenter', '[data-title]',function (e) {
        var that = this;
        var event = e;
       ttInit(that);
       ttPosition(event);
       ttShow();
    });
    $(document).on('mouseleave', '[data-title]',function () {
        ttHide();
    });
    $(document).on('mousemove', '[data-title]',function (e) {
        var event = e;
        ttPosition(event);
    });
    function ttInit(elem) {
        tips = document.createElement('div');
        $(tips).addClass('mego-tool-tip');
        var text = $(elem).attr('data-title');
        $('.js-width').text(text);
        $(tips).text(text);
    }
    function ttPosition(event) {
        $(tips).css('top', event.pageY);
        var left = event.pageX + 10;
        var ww =  $('.js-width').width();
        if((left + ww) > $(document).width()){left = left - ww -30;}
        $(tips).css('left', left);
    }
    function ttShow() {
        $(tips).appendTo('body');
    }
    function ttHide() {
        $(tips).remove();
    }
}
function fixedMenu(menu){
    menu.css('left',($('aside').offset().left) - 25);
    $(window).resize(function () {
        menu.css('left',($('aside').offset().left) - 25);
    });

}
function fireShow(item){
    var target = $(''+$(item).attr('data-target'));
    $(item).toggleClass('active');
    if($(item).hasClass('active')){
        target.stop().slideDown();
    }else{
        target.stop().slideUp();
    }
}
function showHideFilter(item) {
    $(item).toggleClass('active');
    if($(item).hasClass('active')){
        $(item).next().stop().slideDown(100);
    }else{
        $(item).next().stop().slideUp(100);
    }
}
function clearFilter(item) {
    var cont = $(item).closest('form');
    var inputs = cont.find('input, select');
    inputs.each(function () {
        $(this).val('');
    });
}
$(document).ready(function () {
    $('.aside__menu').jScrollPane();
    toolTips();
    if($('.js-styled').length > 0) selectStyled($('.js-styled'));
    if($('.aside__wrap').length > 0) fixedMenu($('.aside__wrap'));
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