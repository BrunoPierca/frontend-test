import Head from 'next/head'
import React from 'react'
import useSWRInfinite from 'swr/infinite';
import PokemonGrid from '@/components/PokemonGrid';
import { fetchPokemonList } from '@/utils/pokemon';

const CatchedPokemonsPage = () => {
    const pokemonData = useSWRInfinite(() => "/api/catched/", fetchPokemonList);
    return (
        <>
            <Head>
                <title>Catched | Pokemon Challenge</title>
                <meta name="description" content="Catched pokemons list" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <PokemonGrid {...pokemonData} />
        </>
    )
}

export default CatchedPokemonsPage