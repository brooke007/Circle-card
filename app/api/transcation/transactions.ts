import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey, Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js';
import { createConnection } from '@/lib/connection';

// 设置 Solana 网络连接 (例如 devnet 或 mainnet-beta)
const connection: Connection = createConnection();

// API 处理函数
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' }); // 仅允许 POST 请求
  }

  try {
    const { toPublicKey, amount } = req.body;

    // 检查请求体是否包含必要的字段
    if (!toPublicKey || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // 接收方的公钥
    const toPubKey = new PublicKey(toPublicKey);

    // 创建转账交易
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPubKey,
        lamports: amount * LAMPORTS_PER_SOL, // SOL 转换为 lamports (1 SOL = 1e9 lamports)
      })
    );

    // 发送并确认交易
    const signature = await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);

    // 返回交易签名
    res.status(200).json({ message: 'Transfer successful', signature });
  } catch (error) {
    console.error('Transfer failed', error);
    res.status(500).json({ error: 'Transfer failed', details: error.message });
  }
}
