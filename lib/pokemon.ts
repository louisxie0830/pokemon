import axios from "axios";

export const pokemonV2Url = 'https://pokeapi.co/api/v2/';

export const getOfficialArtwork = (number: string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;

export const getFrontSprite = (number: string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;

export const getHomeSprite = (number: string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${number}.png`;

const getPokemon = async (number: string) => {
    const { data } = await axios.get(
        `${pokemonV2Url}pokemon/${Number(number)}`
    );

    return data;
};

const getGenus = async (number: string) => {
    const { data } = await axios.get(
        `${pokemonV2Url}pokemon-species/${Number(number)}`
    );

    return data;
};

export const getName = (name: string) => {
    return name.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
};

export const getDexNo = (number: string) => `#${number.padStart(3, '0')}`

export const getAbilities = (data: any[]) => data.map((ability: any) => ({
    name: ability.ability.name
        .split('-')
        .map((word: string | any[]) => word[0].toUpperCase() + word.slice(1))
        .join(' '),
    isHidden: ability.is_hidden,
}))

const getEvolutions = (() => {
    const getId = (uri: string) => {
        let uriArray = uri.split('/');
        const number = Number(uriArray[uriArray.length - 2]);
        return number;
    };

    const populateEvolutions = (chain: any) => {
        if (!chain.evolves_to) return;
        else
            return {
                name: getName(chain.species.name),
                id: getId(chain.species.url),
                isBaby: chain.is_baby,
                hasEvolved: true,

                evolvesTo: [
                    ...chain.evolves_to.map((evolution: any) =>
                        populateEvolutions(evolution)
                    ),
                ],
            };
    };

    return async (uri: string) => {
        const { data } = await axios.get(uri);

        const chain = {
            name: getName(data.chain.species.name),
            id: getId(data.chain.species.url),
            isBaby: data.chain.is_baby,
            hasEvolved: false,

            evolvesTo: [
                ...data.chain.evolves_to.map((evo: any) => populateEvolutions(evo)),
            ],
        };

        return chain;
    }
})();

export const getPokemonData = async (number: string) => {
    const [pokemonData, speciesData] = await Promise.all([getPokemon(number), getGenus(number)]);
    const evolutionData = await getEvolutions(speciesData.evolution_chain.url);

    const genus = speciesData.genera.filter((genera: any) => {
        if (genera.language.name === 'en') return genera.genus;
    })[0].genus;

    const pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        species: { name: pokemonData.species.name },
        category: genus,

        height: pokemonData.height,
        weight: pokemonData.weight,

        abilities: pokemonData.abilities,
        stats: pokemonData.stats,
        type: pokemonData.types,

        sprites: {
            front_default: getFrontSprite(number),
            home_front: getHomeSprite(number),
            official_artwork: getOfficialArtwork(number),
        },

        evolutionChain: evolutionData,
    };

    return pokemon;
};