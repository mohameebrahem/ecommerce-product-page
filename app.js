const pageSmallImgs = document.querySelectorAll(
  'section .left-section-small-imgs img'
);
const cartImg = document.querySelector('.cart-img');
const prevViewBtn = document.querySelector('.view-prev-btn-container');
const nextViewBtn = document.querySelector('.view-next-btn-container');
const cartContainer = document.querySelector('.cart-container');
const pageBigImg = document.querySelector('section .left-section-big-img img');
let viewBigImg;
let viewSmallImgs;

cartImg.addEventListener('click', (e) => {
  e.stopPropagation();
  cartContainer.classList.toggle('active');
});

document.body.addEventListener('click', function (e) {
  e.stopPropagation();
  if (cartContainer.classList.contains('active')) {
    cartContainer.classList.remove('active');
  }
});

document.querySelector('.total-no-in-cart').addEventListener('click', (e) => {
  e.stopPropagation();
  cartContainer.classList.toggle('active');
});
pageBigImg.addEventListener('click', () => {
  document.querySelector('.view-container .left-section').innerHTML =
    document.querySelector('section .left-section').innerHTML;
  document.querySelector('.view-container').style.display = 'block';
  document.querySelector('.drop').style.display = 'block';
  viewBigImg = document.querySelector(
    '.view-container .left-section-big-img img'
  );
  viewSmallImgs = Array.from(
    document.querySelectorAll('.view-container .left-section-small-imgs img')
  );
  handleSmallImage(viewSmallImgs, viewBigImg);
});

document.querySelector('.drop').addEventListener('click', () => {
  document.querySelector('.view-container').style.display = 'none';
  document.querySelector('.drop').style.display = 'none';
});
document.querySelector('.view-close-btn').addEventListener('click', () => {
  document.querySelector('.view-container').style.display = 'none';
  document.querySelector('.drop').style.display = 'none';
});

function handleSmallImage(smallImgs, bigImg) {
  smallImgs.forEach((img) => {
    img.addEventListener('click', function () {
      bigImg.src = this.dataset.src;
      toggleActive(smallImgs, this);
    });
  });
}
function toggleActive(smallImgs, target) {
  smallImgs.forEach((img) => {
    img.classList.remove('active');
  });
  target.classList.add('active');
}
handleSmallImage(pageSmallImgs, pageBigImg);

nextViewBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const activeIndex = viewSmallImgs.indexOf(
    document.querySelector('.view-container .left-section-small-imgs .active')
  );
  if (activeIndex < viewSmallImgs.length - 1) {
    viewBigImg.src = viewSmallImgs[activeIndex + 1].dataset.src;
    toggleActive(viewSmallImgs, viewSmallImgs[activeIndex + 1]);
  }
});

prevViewBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const activeIndex = viewSmallImgs.indexOf(
    document.querySelector('.view-container .left-section-small-imgs .active')
  );
  if (activeIndex > 0) {
    viewBigImg.src = viewSmallImgs[activeIndex - 1].dataset.src;
    toggleActive(viewSmallImgs, viewSmallImgs[activeIndex - 1]);
  }
});

let productBeforeDiscount = 250;
let discount = 50;
let productAfterDiscount = productBeforeDiscount * (discount / 100);
let cartCountter = 0;
let totalNoOfProducts = 0;
let totalPrice;

let noOfProductsEl = document.querySelector('.right-no-of-products');

document.querySelector('.right-positive-btn').addEventListener('click', () => {
  cartCountter++;
  updateHtml();
});
function updateHtml() {
  noOfProductsEl.innerHTML = cartCountter;
}
document.querySelector('.right-negative-btn').addEventListener('click', () => {
  if (cartCountter == 0) {
    return;
  } else {
    cartCountter--;
    updateHtml();
  }
});
function updateHtml() {
  totalPrice = cartCountter * productAfterDiscount;
  noOfProductsEl.innerHTML = cartCountter;
}
document.querySelector('.right-add-btn').addEventListener('click', () => {
  totalNoOfProducts = cartCountter;
  document.querySelector('.total-no-in-cart').textContent = totalNoOfProducts;
  document.querySelector('.total-no-in-cart').style.display = 'block';
  document.querySelector('.cart-product-price-one').textContent =
    productAfterDiscount + ' $';
  document.querySelector('.cart-products-no').textContent = totalNoOfProducts;
  document.querySelector('.cart-total').textContent = totalPrice + ' $';
  cartCountter = 0;
  updateHtml();
});
