import { randomBytes } from 'randombytes';
import { Mnemonic } from '@avalabs/avalanchejs';
const mnemonic: Mnemonic = Mnemonic.getInstance();

const generateMnemonic = async (): Promise<any> => {
  const strength = 256;
  const wordlist = mnemonic.getWordlists('english') as string[];
  const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist);
  return m;
};

export default generateMnemonic;
