$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
    });

    $(window).click(function(e){
        // if (e.srcElement)
        //     tag = e.srcElement.tagName;
        // else if (e.target)
        //       tag = e.target.parentNode.className;
        
        // alert("El elemento selecionado ha sido " + tag);

        // if(e.target.parentNode.className == 'box unea' || e.target.className == 'box unea'){
        //     $('.un').removeClass('ver')
        //     $('.st').addClass('ver')
        // } else if(e.target.parentNode.className == 'box store' || e.target.className == 'box store'){
        //     $('.st').removeClass('ver')
        //     $('.un').addClass('ver')
        // }
    });

    // toggle menu/navbar script

    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 2,
                nav: false
            }
        }
    }); 

    // typing animation

    var typed = new Typed(".typing",{
        strings: ["Encontrar lo que necesitas","Ver informacion relevante","Conocer sobre el mundo de la tecnologia"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2",{
        strings: ["Encontrar lo que necesitas","Ver informacion relevante","Conocer sobre el mundo de la tecnologia"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
});