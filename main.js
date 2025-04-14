Promise.all([
  fetch("https://dragonball-api.com/api/characters?limit=100").then(res => res.json()),
  fetch("https://dragonball-api.com/api/transformations").then(res => res.json())
])
  .then(([charData, transData]) => {
    const personajes = Array.isArray(charData.items) ? charData.items : charData;
    const transformaciones = Array.isArray(transData.items) ? transData.items : transData;

    const main = document.createElement("main");
    document.body.appendChild(main);

    // SECCIÓN DE PERSONAJES
    const contenedorPersonajes = document.createElement("section");
    main.appendChild(contenedorPersonajes);

    for (const personaje of personajes) {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <h3>${personaje.name}</h3>
        <img src="${personaje.image}" alt="${personaje.name}"/>
        <p><strong>Raza:</strong> ${personaje.race}</p>
        <p><strong>Género:</strong> ${personaje.gender}</p>
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

      contenedorPersonajes.appendChild(div);
    }

    // SECCIÓN DE TRANSFORMACIONES
    const contenedorTransformaciones = document.createElement("section");
    main.appendChild(contenedorTransformaciones);

    for (const trans of transformaciones) {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <h3>${trans.name}</h3>
        <img src="${trans.image}" alt="${trans.name}"/>
        <p><strong>Ki:</strong> ${trans.ki || "N/A"}</p>
      `;

      contenedorTransformaciones.appendChild(div);
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.body.innerHTML = `<h2>Error al cargar datos. Inténtalo más tarde.</h2>`;
  });
