var sliders = document.querySelectorAll('.slider');
var sliderImgs = document.querySelectorAll('.slider');
var arrowUp = document.getElementById('arrow-up');
var arrowDown = document.getElementById('arrow-down');
var menuList = document.querySelectorAll('.menuNum');
var imgI = 0;

function sliderHeight(){
  ;[].forEach.call(sliders, function(slider){
    slider.style.height = window.innerHeight - 120 + 'px';
  })
}

function sliderChange(dir){
  if (dir == 'up'){
    if (imgI > 0) {
      imgI--;
    } else {
      imgI = sliderImgs.length - 1;
    }
  } else {
    if (imgI < sliderImgs.length - 1) {
      imgI++;
    } else {
      imgI = 0;
    }
  }
  sliderShift();
}

function sliderShift(){
  for (var i = 0; i < sliderImgs.length; i++) {
    if (i == imgI){
      // sliderImgs[i].style.display = 'block';
      $(sliderImgs[i]).show('slow');
    } else {
      // sliderImgs[i].style.display = 'none';
      $(sliderImgs[i]).hide('slow');
    }
  }
  menuColor();
}

function menuColor(){
  ;[].forEach.call(menuList, function(menu){
    var menuIndex = Array.prototype.indexOf.call(menuList, menu);
    if (menuIndex == 0) {
      menuList[menuIndex].style.color = "#000";
      menuList[menuIndex].style.backgroundColor = "#FFF";
    } else if (menuIndex == imgI){
      menuList[menuIndex].style.color = "#FFF";
      menuList[menuIndex].style.backgroundColor = "#000";
    } else {
      menuList[menuIndex].style.color = "#000";
      menuList[menuIndex].style.backgroundColor = "#FFF";
    }
  })

}

function keyDownField(e) {
  var keyCode = e.keyCode;
  if (keyCode == 13 || keyCode == 34 || keyCode == 39 || keyCode == 32 || keyCode == 40) {
    sliderChange('down');
  } else if (keyCode == 33 || keyCode == 37 || keyCode == 38) {
    sliderChange('up');
  }
}

;[].forEach.call(menuList, function(menu){
    menu.addEventListener('click', function(){
      var menuIndex = Array.prototype.indexOf.call(menuList, menu);
      imgI = menuIndex;
      sliderShift();
    })
    menu.addEventListener('mouseover', function(){
      var menuIndex = Array.prototype.indexOf.call(menuList, menu);
      if (menuIndex != 0){
        menu.style.color = '#FFF';
        menu.style.backgroundColor = '#000';
      }
    })
    menu.addEventListener('mouseout', function(){
      menuColor();
    })
})

window.onload = sliderHeight;
window.onresize = sliderHeight;
document.addEventListener('wheel', function(e){
  if (e.deltaY < 0) {
    sliderChange('up');
  } else {
    sliderChange('down');
  }
})
// Hammer(document).on('swipe', function(e){
//   if (e.deltaY < 0 || e.deltaX < 0) {
//     sliderChange('up');
//   } else {
//     sliderChange('down');
//   }
// });
document.addEventListener('keydown', keyDownField, false);
arrowUp.addEventListener('click', function(){sliderChange('up')});
arrowDown.addEventListener('click', function(){sliderChange('down')});
