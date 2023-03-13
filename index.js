const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const form = document.querySelector('form');
const input = document.getElementById('pokemon-id');
const pokemonInfo = document.getElementById('pokemon-info');

// Função que busca informações de um Pokémon específico
function buscarPokemon(id) {
    fetch(apiUrl + id)
        .then(response => response.json())
        .then(pokemon => {
            const nome = document.createElement('p');
            const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
            nome.textContent = pokeName;

            const tipo = document.createElement('p');
            const pokeType = pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.substring(1);
            tipo.textContent = 'Tipo: ' + pokeType;
            console.log(pokeType);

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

            //console.log(pokemon.sprites.other.dream_world.front_default);
            console.log(pokemon.sprites.other['official-artwork'].front_default);


            const typePokemonApi = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
            //console.log(typePokemonApi);

            fetch(typePokemonApi)
                .then(response => response.json())
                .then(poketype => {
                    const backgroundColor = poketype.color.name;
                    imagem.style.backgroundColor = `${backgroundColor}`;
                }).catch(error => console.log(error));

            pokemonInfo.innerHTML = '';
            pokemonInfo.appendChild(imagem);
            pokemonInfo.appendChild(nome);
            pokemonInfo.appendChild(tipo);
            pokemonInfo.appendChild(altura);
            pokemonInfo.appendChild(peso);

        }).catch(error => pokemonInfo.innerHTML = `Id ou Nome incorreto <br />` + '* ' + id + " *");
}

// Quando o formulário for enviado, buscar as informações do Pokémon
form.addEventListener('submit', event => {
    event.preventDefault();
    buscarPokemon(input.value);
});
