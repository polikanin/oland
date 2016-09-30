var name = $('input[name="name"]');
var phone = $('input[name="phone"]');
var requared = $('input[data-required]');
var modal = '.modal';
var navList = $('.nav-link');
var navigationPanel = $('.navigation');
var scrollDuration = 600;
var form = $('form');


name.on('keypress', function() {
    var that = this;

    setTimeout(function() {
        var res = /[^A-Za-zА-Яа-яЁё]/g.exec(that.value);
        that.value = that.value.replace(res, '');
    }, 0);
});
phone.inputmask("+7(999)9999999");
requared.blur(function() {var self = $(this);if($(this).val().length == "") {self.addClass('input_error');setTimeout(function () {self.removeClass('input_error')}, 2000)}});
requared.focus(function() {$(this).removeClass('input_error');});


var close = function () {
    $(modal).addClass('hidden');
    $(modal + '>div:not(.layout)').addClass('hidden');
};


var open = function () {
    $(modal).removeClass('hidden');
    $($(this).data('modal')).removeClass('hidden')
};


form.submit(function(e){
    e.preventDefault();
    var self = $(this);
    var requared = true;
    var inputs = self.find('[data-required]');

    $('[name="frm-name"]').val(self.attr('name'));

    for(var i = 0; i < inputs.length; i++){
        if(inputs.eq(i).val() == '') {
            requared = false;
        }
    }
    if(requared){
        var type = self.attr('method');
        var url = self.attr('action');
        var data = self.serialize();
        $.ajax({type: type, url: url, data: data,
            success : function(){
                $('form input').val('');
                console.log('Success');
            }
        });
    }
    else{
        for(var i = 0; i < inputs.length; i++){
            if(inputs.eq(i).val() == '') {
                inputs.eq(i).addClass('input_error');
                setTimeout(function () {
                    inputs.removeClass('input_error');
                }, 2000);
            }
        }
    }
});


//// скрипт закрывающий форму
$('[data-btn-type="close"]').on('click', close);

//// скрипт открывающий форму
$('[data-modal]').on('click', open);


//// плавная прокрутка по странице
navList.on('click', function(e){
    $('.menu-btn').toggleClass('active');
    var position = $(this).index();
    e.preventDefault();
    $('body, html').animate({
        scrollTop: $('.anchor'+ position +'').offset().top
    },scrollDuration);
});


//// Слайдер
$('.slider').slick({
    slidesToShow: 3,
    arrows: false,
    centerMode: true,
    responsive: [
        {
            breakpoint: 680,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

//// Галерея на слайдере
$('.zoom').fancybox();

//// Определяет заполнен инпут или нет для анимации
// $('.input-body .input').on('blur', function(){
//     var self = $(this);
//
//     if(self.val() !== ''){
//         self.addClass('entered');
//     }
//     else{
//         self.removeClass('entered');
//     }
// });

$('[data-toggle]').on('click', function(){
    var data = $(this).data('toggle');
    $(this).toggleClass(data);
});