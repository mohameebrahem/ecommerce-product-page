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
  if (totalNoOfProducts == 0) {
    document.querySelector('.cart-body').innerHTML = `
    <p class='cart-empty' >  Your Cart Is Empty </p>
    `;
  } else if (totalNoOfProducts > 0) {
    totalPrice = totalNoOfProducts * productAfterDiscount;
    document.querySelector('.cart-body').innerHTML = `
    <div class="cart-product-info">
    <img
      class="cart-product-img"
      src="images/image-product-1-thumbnail.jpg"
      alt=""
    />
    <div class="cart-product-details">
      <p class="cart-product-description">
        Fall Limited Edition Sneakers
      </p>
      <div class="cart-product-price">
        <p class="cart-product-price-one">${productAfterDiscount} $</p>
        <span>X</span>
        <p class="cart-products-no">${totalNoOfProducts}</p>
        <p class="cart-total">${totalPrice} $</p>
      </div>
    </div>
    <img
      class="cart-product-delete"
      src="images/icon-delete.svg"
      alt=""
    />
  </div>
  <button class="cart-checkout">Checkout</button>
    
    `;
    document
      .querySelector('.cart-product-delete')
      .addEventListener('click', () => {
        totalNoOfProducts = 0;
        updateHtml();
        document.querySelector('.total-no-in-cart').style.display = 'none';
      });
  }
}
document.querySelector('.right-negative-btn').addEventListener('click', () => {
  if (cartCountter == 0) {
    return;
  } else {
    cartCountter--;
    updateHtml();
  }
});

document.querySelector('.right-add-btn').addEventListener('click', () => {
  if (cartCountter == 0) {
    return;
  } else {
    totalNoOfProducts = cartCountter;
    document.querySelector('.total-no-in-cart').textContent = totalNoOfProducts;
    document.querySelector('.total-no-in-cart').style.display = 'block';
    cartCountter = 0;
    updateHtml();
  }
});
updateHtml();
