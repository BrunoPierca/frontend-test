import { catchPokemon, savePokemon, releasePokemon, removeSavedPokemon } from "@/utils/pokemon";
import {
  AspectRatio,
  Image,
  Stack,
  Progress,
  Text,
  useColorModeValue,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCatchingPokemon } from "react-icons/md";
import { MdOutlineCollectionsBookmark } from "react-icons/md";


export default function PokemonData({ pokemon, onToggleModal }) {
  const toast = useToast({ position: "bottom-right", duration: 5000, isClosable: true })
  const bg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')
  const progressBg = useColorModeValue('gray.300', 'gray.700')
  const router = useRouter()

  const handleRemoveSaved = async (pokemon) => {
    try {
      await removeSavedPokemon(pokemon)
      toast({
        title: `Removed ${pokemon.name}`,
        description: "He had to go...",
        status: 'success',
      })
      router.replace(router.asPath)
      onToggleModal()
    } catch (error) {
      console.log(error)
      toast({
        title: `Couldn't remove ${pokemon.name}`,
        description: "Please try again later",
        status: 'error',
      })
    }
  }

  const handleRelease = async (pokemon) => {
    try {
      await releasePokemon(pokemon)
      toast({
        title: `Released ${pokemon.name}`,
        description: "We'll probably see him again soon",
        status: 'success',
      })
      router.replace(router.asPath)
      onToggleModal()
    } catch (error) {
      console.log(error)
      toast({
        title: `Couldn't release ${pokemon.name}`,
        description: "Please try again later",
        status: 'error',
      })
    }
  }

  const handleSave = async (pokemon) => {
    try {
      await savePokemon(pokemon)
      toast({
        title: `Saved ${pokemon.name}`,
        description: "Check it in saved list",
        status: 'success',
      })
      router.replace(router.asPath)
      onToggleModal()
    } catch (error) {
      console.log(error)
      toast({
        title: `Couldn't save ${pokemon.name}`,
        description: "Please try again later",
        status: 'error',
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
      })
      router.replace(router.asPath)
      onToggleModal()
    } catch (error) {
      console.log(error)
      toast({
        title: `Couldn't catch ${pokemon.name}`,
        description: "Please try again later",
        status: 'error',
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
          {pokemon.isSaved ?
            <Button variant={"outline"} colorScheme={"red"} display={"flex"} w={"100%"} fontSize={"medium"} gap={2} onClick={() => handleRemoveSaved(pokemon)}
            >
              <MdOutlineCollectionsBookmark />
              <Text>Remove</Text>
            </Button>
            :
            <Button variant={"outline"} display={"flex"} w={"100%"} fontSize={"medium"} gap={2} onClick={() => handleSave(pokemon)}
            >
              <MdOutlineCollectionsBookmark />
              <Text>Save</Text>
            </Button>
          }

          {pokemon.isCatched ?
            <Button variant={"outline"} colorScheme={"green"} display={"flex"} w={"100%"} fontSize={"medium"} gap={2} onClick={() => handleRelease(pokemon)}
            >
              <MdOutlineCollectionsBookmark />
              <Text>Release</Text>
            </Button>
            :
            <Button variant={"solid"} display={"flex"} w={"100%"} fontSize={"medium"} gap={2}
              onClick={() => handleCatch(pokemon)}>
              <MdCatchingPokemon />
              <Text>Catched</Text>
            </Button>
          }



        </Flex>
      </Stack>
    </Stack>
  );
}
