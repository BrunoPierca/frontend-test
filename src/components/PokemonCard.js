import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
  Skeleton,
  Avatar,
  Tooltip,
  Flex
} from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import { FaBookmark } from "react-icons/fa";

const fetchOnePokemon = async (id) => {
  try {
    const { data } = await axios.get(id)
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}


const pokemonTypeColors = [
  { name: "steel", value: "#BEBED7" },
  { name: "water", value: "#6D96F7" },
  { name: "bug", value: "#AEBE24" },
  { name: "dragon", value: "#753CFF" },
  { name: "electric", value: "#FFD734" },
  { name: "ghost", value: "#755D9E" },
  { name: "fire", value: "#F75534" },
  { name: "ice", value: "#9EDFDF" },
  { name: "fighting", value: "#96342C" },
  { name: "normal", value: "#AEAE7D" },
  { name: "grass", value: "#7DCF55" },
  { name: "psychic", value: "#FF5D8E" },
  { name: "rock", value: "#BEA63C" },
  { name: "dark", value: "#968E8E" },
  { name: "ground", value: "#E7C76D" },
  { name: "poison", value: "#A645A6" },
  { name: "flying", value: "#AE96F7" },
  { name: "fairy", value: "#FFAAFF" },
  { name: "?", value: "" },
]

export default function PokemonCard({ pokemon, isCatched, isSaved, handleViewPokemon }) {
  const { data: pokemonData, isLoading } = useSWR(`pokemon-${pokemon.name}}`, () => fetchOnePokemon(pokemon.url));
  if (isLoading) return
  return (
    <Skeleton isLoaded={pokemonData} >
      <Stack
        as="button"
        spacing="5"
        boxShadow="xl"
        p="5"
        w="full"
        borderRadius="xl"
        alignItems="center"
        onClick={() => handleViewPokemon({ ...pokemon, ...pokemonData })}
        position={"relative"}
      >
        {isSaved &&
          <Tooltip label="Saved">
            <Flex justifyContent={"center"} alignItems={"center"} w={"24px"} h={"24px"} position={"absolute"} top={2} left={2} >
              <FaBookmark />
            </Flex>
          </Tooltip>

        }
        {isCatched &&
          <Tooltip label="Catched">
            <Avatar position={"absolute"} size={"xs"} src="/logo.png" alt="pokeball image" top={2} right={2} />
          </Tooltip>
        }
        <AspectRatio w="full" ratio={1}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonData.id}.png`}
            alt={`Picture of a ${pokemon.name}`}
            width={"100%"}
            height={"100%"}
            loading="lazy"
          />
        </AspectRatio>
        <Text textAlign="center" textTransform="Capitalize">
          {pokemon.name}
        </Text>
        <Skeleton isLoaded={!isLoading} >
          <HStack gap={2}>
            {pokemonData.types.map((type) => {
              return (
                <Badge size="xs" key={type.slot}
                  sx={{
                    backgroundColor: pokemonTypeColors.find((color) => color.name === type.type.name)?.value ?? pokemonTypeColors[-1]
                  }}>
                  {type.type.name}
                </Badge>
              )
            })}
          </HStack>
        </Skeleton>
      </Stack>
    </Skeleton>
  );
}
