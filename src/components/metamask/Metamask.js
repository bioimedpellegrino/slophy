import React from 'react';

import { Box, Button, Flex } from '@chakra-ui/react';



const Metamask = ({ accounts, setAccounts}) => {
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
        <Button
            backgroundColor="#C1F53F"
            borderRadius="5px"
            boxShadow="0px 30px 70px 12px rgb(203 254 65 / 71%)"
            color="#04521F"
            fill="#04521F"
            cursor="pointer"
            fontFamily="inherit"
            fontSize="16px"
            padding="16px 32px 16px 32px"
            width="auto"
            margin="50px 15px"
            onClick={connectAccount}
        >
        <b>CONNET TO METAMASK</b>
        </Button>
    );
};

export default Metamask;