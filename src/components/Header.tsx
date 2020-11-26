import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text } from "@chakra-ui/react";
import Container from './Container';

interface HeaderProps {
  logo: string
  logoW: string
  logoH: string
  isHome?: boolean
  top: string
}

const Header: React.FC<HeaderProps> = ({
  logo, 
  logoW,
  logoH,
  isHome = true,
  top
}) => {
  return (
    <Flex
    as="header"
    w="100%"
    justifyContent="center"
    position="absolute"
    top={top}
    left="0"
    zIndex="100" 
    >
      <Container pt="16px">
        <Flex
          flexDir="row"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
          w={logoW}
          h={logoH}
          >
            <Link href="/">
              <a>
                <Image 
                  src={logo}
                  width={272} 
                  height={116} 
                  loading="eager" />
              </a>
            </Link>
          </Box>
          <Flex
            justifyContent="flex-end"
            alignItems="center"
            display={["none", null, null, "flex"]}
          >
            <Text
              color={ isHome ? "white" : "black"}
              fontFamily="Barlow"
              fontWeight="700"
              fontSize="15px"
              mr="16px"
            >
              Em breve para Android e iOS
            </Text>
              <Box 
                mr="16px"
                h="40px"
              >
                <Image src="/googleplay.png" width={135} height={40} />
              </Box>
              <Box h="40px">
                <Image src="/appstore.png" width={120} height={40} />
              </Box>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Header;