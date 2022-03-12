import {useState} from 'react';
import { ethers, BigNumber } from 'ethers';
import {ReactComponent as SlophyEth} from "../../assets/background/slophyeth.svg";
import {ReactComponent as D2E} from "../../assets/background/d2e.svg";
import Metamask from '../metamask/Metamask';
import { Input, Button, Text, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, ChakraProvider} from '@chakra-ui/react';
import slophyNFT from '../../SlophyNFT.json';
import React from 'react';

const slophyNFTAddress = "0xE7f6703E4feBF792693149e3B9b2eAd2B2160C1F";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMinAmount] = useState(2);
    const isConnected = Boolean(accounts[0]);
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    
    async function handleMint(){
        if (window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.detectNetwork();
                if (network['chainId'] === 1){
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    slophyNFTAddress,
                    slophyNFT.abi,
                    signer
                );
                try{
                    const response = await contract.mint(BigNumber.from(mintAmount), {
                        value: ethers.utils.parseEther((0.28 * mintAmount).toString()),
                    });
                    console.log("response", response);
                } 
                catch(err){
                    console.log("error", err);
                }
            }
            else {
                setIsOpen(true);
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMinAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 2) return;
        setMinAmount(mintAmount + 1);
    }

    function WrongNetworkAlert() {
        return (
            <ChakraProvider>
                <AlertDialog isOpen={isOpen} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            You are using the wrong network!
                        </AlertDialogHeader>
            
                        <AlertDialogBody>
                            You must replace the network you are connected to with the Ethereum Mainnet network
                        </AlertDialogBody>
            
                        <AlertDialogFooter>
                            <Button backgroundColor='#cbfe41' onClick={onClose}>
                            Got it!
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
                </AlertDialog>
            </ChakraProvider>
        )
      }

    return (
        <div>
            {!isConnected ? (
                <div>
                    <div>
                        <SlophyEth/>
                    </div>
                    <div>
                        <D2E/>
                    </div>
                    <Text
                        fontSize="14px"
                        fontFamily="inherit"
                        color="#28414D"
                    >
                        <b>The only NFT that earns you crypto by smartphone’smartphone <br></br>
                        disconnection.</b>
                    </Text>
                </div>
            ) : (
                <div>
                    <Text
                            marginTop="60px"
                            fontSize="60px"
                            fontFamily="MessapiaBold"
                            color="#28414D"
                        >
                            <b>Mint Time!</b>
                    </Text>
                    <Text
                        marginBottom="60px"
                        fontSize="15px"
                        fontFamily="inherit"
                        color="#28414D"
                    >
                        <b>Select how many Slophy you want to mint.*</b>
                    </Text>
                    <WrongNetworkAlert/>
                </div>
            )}
            {isConnected ? (
                <div>
                    <div>
                        <Button
                            backgroundColor="#C1F53F"
                            borderRadius="5px"
                            color="#04521F"
                            fill="#04521F"
                            cursor="pointer"
                            fontFamily="inherit"
                            fontSize="16px"
                            padding="16px 32px 16px 32px"
                            width="auto"
                            margin="50px 15px"
                            onClick={handleDecrement}><b>-</b></Button>
                        <Input
                            readOnly
                            fontFamily="MessapiaBold"
                            fontSize="30px"
                            width="10%"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            variant="unstyled"
                            border="0px"
                            type="number"
                            size="lg"
                            value={mintAmount}
                        />
                        <Button
                            backgroundColor="#C1F53F"
                            borderRadius="5px"
                            color="#04521F"
                            fill="#04521F"
                            cursor="pointer"
                            fontFamily="inherit"
                            fontSize="16px"
                            padding="16px 32px 16px 32px"
                            width="auto"
                            margin="50px 15px"
                            onClick={handleIncrement}><b>+</b></Button>
                    </div>
                    <Text
                        marginTop="60px"
                        fontSize="15px"
                        fontFamily="inherit"
                        color="#28414D"
                    >
                        <b>*NOTE: You can mint maximux 2 Slophy at once.</b>
                    </Text>
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
                        onClick={handleMint}
                    >
                    <b>MINT SLOPHYS</b>
                    </Button>
                </div>
            ) : (
                <Metamask accounts={accounts} setAccounts={setAccounts} />
            )}
        </div>
    )
};

export default MainMint;