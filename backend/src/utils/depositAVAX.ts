import { ethers } from 'ethers';

const depositAVAX = async (
  provider: ethers.providers.Provider,
  amountInAVAX: string,
  receiverAddress: string,
  privateKey: string,
): Promise<any> => {
  const wallet = new ethers.Wallet(privateKey, provider);

  const tx = {
    to: receiverAddress,
    value: ethers.utils.parseEther(amountInAVAX),
  };

  const txResponse = await wallet.sendTransaction(tx);

  return txResponse.hash;
};

export default depositAVAX;
