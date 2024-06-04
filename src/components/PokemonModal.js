import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import PokemonData from './PokemonData'

const PokemonModal = ({ pokemonDataModal , selectedPokemon }) => {
    return (
        <Modal {...pokemonDataModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textTransform="capitalize">
                    {selectedPokemon?.name}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {selectedPokemon && <PokemonData pokemon={selectedPokemon} />}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}


export default PokemonModal
