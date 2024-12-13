import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// SQL-like methods
export const findUser = async (username: string, password: string) => {
  return prisma.user.findFirst({
    where: {
      username,
      password,
    },
  })
}

export const createUser = async (username: string, password: string) => {
  return prisma.user.create({
    data: {
      username,
      password,
    },
  })
}

export const updateCustomDomain = async (username: string, customDomain: string) => {
  return prisma.user.update({
    where: { username },
    data: { customDomain },
  })
}

export const getUserUrls = async (customDomain: string) => {
  const user = await prisma.user.findUnique({
    where: { customDomain },
  })
  if (!user) return []
  
  const platforms = [
    'wechat', 'email', 'telegram', 'twitter', 'GitHub', 'bilibili', 'weibo',
    'QQ', 'discord', 'phonenumber', 'Facebook', 'ins', 'steam', 'douban',
    'xiaohongshu', 'douyin'
  ]
  
  return platforms
    .map(platform => ({ platform, url: user[platform as keyof typeof user] as string | null }))
    .filter(item => item.url)
}

export const updateUserUrls = async (customDomain: string, newUrls: Array<{ platform: string; url: string }>) => {
  const updateData = newUrls.reduce((acc, { platform, url }) => {
    acc[platform.toLowerCase()] = url
    return acc
  }, {} as Record<string, string>)

  return prisma.user.update({
    where: { customDomain },
    data: updateData,
  })
}

export const getSavedCards = async (customDomain: string) => {
  const user = await prisma.user.findUnique({
    where: { customDomain },
    include: { savedUser: true },
  })
  return user?.savedUser.map(card => card.savedUserId) || []
}

export const addSavedCard = async (customDomain: string, savedCardCustomDomain: string) => {
  const user = await prisma.user.findUnique({ where: { customDomain } })
  const savedUser = await prisma.user.findUnique({ where: { customDomain: savedCardCustomDomain } })
  
  if (!user || !savedUser) return false
  
  await prisma.savedCard.create({
    data: {
      savedUserId: savedUser.id,
    },
  })
  return true
}

export const getUserByCustomDomain = async (customDomain: string) => {
  return prisma.user.findUnique({
    where: { customDomain },
  })
}

// 在应用退出时关闭 Prisma Client 连接
process.on('beforeExit', () => {
  prisma.$disconnect()
})
