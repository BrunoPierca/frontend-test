import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";

const fetchOnePokemon = async (id) => {
  try {
    const { data } = await axios.get(id)
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export default function PokemonCard({ pokemon, handleViewPokemon }) {
  const { data: pokemonData, isLoading } = useSWR(`pokemon-${pokemon.name}}`, () => fetchOnePokemon(pokemon.url));
  if (isLoading) return <Skeleton />
  return (
    <Stack
      as="button"
      spacing="5"
      boxShadow="xl"
      p="5"
      w="full"
      borderRadius="xl"
      alignItems="center"
      onClick={() => handleViewPokemon({ ...pokemon, ...pokemonData })}
    >
      <AspectRatio w="full" ratio={1}>
        <Skeleton isLoaded={!isLoading}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonData.id}.png`}
            alt={`Picture of a ${pokemon.name}`}
            width={"100%"}
            height={"100%"}
          />
        </Skeleton>
      </AspectRatio>
      <Text textAlign="center" textTransform="Capitalize">
        {pokemon.name}
      </Text>
      <Skeleton isLoaded={!isLoading} >
        <HStack gap={2}>
          {pokemonData.types.map((type) => (
            <Badge size="xs" key={type.slot}>
              {type.type.name}
            </Badge>
          ))}
        </HStack>
      </Skeleton>
    </Stack>
  );
}
