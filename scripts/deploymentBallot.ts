import {ethers} from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Console } from "console";
dotenv.config()

const TOKENCONT = "0x3a4a8459f38e131fa5071a3e0444e64313f7343e"
// const TOKENCONT2 = "0x5b82aee78a1e7e02144e0782a1ab7f59e7a9ef6e"

const WWallet = "0x6f6eb030334642D3D1527B3D1b05fb08C16852d5"
const WWallet4 = "0x2924a6C59115299A5945cA1dF6D73ABA526C97bd"

const PROPOSALS = ["Ethereum", "Bitcoin", "ChiaCoin", "All.LoveForCrypto"];

async function main () {
const provider = new ethers.providers.InfuraProvider("goerli", {infura: process.env.INFURA_API_KEY});
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ??"");
const signer = wallet.connect(provider);
console.log(`${signer.address}`)
const balance = await signer.getBalance();
console.log(`this address has balance of ${balance}`)
const BLOCKNUMBER = provider._getFastBlockNumber()
const BN = await BLOCKNUMBER

const ballotContractFactory = new TokenizedBallot__factory(signer);
const ballotContract = await ballotContractFactory.deploy(
  convertStringArrayToBytes32(PROPOSALS),
  TOKENCONT,
  (BN -1) 
);
await ballotContract.deployed()

const MINT_VALUE = ethers.utils.parseEther("10");

// const minttt = await ballotContract.mint(WWallet, 10**10)
// await minttt.wait()



const balance2 = await signer.getBalance();
console.log(`this address has balance of ${balance2}`)






function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}
for (let index = 0; index < PROPOSALS.length; index++) {
  const proposal = await ballotContract.proposals(index);
  
  console.log(ethers.utils.parseBytes32String(proposal.name));

}


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});