import React, { useState, useEffect } from 'react';
import { PublicKey, LAMPORTS_PER_SOL, Keypair, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { createConnection } from '@/lib/connection';

const connection = createConnection();

interface SendTokenProps {
  toPublicKey: string;
}

const SendToken: React.FC<SendTokenProps> = ({toPublicKey }) => {
  const [balance, setBalance] = useState<number | null>(null); // 存储钱包余额
  const [amountToSend, setAmountToSend] = useState<string>(''); // 要发送的SOL数量
  const [gasFee, setGasFee] = useState<number | null>(null); // 存储Gas费用
  const [status, setStatus] = useState<string>(''); // 显示状态信息

  // 获取钱包余额
  const fetchBalance = async () => {
    try {
      const lamports = await connection.getBalance(walletPubkey);
      setBalance(lamports / LAMPORTS_PER_SOL); // lamports 转换为 SOL
    } catch (error) {
      console.error('Failed to fetch balance', error);
      setStatus('Failed to fetch balance');
    }
  };

  // 获取Gas费用
  const fetchGasFee = async () => {
    try {
      const feeCalculator = await connection.getRecentBlockhash();
      const fee = feeCalculator.feeCalculator.lamportsPerSignature;
      setGasFee(fee / LAMPORTS_PER_SOL); // lamports 转换为 SOL
    } catch (error) {
      console.error('Failed to fetch gas fee', error);
      setStatus('Failed to fetch gas fee');
    }
  };

  // 发送 SOL 交易
  const sendTransaction = async () => {
    try {
      const toPubKey = new PublicKey(toPublicKey);

      // 创建交易
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromKeypair.publicKey,
          toPubkey: toPubKey,
          lamports: parseFloat(amountToSend) * LAMPORTS_PER_SOL, // 将 SOL 转换为 lamports
        })
      );

      // 发送交易并确认
      const signature = await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
      setStatus(`Transaction successful: ${signature}`);
    } catch (error) {
      console.error('Transaction failed', error);
      setStatus('Transaction failed: ' + error);
    }
  };

  // 在组件挂载时获取余额和Gas费用
  useEffect(() => {
    fetchBalance();
    fetchGasFee();
  }, []);

  return (
    <div>
      <h1>Send SOL</h1>
      <div>
        <p><strong>Wallet SOL Balance:</strong> {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
      </div>
      <div>
        <label htmlFor="amount">Amount to Send:</label>
        <input
          id="amount"
          type="number"
          value={amountToSend}
          onChange={(e) => setAmountToSend(e.target.value)}
          placeholder="Enter SOL amount"
        />
      </div>
      <div>
        <p><strong>Current Gas Fee (per signature):</strong> {gasFee !== null ? `${gasFee} SOL` : 'Loading...'}</p>
      </div>
      <div>
        <button onClick={sendTransaction} disabled={!amountToSend || parseFloat(amountToSend) <= 0}>
          Send SOL
        </button>
      </div>
      <div>
        {status && <p>{status}</p>}
      </div>
    </div>
  );
};

export default SendToken;
