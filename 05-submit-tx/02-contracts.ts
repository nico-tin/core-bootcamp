import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

import {
  Hex,
  createWalletClient,
  getContract,
  http,
  publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import erc20JsonArtifact from "./erc20-artifacts.json";

// Application Binary Interface
const { abi } = erc20JsonArtifact;

const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(`0x${privateKey}` as Hex);

(async () => {
  const client = createWalletClient({
    account,
    transport: http(process.env.API_URL),
  }).extend(publicActions);

  // const hash = await client.deployContract({
  //   abi,
  //   bytecode: `0x${bin}`,
  //   args: [127n],
  // });
  // const { contractAddress } = await client.getTransactionReceipt({ hash });

  const contractAddress = '0x47B3255F4571222B0Be6C4B06873a3016F052Db5';

  if (contractAddress) {
    const contract = getContract({
      address: contractAddress,
      abi,
      client,
    });

    const tx = await contract.write.transfer(['0xEaA35d18c522f68bDb4138FADb813926295E8C70', 1000000000000000000]);    
    console.log('tx', tx);

    console.log(await contract.read.balanceOf(['0xfF597Ead69AE2d925CbB0B169E670C636c753d08']));
  }
})();