 
$(document).on('ready', function(){

  'use strict';
  


//-------close button
  $('.nav-icon3').click(function(){
		$(this).toggleClass('open');
	});
	
$('.more-option').click(function(){
		$('.more-optn').toggleClass('show');
	});	

//------ Side Menu Option 
  $('.nav-icon3').on('click', function(){
    $('.menu-options').toggleClass('active');
    $('.side-header').toggleClass('slide-out');
	$('a.closed').removeClass('slide-out');
    $('.main-content').toggleClass('menu-slide');
	
	return false;
  });
	
//------ scrollbar plugin
	if ($.isFunction($.fn.perfectScrollbar)) {
		$('.side-header, .email-list > ul').perfectScrollbar();
		$('.drop-meta, .news-feed-list, .chat-messages, .tsk-prgs-lst, .friendlist, .scl-wdgt-lst, .rcnt-activt, #lst-itms, .email-compose > form').perfectScrollbar();
		$('.user-list, .widget-peding .browser-static').parent().css({ 'max-height': "315px", 'position': "relative" }) .perfectScrollbar();
		$('.user-activity').css({ 'max-height': "304px", 'position': "relative" }) .perfectScrollbar();
	}

//--nice select
	if ($.isFunction($.fn.niceSelect)) {
	  $('select').niceSelect();
	}
//---- Side Menu
  $('.side-menus li.menu-item-has-children > a').on('click',function(){
    $(this).parent().siblings().children('ul').slideUp();
    $(this).parent().siblings().removeClass('active');
    $(this).parent().children('ul').slideToggle();
    $(this).parent().toggleClass('active');
    return false;
  });
//===== Index Page Scripts End =====//
    if ($.isFunction($.fn.downCount)) {
        $('.countdown').downCount({
            date: '09/26/2020 12:00:00',
            offset: +10
        });
    }
//------- Notifications Dropdowns
  $('.notify-area > li').on("click",function(){
	$(this).siblings().children('div').removeClass('active');
	$(this).children('div').addClass('active');
	return false;
  });
//------- remove class active on body click  
  $("body *").not('.notify-area > li').on("click", function() {
		$(".notify-area > li > div").removeClass('active');
		
 });
//------- admin icon Dropdowns  
	$('.admin-avatar, .admin > span').on("click",function(){
		$('.drop.setting').toggleClass('active');
	});
	  $(".drop").on("click",function(e){
	    e.stopPropagation();
  	}); 

//------- language Dropdowns  
	$('.seting-area .langages').on("click",function(){
		$('.drop.language').toggleClass('active');
	});
	  $(".drop").on("click",function(e){
	    e.stopPropagation();
  	}); 	  
	
//----- table page dot active 
  $('.sngl-slct').on("click",function(){
    $(this).toggleClass('active');
  });
  
//----- owl carousel
if ($.isFunction($.fn.owlCarousel)) {
	$('.megamenu-caro').owlCarousel({ 
		loop:true,
		margin:35,
		smartSpeed: 1000,
		responsiveClass:true,
		autoplay:false,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		responsive:{
			0:{
				items:1,
				nav:true,
				dots:false
			},
			600:{
				items:2,
				nav:true,
				dots: false
			},
			1000:{
				items:3,
				nav:true,
				dots:false
			}
		}
	});
	
//----- testimonial carousel
	$('.testimonial-carousel').owlCarousel({
		autoplay:true,
		autoplayTimeout:3000,
		smartSpeed:2000,
		loop:true,
		dots:false,
		nav:false,
		margin:10,
		singleItem:true,
		items:1,
		animateIn:"fadeIn",
		animateOut:"fadeOut"
});
	
//--- Widget Carousel
    $('.rev-carousel > ul').owlCarousel({
        items:1,
        loop:true,
        margin:10,
        autoplay:false,
        dots:true,
        autoplayTimeout:3000,
    });

    $('.clients-carousel').owlCarousel({
        autoplay:true,
        autoplayTimeout:30000,
        smartSpeed:2000,
        loop:true,
        dots:false,
        nav:false,
        margin:10,
        items:5,
        autoHeight:true,
        responsive:{
          0:{items:1},
          600:{items:2},
          1000:{items:3},
          1200:{items:5}
        }
    });
		}	

//-----comment approved and reject button	
	$('.approv-reject > a').on('click', function() {
		$(this).siblings().removeClass('active');			
		$(this).addClass('active');
		return false;
		});
		
//------ profile page message and follow buton	
	$('.follow-btns li').on('click', function() {
		$(this).siblings().removeClass('active');			
		$(this).addClass('active');
		return false;
		});
		
//----- todo list del or not del	
	$('.todo > li').on('click', function() {
		$(this).siblings().removeClass('active');			
		$(this).addClass('active');
		return false;
		});

//----- Toggle Full Screen
  function goFullScreen() {
    var
    el = document.documentElement
    , rfs =
    el.requestFullScreen
    || el.webkitRequestFullScreen
    || el.mozRequestFullScreen
    || el.msRequestFullscreen

    ;
    rfs.call(el);
  }
  $("#toolFullScreen").on("click",function() {
      goFullScreen();
  });

//------- Slide Panel Toggle
  $(".open-panel").on('click', function(){
     $(".slide-panel").addClass('active');
     $(".main-content").addClass('active');
  });

  $('.main-content').on("click",function(){
     $(".slide-panel").removeClass('active');
     $(this).removeClass('active');
  }); 
  
//------- Refresh Content
  $('.refresh-content > i').on("click", function(){
  $(this).parent().parent().parent().parent().addClass("loading-wait").delay(3000).queue(function(next){
    $(this).removeClass("loading-wait");
      next();
  });
	  $(this).addClass("fa-spin").delay(3000).queue(function(next){
		  $(this).removeClass("fa-spin");
		  next();
	  });
  });

//-------- Expand Content
  $('.expand-content').on("click", function(){
    $(this).parent().parent().parent().toggleClass("expand-this");
  });

//-------- Delete Content
  $('.close-content').on("click", function(){
    $(this).parent().parent().parent().slideUp();
	return false;
  });
  
// todo list delete row
$('.del-content').on("click", function(){
    $(this).parent().slideUp();
	return false;
  }); 
  
//-----our projects
$('.del-btn').on("click", function(){
    $(this).parent().parent().parent().parent().slideUp();
	return false;
  }); 
//-----expend widget with side panel out  
 $('.expand-content').on("click", function () {
	$('.side-header').toggleClass('slide-out');
	return false;
}); 
  
//----- To Do Lists
	$('.td-lst-bdy > ul > li').on("click", function () {
		$(this).toggleClass('active');
		return false;
	});

	//===== To Do Lists Deleted =====//
	$('.td-lst-bdy > ul > li > span').on("click", function () {
		$(this).parent().slideUp();
		return false;
	});

	var counter = 0;
	$('button#adtsk-btn, button#adtsk-btn > i').on('click', function () {
		var ul = $('ul#lst-itms');
		var item = $('input#tsk-item').val();
		if (item !== '' && item !== 'undefined') {
			$(ul).prepend('<li><i class="sngl-slct1"></i>' + item + '<span class="fa fa-close"></span></li>');
			$('.td-lst-bdy > ul > li').on("click", function () {
				$(this).toggleClass('active');
			});
			$('.td-lst-bdy > ul > li > span').on("click", function () {
				$(this).parent().slideUp();
			});
			$('input#tsk-item').addClass('null');
			$('input#tsk-item').val('');
			$('input#tsk-item').focus();
			var attribute = $("ul#lst-itms").children('li').eq(0).children('i');
			return false;
		}

	});
	
//----- Touch Spin
    if ($.isFunction($.fn.TouchSpin)) {
        $('.qty').TouchSpin({});
    }
//----- Select Script
	$('.sngl-slct').on('click', function () {
		$(this).toggleClass('selected');
		return false;
	});

	$('.all-slct').on('click', function () {
		$(this).addClass('selected');
		$('.sngl-slct').addClass('selected');
		return false;
	});	
		 
//----- Accordion
	$('#toggle .content').hide();
	$('#toggle h3:first').addClass('active').next().slideDown(500).parent().addClass("activate");
	$('#toggle h3').on("click", function () {
		if ($(this).next().is(':hidden')) {
			$('#toggle h3').removeClass('active').next().slideUp(500).removeClass('animated zoomIn').parent().removeClass("activate");
			$(this).toggleClass('active').next().slideDown(500).addClass('animated zoomIn').parent().toggleClass("activate");
			return false;
		}
	});
	
//===== Accordion =====//
	$('#toggle2 .content').hide();
	$('#toggle2 h3:first').addClass('active').next().slideDown(500).parent().addClass("activate");
	$('#toggle2 h3').on("click", function () {
		if ($(this).next().is(':hidden')) {
			$('#toggle2 h3').removeClass('active').next().slideUp(500).removeClass('animated zoomIn').parent().removeClass("activate");
			$(this).toggleClass('active').next().slideDown(500).addClass('animated zoomIn').parent().toggleClass("activate");
			return false;
		}
	});
	
//===== Accordion =====//
	$('#toggle3 .content').hide();
	$('#toggle3 h3:first').addClass('active').next().slideDown(500).parent().addClass("activate");
	$('#toggle3 h3').on("click", function () {
		if ($(this).next().is(':hidden')) {
			$('#toggle3 h3').removeClass('active').next().slideUp(500).removeClass('animated zoomIn').parent().removeClass("activate");
			$(this).toggleClass('active').next().slideDown(500).addClass('animated zoomIn').parent().toggleClass("activate");
			return false;
		}
	});
	
//===== Accordion =====//
	$('#toggle4 .content').hide();
	$('#toggle4 h3:first').addClass('active').next().slideDown(500).parent().addClass("activate");
	$('#toggle4 h3').on("click", function () {
		if ($(this).next().is(':hidden')) {
			$('#toggle4 h3').removeClass('active').next().slideUp(500).removeClass('animated zoomIn').parent().removeClass("activate");
			$(this).toggleClass('active').next().slideDown(500).addClass('animated zoomIn').parent().toggleClass("activate");
			return false;
		}
	});
	
//===== Accordion =====//
	$('#toggle5 .content').hide();
	$('#toggle5 h3:first').addClass('active').next().slideDown(500).parent().addClass("activate");
	$('#toggle5 h3').on("click", function () {
		if ($(this).next().is(':hidden')) {
			$('#toggle5 h3').removeClass('active').next().slideUp(500).removeClass('animated zoomIn').parent().removeClass("activate");
			$(this).toggleClass('active').next().slideDown(500).addClass('animated zoomIn').parent().toggleClass("activate");
			return false;
		}
	});  
	
//---- calander	
	if ($.isFunction($.fn.jalendar)) { 
	 $('#yourId').jalendar({
			customDay: '11/01/2015',
			color: '#577e9a', // Unlimited Colors
			color2: '#57c8bf', // Unlimited Colors
			lang: 'EN',
			sundayStart: true
		});
	 }
//---- donut in home5	 
	 if ($.isFunction($.fn.peity)) {  
		$(".data-attributes span").peity("donut");
	 }

//----- Map Jvector
  if ($.isFunction($.fn.vectorMap)) { 
    jQuery('#vctr-map').vectorMap({
        map: 'world_en',
        backgroundColor: null,
        borderColor: '#818181',
        borderOpacity: 0.25,
        borderWidth: 0.25,
        color: '#a1c8ba',
        colors: {
            mo: '#a8b2bd',
            fl: '#a8b2bd',
            or: '#a8b2bd'
        },
        enableZoom: true,
        showLabels: true,
        hoverColor: '#7dadac',
        hoverOpacity: null,
        scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: '#437383',
        selectedRegions: [],
        showTooltip: true,
        normalizeFunction: 'polynomial',
        onRegionClick: function(element, code, region)
        {
            var message = 'You clicked "'
            + region
            + '" which has the code: '
            + code.toUpperCase();

            alert(message);
        }
    });
 }
 

//**** Slide Panel Toggle ***//
	  $(".setting-panel > a").on("click", function(){
	     $(".side-panel").addClass('active');
		  $(".panel-layout").addClass('active');
		  return false;
	  });

	  $('.panel-layout').on("click",function(){
		  $(this).removeClass('active');
	     $(".side-panel").removeClass('active');
		  
	     
	  });	
	
//-----Side Panel Functions
	$(".panel-icon").on('click', function(){
         $(".side-panel").toggleClass("show");
	});	
	
	$(".boxed-style").on('click', function(){
		$(".panel-layout").addClass("boxed");
		$("body").addClass('bg-body1');
	});
	$(".full-style").on('click', function(){
            $(".panel-layout").removeClass("boxed");
            var body = $("body");
            body.removeClass('bg-body1');
            body.removeClass('bg-body2');
            body.removeClass('bg-body3');
            body.removeClass('bg-body4');
	});
	$(".pat1").on('click', function(){
            var body = $('body');
            body.addClass('bg-body1');
            body.removeClass('bg-body2');
            body.removeClass('bg-body3');
            body.removeClass('bg-body4');
	});
	$(".pat2").on('click', function(){
            var body = $("body");
            body.removeClass('bg-body1');
            body.addClass('bg-body2');
            body.removeClass('bg-body3');
            body.removeClass('bg-body4');
	});
	$(".pat3").on('click', function(){
            var body = $("body");
            body.removeClass('bg-body1');
            body.removeClass('bg-body2');
            body.addClass('bg-body3');
            body.removeClass('bg-body4');
	});
	$(".pat4").on('click', function(){
            var body = $('body');
            body.removeClass('bg-body1');
            body.removeClass('bg-body2');
            body.removeClass('bg-body3');
            body.addClass('bg-body4');
	});
	
});
	

/*Preloader*/
  $(window).on('load', function() {
	  "use strict";
    setTimeout(function() {
      $('body').addClass('loaded');
    }, 200);
  });