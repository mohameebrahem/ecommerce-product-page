const cartImg = document.querySelector('.cart-img');
const cartContainer = document.querySelector('.cart-container');
const pageBigImg = document.querySelector('.left-section-big-img img');
const pageSmallImgs = document.querySelectorAll('.left-section-small-imgs img');

cartImg.addEventListener('click', () => {
  cartContainer.classList.toggle('active');
});

pageSmallImgs.forEach((img) => {
  img.addEventListener('click', function () {
    pageBigImg.src = this.dataset.src;
    pageSmallImgs.forEach((x) => {
      x.classList.remove('active');
      this.classList.add('active');
    });
  });
});

pageBigImg.addEventListener('click', () => {
  document.querySelector('.view-container .left-section').innerHTML =
    document.querySelector('section .left-section').innerHTML;
  document.querySelector('.view-container').style.display = 'block';
  document.querySelector('.drop').style.display = 'block';

  const viewSmallImgs = document.querySelectorAll(
    '.view-container .left-section-small-imgs img'
  );
  const viewBigImg = document.querySelector(
    '.view-container .left-section-big-img img'
  );
  viewSmallImgs.forEach((img) => {
    img.addEventListener('click', function () {
      viewBigImg.src = this.dataset.src;
      viewSmallImgs.forEach((x) => {
        x.classList.remove('active');
        this.classList.add('active');
      });
    });

    document.querySelector('.view-close-btn').addEventListener('click', () => {
      document.querySelector('.view-container').style.display = 'none';
      document.querySelector('.drop').style.display = 'none';
    });
    const prevBtn = document.querySelector('.view-prev-btn-container');
    prevBtn.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
    });
  });
});
document.querySelector('.drop').addEventListener('click', () => {
  document.querySelector('.view-container').style.display = 'none';
  document.querySelector('.drop').style.display = 'none';
});
