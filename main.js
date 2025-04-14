let todosLosPersonajes = [];
let todasLasTransformaciones = [];

const contenedorPersonajes = document.createElement("section");
contenedorPersonajes.id = "contenedor-personajes";
document.body.appendChild(contenedorPersonajes);

const contenedorTransformaciones = document.createElement("section");
contenedorTransformaciones.id = "contenedor-transformaciones";
document.body.appendChild(contenedorTransformaciones);

const inputBuscador = document.getElementById("buscador");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnReset");

function renderPersonajes(lista) {
  contenedorPersonajes.innerHTML = "";
  for (const personaje of lista) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h3>${personaje.name}</h3>
      <h2>Personaje</h2>
      <img src="${personaje.image}" alt="${personaje.name}">
      <p>Raza:${personaje.race}</p>
      <p>Género:${personaje.gender}</p>
      <button class="btn-descripcion">Ver descripción</button>
      <p class="descripcion" style="display: none;">${personaje.description}</p>
    `;

    const botonDescripcion = div.querySelector(".btn-descripcion");
    const descripcion = div.querySelector(".descripcion");

    botonDescripcion.addEventListener("click", () => {
      const visible = descripcion.style.display === "block";
      descripcion.style.display = visible ? "none" : "block";
      botonDescripcion.textContent = visible ? "Ver descripción" : "Ocultar descripción";
    });

    contenedorPersonajes.appendChild(div);
  }
}

function renderTransformaciones(lista) {
  contenedorTransformaciones.innerHTML = "";
  for (const trans of lista) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h3>${trans.name}</h3>
      <h2>Transformación</h2>
      <img src="${trans.image}" alt="${trans.name}">
      <p><strong>Ki:</strong> ${trans.ki || "N/A"}</p>
    `;
    contenedorTransformaciones.appendChild(div);
  }
}

Promise.all([
  fetch("https://dragonball-api.com/api/characters?limit=100").then(res => res.json()),
  fetch("https://dragonball-api.com/api/transformations").then(res => res.json())
])
  .then(([charData, transData]) => {
    todosLosPersonajes = Array.isArray(charData.items) ? charData.items : charData;
    todasLasTransformaciones = Array.isArray(transData.items) ? transData.items : transData;

    renderPersonajes(todosLosPersonajes);
    renderTransformaciones(todasLasTransformaciones);
  })
  .catch(err => {
    console.error("Error al cargar datos:", err);
    contenedorPersonajes.innerHTML = `<p>Error al cargar personajes.</p>`;
    contenedorTransformaciones.innerHTML = `<p>Error al cargar transformaciones.</p>`;
  });

btnBuscar.addEventListener("click", () => {
  const texto = inputBuscador.value.trim().toLowerCase();

  const filtradosPersonajes = todosLosPersonajes.filter(p =>
    p.name.toLowerCase().includes(texto)
  );

  const filtradasTransformaciones = todasLasTransformaciones.filter(t =>
    t.name.toLowerCase().includes(texto)
  );

  renderPersonajes(filtradosPersonajes);
  renderTransformaciones(filtradasTransformaciones);
});

btnReset.addEventListener("click", () => {
  inputBuscador.value = "";
  renderPersonajes(todosLosPersonajes);
  renderTransformaciones(todasLasTransformaciones);
});

inputBuscador.addEventListener("keydown", e => {
  if (e.key === "Enter") btnBuscar.click();
});
