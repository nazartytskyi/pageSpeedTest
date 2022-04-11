var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

var carouselContainer = document.querySelector('.carousel__container');
var carouselPrev = document.querySelector('.carousel__prev');
var carouselNext = document.querySelector('.carousel__next');

carouselContainer.addEventListener('mousedown', mouseDownHandler);
carouselContainer.addEventListener('mouseleave', mouseLeaveHandler);

if (supportsTouch) {
  carouselNext.classList.remove('active');
}

var pos = { left: 0, x: 0 };

function mouseDownHandler(e) {
  pos = {
    left: carouselContainer.scrollLeft,
    x: e.clientX,
  };

  carouselContainer.classList.add('active');
  carouselContainer.style.userSelect = 'none';

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
}

function mouseMoveHandler(e) {
  var dx = e.clientX - pos.x;

  carouselContainer.scrollLeft = pos.left - 3 * dx;
}

function mouseUpHandler(e) {
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);

  carouselContainer.classList.remove('active');
  carouselContainer.style.removeProperty('user-select');

  updateShadows();
}

function mouseLeaveHandler(e) {
  updateShadows();
}
function updateShadows() {
  if (carouselContainer.scrollLeft > 0) {
    carouselPrev.classList.add('active');
  } else {
    carouselPrev.classList.remove('active');
  }

  if (carouselContainer.scrollWidth - (carouselContainer.scrollLeft + carouselContainer.clientWidth) > 0) {
    carouselNext.classList.add('active');
  } else {
    carouselNext.classList.remove('active');
  }
}
