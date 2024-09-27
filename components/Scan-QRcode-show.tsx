import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRCodeScanner = () => {
  useEffect(() => {
    // 检查 window 是否存在（确保是在浏览器环境下运行）
    if (typeof window !== 'undefined') {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(
        (result: any) => {
          alert(`Scanned result: ${result}`);
          scanner.clear(); // 停止扫描
        },
        (error: any) => {
          console.warn(`Error: ${error}`);
        }
      );

      return () => {
        scanner.clear(); // 清除扫描器
      };
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Scan QR Code</h1>
      <div id="reader" style={{ width: '100%' }}></div>
    </div>
  );
};

export default QRCodeScanner;
