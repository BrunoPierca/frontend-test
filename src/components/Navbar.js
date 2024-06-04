import { Button, Flex, Input, InputGroup, InputRightElement, Select, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { GoLightBulb } from "react-icons/go";
import { MdDarkMode } from "react-icons/md";
import { FaSearch } from "react-icons/fa";


import Image from 'next/image'
import { useState } from 'react';

export const navbarHeight = "64px"

const Navbar = () => {
    const [term, setTerm] = useState("")
    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')
    const inputForegroundBg = useColorModeValue('rgb(255, 255, 255)', 'rgb(26, 32, 44)')


    return (
        <Flex id="navbar"
            w={"100%"}
            h={navbarHeight}
            px={2}
            gap={2}
            maxW={"1440px"}
            alignItems={"center"}
            justifyContent={"space-between"}
            backgroundColor={bg}
            backdropFilter={"auto"}
            backdropBlur={"4px"}
            position={"fixed"}
            top={0}
            zIndex={20}
        >
            <Flex alignItems={"center"} gap={2}>
                <Image width={32} height={32} src="/logo.png" />
                <Text display={["none", "block"]}>
                    Pokédex
                </Text>
            </Flex>

            <Flex background={inputForegroundBg} transition={"all"} >
                <InputGroup>
                    <Input textAlign={"center"} value={term} onChange={(e) => setTerm(e.target.value)} opacity={1} variant='filled' placeholder='Search' />
                    <InputRightElement cursor={"pointer"}>
                        <FaSearch />
                    </InputRightElement>
                </InputGroup>
            </Flex>

            <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MdDarkMode /> : <GoLightBulb />}
            </Button>

        </Flex>
    )
}

export default Navbar