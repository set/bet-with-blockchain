const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Betting = await hre.ethers.getContractFactory("BetWithBlockchain");
  const blocks = await Betting.deploy();

  await blocks.deployed();

  console.log("BetWithBlockchain deployed to:", blocks.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
