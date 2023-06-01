import { Avalanche, Mnemonic, Buffer, HDNode } from '@avalabs/avalanchejs';
import { EVMAPI, KeyChain } from '@avalabs/avalanchejs/dist/apis/evm';
import { ethers } from 'ethers';

const derivedAddress = (MNEMONIC: string) => {
  const ip = 'api.avax-test.network';
  const port = 443;
  const protocol = 'https';
  const networkID = 5;
  const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID);
  const cchain: EVMAPI = avalanche.CChain();
  const mnemonic: Mnemonic = Mnemonic.getInstance();
  const m: string = MNEMONIC;

  const seed: Buffer = mnemonic.mnemonicToSeedSync(m);
  const hdnode: HDNode = new HDNode(seed);

  const keyChain: KeyChain = cchain.newKeyChain();

  const cAddresses: string[] = [];
  const privateKeys: string[] = [];
  for (let i = 0; i < 1; i++) {
    // Deriving the _i_th external BIP44 C-Chain address
    const child: HDNode = hdnode.derive(`m/44'/60'/0'/0/${i}`);
    keyChain.importKey(child.privateKey);
    // Converting the BIP44 addresses to hexadecimal addresses
    const cchainAddress = ethers.utils.computeAddress(child.privateKey);
    privateKeys.push(child.privateKey.toString('hex'));
    cAddresses.push(cchainAddress);
  }

  return { cAddresses, privateKeys };
};

export default derivedAddress;
