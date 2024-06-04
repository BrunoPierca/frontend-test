import Head from 'next/head'
import React from 'react'
import useSWRInfinite from 'swr/infinite';
import PokemonGrid from '@/components/PokemonGrid';
import { fetchPokemonList, } from '@/utils/pokemon';

const SavedPokemonsPage = () => {
    const pokemonData = useSWRInfinite(() => `/api/saved/`, fetchPokemonList);
    return (
        <>
            <Head>
                <title>Saved | Pokemon Challenge</title>
                <meta name="description" content="Saved pokemons list" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <PokemonGrid {...pokemonData} />
        </>
    )
}

export default SavedPokemonsPage