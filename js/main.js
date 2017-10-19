var pages = document.getElementsByClassName('page');
var menuButtons = document.getElementsByClassName('menu-item');
var modals = document.getElementsByClassName('modal');
var slides = document.getElementsByClassName('slide');
var currentModal;
var pageNum = 0;
var pageMax = $('.menu-item').last().attr('value');
var modalNum = $('.modal').first().attr('value');
var modalMax = modalNum;
var colorNum = 0;
var colorMax = 3;
var colors = ['#3fa9f5', '#564FF7', '#FFCF35', '#FFA735']
var slideLength;
var fixedSlideLength = 0;
if (window.outerWidth < 768) {
  $('.modal').css('height', window.innerHeight - 80);
} else {
  $('.modal').css('height', window.innerHeight * 0.7);
}
$('.slide').css('height', window.innerHeight * 0.5);


function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 1000);
    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
  if (value) {
    $('#'+id).animate({opacity: 'show'}, 200);
  } else {
    $('#'+id).animate({opacity: 'hide'}, 200);
  }
}

onReady(function () {
    show('main', true);
    show('navigation', true);
    show('loader', false);
});

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
        $(menuButton).animate({color: '#FFF', backgroundColor: colors[colorNum]}, 200)
      }
    })

    ;[].forEach.call(pages, function(page){
      var pageIndex = page.getAttribute('value');
      if (menuIndex == pageIndex) {
        $(page).animate({opacity: 'show'}, 200)
        if (menuIndex == 3) {
          slideLength = 450 + (161 * $('.slideGroup li').length);
          if (fixedSlideLength == 0){
            fixedSlideLength = slideLength;
          } else {
            slideLength = fixedSlideLength;
          }
          $('.slideGroup').css('width', slideLength);
          var barRatio = window.innerWidth/slideLength;
          if (barRatio >= 1) {
            barRatio = 1;
          }
          var barLength = parseInt($('.bar').css('width')) - 10;
          var movable = barLength * (1 - barRatio);
          $('.horizontal-slide').css('width', barLength * barRatio);
          $('.horizontal-slide').draggable({
            containment: "parent",
            drag: function(){
              var slideMoving = parseInt(this.style.left)/movable;
              var distance = slideMoving * (slideLength - window.innerWidth);
              $('.slideGroup').css({'left':  -1 * distance +'px'});
            }
          });

          $('.bar').click(function(){
            var mouseCenter = event.offsetX - parseInt($('.horizontal-slide').css('width'))/2;
            var mouseMax = barLength - parseInt($('.horizontal-slide').css('width'));
            if (mouseCenter < 0) {
              mouseCenter = 0
            } else if (mouseCenter > mouseMax) {
              mouseCenter = mouseMax
            }
            $('.horizontal-slide').css({
              left: mouseCenter
            })
            var slideMoving = mouseCenter/movable;
            var distance = slideMoving * (slideLength - window.innerWidth);

            // $('.slideGroup').css({'left': 'calc(50% - '+ distance +'px)'});
            $('.slideGroup').animate({'left':  -1 * distance +'px'});
          })
        }
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
        $('.logo h1:nth-child(2)').text(headText);
        $('.logo h1:nth-child(3)').hide();
      } else {
        $(page).animate({opacity: 'hide'}, 200);
      }
    })
  } else {
    if (colorNum == 0) {
      colorNum = colorMax;
    } else {
      colorNum -= 1;
    }
    $('.contact').animate({'borderColor': colors[colorNum]}, 200);
    $('nav').animate({'backgroundColor': colors[colorNum]}), 200;
    $('.horizontal-slide').animate({'backgroundColor': colors[colorNum]}, 200);
    $('.modal').animate({'borderColor': colors[colorNum]}, 200);
    ;[].forEach.call(menuButtons, function(menuButton){
      if (menuButton.style.backgroundColor == 'rgb(255, 255, 255)') {
        $(menuButton).animate({color: '#444', backgroundColor: '#FFF'})
      } else {
        $(menuButton).animate({color: '#FFF', backgroundColor: colors[colorNum]})
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
        $('.logo h1:nth-child(2)').text(headText);
        $('.logo h1:nth-child(3)').hide();
      } else {
        $(page).animate({opacity: 'hide'}, 200)
      }
    })
  } else {
    if (colorNum == colorMax) {
      colorNum = 0;
    } else {
      colorNum += 1;
    }
    $('.contact').animate({'borderColor': colors[colorNum]}, 200);
    $('nav').animate({'backgroundColor': colors[colorNum]}), 200;
    $('.horizontal-slide').animate({'backgroundColor': colors[colorNum]}, 200);
    $('.modal').animate({'borderColor': colors[colorNum]}, 200);
    ;[].forEach.call(menuButtons, function(menuButton){
      if (menuButton.style.backgroundColor == 'rgb(255, 255, 255)') {
        $(menuButton).animate({color: '#444', backgroundColor: '#FFF'})
      } else {
        $(menuButton).animate({color: '#FFF', backgroundColor: colors[colorNum]})
      }
    })
  }
})
$('.question').on('click', function(){
  $('.introModal').show();
})

$('.modal').on("swiperight", function(){
  if (window.outerWidth < 768) {
    if (modalNum == modalMax) {
      modalNum = 0;
    } else {
      modalNum += 1;
    }
    ;[].forEach.call(modals, function(modal){
      var modalIndex = modal.getAttribute('value');
      if (modalNum == modalIndex) {
        $(modal).animate({opacity: 'show'}, 200)
        if (parseInt($('.modal').css('height')) < parseInt($(modal).children('.text').css('height'))) {
          $(modal).css('height', parseInt($(modal).children('.text').css('height')) + 100)
          $(modal).css('paddingTop', '80px')
        }
        $('.switch[value='+ modalIndex +']').animate({backgroundColor: '#444'}, 200)
      } else {
        $(modal).animate({opacity: 'hide'}, 200);
        $('.switch[value='+ modalIndex +']').animate({backgroundColor: '#FFF'}, 200)
      }
    })
  }
})
$('.modal').on("swipeleft", function(){
  if (window.outerWidth < 768) {
    if (modalNum == 0) {
      modalNum = modalMax;
    } else {
      modalNum -= 1;
    }
    ;[].forEach.call(modals, function(modal){
      var modalIndex = modal.getAttribute('value');
      if (modalNum == modalIndex) {
        $(modal).animate({opacity: 'show'}, 200)
        if (parseInt($('.modal').css('height')) < parseInt($(modal).children('.text').css('height'))) {
          $(modal).css('height', parseInt($(modal).children('.text').css('height')) + 100)
          $(modal).css('paddingTop', '80px')
        }
        $('.switch[value='+ modalIndex +']').animate({backgroundColor: '#444'}, 200)
      } else {
        $(modal).animate({opacity: 'hide'}, 200);
        $('.switch[value='+ modalIndex +']').animate({backgroundColor: '#FFF'}, 200)
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
