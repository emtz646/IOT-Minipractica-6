// Arreglo genérico que busca imágenes en la carpeta local 'imgs/' de la mascota actual
const imagenesMascota = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg"
];

// Mapeamos los datos de las publicaciones dinámicamente según la ruta local
const publicaciones = imagenesMascota.map((archivo, indice) => {
  const numero = indice + 1;
  return {
    foto: `./imgs/${archivo}`, // Busca directamente en la carpeta imgs/ del HTML actual
    textoAlternativo: `Foto ${numero} de la mascota`,
    titulo: `Foto${numero}`
  };
});

const ventanaCarrusel = document.querySelector(".carrusel-ventana");
const listaCarrusel = document.querySelector(".carrusel-lista");
const botonesCarrusel = document.querySelectorAll(".btn-carrusel");
let inicio = 0;

// Renderizar dinámicamente las tarjetas en el DOM
publicaciones.forEach((publicacion) => {
  const tarjeta = document.createElement("article");
  tarjeta.className = "publicacion";

  const imagen = document.createElement("img");
  imagen.className = "imagen-objeto";
  imagen.src = publicacion.foto;
  imagen.alt = publicacion.textoAlternativo;

  const titulo = document.createElement("h2");
  titulo.className = "titulo-objeto";
  titulo.textContent = publicacion.titulo;

  const detalles = document.createElement("div");
  detalles.className = "detalles-caja";

  const descripcion = document.createElement("p");
  descripcion.className = "descripcion";
  descripcion.textContent = publicacion.descripcion;

  detalles.append(descripcion);
  tarjeta.append(imagen, titulo, detalles);
  listaCarrusel.append(tarjeta);
});

function actualizarCarrusel() {
  const visibles = Number.parseInt(
    getComputedStyle(ventanaCarrusel)
      .getPropertyValue("--publicaciones-visibles"),
    10
  );
  const maximoInicio = Math.max(0, publicaciones.length - visibles);
  inicio = Math.min(inicio, maximoInicio);

  const tarjeta = listaCarrusel.firstElementChild;
  const desplazamiento = tarjeta
    ? tarjeta.getBoundingClientRect().width + Number.parseFloat(getComputedStyle(listaCarrusel).gap || 0)
    : 0;
  listaCarrusel.style.transform = `translateX(-${inicio * desplazamiento}px)`;

  botonesCarrusel.forEach((boton) => {
    const direccion = Number(boton.dataset.direction);
    boton.disabled = publicaciones.length <= visibles
      || (direccion < 0 ? inicio === 0 : inicio === maximoInicio);
  });
}

botonesCarrusel.forEach((boton) => {
  boton.addEventListener("click", () => {
    inicio += Number(boton.dataset.direction);
    actualizarCarrusel();
  });
});

window.addEventListener("resize", actualizarCarrusel);
actualizarCarrusel();