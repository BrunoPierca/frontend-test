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
import useSWR from "swr";
import { FaBookmark } from "react-icons/fa";
import { fetchOnePokemon } from "@/utils/pokemon";

// const pokemonTypeColors = [
//   { name: "steel", value: "#BEBED7" },
//   { name: "water", value: "#6D96F7" },
//   { name: "bug", value: "#AEBE24" },
//   { name: "dragon", value: "#753CFF" },
//   { name: "electric", value: "#FFD734" },
//   { name: "ghost", value: "#755D9E" },
//   { name: "fire", value: "#F75534" },
//   { name: "ice", value: "#9EDFDF" },
//   { name: "fighting", value: "#96342C" },
//   { name: "normal", value: "#AEAE7D" },
//   { name: "grass", value: "#7DCF55" },
//   { name: "psychic", value: "#FF5D8E" },
//   { name: "rock", value: "#BEA63C" },
//   { name: "dark", value: "#968E8E" },
//   { name: "ground", value: "#E7C76D" },
//   { name: "poison", value: "#A645A6" },
//   { name: "flying", value: "#AE96F7" },
//   { name: "fairy", value: "#FFAAFF" },
//   { name: "?", value: "" },
// ]

const pokemonTypeColors = [
  { name: "steel", bgColor: "#BEBED7", textColor: "#000000" },
  { name: "water", bgColor: "#2493FF", textColor: "#000000" },
  { name: "bug", bgColor: "#AEBE24", textColor: "#000000" },
  { name: "dragon", bgColor: "#753CFF", textColor: "#FFFFFF" },
  { name: "electric", bgColor: "#FFD734", textColor: "#000000" },
  { name: "ghost", bgColor: "#755D9E", textColor: "#FFFFFF" },
  { name: "fire", bgColor: "#E72324", textColor: "#FFFFFF" },
  { name: "ice", bgColor: "#9EDFDF", textColor: "#000000" },
  { name: "fighting", bgColor: "#96342C", textColor: "#FFFFFF" },
  { name: "normal", bgColor: "#AEAE7D", textColor: "#000000" },
  { name: "grass", bgColor: "#7DCF55", textColor: "#000000" },
  { name: "psychic", bgColor: "#FF5D8E", textColor: "#FFFFFF" },
  { name: "rock", bgColor: "#BEA63C", textColor: "#000000" },
  { name: "dark", bgColor: "#968E8E", textColor: "#FFFFFF" },
  { name: "ground", bgColor: "#E7C76D", textColor: "#000000" },
  { name: "poison", bgColor: "#A645A6", textColor: "#FFFFFF" },
  { name: "flying", bgColor: "#AE96F7", textColor: "#000000" },
  { name: "fairy", bgColor: "#FFAAFF", textColor: "#000000" },
  { name: "?", bgColor: "", textColor: "#000000" },
];


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
            <Flex title="Saved icon" justifyContent={"center"} alignItems={"center"} w={"24px"} h={"24px"} position={"absolute"} top={2} left={2} >
              <FaBookmark />
            </Flex>
          </Tooltip>

        }
        {isCatched &&
          <Tooltip label="Catched">
            <Avatar position={"absolute"} size={"xs"} src="/logo.png" name="Catched icon" top={2} right={2} />
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
              const typeColors = pokemonTypeColors.find((color) => color.name === type.type.name)
              return (
                <Badge size="xs" key={type.slot}
                  sx={{
                    backgroundColor: typeColors?.bgColor ?? pokemonTypeColors[-1],
                    color: typeColors?.textColor ?? pokemonTypeColors[-1]
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
