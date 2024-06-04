import { Container, Flex, Stack } from "@chakra-ui/react";
import Navbar, { navbarHeight } from "./Navbar";

export default function Layout({ children }) {
    return (
        <Flex alignItems="center" direction={"column"} minH="100vh" justifyContent="center">
            <Navbar />
            <Container paddingTop={navbarHeight} maxW="container.lg">
                <Stack as={"main"} p="5" alignItems="center" spacing="5">
                    {children}
                </Stack>
            </Container>
        </Flex>
    )
}