import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button , Flex , Input , Text } from '@chakra-ui/react';

import edNFTs from './EdNFTs.json'
import "react-popup/style.css";
import Popup from "react-popup";
import './Popup.css';

const edNFTsAddress = '0x40FA6AAc2bcAE4c70D18f406D92352a4339f4eCB'
//const edNFTsAddress = '0x6B7a2a170ba36d61dBA08F5470B03EA5E6714efe'

const MainMint = ({ accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const [remainingSupply, setRemainingSupply] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);
    const isConnected = Boolean(accounts[0]);
    const [showPopup, setShowPopup] = useState(false);
    const [overMintPopup, setoverMintPopup] = useState(false);

    useEffect(() => {
        // Calculate the remaining supply
        const calculateRemainingSupply = async () => {
          if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
              edNFTsAddress,
              edNFTs.abi,
              provider
            );
            try {
                const maxSupply = await contract.getMaxSupply();
                const totalSupply = await contract.getTotalSupply();
                const remaining = maxSupply.sub(totalSupply);
                setRemainingSupply(remaining.toNumber());
                setTotalSupply(maxSupply.toNumber());

               
              } catch (err) {
                console.log('Error while calculating remaining supply:', err);
              }
              
            }
          };
      
          calculateRemainingSupply();
        }, []);
    

    async function handleMint(){
        if (remainingSupply === 0) {
            setShowPopup(true);
            return;
        }

        if (mintAmount > remainingSupply) {
            setoverMintPopup(true);
            return;
        }


        if (window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                edNFTsAddress,
                edNFTs.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.01 * mintAmount).toString())    
                });
                console.log('response', response);
            } catch (err) {
                console.log('error', err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIecrement = () => {
        if (mintAmount >= 20) return;
        setMintAmount(mintAmount + 1);
    }


      const handleClosePopup = () => {
        setShowPopup(false);
      };

      const handleCloseOverPopup = () => {
        setoverMintPopup(false);
      }
    return (
        <Flex justify ="center" align="center" height="100hv" paddingBottom="150px">
            <Box width="520x">
               <div>
                <Text fontSize="48px" textShadow="0 5px #000000">EdNFTs
                </Text>
                <Text 
                     fontSize="30px"
                     letterSpacing="-5.5%"
                     fontFamily="VT323"
                     textShadow="0 2px #000000"
                     >
                     Ed NFTs can even be used for claiming healthcheck and can even be used at the sandbox! 

              </Text>
             </div>
            {isConnected ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleDecrement}>-
                            </Button>
                        <input 
                            readOnly
                            fontFamily="ingerit"
                            width="100px"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type="number"
                             value={mintAmount} 
                        />
                        <Button
                           backgroundColor="#D6517D"
                           borderRadius="5px"
                           boxShadow="0px 2px 1px #0F0F0F"
                           color="white"
                           cursor="pointer"
                           fontFamily="inherit"
                           padding="15px"
                           marginTop="10px" 
                        
                        onClick={handleIecrement}>+</Button>
                    </Flex>
                    <Button 
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop="10px"
                        onClick={handleMint}>Mint Now
                    </Button>
                    {overMintPopup && (
                        <div className="popup-overlay">
                            <div className ="popup-container">
                            <h2>Cannot mint more than the remaining supply!</h2>
                                <p>Remaining Supply: {remainingSupply}</p>
                            <button onClick={handleCloseOverPopup}>Close</button>
                        </div>
                       </div>
                    )}
                        {showPopup && (
                        <div className="popup-overlay">
                            <div className ="popup-container">
                                <h2>Supply has run out!</h2>
                            <button onClick={handleClosePopup}>Close</button>
                        </div>
                        </div>
                    )}
                </div>
            ) : (
                <Text
                     marginTop="70px"
                     fontSize="30px"
                     letterSpacing="-5.5%"
                     fontFamily="VT323"
                     textShadow="0 3px #000000"
                     color="#D6517D"
                     >
                     You must be connected to Mint.</Text>
            )
            }
            
            <p>Total Supply in this pool: {totalSupply} &nbsp;&nbsp; Remaining NFTs: {remainingSupply}</p>
            </Box>
        </Flex>
    );
};

export default MainMint;