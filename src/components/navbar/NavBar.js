import React from 'react';
import { Flex, Link } from '@chakra-ui/react';
import {ReactComponent as Logo} from "../../assets/social-media-icons/logo.svg";


const NavBar = () => {
    return (
      <Flex justify="space-between" align="center" padding="30px">
        {/* Left Side - Social media icons*/}
        <Flex justify="space-around" align="center" width="100%" padding="0 80px">
            <Link href="https://www.slophy.tech" target="_blank">
                <Logo/>
            </Link>
        </Flex>
      </Flex>
    );
};

export default NavBar;