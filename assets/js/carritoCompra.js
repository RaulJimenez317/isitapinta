const carritoToggle = document.querySelector('.carrito-toggle');
const carritoContainer = document.getElementById('carrito');
const listaCarrito = document.getElementById('lista-carrito');
const botonesAgregar = document.querySelectorAll('#botTienda');
const totalElement = document.getElementById('total');

let carrito = cargarCarritoDesdeLocalStorage(); 

carritoToggle.addEventListener('click', (event) => {
    carritoContainer.classList.toggle('active');
});



botonesAgregar.forEach((boton) => {
  boton.addEventListener('click', () => {
    const producto = boton.parentElement.querySelector('h1').textContent;
    const precio = parseFloat(
      boton.parentElement.querySelector('h2').textContent.replace('Bs', '')
    );

    const productoExistente = carrito.find((item) => item.producto === producto);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ producto, precio, cantidad: 1 });
    }

    actualizarCarrito();
  });
});

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.producto} x ${item.cantidad}</span>
      <span>Bs${(item.precio * item.cantidad).toFixed(2)}</span>
      <button data-index="${index}" class="eliminar-producto">X</button>
    `;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalElement.textContent = `Total: Bs${total.toFixed(2)}`;
  guardarCarritoEnLocalStorage();
  agregarEventosEliminar();
}

function agregarEventosEliminar() {
  const botonesEliminar = document.querySelectorAll('.eliminar-producto');
  botonesEliminar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const index = boton.dataset.index;
      carrito.splice(index, 1); 
      actualizarCarrito(); 
    });
  });
}


function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    return JSON.parse(carritoGuardado);
  }
  return [];
}


if (carrito.length > 0) {
  actualizarCarrito();
}




