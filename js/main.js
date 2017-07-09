var sliders = document.querySelectorAll('.slider');
var sliderImgs = document.querySelectorAll('.slider');
var arrowUp = document.getElementById('arrow-up');
var arrowDown = document.getElementById('arrow-down');
var imgI = 0;

function sliderHeight(){
  ;[].forEach.call(sliders, function(slider){
    slider.style.height = window.innerHeight - 200 + 'px';
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
  for (var i = 0; i < sliderImgs.length; i++) {
    if (i == imgI){
      sliderImgs[i].style.display = 'block';
    } else {
      sliderImgs[i].style.display = 'none';
    }
  }
}

function keyDownField(e) {
  var keyCode = e.keyCode;
  if (keyCode == 13 || keyCode == 34 || keyCode == 39 || keyCode == 32 || keyCode == 40) {
    sliderChange('down');
  } else if (keyCode == 33 || keyCode == 37 || keyCode == 38) {
    sliderChange('up');
  }
}

window.onload = sliderHeight;
window.onresize = sliderHeight;
document.addEventListener('wheel', function(e){
  if (e.deltaY < 0) {
    sliderChange('up');
  } else {
    sliderChange('down');
  }
})
document.addEventListener('keydown', keyDownField, false);
arrowUp.addEventListener('click', function(){sliderChange('up')});
arrowDown.addEventListener('click', function(){sliderChange('down')});
