import {useState} from 'react';
import { ethers, BigNumber } from 'ethers';
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
                const response = await contract.mint(BigNumber.from(mintAmount));
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
            <h1>SlophyNFT</h1>
            <h3>
               Slophy NFTs is a collection of 5000 utility NFTs that allows you special access to the Slophy App. <br/>
               Slophy is the first D2E (disconnect to Earn) platform that rewards you for taking a break from your smartphone. <br/> 
               Slophy is open for all, but owning Slophy NFT allows you to see a hidden section on the app and the ability to gain rewards faster.
            </h3>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount} />
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint Slophy :D</button>
                </div>
            ) : (
                <p>Please connect your MetaMask wallet!</p>
            )}
        </div>
    )
};

export default MainMint;