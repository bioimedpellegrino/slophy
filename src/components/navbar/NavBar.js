import React from 'react';

import { Box, Button, Flex, Link, Spacer } from '@chakra-ui/react';

import {ReactComponent as OpenSea} from "../../assets/social-media-icons/opensea.svg";
import {ReactComponent as Discord} from "../../assets/social-media-icons/discord.svg";
import {ReactComponent as Logo} from "../../assets/social-media-icons/logo.svg";
import {ReactComponent as Twitter} from "../../assets/social-media-icons/twitter.svg";


const NavBar = ({ accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount(){
        if (window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccounts(accounts);
        }
    }

    return (
      <Flex justify="space-between" align="center" padding="30px">
            {/* Left Side - Social media icons*/}
            <Flex justify="space-around" width="43%" padding="0 80px">
                <Link href="https://www.slophy.tech" target="_blank">
                    <Logo/>
                </Link>
            </Flex>
            <Flex justify="space-around" width="20%" padding="0 15px">
                <Link href="https://discord.gg/pFcE2qb7we" target="_blank">
                    <Discord/>
                </Link>
            </Flex>
            <Flex justify="space-around" width="20%" padding="0 15px">
                <Link href="https://twitter.com/SlophyNFTs" target="_blank">
                    <Twitter/>
                </Link>
            </Flex>
            <Flex justify="space-around" width="20%" padding="0 15px">
                <Link href="https://www.opensea.com" target="_blank">
                    <OpenSea/>
                </Link>
            </Flex>
            {/* Right Side - Social media icons*/}
            <Flex
                justify="space-around"
                align="center"
                width="40%"
                padding="30px"
            >
            <Spacer />
            {/* Connect */}
            {isConnected ? (
            <Box margin="0 15px">Connected!</Box>
                ) : (
                    <Button
                        backgroundColor="#cbfe41"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #cbfe41"
                        color="black"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        width="160px"
                        margin="0 15px"
                        onClick={connectAccount}
                    >
                    Connect
                    </Button>
                )}
          </Flex>
      </Flex>
    );
};

export default NavBar;