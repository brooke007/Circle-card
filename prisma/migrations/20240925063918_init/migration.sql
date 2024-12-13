-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "customDomain" VARCHAR(255),
    "wechat" TEXT,
    "email" TEXT,
    "telegram" TEXT,
    "twitter" TEXT,
    "GitHub" TEXT,
    "bilibili" TEXT,
    "weibo" TEXT,
    "QQ" TEXT,
    "discord" TEXT,
    "phonenumber" TEXT,
    "Facebook" TEXT,
    "ins" TEXT,
    "steam" TEXT,
    "douban" TEXT,
    "xiaohongshu" TEXT,
    "douyin" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedCard" (
    "id" SERIAL NOT NULL,
    "savedUserId" INTEGER NOT NULL,

    CONSTRAINT "SavedCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_customDomain_key" ON "User"("customDomain");

-- AddForeignKey
ALTER TABLE "SavedCard" ADD CONSTRAINT "SavedCard_savedUserId_fkey" FOREIGN KEY ("savedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
