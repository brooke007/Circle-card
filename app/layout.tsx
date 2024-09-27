import './globals.css'
import { Inter } from 'next/font/google'
import { WalletContextProvider } from '@/components/WalletProvider' 
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Digital Business Card',
  description: 'Your online presence in one place',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  )
}