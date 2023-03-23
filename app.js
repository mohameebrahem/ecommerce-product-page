const cartImg = document.querySelector('.cart-img');
const cartContainer = document.querySelector('.cart-container');
cartImg.addEventListener('click', () => {
  cartContainer.classList.toggle('active');
});
