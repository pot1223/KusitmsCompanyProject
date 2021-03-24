
$(function (){

    var scroll =$(document).scrollTop();
    var navHeight = $('.navbar_body').outerHeight();

    $(window).scroll(function (){
        var scrolled = $(document).scrollTop();

        if(scrolled>navHeight){

            $('.navbar_body').addClass('animate');
        }
        else{
            $('.navbar_body').removeClass('animate');

        }

        if(scrolled>scroll){

            $('.navbar_body').removeClass('sticky');
        }
        else{
            $('.navbar_body').addClass('sticky');
        }
        scroll = $(document).scrollTop();
    })
})