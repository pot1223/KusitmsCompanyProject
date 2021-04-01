function wrapWindowByMask(){
    //화면의 높이와 너비를 구한다.
    var maskHeight = $(document).height();  
    var maskWidth = $(window).width();  

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
    $('#mask').css({'width':maskWidth,'height':maskHeight});     
    $('#mask').fadeTo("slow",0.8);    

    //윈도우 같은 거 띄운다.
    $('.loading').show();
}

// $(window).load(function(){
//     $('.loader').delay('2000').fadeOut();
// });

$(document).ready(function(){
    //검은 막 띄우기
    $('.openMask').click(function(e){
        // $('.loader').delay('2000').fadeOut();
        e.preventDefault();
        wrapWindowByMask();   
    });
    //검은 막을 눌렀을 때
    $('#mask').click(function () {  
        $(this).hide();  
       
    });      
});