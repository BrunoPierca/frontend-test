import { Button, SimpleGrid, Skeleton, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import PokemonCard from "./PokemonCard";
import PokemonModal from "./PokemonModal";

const PokemonGrid = ({ size, isLoading, setSize, data }) => {
    const pokemonDataModal = useDisclosure();
    const [selectedPokemon, setSelectedPokemon] = useState();

    const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

    function handleViewPokemon(pokemon) {
        setSelectedPokemon(pokemon);
        pokemonDataModal.onOpen();
    }
    return (
        <>
            <Skeleton isLoaded={!isLoading || !data}>
                <SimpleGrid spacing="5" columns={{ base: 1, md: 5 }}>
                    {data && data[0].results && data.map((page) => page.results.map((pokemon) => <PokemonCard
                        key={pokemon.url}
                        handleViewPokemon={handleViewPokemon}
                        pokemon={pokemon}
                    />))}
                </SimpleGrid>

            </Skeleton>
            {data && data[0].results ?
                <Button isLoading={isLoadingMore} onClick={() => setSize(size + 1)}>
                    Load more
                </Button>
                :
                "No pokemons to show"
            }
            <PokemonModal pokemonDataModal={pokemonDataModal} selectedPokemon={selectedPokemon} />
        </>
    )
}

export default PokemonGrid