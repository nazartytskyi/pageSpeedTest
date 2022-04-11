var carouselContainer = document.querySelector('.carousel__container');
var carouselPrev = document.querySelector('.carousel__prev');
var carouselNext = document.querySelector('.carousel__next');

carouselContainer.addEventListener('mousedown', mouseDownHandler);

var pos = { top: 0, left: 0, x: 0, y: 0 };
var isMouseDown = false;

function mouseDownHandler(e) {
  pos = {
    left: carouselContainer.scrollLeft,
    x: e.clientX,
  };

  carouselContainer.classList.add('active');
  carouselContainer.style.userSelect = 'none';

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
  return false;
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
