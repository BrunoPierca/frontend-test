import { Button, Flex, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { GoLightBulb } from "react-icons/go";
import { MdDarkMode } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const navbarHeight = "64px"

const Navbar = () => {
    const [term, setTerm] = useState("")
    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')
    const inputForegroundBg = useColorModeValue('rgb(255, 255, 255)', 'rgb(26, 32, 44)')

    const router = useRouter()


    const handleSearch = (e) => {
        e.preventDefault()
        if (term <= 0) { router.push("/") } else { router.push(`/search?term=${term}`) }
    }

    useEffect(() => {
        if (router.query && router.query.term) { setTerm(router.query.term) }
    }, [router.query])
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
            <Link href={"/"}>
                <Flex alignItems={"center"} gap={2}>
                    <Image width={32} height={32} src="/logo.png" alt='Pokeball logo' />
                    <Text display={["none", "block"]}>
                        Pokédex
                    </Text>
                </Flex>
            </Link>

            <Flex background={inputForegroundBg} transition={"all"} >
                <InputGroup as={"form"} onSubmit={(e) => handleSearch(e)}>
                    <Input textAlign={"center"} value={term} onChange={(e) => setTerm(e.target.value)} opacity={1} variant='filled' placeholder='Search' />
                    <InputRightElement cursor={"pointer"} as={"button"} type='submit'>
                        <FaSearch />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <Flex gap={2}>
                <Button name='Toggle theme' onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MdDarkMode /> : <GoLightBulb />}
                </Button>
                <Menu placement='bottom-end'>
                    <MenuButton name='Toggle menu' as={Button} >
                        <LuMenu />
                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup value={router.pathname}>
                            <MenuItemOption value='/' onClick={() => router.push("/")}>
                                <Link href="/">
                                    All
                                </Link>
                            </MenuItemOption>
                            <MenuItemOption value="/saved" onClick={() => router.push("/saved")}>
                                Saved
                            </MenuItemOption>
                            <MenuItemOption value="/catched" onClick={() => router.push("/catched")} >
                                <Link href="catched">
                                    Catched
                                </Link>
                            </MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
            </Flex>

        </Flex >
    )
}

export default Navbar