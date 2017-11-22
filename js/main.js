var menuOpen = false;
var modalOpen = false;
var currentNumber;
var maxModalValue = $('.modal:first-child').attr('value');

$('.trigger').click(function(){
  if (modalOpen && menuOpen == false) {
    $('.modal').hide();
    $('.works').animate({'opacity':'show'});
    $(this).css({'transition': 'transform 0.5s', 'transform': 'rotate(0deg)'});
    modalOpen = false;
  } else if (menuOpen == false){
    if (window.innerWidth < 600) {
      $('.menu').animate({'width': '100%'});
      $('.content').hide();
    } else {
      $('.menu').animate({'width': '30%', 'minWidth': '300px'});
    }
    $('.page').animate({'marginLeft': '20px'});
    $('.page').animate({'marginRight': '20px'});
    $(this).css({'transition': 'transform 0.5s', 'transform': 'rotate(45deg)'});
    menuOpen = true;
  } else {
    $('.menu').animate({'width': '0px', 'minWidth': '0px', 'marginRight': '0px'});
    $('.content').animate({'opacity': 'show'});
    if (window.innerWidth > 1024) {
      $('.page').animate({'marginLeft': '0px'});
      $('.page').animate({'marginRight': '0px'});
    }
    $(this).css({'transition': 'transform 0.5s', 'transform': 'rotate(0deg)'});
    menuOpen = false;
  }
})

$('.menu li').click(function(){
  var liVal = $(this).attr('value');
  $('.page').each(function(){
    if (liVal == $(this).attr('value')){
      $(this).animate({'opacity':'show'}, 1000);
    } else {
      $(this).hide();
    }
  })
  if (window.innerWidth < 600) {
    $('.trigger').trigger('click');
  }
})

$('.card').hover(function() {
    $(this).children('.color').animate({'opacity': 0.2});
  }, function() {
    $(this).children('.color').animate({'opacity': 1});
  }
);

$('.card').click(function(){
  $('.works').animate({'opacity':'hide'});
  if (menuOpen) {
    $('.menu').animate({'width': '0px', 'minWidth': '0px', 'marginRight': '0px'});
    if (window.innerWidth > 1024) {
      $('.page').animate({'marginLeft': '0px'});
      $('.page').animate({'marginRight': '0px'});
    }
    $(this).css({'transition': 'transform 0.5s', 'transform': 'rotate(0deg)'});
    menuOpen = false;
  }
  var cardNumber = parseInt($(this).attr('value'));
  $('.modal').each(function(index){
    var modalNumber = parseInt($(this).attr('value'));
    if (cardNumber == modalNumber){
      $(this).animate({'opacity':'show'});
      $('.trigger').css({'transition': 'transform 0.5s', 'transform': 'rotate(45deg)'});
      currentNumber = modalNumber;
    }
  })
  modalOpen = true;
})

$('.front').click(function(){
  $('.modal[value=' + currentNumber + ']').animate({
    'left':'100%'
  }, function(){
    $(this).css({'left':'0'});
    $(this).hide();
  });
  if (currentNumber >= maxModalValue) {
    currentNumber = 0;
  } else {
    currentNumber += 1;
  }
  $('.modal[value=' + currentNumber + ']').animate({'opacity':'show'});
})

$('.back').click(function(){
  $('.modal[value=' + currentNumber + ']').animate({
    'left':'-100%'
  }, function(){
    $(this).css({'left':'0'});
    $(this).hide();
  });
  
  if (currentNumber <= 0) {
    currentNumber = maxModalValue;
  } else {
    currentNumber -= 1;
  }
  $('.modal[value=' + currentNumber + ']').animate({'opacity':'show'});
})

$('.page[value="1"], .page[value="2"], .page[value="3"]').hide();
$('.modal').hide();