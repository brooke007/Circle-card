import { Commitment, Connection } from '@solana/web3.js';
import { config } from './config';


export function createConnection(){
    const rpcurl = config.get('rpcurl');
    return new Connection(rpcurl);
};

