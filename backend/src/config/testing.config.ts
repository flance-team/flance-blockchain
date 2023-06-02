import { registerAs } from '@nestjs/config';

export default registerAs('APPS', () => ({
  INFURA_API_URL: process.env.INFURA_API_URL,
  TOKEN_CONTRACT_ADDRESS: process.env.TOKEN_CONTRACT_ADDRESS,
  OWNER_PRIVATE_KEY: process.env.OWNER_PRIVATE_KEY,
  NODE_ENV: process.env.NODE_ENV,
}));
