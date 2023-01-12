const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_id');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
     const APIResponse = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonId.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){

        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;

        searchPokemon = data.id;

        if(searchPokemon < 650){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            pokemonImage.style = 'height: 15%; bottom: 53%';
        }
        if(searchPokemon >= 650 && searchPokemon < 899){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
            pokemonImage.style = 'height: 23%; bottom: 48%';
        }
        if(searchPokemon >= 899){
            pokemonImage.src = data['sprites']['front_default'];
            pokemonImage.style = 'height: 23%; bottom: 48%';
        }

        input.value = '';

    } else {
        pokemonName.innerHTML = 'Não encontrado! :(';
        pokemonId.innerHTML = '';
        pokemonImage.style.display = 'none';

    }
}

form.addEventListener('submit', (event) => {

        event.preventDefault();

        renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon--;
        renderPokemon(searchPokemon);
    };
});

buttonNext.addEventListener('click', () => {
    
    searchPokemon++;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);