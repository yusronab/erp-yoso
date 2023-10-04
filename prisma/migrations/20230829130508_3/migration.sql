/*
  Warnings:

  - You are about to drop the column `statusId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_statusId_fkey";

-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "bgColor" TEXT NOT NULL DEFAULT '#037721',
ADD COLUMN     "fkey" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "fontColor" TEXT NOT NULL DEFAULT '#FFFF',
ADD COLUMN     "module" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "statusId";
