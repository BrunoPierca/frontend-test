import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import PokemonData from './PokemonData'

const PokemonModal = ({ pokemonDataModal, selectedPokemon }) => {
    return (
        <Modal {...pokemonDataModal}>
            <ModalOverlay />
            <ModalContent mx={[2, 0]} >
                <ModalHeader textTransform="capitalize" px={[4, 6]}>
                    {selectedPokemon?.name}
                </ModalHeader>
                <ModalCloseButton title='Close modal' />
                <ModalBody px={[4, 6]} >
                    {selectedPokemon && <PokemonData onToggleModal={pokemonDataModal.onToggle} pokemon={selectedPokemon} />}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}


export default PokemonModal
