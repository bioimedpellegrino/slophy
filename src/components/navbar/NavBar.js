import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';

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
          <Flex justify="space-around" width="40%" padding="0 75px">
              <Link href="https://www.twitter.com">
                 <Twitter/>
              </Link>
          </Flex>
          <Flex justify="space-around" width="40%" padding="0 75px">
              <Link href="https://www.discord.com">
                  <Discord/>
              </Link>
          </Flex>
          <Flex justify="space-around" width="40%" padding="0 75px">
              <Link href="https://www.opensea.com">
                  <OpenSea/>
              </Link>
          </Flex>
          <Flex justify="space-around" width="40%" padding="0 75px">
              <Link href="https://www.slophy.tech">
                   <Logo/>
              </Link>
          </Flex>
          {/* Right Side - Social media icons*/}
          <div>Mint</div>
          {/* Connect */}
          {isConnected ? (
              <p>Connected!</p>
          ) : (
              <button onClick={connectAccount}>Connect</button>
          )}
      </Flex>
    );
};

export default NavBar;