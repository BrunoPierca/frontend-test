import { useRouter } from 'next/router'
import Head from "next/head";
import useSWRInfinite from 'swr/infinite';
import { fetchPokemonList, getUnpaginatedPokeapiKey } from '@/utils/pokemon';
import { useMemo, useState } from 'react';
import PokemonGrid from '@/components/PokemonGrid';

// export const getServerSideProps = (async () => {
//     const catchedPokemons = await getServerCatchedPokemons()
//     const savedPokemons = await getServerSavedPokemons()
//     return { props: { savedPokemons, catchedPokemons } }
// })

const SearchPage = ({ savedPokemons, catchedPokemons }) => {
    const { isLoading, data } = useSWRInfinite(getUnpaginatedPokeapiKey, fetchPokemonList);
    const [isSearching, setisSearching] = useState(false)
    const { query } = useRouter()
    const results = useMemo(() => {
        if (isLoading || !data) return
        setisSearching(true)
        const res = data[0].results.filter((pokemon) => {
            if (pokemon.name.includes(query.term)) return pokemon
        })
        setisSearching(false)
        return res
    }, [query.term, data])
    return (
        <>
            <Head>
                <title>Search | Pokemon Challenge</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <PokemonGrid data={[{ results }]} isLoading={isLoading || isSearching} savedPokemons={savedPokemons} catchedPokemons={catchedPokemons} />
        </>
    )
}

export default SearchPage