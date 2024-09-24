import QRCode from 'react-qr-code'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;  // 获取环境变量中的 API URL
interface QRCodeShowProps {
  username: string; // 定义 props 类型
}

export default function QRCodeShow({ username }: QRCodeShowProps) {
  // 从环境变量中获取 API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 确保环境变量已配置
  const url = `${apiUrl}/${username}`; // 构建完整的 URL

  return (
    <div className="flex flex-col items-center justify-center h-2/3 bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-2xl border border-gray-300 transition-transform transform hover:scale-105">
        <QRCode 
          value={url} 
          size={256} 
          bgColor="#ffffff"
          fgColor="#333333"
          level="Q"
        />
      </div>
    </div>
  );
}
