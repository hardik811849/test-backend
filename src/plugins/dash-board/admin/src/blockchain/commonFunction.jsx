import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = provider.getSigner();

const getAccountDetails = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
};

const createTokenMeta = async (abi, bytecode) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contractInstance = await factory.deploy();
  await contractInstance.waitForDeployment();
  const deployedContractAddress = await contractInstance.getAddress();
  return deployedContractAddress;
};

export { getAccountDetails, createTokenMeta };
