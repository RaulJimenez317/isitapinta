const carritoToggle = document.querySelector('.carrito-toggle');
const carritoContainer = document.getElementById('carrito');

carritoToggle.addEventListener('click', (e) => {
  e.preventDefault();
  carritoContainer.classList.toggle('active');
});