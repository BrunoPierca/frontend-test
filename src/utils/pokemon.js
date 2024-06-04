import axios from "axios";

// Global items per page
export const itemsPerPage = 20;


export const fetchPokemonList = async (url) => {
    try {
        const { data } = await axios.get(url)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

// Pokeapi handling
export const getPokeapiKey = (pageIndex) => {
    return `https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${itemsPerPage * pageIndex}`
}

// Own API handling
export const getSavedKey = (pageIndex) => {
    return `/api/saved/?limit=${itemsPerPage}&offset=${itemsPerPage * pageIndex}`
}
