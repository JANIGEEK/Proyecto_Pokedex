const all = document.getElementById("all");
const barSection = document.querySelector("#bar-section");
const listPokemon = document.querySelector("#listPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URI = "https://pokeapi.co/api/v2/pokemon/";
const spinner = document.querySelector("#spinner");

let limit = 11;
let offset = 1;

const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 12;
    removePokemons();
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 12;
  removePokemons();
  fetchPokemons(offset, limit);
});

function fetchPokemon(id) {
  fetch(URI + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la consulta a la api");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      //createExtraPokemon(data);
      createPokemon(data);
      spinner.style.display = "none";
    })
    .catch((error) => {
      // Manejo de errores
      console.log(error);
    });
}

function fetchPokemons(offset, limit) {
  spinner.style.display = "block";
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

function createPokemon(pokemon) {
  //Crear el tipo de pokemon aunque tenga uno o mas tipos
  let type = pokemon.types.map(
    (type) =>
      `<p class="card-text ${type.type.name} tipo">${type.type.name}</p>`
  );
  type = type.join("");

  //Añadir los ceros a los id que solo tengas uno o dos digitos
  let pokeId = pokemon.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  //Crear los contenedores de los pokemon
  const container = document.createElement("div");
  container.setAttribute("class", "pokemon card");
  container.setAttribute("style", "width: 18rem");
  //Agregar todo el contenido
  container.innerHTML = `
    <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}" />
    <div class="card-body">
      <p class="pokemon-id card-text d-flex justify-content-around">#${pokeId}</p>
      <h4 class="pokemon-name card-title d-flex justify-content-around">${pokemon.name}</h4>
      <div class="pokemon-types d-flex justify-content-around">
        ${type}
      </div>
      <div class="d-flex justify-content-around">
      <button id="${pokemon.name}" class="btn btn-primary goTo">Ver más</button>
      </div>    
      </div>
  `;
  listPokemon.append(container);

  const botonesgoTo = document.querySelectorAll(".goTo");

  botonesgoTo.forEach((boton) =>
    boton.addEventListener("click", (e) => {
      const pokemonId = e.currentTarget.id;
      fetchPokemonExtra(pokemonId);

      
    })
  );
}

fetchPokemons(offset, limit);

botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (e) => {
    const botonId = e.currentTarget.id;

    listPokemon.innerHTML = "";

    //for (let i = offset; i <= offset + limit; i++)
    for (let i = 1; i <= 1010; i++) {
      fetch(URI + i)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la consulta a la api");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          if (botonId === "ver-todos") {
            location.href = "index.html";
          } else {
            const tipos = data.types.map((type) => type.type.name);

            //spinner.style.display='none';
            if (tipos.some((tipo) => tipo.includes(botonId))) {
              createPokemon(data);

              barSection.style.visibility = "hidden";
            }
          }
        })
        .catch((error) => {
          // Manejo de errores
          console.log(error);
        });
    }
  })
);

function removePokemons() {
  listPokemon.innerHTML = "";
}

const formSearch = document.getElementById("poke-search");
//const pokemonSearch=document.getElementById('Search');

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  

  try {
    spinner.style.display = "block";

    let poke = e.target.pokemonSearch.value;

    console.log(poke);
    removePokemons();
    barSection.style.visibility = "hidden";
    fetchPokemon(poke);
  } catch (err) {
    console.log(err);
    /*let message = err.statusText || "No se encontro, intente de nuevo";
    listPokemon.innerHTML = `<p>Error ${err.status}:${message}</p>`;*/
    listPokemon.innerHTML = `<p>Pokemon lo encontrado</p>`;
    spinner.style.display = "none";
  }
});

//PARTE EN DESARROLLO

//Funcion Extra en desarrollo
function fetchPokemonExtra(id) {
  fetch(URI + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la consulta a la api");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      createExtraPokemon(data);
      console.log(data);
      spinner.style.display = "none";
    })
    .catch((error) => {
      // Manejo de errores
      console.log(error);
    });
}

