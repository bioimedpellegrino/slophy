import {useState} from 'react';
import { ethers, BigNumber } from 'ethers';

import {ReactComponent as SlophyEth} from "../../assets/background/slophyeth.svg";
import {ReactComponent as D2E} from "../../assets/background/d2e.svg";

import { Input, Button, Text } from '@chakra-ui/react';

import slophyNFT from '../../SlophyNFT.json';

const slophyNFTAddress = "0xE7f6703E4feBF792693149e3B9b2eAd2B2160C1F";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMinAmount] = useState(2);
    const isConnected = Boolean(accounts[0]);

    async function handleMint(){
        if (window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
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
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMinAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 2) return;
        setMinAmount(mintAmount + 1);
    }

    return (
        <div>
            <div>
                <SlophyEth/>
            </div>
            <div>
                <D2E/>
            </div>
            <p>The only <b>NFT</b> that earns you crypto by smartphone’s disconnection.</p>
            {isConnected ? (
                <div>
                    <div>
                        <Button
                            backgroundColor="#cbfe41"
                            borderRadius="25px"
                            boxShadow="0px 2px 2px 1px #cbfe41"
                            color="black"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            width="50px"
                            margin="0 15px"
                            onClick={handleDecrement}><b>-</b></Button>
                        <Input
                            readOnly
                            fontFamily="inherit"
                            width="10%"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type="number"
                            value={mintAmount}
                        />
                        <Button
                            backgroundColor="#cbfe41"
                            borderRadius="25px"
                            boxShadow="0px 2px 2px 1px #cbfe41"
                            color="black"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            width="50px"
                            margin="0 15px"
                            onClick={handleIncrement}><b>+</b></Button>
                    </div>
                    <Button
                        backgroundColor="#cbfe41"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #cbfe41"
                        color="black"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        width="160px"
                        margin="15px 15px"
                        onClick={handleMint}
                    >
                    <b>MINT!</b>
                    </Button>
                </div>
            ) : (
                <Text
                    marginTop="60px"
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="inherit"
                    textShadow="0 1px #27414D"
                    color="#cbfe41"
                >
                    You must be connected to mint!
                </Text>
            )}
        </div>
    )
};

export default MainMint;