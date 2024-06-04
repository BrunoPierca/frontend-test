import { catchPokemon, savePokemon } from "@/utils/pokemon";
import {
  AspectRatio,
  Image,
  Stack,
  Progress,
  Text,
  Checkbox,
  useColorModeValue,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdCatchingPokemon } from "react-icons/md";
import { MdOutlineCollectionsBookmark } from "react-icons/md";


export default function PokemonData({ pokemon }) {
  const [isCatched, setIsCatched] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const toast = useToast()



  const bg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')
  const progressBg = useColorModeValue('gray.300', 'gray.700')


  const handleSave = async (pokemon) => {
    try {
      await savePokemon(pokemon)
      toast({
        title: `Saved ${pokemon.name}`,
        description: "Check it in saved list",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error)
      toast({
        title: `Couldn't save ${pokemon.name}`,
        description: "Please try again later",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }
  const handleCatch = async (pokemon) => {
    try {
      await catchPokemon(pokemon)
      toast({
        title: `Catched ${pokemon.name}`,
        description: "Check it in saved list",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error)
      toast({
        title: `Couldn't catch ${pokemon.name}`,
        description: "Please try again later",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Stack spacing="5" pb="5">
      <Stack spacing="5" justifyContent={"center"} alignItems={"center"}>
        <AspectRatio w="full" maxW={"50%"} ratio={1}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt={`Picture of a ${pokemon.name}`}
            width={"100%"}
            height={"100%"}
          />
        </AspectRatio>
      </Stack>

      <Stack direction={["column"]} spacing="3" p="3" gap={5} bg={bg} borderRadius="xl">
        <Stack flex={1} >
          {
            pokemon.stats.map(({ base_stat, stat }) => {
              return <Stack key={stat.name}>
                <Stack w={"100%"} justify={"space-between"} direction={"row"}>
                  <Text fontSize="xs" casing={"capitalize"}>{stat.name}</Text>
                  <Text fontSize="xs" casing={"capitalize"}>{base_stat}</Text>
                </Stack>
                <Progress colorScheme={"green"} bg={progressBg} borderRadius="full" value={base_stat} />
              </Stack>
            })
          }
        </Stack>
        <Flex direction={["row"]} gap={5} justifyContent={"space-evenly"} alignItems={"center"}>
          <Button variant={"outline"} display={"flex"} w={"100%"} fontSize={"medium"} gap={2} onClick={() => handleSave(pokemon)}
          >
            <MdOutlineCollectionsBookmark />
            <Text>Save</Text>
          </Button>
          <Button variant={"solid"} display={"flex"} w={"100%"} fontSize={"medium"} gap={2}
            onClick={() => handleCatch(pokemon)}>
            <MdCatchingPokemon />
            <Text>Catched</Text>
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
}
