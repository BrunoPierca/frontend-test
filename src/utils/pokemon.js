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
export const savePokemon = async (pokemon) => {
    try {
        const { data } = await axios.post("/api/saved/", pokemon)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const removeSavedPokemon = async (pokemon) => {
    try {
        const { data } = await axios.delete("/api/saved/" + pokemon.id,)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}



export const catchPokemon = async (pokemon) => {
    try {
        const { data } = await axios.post("/api/catched/", pokemon)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const releasePokemon = async (pokemon) => {
    try {
        const { data } = await axios.delete("/api/catched/" + pokemon.id,)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}