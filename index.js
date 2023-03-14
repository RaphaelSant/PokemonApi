const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const form = document.querySelector('form');
const input = document.getElementById('pokemon-id');
const pokemonInfo = document.getElementById('pokemon-info');

// Função que busca informações de um Pokémon específico
function buscarPokemon(id) {
    fetch(apiUrl + id)
        .then(response => response.json())
        .then(pokemon => {
            const pokeId = document.createElement('p');
            pokeId.textContent = '#' + pokemon.id;

            console.log(pokeId);

            const nome = document.createElement('p');
            const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
            nome.textContent = pokeName;

            console.log(pokemon)

            const tipo = document.createElement('p');
            const pokeType = pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.substring(1);
            tipo.textContent = 'Tipo: ' + pokeType;

            const altura = document.createElement('p');
            altura.textContent = 'Altura: ' + pokemon.height / 10 + ' M';

            const peso = document.createElement('p');
            peso.textContent = 'Peso: ' + pokemon.weight / 10 + ' Kg';

            const imagem = document.createElement('img');
            const path = pokemon.sprites.other['official-artwork'].front_default;
            if (path != null) {
                imagem.src = path;
            } else {
                imagem.src = pokemon.sprites.other.dream_world.front_default;
            }

            form.style.marginBottom = '130px';
            pokemonInfo.style.padding = '25px';

            //console.log(pokemon.sprites.other.dream_world.front_default);
            
            const typePokemonApi = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
            //console.log(typePokemonApi);

            fetch(typePokemonApi)
                .then(response => response.json())
                .then(poketype => {
                    const backgroundColor = poketype.color.name;
                    imagem.style.backgroundColor = `${backgroundColor}`;
                }).catch(error => console.log(error));

            input.value = '';
            input.placeholder = `Pokemon pesquisado: ${id}`;

            pokemonInfo.innerHTML = '';
            pokemonInfo.appendChild(imagem);
            pokemonInfo.appendChild(nome);
            pokemonInfo.appendChild(tipo);
            pokemonInfo.appendChild(altura);
            pokemonInfo.appendChild(peso);
            pokeId.style.position = 'fixed';
            pokeId.style.bottom = '5px';
            pokeId.style.left = '5px';
            pokeId.style.opacity = '0.1';
            pokeId.style.fontSize = '10rem';
            pokemonInfo.appendChild(pokeId);

        }).catch(error => teste(error));
}

function teste(error) {
    alert('Nome ou id incorreto, tente novamente!');
    console.log(error);
}

// Quando o formulário for enviado, buscar as informações do Pokémon
form.addEventListener('submit', event => {
    event.preventDefault();
    const id = String(input.value).toLowerCase();
    buscarPokemon(id);
});
