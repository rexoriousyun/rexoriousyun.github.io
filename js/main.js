var pages = document.getElementsByClassName('page');
var menuButtons = document.getElementsByClassName('menu-item');
var modals = document.getElementsByClassName('modal');
var slides = document.getElementsByClassName('slide');
var currentModal;
var pageNum = 0;
var pageMax = $('.menu-item').last().attr('value');

$('.introModal').click(function(){
  $(this).animate({
    opacity: 'hide'
  },200)
})

;[].forEach.call(menuButtons, function(menuButton){
  menuButton.addEventListener('click', function(){
    var menuIndex = this.getAttribute('value');

    ;[].forEach.call(menuButtons, function(menuButton){
      if (menuButton.getAttribute('value') == menuIndex && menuIndex != 0) {
        $(menuButton).animate({color: '#444', backgroundColor: '#FFF'}, 200)
      } else {
        $(menuButton).animate({color: '#FFF', backgroundColor: '#3fa9f5'}, 200)
      }
    })

    ;[].forEach.call(pages, function(page){
      var pageIndex = page.getAttribute('value');
      if (menuIndex == pageIndex) {
        $(page).animate({opacity: 'show'}, 200)
        // page.style.display = 'block';
      } else {
        $(page).animate({opacity: 'hide'}, 200)
      }
    })
  })
})


$('nav').on("swiperight", function(){
  if (window.outerWidth < 768) {
    if (pageNum == 0) {
      pageNum = pageMax;
    } else {
      pageNum -= 1;
    }
    ;[].forEach.call(pages, function(page){
      var pageIndex = page.getAttribute('value');
      if (pageNum == pageIndex) {
        var headText = $('.menu-item[value='+ pageIndex +'] h3').text();
        $(page).animate({opacity: 'show'}, 200)
        $('.logo h1:first-child').text(headText);
        $('.logo h1:last-child').hide();
      } else {
        $(page).animate({opacity: 'hide'}, 200);
      }
    })
  }
})
$('nav').on("swipeleft", function(){
  if (window.outerWidth < 768) {
    if (pageNum == pageMax) {
      pageNum = 0;
    } else {
      pageNum += 1;
    }
    ;[].forEach.call(pages, function(page){
      var pageIndex = page.getAttribute('value');
      if (pageNum == pageIndex) {
        var headText = $('.menu-item[value='+ pageIndex +'] h3').text();
        $(page).animate({opacity: 'show'}, 200)
        $('.logo h1:first-child').text(headText);
        $('.logo h1:last-child').hide();
      } else {
        $(page).animate({opacity: 'hide'}, 200)
      }
    })
  }
})

$('.slide').click(function(){
  if ($(this).hasClass('open')){
    var slideIndex = this.getAttribute('value');
    ;[].forEach.call(modals, function(modal){
      var modalIndex = modal.getAttribute('value');
      if (slideIndex == modalIndex) {
        $(modal).animate({'opacity': 'show'}, 200);
        currentModal = modal;
      } else {
        $(modal).animate({'opacity': 'hide'}, 200);
      }
    })
  } else {
    //add effect to opening one
    $(this).animate({'width': '400px'}, 100);
    $(this).find('img').animate({'opacity': '0.7'}, 50);
    $(this).find('h3, h6').animate({'opacity': 'show'}, 50);

    //close opened ones
    $('.open').animate({'width': '150px'}, 100);
    $('.open').find('img').animate({'opacity': '0.5'}, 50);
    if ($('.open').attr('value') != null){
      $('.open').find('h3, h6').animate({'opacity': 'hide'}, 50);
    }
    $('.open').removeClass('open');

    //add class to opening one
    $(this).addClass('open');
  }
})

$('.close').click(function(){
  $(currentModal).animate({opacity: 'hide'}, 200);
})

var slideLength = parseInt($('.slideGroup').css('width')) + 400 - window.outerWidth;
var barToSlideRatio = window.outerWidth/slideLength;
if (barToSlideRatio > 1 || barToSlideRatio <= 0) {
  barToSlideRatio = 0.8;
}
var barMargin = parseInt($('.horizontal-slide').css('margin-right'));
$('.horizontal-slide').css('width', barToSlideRatio * parseInt($('.bar').css('width')) - barMargin * 2);
var barCenter = parseInt($('.horizontal-slide').css('width'))/2
var barLength = parseInt($('.bar').css('width')) - barCenter * 2 - barMargin * 2;


$('.horizontal-slide').draggable({
  containment: "parent",
  drag: function(){
    var barLocation = parseInt($(this).css('left'));
    var barRatio = barLocation/barLength;
    var slideLocation = slideLength * barRatio * -1;
    if (slideLocation > 0) {slideLocation = slideLocation * -1};
    $('.slideGroup').css('left', slideLocation)
  }
});

$('.bar').click(function(){
  var barLocation = event.clientX - $('.bar').offset().left - barCenter;
  if (barLocation < 0){
    barLocation = 0;
  } else if (barLocation > barLength) {
    barLocation = barLength;
  }
  var barRatio = barLocation/barLength;
  var slideLocation = slideLength * barRatio * -1;
  if (slideLocation > 0) {slideLocation = slideLocation * -1};
  $('.horizontal-slide').animate({'left': barLocation}, 200);
  $('.slideGroup').animate({'left': slideLocation}, 200);
})


window.onload = function(){
  ;[].forEach.call(pages, function(page){
    var pageIndex = page.getAttribute('value');
    if (pageIndex == 0) {
      page.style.display = 'block';
    } else {
      page.style.display = 'none';
    }
    ;[].forEach.call(modals, function(modal){
      modal.style.display = 'none';
    })
  })
  if (window.outerWidth < 768) {
    $('.introModal').show();
  }
}
