import Head from 'next/head'
import React from 'react'
import useSWRInfinite from 'swr/infinite';
import PokemonGrid from '@/components/PokemonGrid';
import { fetchPokemonList } from '@/utils/pokemon';
import { getServerCatchedPokemons } from './api/catched';
import { getServerSavedPokemons } from './api/saved';

export const getServerSideProps = (async () => {
    // Fetch data from external API
    const catchedPokemons = await getServerCatchedPokemons()
    const savedPokemons = await getServerSavedPokemons()
    // Pass data to the page via props
    return { props: { savedPokemons, catchedPokemons } }
})
const CatchedPokemonsPage = ({ savedPokemons, catchedPokemons }) => {
    const pokemonData = useSWRInfinite(() => "/api/catched/", fetchPokemonList);
    return (
        <>
            <Head>
                <title>Catched | Pokemon Challenge</title>
                <meta name="description" content="Catched pokemons list" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <PokemonGrid {...pokemonData} savedPokemons={savedPokemons} catchedPokemons={catchedPokemons} />
        </>
    )
}

export default CatchedPokemonsPage