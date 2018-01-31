window.onload = function(){
  $('#loader').css({'display':'none'});
  $('header, .container').css({'display': 'flex'});
  $('.backgroundVideo').animate({'opacity':'1'}, 'fast',
    function(){
      $('header, .container').animate({'opacity': '1'}, 'slow');
    }
  );
}

var menuOpen = false;
var modalOpen = false;
var currentNumber;
var maxModalValue = $('.modal:first-child').attr('value');
var liVal = 0;
var liValMax = parseInt($('li:last-child').attr('value'));

function isTouchDevice() {
  return 'ontouchstart' in document.documentElement;
}

$('.trigger').click(function(){
  if (modalOpen && menuOpen == false) {
    $('.modal').hide();
    $('.works').animate({'opacity':'show'}, 200);
    $(this).css({'transition': 'transform 0.5s', 'transform': 'rotate(0deg)'});
    modalOpen = false;
  } else if (menuOpen == false){
    if (window.innerWidth < 600) {
      $('.menu').animate({'width': '100%'});
      $('.content').hide();
    } else {
      $('.menu').animate({'width': '30%', 'minWidth': '300px'});
    }
    $('.page').animate({'marginLeft': '20px', 'marginRight': '20px'});
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
  liVal = $(this).attr('value');
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
    $(this).children('.color').animate({'opacity': 0.2}, 200);
  }, function() {
    $(this).children('.color').animate({'opacity': 1}, 200);
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
      $(this).animate({'opacity':'show'}, function(){
        $( 'html, body' ).animate( { scrollTop : '0' }, 300, 'swing' )
      });
      var treeVideoHeight = parseInt($('#treeVideo').css('width'));
      $('#treeVideo').css({'height': treeVideoHeight * 0.5625});
      document.getElementsByClassName('codepen')[0].src = document.getElementsByClassName('codepen')[0].src
      $('.trigger').css({'transition': 'transform 0.5s', 'transform': 'rotate(45deg)'});
      currentNumber = modalNumber;
    }
  })
  modalOpen = true;
})

function toLeft() {	
  document.getElementById('treeVideo').src += '';
  var treeVideoHeight = parseInt($('#treeVideo').css('width'));
  $('#treeVideo').css({'height': treeVideoHeight * 0.5625});
  document.getElementsByClassName('codepen')[0].src = document.getElementsByClassName('codepen')[0].src
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
  $('.modal[value=' + currentNumber + ']').animate({'opacity':'show'}, 
    function(){
      document.getElementById('treeVideo').src += '';
      var treeVideoHeight = parseInt($('#treeVideo').css('width'));
      $('#treeVideo').css({'height': treeVideoHeight * 0.5625});
      $( 'html, body' ).animate( { scrollTop : '0' }, 300, 'swing' )
    }
  );
}

function toRight() {
  document.getElementById('treeVideo').src += '';
  var treeVideoHeight = parseInt($('#treeVideo').css('width'));
  $('#treeVideo').css({'height': treeVideoHeight * 0.5625});
  document.getElementsByClassName('codepen')[0].src = document.getElementsByClassName('codepen')[0].src
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
  $('.modal[value=' + currentNumber + ']').animate({'opacity':'show'}, 
    function(){
      document.getElementById('treeVideo').src += '';
      var treeVideoHeight = parseInt($('#treeVideo').css('width'));
      $('#treeVideo').css({'height': treeVideoHeight * 0.5625});
      $( 'html, body' ).animate( { scrollTop : '0' }, 300, 'swing' )
    }
  );
}

$('.front').click(function(){
  toRight();
})

$('.modal').on('swiperight', function(){
  if (isTouchDevice()) {
    toRight();
  }
})

$('.back').click(function(){
  toLeft();
})

$('.modal').on('swipeleft', function(){
  if (isTouchDevice()) {
    toLeft();
  }
})


document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27 || evt.keyCode == 32) {
    $('.trigger').trigger('click');
  } else if (modalOpen) {
    if (evt.keyCode == 39) {
      toLeft();
    } else if (evt.keyCode == 37) {
      toRight();
    }
  } 
};

$('.page[value="1"], .page[value="2"], .page[value="3"]').hide();
$('.modal').hide();
$('.back, .front').css({'top': window.innerHeight/2})