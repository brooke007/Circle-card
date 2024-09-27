
import { PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

// Helius API 的请求 URL
const url = '51c5eb15-f385-4db4-a069-afab91e3f6f5';

// 构建请求体（可以根据实际需求传入参数）
const requestBody = {
  mintAccounts: ['YourMintAccount1', 'YourMintAccount2'],  // 示例的mint地址
};

// 发送 POST 请求到 Helius API 并获取响应
async function fetchTokenMetadata(publicKey:PublicKey, mintAccount: string[]) {
  try {
    // 发起 HTTP 请求
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody) // 将请求体转换为 JSON 字符串
    });

    // 检查是否成功返回响应
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 解析响应数据为 JSON
    const data = await response.json();

    // 输出返回的数据
    console.log('Token Metadata:', data);

    // 返回数据以供其他操作
    return data;
  } catch (error) {
    // 捕获并处理任何错误
    console.error('Error fetching token metadata:', error);
  }
}


// 处理 GET 请求
export async function GET(req: NextRequest) {
  console.log("GET request received"); // 添加日志输出

  const { searchParams } = new URL(req.url); 
  const walletAddress = searchParams.get('walletAddress'); 

  if (!walletAddress) {
    return NextResponse.json({ error: 'Missing wallet address' }, { status: 400 }); 
  }

  try {
    
    const balances = await fetchTokenMetadata(new PublicKey(walletAddress),);
    return NextResponse.json(balances, { status: 200 }); 
  } catch (error) {
    console.error('Error fetching balances:', error);
    return NextResponse.json({ error: 'Error fetching balances' }, { status: 500 }); 
  }
}


// import { createConnection } from "@/lib/connection";
// import { clusterApiUrl, PublicKey } from "@solana/web3.js";
// import { NextRequest, NextResponse } from 'next/server';
// import { expectPublicKey } from '@metaplex-foundation/mpl-token-metadata';
// import { Connection } from '@metaplex/js';
// import { Metaplex } from "@metaplex-foundation/js";


// // 定义代币余额接口
// interface TokenBalance {
//   token: string;  
//   balance: number; 
//   address?: string; 
//   imageUrl?: string;
// }

// const connection = createConnection(); 

// // 获取钱包地址的所有代币余额
// async function getAllBalances(walletAddress: string): Promise<any> {
//   console.log(`Fetching balances for wallet: ${walletAddress}`); // 添加日志输出
//   const publicKey = new PublicKey(walletAddress);
//   const balances: TokenBalance[] = []; // 声明 TokenBalance 数组

//   try {
//     // 1. 获取 SOL 余额
//     const balance = await connection.getBalance(publicKey);
//     const solBalance = balance / 1e9; // 转换为 SOL
    
//     balances.push({
//       token: 'SOL',
//       balance: solBalance,
//       address: 'So11111111111111111111111111111111111111112',
//       imageUrl: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
//     });

//     // 2. 获取与钱包相关的 SPL 代币账户
//     const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
//       programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), // SPL Token Program ID
//     });
//     console.log(`Token accounts fetched: ${tokenAccounts.value.length}`); // 输出代币账户数量

//     const mintAddresses: string[] = []; 

//     // 3. 遍历 SPL 代币账户，提取每个代币的余额和 mint 地址
//     for (const tokenAccount of tokenAccounts.value) {
//       const accountInfo = tokenAccount.account.data.parsed.info; // 获取账户信息
//       const mintAddress = expectPublicKey(accountInfo.mint); // 创建 Solana 的 PublicKey 实例
//       mintAddresses.push(mintAddress);
//       const tokenAmount = accountInfo.tokenAmount.uiAmount; // 获取代币余额
//       accountInfo.d
//       balances.push({
//         token: mintAddress,
//         balance: tokenAmount,
//         address: tokenAccount.pubkey.toString(),

//       });
//     }

//     console.log(`Mint addresses collected: ${mintAddresses}`); // 输出 mint 地址数量


//     // 4. 获取代币的元数据
//     if (mintAddresses.length > 0) {
//       const matadatas = fetchTokenMetadata(mintAddresses);
//       return matadatas; // 返回 JSON.stringify(balances);
//     }
//   } catch (error) {
//     console.error('Error fetching balances:', error);
//     throw new Error('Failed to fetch balances');
//   }
// }

// // 创建连接和 Metaplex 实例
// const metaplexconnection = new Connection(clusterApiUrl('devnet'));
// const metaplex = new Metaplex(metaplexconnection);

// // 获取代币的元数据
// async function fetchTokenMetadata(mintAddress: string[]) {
//   const mints = mintAddress.map(mint => new PublicKey(mint));
//   const metadatas = await metaplex.nfts().findAllByMintList({mints});
//   // 解析 NFT 元数据
// const parsedMetadata = metadatas.map(metadata => ({
//   address: metadata?.address.toString(),
//   name: metadata?.name, 
//   symbol: metadata?.symbol,
//   uri: metadata?.uri,
// }));
//   console.log(JSON.stringify(parsedMetadata, null, 2));
//   return parsedMetadata;
// }


