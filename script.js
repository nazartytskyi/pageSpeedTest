var carouselContainer = document.querySelector('.carousel__container');
var carouselImages = Array.from(document.querySelectorAll('.carousel__container .tops__item .tops__img'));
var carouselPrev = document.querySelector('.carousel__prev');
var carouselNext = document.querySelector('.carousel__next');

window.addEventListener('load', function (e) {
  uploadVisibleCarouselItems();
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

  carouselContainer.addEventListener('mousedown', mouseDownHandler);
  carouselContainer.addEventListener('mouseleave', mouseLeaveHandler);
  carouselContainer.addEventListener('scroll', uploadVisibleCarouselItems);
  window.addEventListener('resize', uploadVisibleCarouselItems);

  if (supportsTouch) {
    carouselNext.classList.remove('active');
  }
});

var pos = { left: 0, x: 0 };

function uploadVisibleCarouselItems() {
  var carouselContainerClientRect = carouselContainer.getBoundingClientRect();
  var carouselContainerRight = carouselContainerClientRect.x + carouselContainerClientRect.width;

  carouselImages.forEach((img) => {
    var isUploaded = !!img.style.backgroundImage;
    if (img.getBoundingClientRect().x < carouselContainerRight && !isUploaded) {
      img.style.backgroundImage = "url('" + img.dataset.img + "')";
    }
  });
}

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
