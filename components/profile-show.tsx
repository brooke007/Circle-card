import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import QRCodeShow from './QRCode-show';

interface ProfileShowProps {
  urls: Array<{ platform: string; url: string }>
  username: string
}

// 定义连接平台和社交媒体平台的数组
const connectionPlatforms = ['wechat', 'QQ', 'email', 'telegram', 'discord', 'phonenumber']
const socialMediaPlatforms = ['twitter', 'Facebook', 'ins', 'steam', 'GitHub', 'bilibili', '微博', '豆瓣', '小红书', '抖音']

export default function ProfileShow({ urls, username }: ProfileShowProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0) // 当前显示的卡片索引
  const cardRef = useRef<HTMLDivElement>(null) // 卡片的引用，用于动态调整大小

  // 计算连接平台卡片和社交媒体平台卡片的数量
  const connectionCards = Math.ceil(urls.filter(link => connectionPlatforms.includes(link.platform)).length / 6)
  const socialMediaCards = Math.ceil(urls.filter(link => socialMediaPlatforms.includes(link.platform)).length / 6)
  const totalCards = connectionCards + socialMediaCards // 总卡片数

  // 使用effect在窗口大小调整时调整卡片大小
  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        const viewportHeight = window.innerHeight
        const viewportWidth = window.innerWidth
        const maxSize = Math.min(viewportHeight * 0.6, viewportWidth * 0.8) // 根据窗口大小计算卡片大小
        cardRef.current.style.width = `${maxSize * (4 / 5)}px` // 改为10:9比例的长方形宽度
        cardRef.current.style.height = `${maxSize}px` // 高度保持
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 渲染每个平台的饼图部分
  const renderPieChart = (platforms: string[], urls: Array<{ platform: string; url: string }>, startIndex: number) => {
    const filteredUrls = urls.filter(url => platforms.includes(url.platform)).slice(startIndex, startIndex + 6) // 筛选当前显示的链接
    return filteredUrls.map((url, i) => (
      <Link key={url.platform} href={url.url} className="absolute w-1/6 h-1/6 transition-all duration-300 hover:scale-110" style={{
        top: `${50 - 20 * Math.cos((i * Math.PI) / 3 + Math.PI / 6)}%`,
        left: `${50 + 20 * Math.sin((i * Math.PI) / 3 + Math.PI / 6)}%`,
        transform: 'translate(-50%, -50%)'
      }}>
        <Image
          src={`/${url.platform}.png`}
          alt={url.platform}
          layout="fill"
          objectFit="contain"
          className="rounded-lg transition-all duration-300 hover:ring-2 hover:ring-purple-200 hover:ring-opacity-100 shadow-md" // 添加 shadow-md 类来增加阴影效果
        />
      </Link>
    ))
  }

  // 处理卡片滑动的函数
  const handleSwipe = () => {
    setActiveCardIndex((activeCardIndex + 1) % totalCards) // 轮转卡片索引
  }

  // 渲染每一个卡片
  const renderCard = (index: number) => {
    const isConnectionCard = index < connectionCards // 判断是否为连接平台卡片
    const platforms = isConnectionCard ? connectionPlatforms : socialMediaPlatforms // 决定使用的平台
    const startIndex = isConnectionCard ? index * 6 : (index - connectionCards) * 6 // 确定显示的链接起始位置
    const title = isConnectionCard ? `Connection ${index + 1}` : `Social Media ${index - connectionCards + 1}` // 卡片标题

    return (
      <div 
        className={`absolute inset-0 bg-white rounded-lg shadow-lg transition-all duration-500 ease-in-out 
                    ${index === activeCardIndex ? 'z-20' : 'z-10'}`} // 根据索引调整卡片的z-index
        style={{
          transform: `translate(${(index - activeCardIndex) * 3}%, ${(index - activeCardIndex) * 3}%)`,
        }}
        onClick={handleSwipe}
      >
        <Image
          src="/pizza-card02.jpeg"
          alt={`${title} Background`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0">
          {renderPieChart(platforms, urls, startIndex)} {/* 渲染链接饼图 */}
        </div>
        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white bg-black bg-opacity-50 px-2 py-1 rounded">{title}</h3>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold text-purple-600 mb-4">Hello There!</h2>
      <div className="relative rounded-lg overflow-visible text-xl" ref={cardRef}>
        <div
          className={`flex justify-center items-center transition-transform duration-300`}
          style={{ zIndex: 1 }} // 因为这里只有一个二维码，所以zIndex可以设为1
        >
          <QRCodeShow username={username} />
        </div>
      </div>
    </div>
  );
  
}
// import { useState, useRef, useEffect } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'

// interface ProfileShowProps {
//   urls: Array<{ platform: string; url: string }>
//   username: string
// }

// // 定义连接平台和社交媒体平台的数组
// const connectionPlatforms = ['wechat', 'QQ', 'email', 'telegram', 'discord', 'phonenumber']
// const socialMediaPlatforms = ['twitter', 'Facebook', 'ins', 'steam', 'GitHub', 'bilibili', '微博', '豆瓣', '小红书', '抖音']

// export default function ProfileShow({ urls, username }: ProfileShowProps) {
//   const [activeCardIndex, setActiveCardIndex] = useState(0) // 当前显示的卡片索引
//   const cardRef = useRef<HTMLDivElement>(null) // 卡片的引用，用于动态调整大小

//   // 计算连接平台卡片和社交媒体平台卡片的数量
//   const connectionCards = Math.ceil(urls.filter(link => connectionPlatforms.includes(link.platform)).length / 6)
//   const socialMediaCards = Math.ceil(urls.filter(link => socialMediaPlatforms.includes(link.platform)).length / 6)
//   const totalCards = connectionCards + socialMediaCards // 总卡片数

//   // 使用effect在窗口大小调整时调整卡片大小
//   useEffect(() => {
//     const handleResize = () => {
//       if (cardRef.current) {
//         const viewportHeight = window.innerHeight
//         const viewportWidth = window.innerWidth
//         const maxSize = Math.min(viewportHeight * 0.6, viewportWidth * 0.8) // 根据窗口大小计算卡片大小
//         cardRef.current.style.width = `${maxSize * (4 / 5)}px` // 改为10:9比例的长方形宽度
//         cardRef.current.style.height = `${maxSize}px` // 高度保持
//       }
//     }

//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   // 渲染每个平台的饼图部分
//   const renderPieChart = (platforms: string[], urls: Array<{ platform: string; url: string }>, startIndex: number) => {
//     const filteredUrls = urls.filter(url => platforms.includes(url.platform)).slice(startIndex, startIndex + 6) // 筛选当前显示的链接
//     return filteredUrls.map((url, i) => (
//       <Link key={url.platform} href={url.url} className="absolute w-1/6 h-1/6 transition-all duration-300 hover:scale-110" style={{
//         top: `${50 - 20 * Math.cos((i * Math.PI) / 3 + Math.PI / 6)}%`,
//         left: `${50 + 20 * Math.sin((i * Math.PI) / 3 + Math.PI / 6)}%`,
//         transform: 'translate(-50%, -50%)'
//       }}>
//         <Image
//           src={`/${url.platform}.png`}
//           alt={url.platform}
//           layout="fill"
//           objectFit="contain"
//           className="rounded-full transition-all duration-300 hover:ring-2 hover:ring-purple-200 hover:ring-opacity-100"
//         />
//       </Link>
//     ))
//   }

//   // 处理卡片滑动的函数
//   const handleSwipe = () => {
//     setActiveCardIndex((activeCardIndex + 1) % totalCards) // 轮转卡片索引
//   }

//   // 渲染每一个卡片
//   const renderCard = (index: number) => {
//     const isConnectionCard = index < connectionCards // 判断是否为连接平台卡片
//     const platforms = isConnectionCard ? connectionPlatforms : socialMediaPlatforms // 决定使用的平台
//     const startIndex = isConnectionCard ? index * 6 : (index - connectionCards) * 6 // 确定显示的链接起始位置
//     const title = isConnectionCard ? `Connection ${index + 1}` : `Social Media ${index - connectionCards + 1}` // 卡片标题

//     return (
//       <div 
//         className={`absolute inset-0 bg-white rounded-lg shadow-lg transition-all duration-500 ease-in-out 
//                     ${index === activeCardIndex ? 'z-20' : 'z-10'}`} // 根据索引调整卡片的z-index
//         style={{
//           transform: `translate(${(index - activeCardIndex) * 3}%, ${(index - activeCardIndex) * 3}%)`,
//         }}
//         onClick={handleSwipe}
//       >
//         <Image
//           // src="/pizza-card01.jpeg"
//           src="/pizza-card02.jpeg"
//           // src="/pizza-card01.png"
//           // src="/pizza-card.png"
//           alt={`${title} Background`}
//           layout="fill"
//           objectFit="cover"
//           className="rounded-lg"
//           // style={{ filter: 'blur(2px)' }} // 添加虚化效果，8px 可以根据需要调整模糊程度
//         />
//         <div className="absolute inset-0">
//           {renderPieChart(platforms, urls, startIndex)} {/* 渲染链接饼图 */}
//         </div>
//         <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white bg-black bg-opacity-50 px-2 py-1 rounded">{title}</h3>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-xl font-bold text-purple-600 mb-4">Hello There!</h2>
//       {/* 调整外层容器，使卡片可以重叠显示 */}
//       <div className="relative rounded-lg overflow-visible text-xl" ref={cardRef}>
//         {Array.from({ length: totalCards }, (_, i) => renderCard(i))} {/* 渲染所有卡片 */}
//       </div>
//     </div>
//   )
// }
