/*---------------------------------------------
Template name:  
Version:        1.0
Author:         ThemeLooks
Author url:     http://themelooks.com

NOTE:
------
Please DO NOT EDIT THIS JS, you may need to use "custom.js" file for writing your custom js.
We may release future updates so it will overwrite this file. it's better and safer to use "custom.js".

[Table of Content]

01: Default JS
    1.1: Background Image
    1.2: SVG Image
02: Navbar
    2.1: Scroll Effect
    2.2: Search Form
    2.3: Off Canvas
03: Owl Carousel
    3.1: Banner Slider
    xxx:: Default Owl Carousel Options
04: Parallax Effect
05: Bootstrap Accordion
06: Counter Up
07: Google Map
08: Contact Dropdown
09: Ajax Contact Form
10: Preloader
11: Back to Top
----------------------------------------------*/

(function($) {
    "use strict";

    /* 01: Default JS
    ==============================================*/
    /* 1.1: Background Image */
    var $bgImg = $('[data-bg-img]');
    $bgImg.css('background-image', function () {
        return 'url("' + $(this).data('bg-img') + '")';
    }).removeAttr('data-bg-img').addClass('bg-img');

    /* 1.2: SVG Image */
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
    
        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
    
            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
    
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
    
            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
    
            // Replace image with new SVG
            $img.replaceWith($svg);
    
        }, 'xml');
    
    });

    $('select').niceSelect();
    
    

    /* 02: Navbar
    ==============================================*/
    /* 2.1: Scroll Effect */
    var $win = $(window);
    var $height = $('.lawFirm--navbar-cover').height();
    var $navbarCover = $('.lawFirm--navbar-cover');

    $win.on('scroll', function(){
        if ($win.scrollTop() >= $height ) {
            $navbarCover.addClass('sticky', 2000);
        } else {
            $navbarCover.removeClass('sticky', 2000);
        }
    });

    /* 2.2: Search Form */
    var $win = $(window);
    var $searchIcon = $('.lawFirm--mobile-header-icon .lawFirm--search-form-icon .fa');
    var $searchForm = $('.lawFirm--mobile-header-icon .lawFirm--search-form-icon .lawFirm--header-search-form');
    var $searchArea = $('.lawFirm--mobile-header-icon .lawFirm--search-form-icon');

    $searchIcon.on('click', function(){
        $searchForm.toggleClass('showBlock');
    });

    $win.on('click.Bst', function(event){		
        if ( $searchArea.has(event.target).length == 0 && !$searchArea.is(event.target)){
            $searchForm.removeClass('showBlock');
        }
    });

    /* 2.3: Off Canvas */
    var $openCanvas = $('.lawFirm--off-canvas-trigger .fa');
    var $closeCanvas = $('.lawFirm--off-canvas-close');
    var $canvas = $('.lawFirm--off-canvas');

    $openCanvas.on('click', function(){
        $canvas.addClass('openCanvas');
    });

    $closeCanvas.on('click', function(){
        $canvas.removeClass('openCanvas');
    });

    /* 2.4: Responsive Navbar */
    $(".lawFirm--nav-menu").menumaker({
        title: "<i class='fa fa-bars'></i>",
        format: "multitoggle"
    });
    $('.lawFirm--header .lawFirm--nav-menu ul li.menu-item-has-children .submenu-button').append('<i class="fa fa-angle-down"></i>');

    
    

    /* 03: Owl Carousel
    ==============================================*/
    /* 3.1: Banner Slider */
    var owl = $('.lawFirm--banner-slider');
    owl.owlCarousel({
        items : 1,
        nav: true,
        dots: false,
        navText: ['<img src="assets/images/slider-images/nav/left-hover.png">', '<img src="assets/images/slider-images/nav/right-hover.png">'],
        mouseDrag: false,
        loop: true,
        onInitialized  : counter,
        onTranslated : counter
    });

    function counter(event) {
        var element   = event.target;
        var items     = event.item.count;
        var item      = event.item.index + 1;
        
        // it loop is true then reset counter from 1
        if(item > items) {
        item = item - items
        }
        $('#counter').html(item+"<sup>/<span></span>"+items+"</sup>");

        if (item < 10) {
            $('#counter').prepend('0');
        }
        if (items < 10) {
            $('#counter sup span').prepend('0');
        }
    }

    /* xxx:: Default Owl Carousel Options */
    var checkData = function (data, value) {
        return typeof data === 'undefined' ? value : data;
    };

    var $owlCarousel = $('.owl-carousel');
    $owlCarousel.each(function () {
        var $t = $(this);
            
        $t.owlCarousel({
            items: checkData( $t.data('owl-items'), 1 ),
            margin: checkData( $t.data('owl-margin'), 0 ),
            loop: checkData( $t.data('owl-loop'), true ),
            smartSpeed: 1000,
            autoplay: checkData( $t.data('owl-autoplay'), true ),
            autoplayTimeout: checkData( $t.data('owl-speed'), 8000 ),
            center: checkData( $t.data('owl-center'), false ),
            animateIn: checkData( $t.data('owl-animate-in'), false ),
            animateOut: checkData( $t.data('owl-animate-out'), false ),
            nav: checkData( $t.data('owl-nav'), false ),
            navText: ['<img src="assets/images/slider-images/nav/left-hover.png">', '<img src="assets/images/slider-images/nav/right-hover.png">'],
            dots: checkData( $t.data('owl-dots'), false ),
            responsive: checkData( $t.data('owl-responsive'), {} ),
            mouseDrag: checkData($t.data('owl-mouse-drag'), false)
        });
    });


    /* 04: Parallax Effect
    ==============================================*/
    $(window).on('resize', function(){
        if ($(window).width() > 991) {
            $('.parallax-effect').paroller();
        }
    });

    if ($(window).width() > 991) {
        $('.parallax-effect').paroller();
    }
    


    /* 05: Bootstrap Accordion
    ==============================================*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });
    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });
    $(".lawFirm--w-process-items .lawFirm--acc-item .target-area h3").on("click", function(t) {
        $(this).parents(".lawFirm--acc-item").children(".collapse").hasClass("show") && (t.stopPropagation(), t.preventDefault());
    });

    /* 06: Counter Up
    ==============================================*/
    $('.counter').counterUp({
        delay: 10,
        time: 2500
    });


    /* 07: Google Map
    ==============================================*/
    var $map2 = $('#map'),

    setMap = function () {
        var map = new google.maps.Map($map2[0], {
            center: { lat: $map2.data('map-latitude'), lng: $map2.data('map-longitude') },
            zoom: $map2.data('map-zoom'),
            scrollwheel: false,
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f7f1df"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#d0e3b4"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural.terrain",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.business",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.medical",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#fbd3da"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#bde6ab"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffe15f"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#efd151"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "black"
                        }
                    ]
                },
                {
                    "featureType": "transit.station.airport",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#cfb2db"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#a2daf2"
                        }
                    ]
                }
            ]
        });

        if (typeof $map2.data('map-marker') !== 'undefined') {
            var data = $map2.data('map-marker'),
                i = 0;

            for (i; i < data.length; i++) {
                new google.maps.Marker({
                    position: { lat: data[i][0], lng: data[i][1] },
                    map: map,
                    animation: google.maps.Animation.DROP,
                    draggable: true,
                    // icon: 'assets/images/map-marker-icon.png'
                });
            }
        }
    };

    if ($map2.length) {
        $map2.css('height', 500);

        setMap();
    }

    /* 08: Office Dropdown
    ==============================================*/
    $('.lawFirm--contact .nav.nav-pills .nav-item .dropdown-menu .nav-link').on('click', function(){
        var oText = $(this).text();
        $('.lawFirm--contact .nav.nav-pills .nav-item > .nav-link').html(oText + " Office");
    });
    
    /* 09: Ajax Contact Form
    ==============================================*/
    $('.lawFirm--contact-form').on('submit', 'form', function(e) {
        e.preventDefault();

        var $el = $(this);

        $.post($el.attr('action'), $el.serialize(), function(res){
            res = $.parseJSON( res );
            $el.parent('.lawFirm--contact-form').find('.form-response').html('<span>' + res[1] + '</span>');
        });
    });

    /* 10: Preloader
    ==============================================*/
    $(window).on('load', function () {
        $('.preloader').fadeOut(2000);
    });

    /* 09: Back to Top
    ==============================================*/
    var $backToTopBtn = $('.back-to-top');

    if ($backToTopBtn.length) {
        var scrollTrigger = 400, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $backToTopBtn.addClass('show');
            } else {
                $backToTopBtn.removeClass('show');
            }
        };

        backToTop();

        $(window).on('scroll', function () {
            backToTop();
        });

        $backToTopBtn.on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

})(jQuery);
