import { Button, SimpleGrid, Skeleton, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import PokemonCard from "./PokemonCard";
import PokemonModal from "./PokemonModal";
import { itemsPerPage } from "@/utils/pokemon";
import { useRouter } from "next/router";

const PokemonGrid = ({ size, isLoading, setSize, data, catchedPokemons = [], savedPokemons = [] }) => {
    const pokemonDataModal = useDisclosure();
    const router = useRouter()
    const [selectedPokemon, setSelectedPokemon] = useState();
    const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

    function handleViewPokemon(pokemon) {
        setSelectedPokemon({
            ...pokemon,
            isCatched: catchedPokemons.find(element => element.name === pokemon.name) ? true : false,
            isSaved: savedPokemons.find(element => element.name === pokemon.name) ? true : false
        });
        pokemonDataModal.onOpen();
    }

    const pokemonQtty = data && data[0] && data[0].results ? data[0].results.length : 5;

    return (
        <>
            <Skeleton isLoaded={!isLoading || !data}>
                <SimpleGrid spacing="5" columns={{ base: 1, md: pokemonQtty > 5 ? 5 : pokemonQtty }}>
                    {data && data[0].results && data.map((page) => page.results.map((pokemon) => <PokemonCard
                        key={pokemon.url}
                        handleViewPokemon={handleViewPokemon}
                        pokemon={pokemon}
                        isCatched={catchedPokemons.find(element => element.name === pokemon.name) ? true : false}
                        isSaved={savedPokemons.find(element => element.name === pokemon.name) ? true : false}
                    />))}
                </SimpleGrid>

            </Skeleton>
            {data && data[0].results ?
                <Button isLoading={isLoadingMore}
                    onClick={() =>
                        data[0].count > itemsPerPage ? setSize(size + 1) : router.push("/")}
                >
                    {data[0].count > itemsPerPage ? "Load more" : "See more"}
                </Button>
                :
                "No pokemons to show"
            }
            <PokemonModal pokemonDataModal={pokemonDataModal} selectedPokemon={selectedPokemon} />
        </>
    )
}

export default PokemonGrid