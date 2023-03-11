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
            nome.textContent = 'Nome: ' + pokemon.name;

            const tipo = document.createElement('p');
            tipo.textContent = 'Tipo: ' + pokemon.types[0].type.name;

            const altura = document.createElement('p');
            altura.textContent = 'Altura: ' + pokemon.height + 'm';

            const peso = document.createElement('p');
            peso.textContent = 'Peso: ' + pokemon.weight + ' Kg';

            const imagem = document.createElement('img');
            path = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;
            if(path != null) {
                imagem.src = path;
            } else {
                imagem.src = pokemon.sprites.other['official-artwork'].front_default;
            }

            //console.log(pokemon.sprites.other['official-artwork'].front_default);

            pokemonInfo.innerHTML = '';
            pokemonInfo.appendChild(nome);
            pokemonInfo.appendChild(tipo);
            pokemonInfo.appendChild(altura);
            pokemonInfo.appendChild(peso);
            pokemonInfo.appendChild(imagem);

        }).catch(error => pokemonInfo.innerHTML = `Id ou Nome incorreto <br />` + '* ' + id + " *");
}

// Quando o formulário for enviado, buscar as informações do Pokémon
form.addEventListener('submit', event => {
    event.preventDefault();
    buscarPokemon(input.value);
});
