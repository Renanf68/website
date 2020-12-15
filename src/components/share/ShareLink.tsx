import { ElementType } from 'react';
import { Link, Icon, useStyleConfig, LinkProps } from '@chakra-ui/react';

interface ShareLinkProps extends LinkProps {
  link: string
  label: string
  icon: ElementType<any>
}

const ShareLink: React.FC<ShareLinkProps> = ({
  link, label, icon, ...props
}) => {
  //const styles = useStyleConfig("Button", {variant: "basic"})
  return (
    <Link 
      href={link}
      //sx={styles}
      fontFamily="Barlow"
      fontSize="15px"
      border="2px solid black"
      borderRadius="8px"
      w="100%"
      h="48px"
      _hover={{bg: "#F2F6EA"}}
      display="flex"
      flexDir="row"
      justifyContent="center"
      alignItems="center"
      {...props}
      isExternal
    >
      <Icon as={icon} w="24px" h="24px" mr="8px" />
      {label}
    </Link>
  );
}

export default ShareLink;