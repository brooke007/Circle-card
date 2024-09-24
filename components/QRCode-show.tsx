import QRCode from "react-qr-code";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;  // 获取环境变量中的 API URL
interface QRCodeShowProps {
  username: string; // 定义 props 类型
}

export default function QRCodeShow({ username }: QRCodeShowProps) {
  // 从环境变量中获取 API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 确保环境变量已配置
  const url = `${apiUrl}/${username}/show`; // 构建指向 /show 子页面的完整 URL

  return (
    <div className="flex flex-col items-center">
      <div className="p-6 transition-transform transform hover:scale-105">
        <QRCode
          value={url}
          size={256} // 固定二维码大小
          bgColor="transparent"
          fgColor="#333333"
          level="Q"
          style={{ width: "33vw", height: "33vw", margin: "0 auto" }}
        />
      </div>
    </div>
  );
}