function createExtraPokemon(pokemon) {
  //Crear el tipo de pokemon aunque tenga uno o mas tipos
  let type = pokemon.types.map(
    (type) =>
      `<p class="card-text ${type.type.name} tipo">${type.type.name}</p>`
  );
  type = type.join("");

  //Añadir los ceros a los id que solo tengas uno o dos digitos
  let pokeId = pokemon.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  //Crear los contenedores de los pokemon
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  //container.setAttribute("style", "width: 50rem");
  //Agregar todo el contenido
  container.innerHTML = `
  
  <div class="cont d-flex align-items-center" id="cont1">  
  <div class="container rounded-5 p-3">
      <button type="button" class="btn-close"  id="close-extra"></button>
      <div>
        <div class="d-flex align-items-center justify-content-around">
          <img
            src="${pokemon.sprites.front_default}"
            class="card-img-top"
            alt="bulbasaur"
            style="max-width: 320px"
          />
          <div class="d-flex flex-column justify-content-around">
            <p class="pokemon-id d-flex justify-content-around">${pokeId}</p>
            <h2 class="pokemon-name d-flex justify-content-around">
              ${pokemon.name}
            </h2>

            <div class="pokemon-types d-flex justify-content-around">
              ${type}
            </div>
            <div class="pokemon-stats">
              <div class="d-flex justify-content-around">
                <p>Altura</p>
                <span>${pokemon.height}m</span>
              </div>
              <div class="d-flex justify-content-around">
                <p>Peso</p>
                <span>${pokemon.weight}Kg</span>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center flex-column">
          <h3>Estadisticas</h3>
          <div class="stat-container">
            <h5>HP</h5>
            <div class="progress">
              <div
                class="progress-bar"
                aria-valuenow="44"
                aria-valuemin="0"
                aria-valuemax="200"
                style="width: 22%"
              >
                ${pokemon.stats[0].base_stat}
              </div>
            </div>
          </div>

          <div class="stat-container">
            <h5>ATAQUE</h5>
            <div class="progress">
              <div
                class="progress-bar"
                aria-valuenow="44"
                aria-valuemin="0"
                aria-valuemax="200"
                style="width: 22%"
              >
              ${pokemon.stats[1].base_stat}
              </div>
            </div>
          </div>

          <div class="stat-container">
            <h5>DEFENSA</h5>
            <div class="progress">
              <div
                class="progress-bar"
                aria-valuenow="44"
                aria-valuemin="0"
                aria-valuemax="200"
                style="width: 22%"
              >
              ${pokemon.stats[2].base_stat}
              </div>
            </div>
          </div>
          <div class="stat-container">
            <h5>ATAQUE ESPECIAL</h5>
            <div class="progress">
              <div
                class="progress-bar"
                aria-valuenow="44"
                aria-valuemin="0"
                aria-valuemax="200"
                style="width: 22%"
              >
              ${pokemon.stats[3].base_stat}
              </div>
            </div>
          </div>
          <div class="stat-container">
            <h5>DEFENSA ESPECIAL</h5>
            <div class="progress">
              <div
                class="progress-bar"
                aria-valuenow="44"
                aria-valuemin="0"
                aria-valuemax="200"
                style="width: 22%"
              >
              ${pokemon.stats[4].base_stat}
              </div>
            </div>
          </div>
          <div class="stat-container">
            <h5>VELOCIDAD</h5>
            <div class="progress">
              <div
                class="progress-bar"
                aria-valuenow="44"
                aria-valuemin="0"
                aria-valuemax="200"
                style="width: 22%"
              >
              ${pokemon.stats[5].base_stat}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  `;
  all.append(container);

  const closeBtn = document.querySelectorAll(".btn-close");

  closeBtn.forEach((boton) =>
    boton.addEventListener("click", () => {
      container.remove();
    })
  );
  
}
