import os from 'os';

// 获取本地 IP 地址
export function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // 忽略内部（127.0.0.1）和非IPv4地址
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    api_url: `http://${getLocalIP()}:3000`,
    // api_url: `https://circlecard.fun.`,
    rpc_url: process.env.RPC_URL || '',
  },
};

console.log('Server is running on IP:', getLocalIP());

export default nextConfig;
