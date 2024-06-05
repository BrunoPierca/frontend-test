import Head from 'next/head'
import React from 'react'
import useSWRInfinite from 'swr/infinite';
import PokemonGrid from '@/components/PokemonGrid';
import { fetchPokemonList, } from '@/utils/pokemon';
import { getServerCatchedPokemons } from './api/catched';
import { getServerSavedPokemons } from './api/saved';

export const getServerSideProps = (async () => {
    const catchedPokemons = await getServerCatchedPokemons()
    const savedPokemons = await getServerSavedPokemons()
    return { props: { savedPokemons, catchedPokemons } }
})
const SavedPokemonsPage = ({ savedPokemons, catchedPokemons }) => {
    const pokemonData = useSWRInfinite(() => `/api/saved/`, fetchPokemonList);
    return (
        <>
            <Head>
                <title>Saved | Pokemon Challenge</title>
                <meta name="description" content="Saved pokemons list" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <PokemonGrid {...pokemonData} savedPokemons={savedPokemons} catchedPokemons={catchedPokemons} />
        </>
    )
}

export default SavedPokemonsPage