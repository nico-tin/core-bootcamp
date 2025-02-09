import { error } from 'console';
import hre from 'hardhat';

async function main(): Promise<void> {
    const contract = await hre.ethers.getContractAt('BBCCONTRACT' , '0x64f65B6a641519f9DF91C509FE9d350B5bFB74c4');
    await contract.mint();
}

main().catch((error) => {
    console.error(error);
    // process.exitcode = 1;
});