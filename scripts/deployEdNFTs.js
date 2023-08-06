
const hre = require("hardhat");

async function main() {
  
  const EdNFTs = await hre.ethers.getContractFactory("EdNFTs");
  const edNFTs = await EdNFTs.deploy();

  await edNFTs.deployed();

  console.log("EdNFTs deployed to:", edNFTs.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
