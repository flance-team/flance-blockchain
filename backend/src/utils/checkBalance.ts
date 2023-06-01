import { ethers } from 'ethers';

const checkBalance = async (
  provider: ethers.providers.Provider,
  address: string,
): Promise<any> => {
  const balance = await provider.getBalance(address);

  const balanceInAvax = ethers.utils.formatEther(balance);

  return balanceInAvax;
};

export default checkBalance;
