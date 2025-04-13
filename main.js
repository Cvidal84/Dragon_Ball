fetch("https://dragonball-api.com/api/characters?limit=100")
  .then(res => res.json())
  .then(data => {
    const personajes = data.items;

    const main = document.createElement("main");
    document.body.appendChild(main);

    for (const personaje of personajes) {
      const div = document.createElement("div");

      div.innerHTML = `
        <h2>${personaje.name}</h2>
        <img src="${personaje.image}" alt="${personaje.name}" />
        <p>${personaje.race}</p>
        <p>${personaje.gender}</p>
        <button class="btn-descripcion">Ver descripción</button>
        <p class="descripcion" style="display:none;">${personaje.description}</p>
      `;

      const botonDescripcion = div.querySelector(".btn-descripcion");
      const descripcion = div.querySelector(".descripcion");

      botonDescripcion.addEventListener("click", () => {
        const visible = descripcion.style.display === "block";
        descripcion.style.display = visible ? "none" : "block";
        botonDescripcion.textContent = visible ? "Ver descripción" : "Ocultar descripción";
      });

      // Aquí podrías añadir lógica para el botón de transformaciones si quieres

      main.appendChild(div);
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.body.innerHTML = `<h2>No se pueden mostrar los datos ahora. Inténtalo más tarde.</h2>`;
  });